from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Backend API",
    summary="Backend API for the frontend",
    version="0.1.0",
    docs_url="/api/",
)

app.get("/api/greet")


def greet():
    """Returns a greeting"""
    return {"message": "Hello from the backend!"}


app.get("/api/ahref")


def ahref():
    """Returns a greeting"""
    return {"message": "Hello from the backend!"}


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
