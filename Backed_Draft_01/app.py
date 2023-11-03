from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import get_response  

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    #TODO: check if text is valiud
    response = get_response(text)
    message = {"answer": response }
    return jsonify(message)
#     return response

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
