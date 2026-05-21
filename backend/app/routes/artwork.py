from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends
)

from sqlalchemy.orm import Session

import cloudinary.uploader

from app.database.db_dependency import get_db
from app.models.artwork import Artwork

import app.utils.cloudinary_config

router = APIRouter(
    prefix="/artworks",
    tags=["Artworks"]
)

@router.post("/upload")
async def upload_artwork(
    title: str = Form(...),
    description: str = Form(...),
    genre: str = Form(...),
    price: float = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    upload_result = cloudinary.uploader.upload(
        file.file
    )

    image_url = upload_result["secure_url"]

    new_artwork = Artwork(
        title=title,
        description=description,
        genre=genre,
        image_url=image_url,
        price=price
    )

    db.add(new_artwork)

    db.commit()

    db.refresh(new_artwork)

    return {
        "message": "Artwork uploaded successfully",
        "image_url": image_url,
        "artwork_id": new_artwork.id
    }

@router.get("/")
def get_artworks(
    db: Session = Depends(get_db)
):
    artworks = db.query(Artwork).all()

    return artworks