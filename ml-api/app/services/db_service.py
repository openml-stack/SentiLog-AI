import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "sentilog")
NEWS_COLLECTION = os.getenv("NEWS_COLLECTION", "news")

_client = None

def get_db():
    global _client
    if _client is None:
        _client = MongoClient(MONGO_URI)
    return _client[MONGO_DB]

def get_news_collection():
    db = get_db()
    return db[NEWS_COLLECTION]
