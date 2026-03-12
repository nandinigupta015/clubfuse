from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Club
from extensions import db

clubs_bp = Blueprint("clubs", __name__, url_prefix="/clubs")

@clubs_bp.route("", methods=["GET"])
def get_clubs():
    return [
        {"id": c.id, "name": c.name, "description": c.description}
        for c in Club.query.all()
    ]

@clubs_bp.route("", methods=["POST"])
@jwt_required()
def create_club():
    user = get_jwt_identity()
    if user["role"] != "admin":
        return {"error": "Unauthorized"}, 403

    data = request.json
    club = Club(name=data["name"], description=data["description"])
    db.session.add(club)
    db.session.commit()
    return {"message": "Club created"}
