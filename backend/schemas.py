from pydantic import BaseModel
from typing import List, Optional

# Request Model
class InventoryCreate(BaseModel):
    name: str
    stock: int
    notes: Optional[str] = None


class CategoryInventoryCreate(BaseModel):
    category: str
    inventories: List[InventoryCreate]


# Response Model
class InventoryOut(BaseModel):
    id: int
    category_id: int

    name: str
    stock: int
    notes: Optional[str] = None
    image_url: str

    class Config:
        orm_mode = True


class CategoryInventoryOut(BaseModel):
    id: int
    category: str
    inventories: List[InventoryOut]

    class Config:
        orm_mode = True