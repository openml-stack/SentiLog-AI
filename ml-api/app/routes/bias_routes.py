from flask import Blueprint, request, jsonify 
import numpy as np
from preprocess import preprocess, vectorize 

bias_routes = Blueprint("bias_routes", __name__)

model =None
tokenizer = None
label_encoder = None

@bias_routes.route("/",methods=["GET"])
def home():
    return jsonify({"message":"Bias Detection is running"})

@bias_routes.route("/predict", methods = ["POST"])
def predict():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error":"Missing 'text' field in request "}), 400
        text = data["text"]
        if not isinstance(text, str) or not text.strip():
            return jsonify({"error":"Input must be a non-empty string"}), 400
        
        cleaned = preprocess(text)
        padded = vectorize(cleaned, tokenizer)
        
        pred = model.predict(padded)[0]
        label = label_encoder.inverse_transform([np.argmax(pred)])[0]
        confidence = float(np.max(pred))
        
        return jsonify({
            "prediction": label,
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": "Prediction failed","details": str(e) }), 500
    