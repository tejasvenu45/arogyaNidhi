# decision_engine.py

from data import SCHEMES


def evaluate_user(data):
    income = data.get("income")
    bpl = data.get("bpl")
    condition = data.get("condition")
    age = data.get("age")

    eligible_schemes = []
    documents = set()

    # Rule 1: Ayushman Bharat
    if bpl or income < 20000:
        eligible_schemes.append("Ayushman Bharat")
        documents.update(["Aadhar Card", "BPL Card"])

    # Rule 2: State Scheme
    if income < 50000:
        eligible_schemes.append("State Health Card")
        documents.update(["Aadhar Card", "Income Certificate"])

    # Rule 3: Diabetes Program
    if condition in ["Pre-diabetic", "Diabetic"]:
        eligible_schemes.append("Diabetes Care Program")
        documents.update(["Medical Report", "Aadhar Card"])

    # Rule 4: Senior Citizen
    if age > 60:
        eligible_schemes.append("Senior Citizen Health Scheme")
        documents.update(["Aadhar Card", "Age Proof"])

    return {
        "eligible_schemes": eligible_schemes,
        "documents_required": list(documents)
    }