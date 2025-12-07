from sqlalchemy import Column, String, ForeignKey, Numeric, Integer
from sqlalchemy.orm import relationship
from .database import Base

class Category(Base):
    __tablename__ = "Category"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False, unique=True)

    items = relationship("Inventories", back_populates="category", cascade="all, delete")


class Inventories(Base):
    __tablename__ = "Inventory"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("Category.id"))

    name = Column(String, nullable=False)
    stock = Column(Integer, nullable=False)
    notes = Column(String, nullable=True)

    category = relationship("Category", back_populates="items")