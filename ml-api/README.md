# SentiLog ML API

A Flask-based REST API for sentiment analysis using VADER (Valence Aware Dictionary and sEntiment Reasoner).

## Features

- **Sentiment Analysis**: Analyze text sentiment using VADER
- **RESTful API**: Clean REST endpoints for easy integration
- **CORS Support**: Cross-origin resource sharing enabled
- **Production Ready**: Configurable for different environments
- **Lightweight**: Minimal dependencies, fast deployment

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ml-api/predict` | POST | Main sentiment analysis endpoint |
| `/ml-api/vader/analyze` | POST | VADER sentiment analysis endpoint |

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ml-api
```

2. **Create virtual environment**
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set environment variables**
```bash
# Create .env file
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DEBUG=True
HOST=0.0.0.0
PORT=5001
CORS_ORIGINS=*
```

5. **Run the application**
```bash
python run.py
```

The API will be available at `http://localhost:5001`

## Usage

### Sentiment Analysis

**Endpoint**: `POST /ml-api/predict`

**Request**:
```json
{
  "text": "I love this product!"
}
```

**Response**:
```json
{
  "sentiment": "Positive",
  "text_length": 20
}
```

### VADER Analysis

**Endpoint**: `POST /ml-api/vader/analyze`

**Request**:
```json
{
  "text": "This is amazing!"
}
```

**Response**:
```json
{
  "sentiment": "Positive"
}
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `FLASK_ENV` | `development` | Flask environment (development/production/testing) |
| `SECRET_KEY` | `dev-secret-key-change-in-production` | Flask secret key |
| `DEBUG` | `True` | Debug mode (True/False) |
| `HOST` | `0.0.0.0` | Server host |
| `PORT` | `5001` | Server port |
| `CORS_ORIGINS` | `*` | CORS allowed origins |

## Project Structure

```
ml-api/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── config.py            # Configuration classes
│   ├── routes/
│   │   └── routes.py        # API routes
│   └── services/
│       └── vader_service.py # VADER sentiment service
├── run.py                   # Application entry point
├── requirements.txt         # Python dependencies
├── Procfile                # Heroku deployment
└── README.md               # This file
```

## Development

### Running in Development Mode

```bash
export FLASK_ENV=development
export DEBUG=True
python run.py
```

### Running Tests

```bash
# Add test files and run
python -m pytest
```

## Deployment

### Using Gunicorn

```bash
gunicorn run:app -b 0.0.0.0:5001 --workers 4
```

### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["gunicorn", "run:app", "-b", "0.0.0.0:5001", "--workers", "4"]
```

### Using Heroku

1. The `Procfile` is already included
2. Deploy using Heroku CLI or GitHub integration

## API Documentation

### Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message"
}
```

**Status Codes**:
- `200` - Success
- `400` - Bad Request (missing or invalid data)
- `500` - Internal Server Error

### Request Format

All POST requests should include:
- `Content-Type: application/json` header
- JSON body with `text` field

### Response Format

Successful responses include:
- Sentiment analysis results
- Text length (for `/predict` endpoint)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository. 