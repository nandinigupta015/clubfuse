from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models import Event
from extensions import db

events_bp = Blueprint("events", __name__, url_prefix="/events")

@events_bp.route("/<int:club_id>")
def get_events(club_id):
    return [
        {"id": e.id, "title": e.title, "date": e.date}
        for e in Event.query.filter_by(club_id=club_id)
    ]

@events_bp.route("", methods=["POST"])
@jwt_required()
def create_event():
    data = request.json
    event = Event(
        title=data["title"],
        date=data["date"],
        club_id=data["club_id"]
    )
    db.session.add(event)
    db.session.commit()
    return {"message": "Event created"}
