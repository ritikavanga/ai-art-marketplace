from jose import jwt, JWTError
from fastapi import HTTPException

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

def verify_token(token: str):
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )