from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import get_response  

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    text = request.get_json().get("message")
    if request.method == 'OPTIONS':
        # Respond to the OPTIONS request with the necessary CORS headers
        response = app.make_default_options_response()
    else:
        # Extract the user message from the request
        user_message = request.json['message']
        
        # Process the message and obtain a response from your model
        # Replace this with your actual model prediction logic
        response = get_response(text)  # Corrected variable name 'responce' to 'response'
        message = {"answer": response}  # Corrected variable name 'responce' to 'response'
        return jsonify(message)

    # Add the appropriate CORS headers to the response
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return response

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
