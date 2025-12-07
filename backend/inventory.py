from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from backend import models
from .schemas import InventoryCreate, InventoryOut, CategoryInventoryOut, CategoryInventoryCreate

from typing import List

router = APIRouter(
    prefix="/inventory",
    tags=["StockStorage"]
)

@router.post("/create", response_model=CategoryInventoryOut)
def create_category_and_inventory(inventories: CategoryInventoryCreate, db: Session = Depends(get_db)):

    try:
        db_data = models.Category(category=inventories.category)
        db.add(db_data)
        db.commit()
        db.refresh(db_data)

        for inventory in inventories.inventories:
            db_item = models.Inventories(
                category_id=db_data.id,

                name=inventory.name,
                stock=inventory.stock,
                notes=inventory.notes
            )
            db.add(db_item)
        
        db.commit()
        db.refresh(db_data)

        print("Data added successfully")

        return db_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))