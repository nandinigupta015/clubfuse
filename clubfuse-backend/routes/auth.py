from flask import Blueprint, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from email_validator import validate_email, EmailNotValidError
from models import User
from extensions import db

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if len(data["password"]) < 6:
        return {"error": "Password must be at least 6 characters"}, 400

    try:
        validate_email(data["email"])
    except EmailNotValidError:
        return {"error": "Invalid email"}, 400

    if User.query.filter_by(email=data["email"]).first():
        return {"error": "Email already exists"}, 400

    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(data["password"])
    )
    db.session.add(user)
    db.session.commit()
    return {"message": "User registered successfully"}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password, data["password"]):
        return {"error": "Invalid credentials"}, 401

    token = create_access_token(identity={
        "id": user.id,
        "role": user.role
    })
    return {"access_token": token}
