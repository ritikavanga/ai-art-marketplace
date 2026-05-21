from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base

class Artwork(Base):
    __tablename__ = "artworks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    genre = Column(String)
    image_url = Column(String)
    price = Column(Float)