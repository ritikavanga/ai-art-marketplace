from pydantic import BaseModel

class ArtworkResponse(BaseModel):
    id: int
    title: str
    description: str
    genre: str
    image_url: str
    price: float

    class Config:
        from_attributes = True