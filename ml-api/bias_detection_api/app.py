from flask import Flask
from tensorflow.keras.models import load_model
import pickle
import routes

app = Flask(__name__)

model = load_model("notebook/bias_detection/bias_model.h5")
with open("notebook/bias_detection/tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)
with open("notebook/bias_detection/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)
    
routes.model = model 
routes.tokenizer = tokenizer
routes.label_encoder = label_encoder

app.register_blueprint(routes.bias_routes)

if __name__ == "__main__":
    app.run(debug=True)