from sqlalchemy import Column, String, Text, DateTime, Float, Integer
from .database import Base  

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    content = Column(Text)
    url = Column(String)
    source = Column(String)
    publishedAt = Column(DateTime)
    sentiment = Column(Float)  
    toxicity = Column(Float)   
