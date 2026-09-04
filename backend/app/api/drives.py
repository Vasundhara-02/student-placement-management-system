from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models import PlacementDrive, Company

router = APIRouter(
    prefix="/drives",
    tags=["Placement Drives"]
)


@router.get("/")
def get_placement_drives(
    db: Session = Depends(get_db)
):
    drives = db.query(PlacementDrive).all()

    result = []

    for drive in drives:
        company = db.query(Company).filter(
            Company.id == drive.company_id
        ).first()

        result.append({
            "id": drive.id,
            "company": company.name if company else None,
            "job_role": drive.job_role,
            "package": drive.package,
            "minimum_cgpa": drive.minimum_cgpa,
            "eligible_department": drive.eligible_department,
            "last_date": drive.last_date,
            "description": drive.description
        })

    return result
