"""
Setup and Testing Script for SentiLog ML API with Toxicity Detection

This script helps you:
1. Verify all dependencies are installed
2. Check environment variables
3. Test the toxicity detection functionality
4. Test the complete news pipeline

Usage:
    python setup_and_test.py
"""

import os
import sys
import json
import requests
from dotenv import load_dotenv
load_dotenv()

def check_dependencies():
    """Check if all required dependencies are installed."""
    print("🔍 Checking dependencies...")
    
    required_packages = [
        'flask',
        'flask_cors',
        'pymongo',
        'requests',
        'vaderSentiment',
        'dotenv'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"{package}")
        except ImportError:
            print(f"{package}")
            missing.append(package)
    
    if missing:
        print(f"\n Missing packages: {', '.join(missing)}")
        print("Run: pip install -r requirements.txt")
        return False
    
    print("All dependencies are installed!")
    return True

def check_environment_variables():
    """Check if required environment variables are set."""
    print("\n🔍 Checking environment variables...")
    
    required_vars = [
        'NEWS_API_KEY',
        'PERSPECTIVE_API_KEY'
    ]
    
    optional_vars = {
        'MONGO_URI': 'mongodb://localhost:27017',
        'MONGO_DB': 'sentilog',
        'TOXICITY_THRESHOLD': '0.7'
    }
    
    missing = []
    for var in required_vars:
        if os.getenv(var):
            print(f"  {var}: {'*' * 8}{os.getenv(var)[-4:]}")
        else:
            print(f"  {var}: Not set")
            missing.append(var)
    
    for var, default in optional_vars.items():
        value = os.getenv(var, default)
        print(f"   {var}: {value}")
    
    if missing:
        print(f"\n Missing required variables: {', '.join(missing)}")
        print("Please set them in your .env file")
        return False
    
    print(" Environment variables are configured!")
    return True

def test_toxicity_service():
    """Test the toxicity detection service directly."""
    print("\nTesting toxicity detection service...")
    
    try:
        from app.services.toxicity_service import get_toxicity_score
        
        # Test with neutral text
        neutral_text = "This is a normal news article about technology."
        neutral_score = get_toxicity_score(neutral_text)
        print(f"  Neutral text score: {neutral_score}")
        toxic_text = "This is terrible and awful and stupid!"
        toxic_score = get_toxicity_score(toxic_text)
        print(f"  Potentially toxic text score: {toxic_score}")
        
        print("Toxicity service is working!")
        return True
        
    except Exception as e:
        print(f"Toxicity service error: {e}")
        return False

def test_perspective_service():
    """Test the perspective API service."""
    print("\nTesting Perspective API service...")
    
    try:
        from app.services.perspective_service import analyze_toxicity_text
        
        test_text = "This is a test message for toxicity analysis."
        result = analyze_toxicity_text(test_text)
        
        print(f"  Score: {result['score']:.3f}")
        print(f"  Toxic: {result['toxic']}")
        print(f"  Threshold: {result['threshold']}")
        
        print("Perspective service is working!")
        return True
        
    except Exception as e:
        print(f"Perspective service error: {e}")
        return False

def test_database_connection():
    """Test MongoDB connection."""
    print("\nTesting database connection...")
    
    try:
        from app.services.db_service import get_db, get_news_collection
        
        # Test database connection
        db = get_db()
        collection = get_news_collection()
        
        # Try to get collection stats
        stats = db.command("collstats", collection.name)
        print(f"  Database: {db.name}")
        print(f"  Collection: {collection.name}")
        print(f"  Document count: {stats.get('count', 0)}")
        
        print("Database connection is working!")
        return True
        
    except Exception as e:
        print(f"Database connection error: {e}")
        return False

def test_news_service():
    """Test the news fetching service."""
    print("\nTesting news service...")
    
    try:
        from app.services.news_service import fetch_news
        articles = fetch_news(query="technology", page_size=2, page=1)
        
        if articles:
            print(f"  Fetched {len(articles)} articles")
            for i, article in enumerate(articles[:2], 1):
                print(f"  Article {i}:")
                print(f"    Title: {article.get('title', 'No title')[:50]}...")
                print(f"    Toxicity: {article.get('toxicity', 'No score')}")
        else:
            print("  No articles fetched")
        
        print("News service is working!")
        return True
        
    except Exception as e:
        print(f"News service error: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints if the server is running."""
    print("\n🧪 Testing API endpoints (assuming server is running on localhost:5001)...")
    
    base_url = "http://localhost:5001/ml-api"
    
    try:
        # Test root endpoint
        response = requests.get(f"{base_url}/", timeout=5)
        if response.status_code == 200:
            print("Root endpoint working")
        else:
            print(f"Root endpoint returned {response.status_code}")
            
        # Test toxicity analysis endpoint
        test_data = {"text": "This is a test message for API testing."}
        response = requests.post(f"{base_url}/analyze-toxicity", json=test_data, timeout=5)
        if response.status_code == 200:
            result = response.json()
            print(f"Toxicity endpoint working (score: {result.get('score', 'N/A')})")
        else:
            print(f"Toxicity endpoint returned {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("Server not running - skipping API tests")
        print("     Start the server with: python run.py")
    except Exception as e:
        print(f"API test error: {e}")

def main():
    """Run all tests and checks."""
    print("SentiLog ML API - Setup and Testing")
    print("=" * 50)
    
    checks = [
        check_dependencies,
        check_environment_variables,
        test_database_connection,
        test_toxicity_service,
        test_perspective_service,
        test_news_service,
        test_api_endpoints
    ]
    
    results = []
    for check in checks:
        try:
            result = check()
            results.append(result if result is not None else False)
        except Exception as e:
            print(f"Check failed with error: {e}")
            results.append(False)
    
    # Summary
    print("\n" + "=" * 50)
    print(" SUMMARY")
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total} checks")
    
    if passed == total:
        print("All checks passed! Your system is ready to use.")
        print("\nNext steps:")
        print("1. Start the server: python run.py")
        print("2. Test the complete pipeline: POST /ml-api/fetch-and-store")
        print("3. View stored news: GET /ml-api/news")
    else:
        print("Some checks failed. Please address the issues above.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
