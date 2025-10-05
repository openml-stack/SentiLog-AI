"""
Example Usage Script for SentiLog ML API Toxicity Detection

This script demonstrates how to use the toxicity detection functionality
in various scenarios.

Usage:
    python example_usage.py
"""

import os
import sys
import time
import requests
from dotenv import load_dotenv
load_dotenv()
BASE_URL = "http://localhost:5001/ml-api"
SERVER_TIMEOUT = 5

def test_server_connection():
    """Test if the server is running and accessible."""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=SERVER_TIMEOUT)
        return response.status_code == 200
    except:
        return False

def analyze_single_text():
    """Demonstrate single text toxicity analysis."""
    print("🧪 Testing Single Text Analysis")
    print("-" * 40)
    
    test_texts = [
        "This is a wonderful day with beautiful weather.",
        "Technology is advancing rapidly these days.",
        "That was a terrible and awful decision!",
        "I hate this stupid system, it never works right!",
        "The new iPhone features look innovative and exciting."
    ]
    
    for i, text in enumerate(test_texts, 1):
        print(f"\nTest {i}: {text[:50]}...")
        
        try:
            response = requests.post(
                f"{BASE_URL}/analyze-toxicity",
                json={"text": text},
                timeout=SERVER_TIMEOUT
            )
            
            if response.status_code == 200:
                result = response.json()
                score = result.get('score', 0)
                toxic = result.get('toxic', False)
                
                status = "TOXIC" if toxic else "SAFE"
                print(f"  Result: {status} (Score: {score:.3f})")
            else:
                print(f"Error: {response.status_code}")
                
        except Exception as e:
            print(f" Request failed: {e}")

def fetch_and_analyze_news():
    """Demonstrate news fetching with toxicity analysis."""
    print("\n\n📰 Testing News Fetching and Analysis")
    print("-" * 40)
    payload = {
        "query": "technology",
        "page_size": 5,
        "max_pages": 1
    }
    
    print("Fetching news articles...")
    
    try:
        response = requests.post(
            f"{BASE_URL}/fetch-and-store",
            json=payload,
            timeout=60  
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"Success!")
            print(f"  Inserted: {result.get('inserted', 0)} articles")
            print(f"  Updated: {result.get('updated', 0)} articles")
            print(f"  Errors: {len(result.get('errors', []))}")
            
            if result.get('errors'):
                print("  Error details:")
                for error in result['errors'][:3]:  
                    print(f"    - {error}")
                    
        else:
            print(f"Failed: {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"Request failed: {e}")

def view_stored_news():
    """View and analyze stored news articles."""
    print("\n\nViewing Stored News")
    print("-" * 40)
    
    try:
        # Get all articles
        response = requests.get(f"{BASE_URL}/news?limit=10", timeout=SERVER_TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            articles = data.get('results', [])
            
            print(f"Found {len(articles)} articles:")
            
            for i, article in enumerate(articles, 1):
                title = article.get('title', 'No title')[:60]
                toxicity = article.get('toxicity', {})
                sentiment = article.get('sentiment', 'Unknown')
                
                if isinstance(toxicity, dict):
                    score = toxicity.get('score', 0)
                    toxic = toxicity.get('toxic', False)
                    status = "🔴" if toxic else "🟢"
                else:
                    score = 0
                    status = "⚪"
                
                print(f"\n{i}. {title}...")
                print(f"   Sentiment: {sentiment}")
                print(f"   Toxicity: {status} {score:.3f}")
                
        else:
            print(f"Failed to fetch articles: {response.status_code}")
            
    except Exception as e:
        print(f"Request failed: {e}")

def filter_toxic_content():
    """Demonstrate filtering content by toxicity level."""
    print("\n\nFiltering Toxic Content")
    print("-" * 40)
    
    try:
        # Get only toxic articles
        response = requests.get(f"{BASE_URL}/news?limit=5&toxic=true", timeout=SERVER_TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            articles = data.get('results', [])
            
            print(f"Found {len(articles)} toxic articles:")
            
            for i, article in enumerate(articles, 1):
                title = article.get('title', 'No title')[:60]
                toxicity = article.get('toxicity', {})
                
                if isinstance(toxicity, dict):
                    score = toxicity.get('score', 0)
                    threshold = toxicity.get('threshold', 0.7)
                    print(f"\n{i}. {title}...")
                    print(f"   Toxicity Score: {score:.3f} (threshold: {threshold})")
                else:
                    print(f"\n{i}. {title}...")
                    print(f"   Toxicity: Error or not analyzed")
                    
        else:
            print(f"Failed to fetch toxic articles: {response.status_code}")
            
    except Exception as e:
        print(f"Request failed: {e}")

def display_statistics():
    """Display toxicity statistics from stored articles."""
    print("\n\nToxicity Statistics:")
    print("-" * 40)
    
    try:
        response = requests.get(f"{BASE_URL}/news?limit=100", timeout=SERVER_TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            articles = data.get('results', [])
            
            if not articles:
                print("No articles found for analysis")
                return
           
            scores = []
            toxic_count = 0
            error_count = 0
            
            for article in articles:
                toxicity = article.get('toxicity', {})
                if isinstance(toxicity, dict):
                    if 'score' in toxicity:
                        scores.append(toxicity['score'])
                        if toxicity.get('toxic', False):
                            toxic_count += 1
                    else:
                        error_count += 1
                else:
                    error_count += 1
            
            if scores:
                avg_score = sum(scores) / len(scores)
                min_score = min(scores)
                max_score = max(scores)
                
                print(f"Total articles analyzed: {len(articles)}")
                print(f"Successfully scored: {len(scores)}")
                print(f"Errors/Missing scores: {error_count}")
                print(f"Marked as toxic: {toxic_count}")
                print(f"Average toxicity score: {avg_score:.3f}")
                print(f"Score range: {min_score:.3f} - {max_score:.3f}")
                
                low = sum(1 for s in scores if s < 0.3)
                medium = sum(1 for s in scores if 0.3 <= s < 0.7)
                high = sum(1 for s in scores if s >= 0.7)
                
                print(f"\nDistribution:")
                print(f"  Low (0.0-0.3): {low} articles ({low/len(scores)*100:.1f}%)")
                print(f"  Medium (0.3-0.7): {medium} articles ({medium/len(scores)*100:.1f}%)")
                print(f"  High (0.7-1.0): {high} articles ({high/len(scores)*100:.1f}%)")
            else:
                print("No toxicity scores found")
                
        else:
            print(f"Failed to fetch articles: {response.status_code}")
            
    except Exception as e:
        print(f"Analysis failed: {e}")

def main():
    """Run the complete demonstration."""
    print("SentiLog ML API - Toxicity Detection Demo")
    print("=" * 50)
    
    # Check if server is running
    print("Checking server connection...")
    if not test_server_connection():
        print("Server not accessible at", BASE_URL)
        print("Please start the server with: python run.py")
        sys.exit(1)
    
    print("✅ Server is running")
    
    # Run demonstrations
    try:
        analyze_single_text()
        fetch_and_analyze_news()
        time.sleep(2)  
        view_stored_news()
        filter_toxic_content()
        display_statistics()
        
        print("\n" + "=" * 50)
        print("Demo completed successfully!")
        print("\nNext steps:")
        print("- Integrate toxicity detection into your application")
        print("- Set up monitoring for toxic content")
        print("- Customize thresholds based on your requirements")
        
    except KeyboardInterrupt:
        print("\n\nDemo interrupted by user")
    except Exception as e:
        print(f"\nDemo failed with error: {e}")

if __name__ == "__main__":
    main()
