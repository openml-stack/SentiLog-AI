# ml-api/app/routes/routes.py
from flask import Blueprint, request, jsonify
from app.services.vader_service import VaderService
from app.services.perspective_service import analyze_toxicity_text
from app.services.news_service import fetch_news
from app.services.db_service import get_news_collection
from pymongo.errors import DuplicateKeyError
import time

bp = Blueprint('api', __name__, url_prefix='/ml-api')

vader_service = VaderService()

@bp.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'SentiLog ML API is running'})

@bp.route('/health', methods=['GET'])
def health_check():
    """Comprehensive health check endpoint"""
    import os
    from app.services.db_service import get_db
    
    health_status = {
        'status': 'healthy',
        'timestamp': int(time.time()),
        'services': {},
        'environment': {}
    }
    
   
    required_env_vars = ['NEWS_API_KEY', 'PERSPECTIVE_API_KEY']
    for var in required_env_vars:
        health_status['environment'][var] = 'set' if os.getenv(var) else 'missing'
   
    try:
        db = get_db()
        server_info = db.client.server_info()
        health_status['services']['database'] = 'healthy'
        health_status['services']['mongodb_version'] = server_info.get('version')
    except Exception as e:
        health_status['services']['database'] = f'error: {str(e)}'
        health_status['status'] = 'degraded'
    
   
    try:
        if os.getenv('NEWS_API_KEY'):
            health_status['services']['news_api'] = 'configured'
        else:
            health_status['services']['news_api'] = 'not configured'
    except Exception:
        health_status['services']['news_api'] = 'error'
    
    
    try:
        if os.getenv('PERSPECTIVE_API_KEY'):
            health_status['services']['perspective_api'] = 'configured'
        else:
            health_status['services']['perspective_api'] = 'not configured'
    except Exception:
        health_status['services']['perspective_api'] = 'error'
    
    status_code = 200 if health_status['status'] == 'healthy' else 503
    return jsonify(health_status), status_code

@bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(silent=True)
        if not data or 'text' not in data:
            return jsonify({'error': 'text is required'}), 400
        text = data['text']
        sentiment = vader_service.analyze(text)
        return jsonify({'sentiment': sentiment, 'text_length': len(text)}), 200
    except Exception:
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/vader/analyze', methods=['POST'])
def vader_analyze():
    try:
        data = request.get_json(silent=True)
        if not data or 'text' not in data:
            return jsonify({'error': 'text is required'}), 400
        text = data['text']
        sentiment = vader_service.analyze(text)
        return jsonify({'sentiment': sentiment}), 200
    except Exception:
        return jsonify({'error': 'Internal server error'}), 500



@bp.route('/fetch-and-store', methods=['POST'])
def fetch_and_store():
    """
    POST body JSON:
    {
      "query": "bitcoin",
      "page_size": 20,
      "max_pages": 2,
      "from_date": "2025-08-01"
    }
    The endpoint will fetch news, run sentiment & toxicity, and store each doc in MongoDB
    with a new `toxicity` field.
    """
    try:
        payload = request.get_json(silent=True) or {}
        query = payload.get("query", "technology")
        page_size = int(payload.get("page_size", 20))
        max_pages = int(payload.get("max_pages", 1))
        from_date = payload.get("from_date")  

        col = get_news_collection()
        inserted = 0
        updated = 0
        errors = []

        for page in range(1, max_pages + 1):
            articles = fetch_news(query=query, page_size=page_size, page=page, from_date=from_date)
            if not articles:
                break
            for art in articles:
                try:
                    text_for_analysis = (art.get("content") or "") or (art.get("description") or "") or (art.get("title") or "")
                   
                    sentiment = vader_service.analyze(text_for_analysis)
                    try:
                        tox = analyze_toxicity_text(text_for_analysis)
                        toxicity_obj = {
                            "score": tox["score"],
                            "toxic": tox["toxic"],
                            "threshold": tox["threshold"]
                        }
                    except Exception as e:
                        toxicity_obj = {"error": str(e)}

                    doc = {
                        "title": art.get("title"),
                        "description": art.get("description"),
                        "content": art.get("content"),
                        "url": art.get("url"),
                        "source": art.get("source"),
                        "publishedAt": art.get("publishedAt"),
                        "sentiment": sentiment,
                        "toxicity": toxicity_obj,
                        "ingested_at": int(time.time())
                    }
                    res = col.update_one({"url": doc["url"]}, {"$set": doc}, upsert=True)
                    if res.upserted_id:
                        inserted += 1
                    else:
                        updated += 1

                except Exception as e:
                    errors.append({"title": art.get("title"), "error": str(e)})

        return jsonify({
            "status": "done",
            "inserted": inserted,
            "updated": updated,
            "errors": errors
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/news', methods=['GET'])
def list_news():
    """
    Query params:
     - limit (default 20)
     - toxic (optional: true/false)
    """
    try:
        col = get_news_collection()
        limit = int(request.args.get("limit", 20))
        toxic = request.args.get("toxic") 
        query = {}
        if toxic is not None:
            if toxic.lower() in ("1", "true", "yes"):
                query["toxicity.toxic"] = True
            else:
                query["toxicity.toxic"] = False

        docs = list(col.find(query).sort("ingested_at", -1).limit(limit))
       
        for d in docs:
            d["_id"] = str(d["_id"])
        return jsonify({"count": len(docs), "results": docs}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
