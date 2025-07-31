from flask import Flask
from flask_cors import CORS
import os

def create_app(config_name=None):
    """Application factory pattern for Flask app"""
    
    # Create Flask app instance
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    if config_name == 'production':
        app.config.from_object('app.config.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('app.config.TestingConfig')
    else:
        app.config.from_object('app.config.DevelopmentConfig')
    
    # Initialize CORS
    CORS(app, resources={r"/*": {"origins": app.config.get('CORS_ORIGINS', '*')}})
    
    # Register blueprints
    from app.routes import routes
    app.register_blueprint(routes.bp)
    
    return app 