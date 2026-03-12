from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Club, Event

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_bp.route("")
@jwt_required()
def dashboard():
    user = get_jwt_identity()
    return {
        "user": user,
        "total_clubs": Club.query.count(),
        "total_events": Event.query.count()
    }
