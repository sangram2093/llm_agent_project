from flask import Flask, request, jsonify
from agent.chat_agent import GeminiAgent
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
agent = GeminiAgent()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        response = agent.get_response(prompt)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
