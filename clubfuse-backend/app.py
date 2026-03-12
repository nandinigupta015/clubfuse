from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ================= DB CONNECTION =================

def get_connection():
    # Use DATABASE_URL for Production (Supabase)
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        return psycopg2.connect(db_url)
    
    # Fallback to individual vars
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME", "postgres"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "postgres"),
        port=os.getenv("DB_PORT", "5432")
    )

@app.route("/api/departments")
def get_departments():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT dept_id, dept_name
        FROM Department
        ORDER BY dept_name
    """)

    rows = cursor.fetchall()
    conn.close()

    return jsonify([
        {
            "dept_id": row[0],
            "dept_name": row[1]
        }
        for row in rows
    ])
 

# ================= HEALTH CHECK =================

@app.route("/")
def home():
    return jsonify({"status": "Backend running"})

# ================= CLUB LIST =================

@app.route("/api/clubs")
def get_clubs():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT club_id, name FROM Clubs")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"club_id": r[0], "name": r[1]} for r in rows])

# ================= SIGNUP =================
# Supports: Student (1), Teacher (3), Coordinator (2)

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Student & Teacher stored in SAME table
        cursor.execute("""
            INSERT INTO Student (student_id, name, email, dept, phone_no)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            data["student_id"],
            data["name"],
            data["email"],
            data["dept"],
            data["phone"]
        ))

        cursor.execute("""
            INSERT INTO Auth (student_id, password, role_id)
            VALUES (%s, %s, %s)
        """, (
            data["student_id"],
            data["password"],
            data["role_id"]  # 1 = student, 2 = coordinator, 3 = teacher
        ))

        # Only coordinators added to ClubMembers
        if data["role_id"] == 2:
            cursor.execute("""
                INSERT INTO ClubMembers (club_id, student_id, role_id, membership_status)
                VALUES (%s, %s, 2, 'active')
            """, (
                data["club_id"],
                data["student_id"]
            ))

        conn.commit()
        conn.close()
        return jsonify({"status": "success"})

    except Exception as e:
        err = str(e)
        # Friendly messages for duplicate key violations
        if "23000" in err or "UNIQUE KEY" in err or "duplicate key" in err.lower():
            if "UQ_Student" in err or "student_id" in err.lower():
                return jsonify({"error": "This Student ID is already registered. Please login instead."}), 400
            if "email" in err.lower():
                return jsonify({"error": "This email is already registered. Please login instead."}), 400
            return jsonify({"error": "Account already exists. Please login instead."}), 400
        return jsonify({"error": "Signup failed. Please try again."}), 500


# ================= LOGIN =================
# Teacher logs in EXACTLY like student

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT 
                s.student_id,
                s.name,
                a.role_id,
                r.role_name
            FROM Student s
            JOIN Auth a ON s.student_id = a.student_id
            JOIN Role r ON a.role_id = r.role_id
            WHERE s.email = %s AND a.password = %s
        """, (data["email"], data["password"]))

        row = cursor.fetchone()
        conn.close()

        if row:
            return jsonify({
                "status": "success",
                "student_id": row[0],
                "name": row[1],
                "role_id": row[2],     # 1, 2, or 3
                "role_name": row[3]
            })

        return jsonify({"status": "failed"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================= STUDENT / TEACHER DASHBOARD =================
# Teacher automatically uses this route

@app.route("/api/dashboard/student/<student_id>")
def student_dashboard(student_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                c.club_id,
                c.name AS club_name,
                c.category AS club_category,
                e.title AS event_title,
                e.date AS event_date
            FROM Events e
            JOIN Clubs c ON e.club_id = c.club_id
            ORDER BY e.date DESC
            LIMIT 3
        """)

        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        conn.close()

        return jsonify([dict(zip(columns, row)) for row in rows])

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================= COORDINATOR DASHBOARD =================

@app.route("/api/dashboard/coordinator/<student_id>")
def coordinator_dashboard(student_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM Coordinator_Dashboard_Data
        WHERE student_id = %s
    """, student_id)

    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    conn.close()
    return jsonify([dict(zip(columns, row)) for row in rows])

# ================= CREATE EVENT (ONLY COORDINATOR) =================

@app.route("/api/create-event", methods=["POST"])
def create_event():
    data = request.json
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT 1
            FROM ClubMembers
            WHERE student_id = %s AND club_id = %s AND role_id = 2
        """, (
            data["student_id"],
            data["club_id"]
        ))

        if not cursor.fetchone():
            return jsonify({"error": "Not authorized"}), 403

        cursor.execute("""
            INSERT INTO Events (club_id, title, date, venue, description, type)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            data["club_id"],
            data["title"],
            data["date"],
            data["venue"],
            data["description"],
            data.get("type", "technical")
        ))

        # Notify all followers of this club about the new event
        cursor.execute("""
            SELECT student_id FROM ClubFollowers WHERE club_id = %s
        """, (data["club_id"],))
        follower_ids = [row[0] for row in cursor.fetchall()]
        club_name_row = cursor.execute("SELECT name FROM Clubs WHERE club_id=%s", (data["club_id"],)).fetchone()
        club_name = club_name_row[0] if club_name_row else "Your Club"
        for fid in follower_ids:
            _insert_notification(cursor, fid,
                f"New event '{data['title']}' has been created by {club_name}!")

        conn.commit()
        conn.close()
        return jsonify({"status": "success"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    student_id = request.args.get("student_id")

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Fetch event + club info BEFORE deleting so we can notify
        cursor.execute("""
            SELECT e.title, e.club_id, c.name
            FROM Events e
            JOIN Clubs c ON e.club_id = c.club_id
            WHERE e.event_id = %s
        """, (event_id,))
        meta = cursor.fetchone()

        cursor.execute("""
            DELETE e
            FROM Events e
            JOIN ClubMembers cm ON e.club_id = cm.club_id
            WHERE e.event_id = %s AND cm.student_id = %s AND cm.role_id = 2
        """, (event_id, student_id))

        if cursor.rowcount == 0:
            conn.close()
            return jsonify({"error": "Not authorized"}), 403

        # Notify all followers about cancellation
        if meta:
            event_title, club_id, club_name = meta
            cursor.execute("""
                SELECT student_id FROM ClubFollowers WHERE club_id = %s
            """, (club_id,))
            follower_ids = [row[0] for row in cursor.fetchall()]
            for fid in follower_ids:
                _insert_notification(cursor, fid,
                    f"Event '{event_title}' by {club_name} has been cancelled.")

        conn.commit()
        conn.close()
        return jsonify({"status": "event_deleted"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================= EVENTS =================
# Teacher uses STUDENT route automatically

@app.route("/api/events/student/<student_id>")
def get_events_for_student(student_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            e.event_id,
            e.title,
            e.date,
            e.venue,
            e.description,
            c.name AS club_name
        FROM Events e
        JOIN Clubs c ON e.club_id = c.club_id
        ORDER BY e.date
    """)

    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    conn.close()
    return jsonify([dict(zip(columns, row)) for row in rows])

@app.route("/api/events/coordinator/<student_id>")
def get_events_for_coordinator(student_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            e.event_id,
            e.title,
            e.date,
            e.venue,
            e.description,
            c.name AS club_name
        FROM Events e
        JOIN Clubs c ON e.club_id = c.club_id
        JOIN ClubMembers cm ON c.club_id = cm.club_id
        WHERE cm.student_id = %s AND cm.role_id = 2
        ORDER BY e.date
    """, (student_id,))

    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    conn.close()
    return jsonify([dict(zip(columns, row)) for row in rows])

# ================= EVENT REGISTRATION =================
# Teacher allowed (same as student)

@app.route("/api/event-register", methods=["POST"])
def event_register():
    data = request.json

    if not data.get("student_id"):
        return jsonify({"error": "Unauthorized"}), 401

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT 1 FROM Student WHERE student_id = %s",
            (data["student_id"],)
        )

        if not cursor.fetchone():
            conn.close()
            return jsonify({"error": "Invalid user"}), 401

        cursor.execute("""
            SELECT 1 FROM Registrations
            WHERE student_id = %s AND event_id = %s
        """, (
            data["student_id"],
            data["event_id"]
        ))

        if cursor.fetchone():
            conn.close()
            return jsonify({"error": "Already registered"}), 400

        cursor.execute("""
            INSERT INTO Registrations (student_id, event_id, date)
            VALUES (%s, %s, CURRENT_TIMESTAMP)
        """, (
            data["student_id"],
            data["event_id"]
        ))

        conn.commit()
        conn.close()

        return jsonify({"status": "registered"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= CLUB FOLLOW / UNFOLLOW =================

def _insert_notification(cursor, student_id, message):
    """Helper: insert one notification row for a student."""
    cursor.execute("""
        INSERT INTO Notifications (student_id, message, read_status, sent_time)
        VALUES (%s, %s, 'unread', CURRENT_TIMESTAMP)
    """, (student_id, message))

@app.route("/api/clubs/follow", methods=["POST"])
def follow_club():
    data = request.json
    student_id = data.get("student_id")
    club_id    = data.get("club_id")
    club_name  = data.get("club_name", "a club")

    if not student_id or not club_id:
        return jsonify({"error": "Missing student_id or club_id"}), 400

    try:
        conn   = get_connection()
        cursor = conn.cursor()

        # Upsert: ignore if already following
        cursor.execute("""
            INSERT INTO ClubFollowers (club_id, student_id)
            VALUES (%s, %s)
            ON CONFLICT DO NOTHING
        """, (club_id, student_id))

        # Notify the follower themselves
        _insert_notification(cursor, student_id,
            f"You are now following {club_name}!")

        conn.commit()
        conn.close()
        return jsonify({"status": "following"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/clubs/unfollow", methods=["POST"])
def unfollow_club():
    data       = request.json
    student_id = data.get("student_id")
    club_id    = data.get("club_id")

    if not student_id or not club_id:
        return jsonify({"error": "Missing student_id or club_id"}), 400

    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            DELETE FROM ClubFollowers WHERE club_id=%s AND student_id=%s
        """, (club_id, student_id))
        conn.commit()
        conn.close()
        return jsonify({"status": "unfollowed"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/clubs/following/<student_id>")
def get_following(student_id):
    """Return list of club_ids the student follows."""
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT club_id FROM ClubFollowers WHERE student_id=%s
        """, (student_id,))
        ids = [row[0] for row in cursor.fetchall()]
        conn.close()
        return jsonify(ids)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= NOTIFICATIONS =================

@app.route("/api/notifications/<student_id>")
def get_notifications(student_id):
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, message, read_status, sent_time
            FROM Notifications
            WHERE student_id = %s
            ORDER BY sent_time DESC
        """, (student_id,))
        rows    = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        conn.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/notifications/<int:notif_id>/read", methods=["PUT"])
def mark_notification_read(notif_id):
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE Notifications SET read_status='read' WHERE id=%s
        """, (notif_id,))
        conn.commit()
        conn.close()
        return jsonify({"status": "read"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/notifications/read-all/<student_id>", methods=["PUT"])
def mark_all_read(student_id):
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE Notifications SET read_status='read'
            WHERE student_id=%s AND read_status='unread'
        """, (student_id,))
        conn.commit()
        conn.close()
        return jsonify({"status": "all_read"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= MAIN =================

if __name__ == "__main__":
    app.run(debug=True)
