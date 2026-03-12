class Config:
    SECRET_KEY = "clubfuse-secret-key"
    JWT_SECRET_KEY = "clubfuse-jwt-secret"
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
