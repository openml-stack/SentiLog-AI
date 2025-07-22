from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline
from vader_service import VaderService

app = Flask(__name__)
CORS(app)

# Load models once at startup
analyzer = SentimentIntensityAnalyzer()
sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
emotion_model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

EMOTIONS = ["joy", "sadness", "anger", "fear", "surprise", "love", "neutral"]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
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



vader_service = VaderService()

@app.route('/vader/analyze', methods=['POST'])
def vader_analyze():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    sentiment = vader_service.analyze(text)
    return jsonify({'sentiment': sentiment})


if __name__ == '__main__':
    app.run(port=5001, debug=True) 