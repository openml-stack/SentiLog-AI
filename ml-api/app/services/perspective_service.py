import os
import requests

PERSPECTIVE_API_KEY = os.getenv("PERSPECTIVE_API_KEY")
PERSPECTIVE_API_URL = os.getenv(
    "PERSPECTIVE_API_URL",
    "https://commentanalyzer.googleapis.com/v1/comments:analyze"
)
TOXICITY_THRESHOLD = float(os.getenv("TOXICITY_THRESHOLD", "0.7"))
REQUEST_TIMEOUT = int(os.getenv("PERSPECTIVE_TIMEOUT", "6"))

def analyze_toxicity_text(text, attributes=None):
    """Return {'score': float, 'toxic': bool, 'threshold': float, 'raw': {...}}"""
    if not text or not isinstance(text, str):
        raise ValueError("text must be a non-empty string")

    if attributes is None:
        attributes = ["TOXICITY"]

    if not PERSPECTIVE_API_KEY:
        raise RuntimeError("PERSPECTIVE_API_KEY not set in env")

    requestedAttributes = {a: {} for a in attributes}
    payload = {
        "comment": {"text": text},
        "languages": ["en"],
        "requestedAttributes": requestedAttributes
    }

    try:
        res = requests.post(
            f"{PERSPECTIVE_API_URL}?key={PERSPECTIVE_API_KEY}",
            json=payload,
            timeout=REQUEST_TIMEOUT
        )
        res.raise_for_status()
    except requests.RequestException as e:
        raise RuntimeError(f"Perspective API request failed: {e}")

    data = res.json()
    tox_value = (
        data.get("attributeScores", {})
            .get("TOXICITY", {})
            .get("summaryScore", {})
            .get("value")
    )

    if tox_value is None:
        raise RuntimeError("Perspective API returned no TOXICITY score")

    return {
        "score": float(tox_value),
        "toxic": float(tox_value) >= TOXICITY_THRESHOLD,
        "threshold": TOXICITY_THRESHOLD,
        "raw": data
    }
