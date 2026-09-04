from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models import Company

router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)


@router.post("/")
def create_company(
    name: str,
    description: str = None,
    website: str = None,
    db: Session = Depends(get_db)
):
    company = Company(
        name=name,
        description=description,
        website=website
    )

    db.add(company)
    db.commit()
    db.refresh(company)

    return {
        "message": "Company created successfully",
        "company_id": company.id,
        "name": company.name
    }

@router.get("/")
def get_companies(
    db: Session = Depends(get_db)
):
    companies = db.query(Company).all()

    result = []

    for company in companies:
        result.append({
            "id": company.id,
            "name": company.name,
            "description": company.description,
            "website": company.website
        })

    return result
