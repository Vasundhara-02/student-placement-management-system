from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.database.database import get_db
from app.models import PlacementDrive, Company

router = APIRouter(
    prefix="/placements",
    tags=["Placement Drives"]
)


@router.post("/")
def create_placement_drive(
    company_id: int,
    job_role: str,
    package: float,
    minimum_cgpa: float,
    eligible_department: str,
    last_date: date,
    description: str = None,
    db: Session = Depends(get_db)
):
    company = db.query(Company).filter(
        Company.id == company_id
    ).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    drive = PlacementDrive(
        company_id=company_id,
        job_role=job_role,
        package=package,
        minimum_cgpa=minimum_cgpa,
        eligible_department=eligible_department,
        last_date=last_date,
        description=description
    )

    db.add(drive)
    db.commit()
    db.refresh(drive)

    return {
        "message": "Placement drive created successfully",
        "drive_id": drive.id,
        "company_id": company.id,
        "company": company.name,
        "job_role": drive.job_role
    }
