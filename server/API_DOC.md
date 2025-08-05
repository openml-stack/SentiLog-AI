

# 📘 API Documentation

This file contains all REST API endpoints for both the **Express Server** and the **ML API**.

---

## 🌐 Server API (Node.js / Express)

### 📌 `POST /api/news/analyze`

**Description**: Analyze the sentiment and bias of a news article.

**Request Body**:
```json
{
  "title": "News title",
  "content": "Full news content"
}
```

**Response**:
```json
{
  "bias": "Left",
  "sentiment": "Negative"
}
```

---

### 📌 `POST /api/journal/analyze`

**Description**: Analyze a journal entry and return emotion/sentiment.

**Request Body**:
```json
{
  "entry": "I felt anxious after reading today's headlines."
}
```

**Response**:
```json
{
  "emotion": "Anxious",
  "score": -0.6
}
```

---

## 🧠 ML API (Python / Flask)

### 📌 `POST /predict`

**Description**: Accepts raw text and returns sentiment + emotion.

**Request Body**:
```json
{
  "text": "I am feeling hopeful today!"
}
```

**Response**:
```json
{
  "sentiment": "Positive",
  "emotion": "Happy"
}
```

---

## ✅ Status Codes

| Code | Description              |
|------|--------------------------|
| 200  | Success                  |
| 400  | Bad Request              |
| 500  | Internal Server Error    |

---

## 🔗 Swagger UI

Once the backend is running:

```
http://localhost:8080/api-docs
```

View full documentation in Swagger format.

---

> Need more routes added here later as backend evolves.