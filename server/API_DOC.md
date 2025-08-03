# 📘 SentiLog-AI API Documentation

## 🔗 Base URL

http://localhost:8080

## 📊 API Endpoints

### 🧠 Sentiment Analysis

#### `POST /api/analyze`
- **Description**: Analyzes the sentiment of a given sentence using a rule-based model.
- **Request Body**:
```json
{
  "text": "I love open source!"
}### 🧠 Sentiment Analysis

#### `POST /api/analyze`
- **Description**: Analyzes the sentiment of a given sentence using a rule-based model.
- **Request Body**:
```json
{
  "text": "I love open source!"
}### 🧠 Sentiment Analysis

#### `POST /api/analyze`
- **Description**: Analyzes the sentiment of a given sentence using a rule-based model.
- **Request Body**:
```json
{
  "text": "I love open source!"
}
### 🧠 Sentiment Analysis

#### `POST /api/analyze`
- **Description**: Analyzes the sentiment of a given sentence using a rule-based model.
- **Request Body**:
```json
{
  "text": "I love open source!"
}

•Response:
{
  "score": 0.8,
  "label": "positive"
}

> ⚠️ **Important**: When writing ` ```json ` and ` ``` ` in Nano, type them exactly. No spaces.

Let me know once you complete this block, and I’ll give you the next one (`/api/news`). You can also copy-paste if your Terminal supports it — just let me know what you prefer.


---

### 📰 News Endpoints

#### `GET /api/news`
- **Description**: Retrieves the latest sentiment-annotated news articles.
- **Response**:
```json
[
  {
    "title": "Market is booming",
    "sentiment": "positive",
    "source": "Reuters"
  }
]
---

### 📓 Journal Endpoints

#### `POST /api/journal`
- **Description**: Submit a personal journal entry for sentiment analysis.
- **Request Body**:
```json
{
  "text": "I had a productive day."
}
{
  "sentiment": "positive"
}
[
  {
    "text": "I had a productive day.",
    "sentiment": "positive",
    "timestamp": "2025-08-03T18:30:00Z"
  }
]

---

### 🧠 Analyze Endpoint

#### `POST /api/analyze`
- **Description**: Analyze custom text for sentiment using ML-based sentiment analysis.
- **Request Body**:
```json
{
  "text": "I feel amazing about this new project!"
}
{
  "sentiment": "positive",
  "confidence": 0.95
}
---

### 📩 Contact Endpoint

#### `POST /api/contact`
- **Description**: Submits a contact message (e.g., user feedback or queries).
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I love your project!"
}
{
  "success": true,
  "message": "Contact message sent successfully."
}
