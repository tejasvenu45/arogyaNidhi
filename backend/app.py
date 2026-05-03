from flask import Flask, request, jsonify
from flask_cors import CORS
from data import QUESTIONS, SCHEMES
from decision_engine import evaluate_user

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Arogya Nidhi Backend Running"}

# 1. Get Questions
@app.route("/questions", methods=["GET"])
def get_questions():
    return jsonify({
        "questions": QUESTIONS
    })

# 2. Evaluate Eligibility
@app.route("/evaluate", methods=["POST"])
def evaluate():
    data = request.json

    """
    Expected JSON:
    {
        "income": 15000,
        "bpl": true,
        "condition": "Diabetic",
        "occupation": "Farmer",
        "age": 65
    }
    """

    result = evaluate_user(data)

    return jsonify({
        "status": "success",
        "data": result
    })


# 3. Get All Schemes
@app.route("/schemes", methods=["GET"])
def get_schemes():
    return jsonify({
        "schemes": SCHEMES
    })


if __name__ == "__main__":
    app.run(debug=True)