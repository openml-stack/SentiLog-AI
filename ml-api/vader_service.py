from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class VaderService:
    def __init__(self):
        self.analyzer = SentimentIntensityAnalyzer()

    def analyze(self, text):
        if not text.strip():
            return "Neutral"
        scores = self.analyzer.polarity_scores(text)
        compound = scores['compound']
        if compound >= 0.05:
            return "Positive"
        elif compound <= -0.05:
            return "Negative"
        else:
            return "Neutral"
