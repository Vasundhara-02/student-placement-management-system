from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False
    )

    drive_id = Column(
        Integer,
        ForeignKey("placement_drives.id"),
        nullable=False
    )

    status = Column(
        String(30),
        nullable=False,
        default="APPLIED"
    )

    applied_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
