from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models import User, Student

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/register")
def register_student(
    name: str,
    email: str,
    password: str,
    department: str,
    year: int,
    cgpa: float,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = User(
        name=name,
        email=email,
        password_hash=password,
        role="STUDENT"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    student = Student(
        user_id=user.id,
        name=name,
        department=department,
        year=year,
        cgpa=cgpa
    )

    db.add(student)
    db.commit()
    db.refresh(student)

    return {
        "message": "Student registered successfully",
        "student_id": student.id,
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }


@router.put("/{student_id}")
def update_student_profile(
    student_id: int,
    phone: str = None,
    skills: str = None,
    resume: str = None,
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

    if phone is not None:
        student.phone = phone

    if skills is not None:
        student.skills = skills

    if resume is not None:
        student.resume = resume

    db.commit()
    db.refresh(student)

    return {
        "message": "Student profile updated successfully",
        "student_id": student.id,
        "phone": student.phone,
        "skills": student.skills,
        "resume": student.resume
    }


@router.get("/{student_id}")
def get_student_profile(
    student_id: int,
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

    return {
        "student_id": student.id,
        "name": student.name,
        "phone": student.phone,
        "department": student.department,
        "year": student.year,
        "cgpa": student.cgpa,
        "skills": student.skills,
        "resume": student.resume
    }
