# SentiLog ML API - Toxicity Detection

This document describes the toxicity detection functionality that has been integrated into the SentiLog ML API system.

## 🎯 Overview

The system automatically analyzes news articles for toxicity levels using Google's Perspective API, in addition to the existing sentiment analysis. Each news article is scored for toxicity and stored with additional metadata for filtering and analysis.

## 🏗️ Architecture

### Services

1. **`toxicity_service.py`** - Core toxicity detection using Perspective API
2. **`perspective_service.py`** - Extended Perspective API wrapper with configurable attributes
3. **`news_service.py`** - Enhanced to include toxicity scoring during news fetching
4. **`db_service.py`** - MongoDB integration for storing toxicity data

### Data Flow

```
News API → fetch_news() → Sentiment Analysis (VADER) → Toxicity Analysis (Perspective) → MongoDB Storage
```

## 🔧 Configuration

### Required Environment Variables

```bash
# News API (required)
NEWS_API_KEY=your_news_api_key_here

# Google Perspective API (required)
PERSPECTIVE_API_KEY=your_perspective_api_key_here

# Optional Configuration
TOXICITY_THRESHOLD=0.7              # Threshold for marking content as toxic
PERSPECTIVE_TIMEOUT=6               # API request timeout in seconds
MONGO_URI=mongodb://localhost:27017 # MongoDB connection string
MONGO_DB=sentilog                   # Database name
NEWS_COLLECTION=news                # Collection name
```

### Getting API Keys

1. **News API Key**: 
   - Visit [NewsAPI.org](https://newsapi.org/)
   - Sign up for a free account
   - Copy your API key

2. **Perspective API Key**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Perspective Comment Analyzer API
   - Create credentials (API key)
   - Copy your API key

## 📊 Data Structure

### News Article Schema

```json
{
  "_id": "ObjectId(...)",
  "title": "Article title",
  "description": "Article description",
  "content": "Full article content",
  "url": "https://example.com/article",
  "source": "Source name",
  "publishedAt": "2025-01-15T10:30:00Z",
  "sentiment": "Positive",
  "toxicity": {
    "score": 0.15,
    "toxic": false,
    "threshold": 0.7
  },
  "ingested_at": 1705320600
}
```

### Toxicity Object Fields

- **`score`** (float): Toxicity score from 0.0 (not toxic) to 1.0 (very toxic)
- **`toxic`** (boolean): Whether the content exceeds the toxicity threshold
- **`threshold`** (float): The threshold used for classification

## 🚀 API Endpoints

### 1. Fetch and Store News with Toxicity Analysis

```http
POST /ml-api/fetch-and-store
Content-Type: application/json

{
  "query": "technology",
  "page_size": 20,
  "max_pages": 2,
  "from_date": "2025-01-01"
}
```

**Response:**
```json
{
  "status": "done",
  "inserted": 35,
  "updated": 5,
  "errors": []
}
```

### 2. Get News with Toxicity Filtering

```http
GET /ml-api/news?limit=10&toxic=true
```

**Query Parameters:**
- `limit` (int): Number of articles to return (default: 20)
- `toxic` (string): Filter by toxicity level ("true" for toxic, "false" for non-toxic)

**Response:**
```json
{
  "count": 10,
  "results": [
    {
      "_id": "...",
      "title": "Example Article",
      "toxicity": {
        "score": 0.85,
        "toxic": true,
        "threshold": 0.7
      },
      ...
    }
  ]
}
```

### 3. Standalone Toxicity Analysis

```http
POST /ml-api/analyze-toxicity
Content-Type: application/json

{
  "text": "Text to analyze for toxicity"
}
```

**Response:**
```json
{
  "score": 0.25,
  "toxic": false,
  "threshold": 0.7
}
```

## 🧪 Testing

### Run the Test Suite

```bash
python setup_and_test.py
```

This will test:
- Dependencies installation
- Environment variables
- Database connection
- Toxicity detection services
- News fetching pipeline
- API endpoints (if server is running)

### Manual Testing

1. **Start the server:**
   ```bash
   python run.py
   ```

2. **Test toxicity analysis:**
   ```bash
   curl -X POST http://localhost:5001/ml-api/analyze-toxicity \
        -H "Content-Type: application/json" \
        -d '{"text": "This is a test message"}'
   ```

3. **Fetch and analyze news:**
   ```bash
   curl -X POST http://localhost:5001/ml-api/fetch-and-store \
        -H "Content-Type: application/json" \
        -d '{"query": "technology", "page_size": 5}'
   ```

4. **View results:**
   ```bash
   curl http://localhost:5001/ml-api/news?limit=5
   ```

## 🔍 Understanding Toxicity Scores

### Score Interpretation

- **0.0 - 0.2**: Very low toxicity (safe content)
- **0.2 - 0.4**: Low toxicity (mostly safe)
- **0.4 - 0.6**: Moderate toxicity (review recommended)
- **0.6 - 0.8**: High toxicity (likely problematic)
- **0.8 - 1.0**: Very high toxicity (definitely problematic)

### Default Threshold

The default threshold is set to **0.7**, meaning content with a score ≥ 0.7 is marked as toxic.

## 🚨 Error Handling

The system handles various error scenarios:

1. **API Rate Limits**: Includes sleep delays between requests
2. **Network Errors**: Graceful fallback with error logging
3. **Invalid Content**: Empty or null text returns score 0.0
4. **API Key Issues**: Clear error messages for missing credentials

### Error Response Example

```json
{
  "toxicity": {
    "error": "Perspective API request failed: 403 Forbidden"
  }
}
```

## 📈 Performance Considerations

1. **Rate Limiting**: The Perspective API has usage limits
2. **Caching**: Consider implementing caching for repeated content
3. **Batch Processing**: Process articles in batches to manage API quotas
4. **Timeout Settings**: Configured timeouts prevent hanging requests

## 🔧 Customization

### Adding More Toxicity Attributes

The Perspective API supports multiple attributes. To analyze additional ones:

1. Modify `perspective_service.py`:
   ```python
   attributes = ["TOXICITY", "SEVERE_TOXICITY", "IDENTITY_ATTACK", "INSULT"]
   ```

2. Update the database schema to store additional scores

### Adjusting Thresholds

Modify the `TOXICITY_THRESHOLD` environment variable or update the service logic for dynamic thresholds.

## 🐛 Troubleshooting

### Common Issues

1. **"PERSPECTIVE_API_KEY not set"**
   - Ensure the API key is set in your `.env` file
   - Verify the Perspective API is enabled in Google Cloud Console

2. **High toxicity scores on normal content**
   - Check the content being analyzed
   - Consider adjusting the threshold
   - Verify the API is working correctly

3. **Database connection errors**
   - Ensure MongoDB is running
   - Check the `MONGO_URI` configuration
   - Verify database permissions

4. **News API quota exceeded**
   - Check your NewsAPI usage limits
   - Consider using a paid plan for higher limits
   - Implement request throttling

## 🔄 Future Enhancements

Potential improvements to consider:

1. **Multi-language Support**: Extend toxicity analysis to other languages
2. **Historical Analysis**: Track toxicity trends over time
3. **Content Moderation**: Automatically flag or filter toxic content
4. **Dashboard**: Web interface for toxicity analytics
5. **Machine Learning**: Train custom models for domain-specific toxicity

## 📞 Support

For issues with the toxicity detection functionality:

1. Run the test suite: `python setup_and_test.py`
2. Check the error logs in the console
3. Verify API keys and environment configuration
4. Review the Google Perspective API documentation
