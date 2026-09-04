from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models import (
    Application,
    Student,
    PlacementDrive,
    Company
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/applications")
def get_all_applications(
    db: Session = Depends(get_db)
):
    applications = db.query(Application).all()

    result = []

    for application in applications:
        student = db.query(Student).filter(
            Student.id == application.student_id
        ).first()

        drive = db.query(PlacementDrive).filter(
            PlacementDrive.id == application.drive_id
        ).first()

        company = None

        if drive:
            company = db.query(Company).filter(
                Company.id == drive.company_id
            ).first()

        result.append({
            "application_id": application.id,
            "student": student.name if student else None,
            "department": student.department if student else None,
            "cgpa": student.cgpa if student else None,
            "company": company.name if company else None,
            "job_role": drive.job_role if drive else None,
            "status": application.status,
            "applied_at": application.applied_at
        })

    return result

@router.put("/applications/{application_id}/status")
def update_application_status(
    application_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    allowed_statuses = [
        "APPLIED",
        "SHORTLISTED",
        "INTERVIEW",
        "SELECTED",
        "REJECTED"
    ]

    status = status.upper()

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid application status"
        )

    application.status = status

    db.commit()
    db.refresh(application)

    return {
        "message": "Application status updated successfully",
        "application_id": application.id,
        "status": application.status
    }

@router.get("/students")
def get_all_students(
    db: Session = Depends(get_db)
):
    students = db.query(Student).all()

    result = []

    for student in students:
        result.append({
            "student_id": student.id,
            "name": student.name,
            "phone": student.phone,
            "department": student.department,
            "year": student.year,
            "cgpa": student.cgpa,
            "skills": student.skills,
            "resume": student.resume
        })

    return result

@router.get("/dashboard")
def get_dashboard_statistics(
    db: Session = Depends(get_db)
):
    total_students = db.query(Student).count()
    total_companies = db.query(Company).count()
    total_drives = db.query(PlacementDrive).count()
    total_applications = db.query(Application).count()

    selected_students = db.query(Application).filter(
        Application.status == "SELECTED"
    ).count()

    active_applications = db.query(Application).filter(
        Application.status.in_([
            "APPLIED",
            "SHORTLISTED",
            "INTERVIEW"
        ])
    ).count()

    return {
        "total_students": total_students,
        "total_companies": total_companies,
        "total_placement_drives": total_drives,
        "total_applications": total_applications,
        "selected_students": selected_students,
        "active_applications": active_applications
    }
