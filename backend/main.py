from fastapi import FastAPI
from app.database.database import engine, Base

from app.models.user import User
from app.models.artwork import Artwork

from app.routes import auth, artwork

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(artwork.router)

@app.get("/")
def home():
    return {
        "message": "AI Art Marketplace Backend Running"
    }