from flask import Blueprint, request, jsonify
from app.services.perspective_service import analyze_toxicity_text

bp = Blueprint('perspective', __name__, url_prefix='/ml-api')

@bp.route('/analyze-toxicity', methods=['POST'])
def analyze():
    data = request.get_json(silent=True)
    if not data or 'text' not in data:
        return jsonify({'error': 'text is required'}), 400

    try:
        result = analyze_toxicity_text(data['text'])
        return jsonify({
            'score': result['score'],
            'toxic': result['toxic'],
            'threshold': result['threshold']
        }), 200
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except RuntimeError as re:
        return jsonify({'error': str(re)}), 502
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {e}'}), 500
