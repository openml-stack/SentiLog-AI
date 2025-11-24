import os
import requests
import logging
from time import sleep
from .perspective_service import analyze_toxicity_text

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_URL = os.getenv("NEWS_API_URL", "https://newsapi.org/v2/everything")
DEFAULT_PAGE_SIZE = int(os.getenv("NEWS_PAGE_SIZE", "20"))
REQUEST_TIMEOUT = int(os.getenv("NEWS_TIMEOUT", "8"))
RATE_SLEEP = float(os.getenv("NEWS_RATE_SLEEP", "0.2"))

def fetch_news(query="technology", page_size=DEFAULT_PAGE_SIZE, page=1, from_date=None):
    if not NEWS_API_KEY:
        raise RuntimeError("NEWS_API_KEY not set in env")

    params = {
        "q": query,
        "pageSize": page_size,
        "page": page,
        "apiKey": NEWS_API_KEY,
        "language": "en",
        "sortBy": "publishedAt"
    }
    if from_date:
        params["from"] = from_date

    resp = requests.get(NEWS_API_URL, params=params, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    data = resp.json()
    articles = data.get("articles", [])

    normalized = []
    for a in articles:
        if not a.get("url") or not a.get("title"):
            continue
            
        text_for_toxicity = " ".join(filter(None, [
            a.get("title"), a.get("description"), a.get("content")
        ]))
        try:
            toxicity_result = analyze_toxicity_text(text_for_toxicity)
            toxicity_obj = {
                "score": toxicity_result["score"],
                "toxic": toxicity_result["toxic"],
                "threshold": toxicity_result["threshold"]
            }
        except Exception as e:
            logging.warning(f"Toxicity analysis failed for article: {e}")
            toxicity_obj = {
                "score": 0.0,
                "toxic": False,
                "threshold": 0.7,
                "error": str(e)
            }

        normalized.append({
            "title": a.get("title"),
            "description": a.get("description"),
            "content": a.get("content") or "",
            "url": a.get("url"),
            "source": a.get("source", {}).get("name"),
            "publishedAt": a.get("publishedAt"),
            "toxicity": toxicity_obj
        })
        sleep(RATE_SLEEP)

    return normalized
