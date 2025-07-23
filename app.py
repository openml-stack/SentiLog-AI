from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from vader_service import VaderService
import os

app = Flask(__name__)
CORS(app)

# Load models once at startup
sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
emotion_model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

EMOTIONS = ["joy", "sadness", "anger", "fear", "surprise", "love", "neutral"]

vader_service = VaderService()

@app.route('/predict', methods=['POST'])
def predict():
    if not request.is_json:
        return jsonify({'error': 'Request must be in JSON format'}), 415

    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Sentiment (transformers)
        sentiment_result = sentiment_model(text)[0]
        sentiment = sentiment_result['label']

        # Emotion (zero-shot)
        emotion_result = emotion_model(text, EMOTIONS)
        emotion = emotion_result['labels'][0].capitalize()

        return jsonify({
            'sentiment': sentiment,
            'emotion': emotion
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/vader/analyze', methods=['POST'])
def vader_analyze():
    if not request.is_json:
        return jsonify({'error': 'Request must be in JSON format'}), 415

    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        result = vader_service.analyze(text)  # returns dict: { label: ..., score: ... }
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(port=port, debug=True)
