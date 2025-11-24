"""
Enhanced Server Startup Script for SentiLog ML API

This script:
1. Performs comprehensive pre-flight checks
2. Validates all configurations
3. Tests API connections
4. Starts the server with proper error handling

Usage:
    python start_server.py
"""

import os
import sys
import time
import requests
from dotenv import load_dotenv

def load_environment():
    """Load and validate environment variables."""
    print("Loading environment configuration...")
    load_dotenv()
    
    required_vars = {
        'NEWS_API_KEY': 'News API key from newsapi.org',
        'PERSPECTIVE_API_KEY': 'Google Perspective API key'
    }
    
    missing_vars = []
    for var, description in required_vars.items():
        value = os.getenv(var)
        if not value or value == f'your_{var.lower()}':
            missing_vars.append((var, description))
        else:
            print(f"  {var}: Configured")
    
    if missing_vars:
        print("\n Missing required environment variables:")
        for var, desc in missing_vars:
            print(f"  - {var}: {desc}")
        print("\nPlease update your .env file with the correct API keys.")
        return False
    
    return True

def check_dependencies():
    """Check if all required dependencies are installed."""
    print("\n🔍 Checking dependencies...")
    
    required_packages = [
        'flask', 'flask_cors', 'pymongo', 'requests', 
        'vaderSentiment', 'dotenv'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"  {package}")
        except ImportError:
            missing.append(package)
            print(f"  {package}")
    
    if missing:
        print(f"\n Missing packages: {', '.join(missing)}")
        print("Run: pip install -r requirements.txt")
        return False
    
    return True

def test_database_connection():
    """Test MongoDB connection."""
    print("\nTesting database connection...")
    try:
        from app.services.db_service import get_db, get_news_collection
        
        db = get_db()
        server_info = db.client.server_info()
        collection = get_news_collection()
        doc_count = collection.count_documents({})
        
        print(f"Connected to database: {db.name}")
        print(f"MongoDB version: {server_info.get('version')}")
        print(f" Collection '{collection.name}' has {doc_count} documents")
        return True
        
    except Exception as e:
        print(f" Database connection failed: {e}")
        print(" Make sure MongoDB is running: mongod")
        return False

def test_api_services():
    """Test external API services."""
    print("\n Testing external API services...")
    try:
        from app.services.perspective_service import analyze_toxicity_text
        result = analyze_toxicity_text("This is a test message")
        if isinstance(result, dict) and 'score' in result:
            print(f"Perspective API: Working (test score: {result['score']:.3f})")
        else:
            print("Perspective API: Invalid response")
            return False
    except Exception as e:
        print(f" Perspective API failed: {e}")
        return False
    try:
        from app.services.news_service import fetch_news
        articles = fetch_news(query="test", page_size=1)
        if articles:
            print(f"News API: Working (fetched {len(articles)} articles)")
        else:
            print(" News API: No articles returned (but connection works)")
    except Exception as e:
        print(f" News API failed: {e}")
        return False
    
    return True

def pre_flight_check():
    """Run comprehensive pre-flight checks."""
    print(" SentiLog ML API - Pre-flight Checks")
    print("=" * 50)
    
    checks = [
        ("Environment Variables", load_environment),
        ("Dependencies", check_dependencies),
        ("Database Connection", test_database_connection),
        ("API Services", test_api_services)
    ]
    
    all_passed = True
    for name, check_func in checks:
        if not check_func():
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("All pre-flight checks passed!")
        return True
    else:
        print(" Some checks failed. Please fix the issues above.")
        return False

def start_server():
    """Start the Flask server with proper configuration."""
    print("\n Starting SentiLog ML API server...")
    
    try:
        from app import create_app
        app = create_app()
        host = os.getenv('HOST', '0.0.0.0')
        port = int(os.getenv('PORT', 5001))
        debug = os.getenv('FLASK_ENV') == 'development'
        
        print(f" Server will start on: http://{host}:{port}")
        print(f" Debug mode: {debug}")
        print(f" CORS origins: {os.getenv('CORS_ORIGINS', '*')}")
        print("\n Available endpoints:")
        print(f"  • Health check: http://{host}:{port}/ml-api/health")
        print(f"  • Toxicity analysis: http://{host}:{port}/ml-api/analyze-toxicity")
        print(f"  • Fetch and store news: http://{host}:{port}/ml-api/fetch-and-store")
        print(f"  • List news: http://{host}:{port}/ml-api/news")
        print("\n Starting server... (Press Ctrl+C to stop)")
        
        # Start the server
        app.run(host=host, port=port, debug=debug)
        
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"\nServer startup failed: {e}")
        return False
    
    return True

def main():
    """Main entry point."""

    if not pre_flight_check():
        print("\nCannot start server due to failed checks.")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    success = start_server()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
