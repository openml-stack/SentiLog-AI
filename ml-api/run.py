import os
from app import create_app

# Create the Flask app from your existing factory
app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    debug = os.environ.get('FLASK_ENV') == 'development'

    print(f"🚀 Starting SentiLog ML API on {host}:{port} — debug={debug}")
    app.run(host=host, port=port, debug=debug)
