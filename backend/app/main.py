from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models import (
    User,
    Student,
    Company,
    PlacementDrive,
    Application
)

from app.api.student import router as student_router
from app.api.auth import router as auth_router
from app.api.company import router as company_router
from app.api.placement import router as placement_router
from app.api.application import router as application_router
from app.api.drives import router as drives_router
from app.api.admin import router as admin_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Placement Management System",
    description="Full-stack student placement management application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
allow_origins=[
    "http://localhost:5173",
    "https://student-placement-frontend-05n8.onrender.com",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)
app.include_router(auth_router)
app.include_router(company_router)
app.include_router(placement_router)
app.include_router(application_router)
app.include_router(drives_router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {
        "message": "Student Placement Management System API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
