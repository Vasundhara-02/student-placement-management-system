from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models import Student, PlacementDrive, Application

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


@router.post("/")
def apply_for_placement(
    student_id: int,
    drive_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    drive = db.query(PlacementDrive).filter(
        PlacementDrive.id == drive_id
    ).first()

    if not drive:
        raise HTTPException(
            status_code=404,
            detail="Placement drive not found"
        )

    if student.cgpa < drive.minimum_cgpa:
        raise HTTPException(
            status_code=400,
            detail="Student is not eligible: CGPA requirement not met"
        )

    if student.department.lower() != drive.eligible_department.lower():
        raise HTTPException(
            status_code=400,
            detail="Student is not eligible: department requirement not met"
        )

    existing_application = db.query(Application).filter(
        Application.student_id == student_id,
        Application.drive_id == drive_id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="Student has already applied for this placement drive"
        )

    application = Application(
        student_id=student_id,
        drive_id=drive_id,
        status="APPLIED"
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "message": "Application submitted successfully",
        "application_id": application.id,
        "student_id": student.id,
        "drive_id": drive.id,
        "status": application.status
    }

@router.get("/student/{student_id}")
def get_student_applications(
    student_id: int,
    db: Session = Depends(get_db)
):
    applications = db.query(Application).filter(
        Application.student_id == student_id
    ).all()

    result = []

    for application in applications:
        drive = db.query(PlacementDrive).filter(
            PlacementDrive.id == application.drive_id
        ).first()

        result.append({
            "application_id": application.id,
            "drive_id": application.drive_id,
            "job_role": drive.job_role if drive else None,
            "status": application.status,
            "applied_at": application.applied_at
        })

    return result
