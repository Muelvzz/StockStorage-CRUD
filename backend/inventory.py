from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session, selectinload
import shutil, uuid, json, os

from .database import get_db
from backend import models
from .schemas import InventoryCreate, InventoryOut, CategoryInventoryOut, CategoryInventoryCreate

from typing import List

router = APIRouter(
    prefix="/inventory",
    tags=["StockStorage"]
)

UPLOAD_FOLDER = "backend/image" # directory of the image folder
os.makedirs(UPLOAD_FOLDER, exist_ok=True) # Creates the folder if it didn't exist

@router.post("/create", response_model=CategoryInventoryOut)
async def create_category_and_inventory(
    inventories_json: str = Form(...), # A seperate entry point for the inputs that is name, stock, and notes
    images: List[UploadFile] = File(...), # A seperate entry point for the inventories images
    db: Session = Depends(get_db)
):
    
    inventories_dict = json.loads(inventories_json) # Converts the input from JSON into python dict
    inventories = CategoryInventoryCreate(**inventories_dict) # Checks if the inventories_dict is correct acc. to the CategoryInventoryCreate schema

    try:

        # This saves the category
        db_category = models.Category(category=inventories.category)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)

        # This loops through the inventories and the file lists
        for index, inv in enumerate(inventories.inventories):

            image_file = images[index]
            ext = image_file.filename.split(".")[-1]
            filename = f"{uuid.uuid4()}.{ext}"
            file_path = os.path.join(UPLOAD_FOLDER, filename)

            # Creates a copy of the file and place it into the "image" folder
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image_file.file, buffer)

            # This adds all the input in the inventories dict one by one into the database
            db_item = models.Inventories(
                category_id=db_category.id,
                name=inv.name,
                stock=inv.stock,
                notes=inv.notes,
                image_url=file_path
            )

            db.add(db_item)
        
        db.commit()
        db.refresh(db_category)

        print("Data added successfully")

        # This creates a format which will be returned if successful
        return CategoryInventoryOut(
            id=db_category.id,
            category=db_category.category,
            inventories=[
                InventoryOut(
                    id=inv.id,
                    category_id=inv.category_id,
                    name=inv.name,
                    stock=inv.stock,
                    notes=inv.notes,
                    image_url=inv.image_url
                )
                for inv in db_category.items
            ]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))