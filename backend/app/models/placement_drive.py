from sqlalchemy import Column, Integer, String, Float, Date, Text, ForeignKey
from app.database.database import Base


class PlacementDrive(Base):
    __tablename__ = "placement_drives"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)

    job_role = Column(String(150), nullable=False)
    package = Column(Float, nullable=False)
    minimum_cgpa = Column(Float, nullable=False)
    eligible_department = Column(String(100), nullable=False)
    last_date = Column(Date, nullable=False)
    description = Column(Text)
