from fastapi import APIRouter

router = APIRouter(prefix="/artworks", tags=["Artworks"])

@router.get("/")
def get_artworks():
    return [
        {
            "title": "Fantasy Dream",
            "genre": "Fantasy",
            "price": 200
        }
    ]