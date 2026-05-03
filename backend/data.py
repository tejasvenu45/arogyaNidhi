# data.py

QUESTIONS = [
    {
        "id": 1,
        "question": "What is your monthly family income?",
        "type": "number"
    },
    {
        "id": 2,
        "question": "Do you have a BPL card?",
        "type": "boolean"
    },
    {
        "id": 3,
        "question": "Any chronic condition?",
        "type": "choice",
        "options": ["None", "Pre-diabetic", "Diabetic"]
    },
    {
        "id": 4,
        "question": "Occupation?",
        "type": "choice",
        "options": ["Unemployed", "Farmer", "Salaried"]
    },
    {
        "id": 5,
        "question": "Age?",
        "type": "number"
    }
]


SCHEMES = [
    {
        "name": "Ayushman Bharat",
        "criteria": "BPL or income < 20000",
        "documents": ["Aadhar Card", "BPL Card"]
    },
    {
        "name": "State Health Card",
        "criteria": "Income < 50000",
        "documents": ["Aadhar Card", "Income Certificate"]
    },
    {
        "name": "Diabetes Care Program",
        "criteria": "Diabetic or Pre-diabetic",
        "documents": ["Medical Report", "Aadhar Card"]
    },
    {
        "name": "Senior Citizen Health Scheme",
        "criteria": "Age > 60",
        "documents": ["Aadhar Card", "Age Proof"]
    }
]