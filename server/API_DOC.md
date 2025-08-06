# 📘 SentiLog-AI API Documentation

This file contains REST API documentation for both the **Express Server** (Node.js) and the **ML API** (Flask).

---

## 🌐 Server API

### 📌 POST `/api/news/analyze`

**Description:** Analyze the sentiment and political bias of a news article.

**Request Body:**
```json
{
  "title": "News headline",
  "content": "Full news article content"
}
```

**Response:**
```json
{
  "bias": "Left",
  "sentiment": "Negative"
}
```

---

### 📌 POST `/api/journal/analyze`

**Description:** Analyze the emotional tone of a journal entry.

**Request Body:**
```json
{
  "entry": "I felt anxious after reading today's headlines."
}
```

**Response:**
```json
{
  "emotion": "Anxious",
  "score": -0.6
}
```

---

### 📌 GET `/api/news`

**Description:** Fetch all stored news articles.

**Response:**
```json
[
  {
    "title": "Market is booming",
    "sentiment": "Positive",
    "source": "Reuters"
  }
]
```

---

### 📌 POST `/api/journal`

**Description:** Save a new journal entry.

**Request Body:**
```json
{
  "text": "I had a productive day."
}
```

**Response:**
```json
{
  "sentiment": "Positive"
}
```

---

### 📌 POST `/api/contact`

**Description:** Submit a contact message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I love your project!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact message sent successfully."
}
```

---

## 🧠 ML API

### 📌 POST `/predict`

**Description:** Analyze custom text using ML model and return sentiment + emotion.

**Request Body:**
```json
{
  "text": "I am feeling hopeful today!"
}
```

**Response:**
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
| 404  | Not Found                |
| 500  | Internal Server Error    |

---

## 🔗 Swagger UI

Access Swagger docs after starting server:

```
http://localhost:8080/api-docs
```

---

> This document will grow as new endpoints are added.
