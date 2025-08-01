import os
from app import create_app

# Create Flask app instance
app = create_app()

if __name__ == '__main__':
    # Get port from environment variable or default to 5001
    port = os.environ.get('PORT')
    
    # Get host from environment variable or default to localhost
    host = os.environ.get('HOST', '0.0.0.0')
    
    # Get debug mode from environment variable
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"Starting sentiment analysis API on {host}:{port}")
    print(f"Debug mode: {debug}")
    
    app.run(
        host=host,
        port=port,
        debug=debug
    ) 