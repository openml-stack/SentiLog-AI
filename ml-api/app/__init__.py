from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

def create_app(config_object=None):
    """Application factory that configures Flask app and routes."""
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.environ.get(
        'SECRET_KEY',
        'dev-secret-key-change-in-production'
    )
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

    cors_origins = os.environ.get('CORS_ORIGINS', '*').split(',')
    CORS(app, resources={r"/*": {"origins": cors_origins}})

    if config_object:
        app.config.from_object(config_object)

    from app.routes import routes as vader_routes
    app.register_blueprint(vader_routes.bp)

    try:
        from app.routes import perspective_routes
        app.register_blueprint(perspective_routes.bp)
    except ImportError:
      
        pass

 
    mongo_client = MongoClient("mongodb://localhost:27017/")
    db = mongo_client["news_db"]
    collection = db["articles"]

    @app.route("/news", methods=["GET"])
    def get_news():
        articles = list(collection.find().sort("_id", -1).limit(20))
        for article in articles:
            article["_id"] = str(article["_id"])  
        return jsonify(articles)
    @app.route('/')
    def root():
        return {'message': 'SentiLog ML API is running — visit /ml-api/'}, 200

    @app.errorhandler(400)
    @app.errorhandler(404)
    @app.errorhandler(500)
    @app.errorhandler(502)
    def custom_error_handler(error):
        response = {
            'error': {
                'code': error.code,
                'name': error.name,
                'description': error.description,
            }
        }
        return jsonify(response), error.code

    return app
