from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    name = Column(String(100), nullable=False)
    phone = Column(String(20))
    department = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
    cgpa = Column(Float, nullable=False)
    skills = Column(String(500))
    resume = Column(String(255))
