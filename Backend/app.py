from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import get_response  # Import the function for generating responses from chat.py

app = Flask(__name__)  # Createing a Flask web application 
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins

@app.post("/predict")  # Defining a route for handling POST requests to "/predict"
def predict():
    text = request.get_json().get("message")  # Get the "message" from the request's JSON data
    response = get_response(text)  # Get a response using the 'get_response' function from chat.py
    message = {"answer": response }  # Createing a dictionary with the response
    return jsonify(message)  # Returning the response as a JSON object

# Run the Flask app if this script is the main entry point in debug mode 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
