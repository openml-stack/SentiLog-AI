from flask import Blueprint, request, jsonify
from app.services.vader_service import VaderService

# Create blueprint
bp = Blueprint('api', __name__, url_prefix='/ml-api')

# Initialize VADER service
vader_service = VaderService()
@bp.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'SentiLog ML API is running'})

@bp.route('/predict', methods=['POST'])
def predict():
    """Main sentiment prediction endpoint"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        text = data.get('text', '')
        if not text or not text.strip():
            return jsonify({'error': 'No text provided'}), 400

        # Use VADER service for sentiment analysis
        sentiment = vader_service.analyze(text)
        
        return jsonify({
            'sentiment': sentiment,
            'text_length': len(text)
        })
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/vader/analyze', methods=['POST'])
def vader_analyze():
    """VADER sentiment analysis endpoint"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        text = data.get('text', '')
        if not text or not text.strip():
            return jsonify({'error': 'No text provided'}), 400

        result = vader_service.analyze(text)
        return jsonify({'sentiment': result})
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500 