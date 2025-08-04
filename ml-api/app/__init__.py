from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()
def create_app():
    """Simple Flask app factory without config classes"""
    app = Flask(__name__)

    # Set config directly
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    cors_origins = os.environ.get('CORS_ORIGINS', '*').split(',')

    # Initialize CORS
    CORS(app, resources={r"/*": {"origins": cors_origins}})

    # Register blueprints
    from app.routes import routes
    app.register_blueprint(routes.bp)

    return app