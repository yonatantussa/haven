from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import User, Message
from database import db, init_db
from auth import create_token
import os
from dotenv import load_dotenv
import google.generativeai as genai
import traceback

# Load environment variables
load_dotenv()

# Create the Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], "allow_headers": "*"}})


# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///haven.db'  # Uses SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'fallback-secret-key')  # Use environment variable, with a fallback

# Initialize extensions with the app
init_db(app)
jwt = JWTManager(app)

# Create database tables (only for development, will use Flask-Migrate in production)
with app.app_context():
    db.create_all()

# Routes
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_token(user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400
    new_user = User(username=data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200

# Google Gemini API integration
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

# Add this new route
@app.route('/api/chat', methods=['POST'])
@jwt_required()  # This ensures the route is protected
def chat():
    data = request.json
    user_message = data.get('message')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Configure the generative AI model
    genai.configure(api_key=os.environ.get("GOOGLE_AI_API_KEY"))
    model = genai.GenerativeModel('gemini-pro')

    # Generate response
    response = model.generate_content(user_message)

    if response.text:
        return jsonify({"response": response.text})
    else:
        return jsonify({"error": "No response generated"}), 500

"""
@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user_id = get_jwt_identity()  # Get the ID of the current user from JWT
    print(current_user_id)
    users = User.query.filter(User.id != current_user_id).all()  # Exclude the current user
    user_list = [{"id": user.id, "name": user.name, "email": user.email} for user in users]
    
    return jsonify(user_list)
"""

users = [
    {'id': 1, 'username': 'UserOne'},
    {'id': 2, 'username': 'UserTwo'},
    {'id': 3, 'username': 'UserThree'}
]

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)



if __name__ == "__main__":
    app.run(debug=True)