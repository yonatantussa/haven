from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_token(user_id):
    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(identity=user_id, expires_delta=expires)
    return access_token
