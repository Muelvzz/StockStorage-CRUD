from fastapi import FastAPI
from backend import inventory
from backend.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/image", StaticFiles(directory="backend/image"), name="image")

Base.metadata.create_all(bind=engine)

app.include_router(inventory.router)