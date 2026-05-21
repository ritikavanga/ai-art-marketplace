from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

import cloudinary.uploader

from app.database.db_dependency import get_db

from app.models.artwork import Artwork

from app.utils.auth_dependency import (
    get_current_user
)

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
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    print("CURRENT USER:", current_user)

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
        "uploaded_by": current_user["email"]
    }

@router.get("/")
def get_artworks(
    db: Session = Depends(get_db)
):
    artworks = db.query(Artwork).all()

    return artworks