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
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/artworks",
    tags=["Artworks"]
)

# -------------------------
# UPLOAD (PROTECTED)
# -------------------------
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
    upload_result = cloudinary.uploader.upload(file.file)

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
        "message": "Artwork uploaded",
        "id": new_artwork.id,
        "user": current_user
    }


# -------------------------
# GET ALL ARTWORKS
# -------------------------
@router.get("/")
def get_artworks(db: Session = Depends(get_db)):
    return db.query(Artwork).all()


# -------------------------
# DELETE (PROTECTED)
# -------------------------
@router.delete("/{artwork_id}")
def delete_artwork(
    artwork_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    artwork = db.query(Artwork).filter(
        Artwork.id == artwork_id
    ).first()

    if not artwork:
        return {"message": "Artwork not found"}

    db.delete(artwork)
    db.commit()

    return {"message": "Artwork deleted"}