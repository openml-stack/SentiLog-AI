import os
import requests

PERSPECTIVE_API_KEY = os.getenv("PERSPECTIVE_API_KEY")
PERSPECTIVE_API_URL = os.getenv(
    "PERSPECTIVE_API_URL",
    "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze"
)
REQUEST_TIMEOUT = int(os.getenv("PERSPECTIVE_TIMEOUT", "8"))

def get_toxicity_score(text: str) -> float:
    """
    Sends text to Perspective API and returns the toxicity score (0.0 to 1.0).
    Returns 0.0 if API key not set or an error occurs.
    """
    if not PERSPECTIVE_API_KEY:
        raise RuntimeError("PERSPECTIVE_API_KEY not set in env")

    if not text.strip():
        return 0.0

    payload = {
        "comment": {"text": text},
        "languages": ["en"],
        "requestedAttributes": {"TOXICITY": {}}
    }

    try:
        response = requests.post(
            f"{PERSPECTIVE_API_URL}?key={PERSPECTIVE_API_KEY}",
            json=payload,
            timeout=REQUEST_TIMEOUT
        )
        response.raise_for_status()
        data = response.json()

        return data.get("attributeScores", {}) \
                   .get("TOXICITY", {}) \
                   .get("summaryScore", {}) \
                   .get("value", 0.0)

    except Exception as e:
        print(f"[toxicity_service] Error getting toxicity score: {e}")
        return 0.0
