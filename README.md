# 🎓 Student Placement Management System

## 📌 Project Overview

The Student Placement Management System is a full-stack web application designed to simplify and manage the college placement process.

The system allows students to view placement opportunities, check eligibility, apply for jobs, and track their application status.

Administrators can manage companies, placement drives, student applications, and application statuses.

---

## 🚀 Features

### Student Features

- Student login
- Student dashboard
- View placement applications
- Track application status
- Apply for eligible placement drives
- Automatic eligibility checking
- Duplicate application prevention
- Logout

### Admin Features

- Admin login
- Admin dashboard
- View dashboard statistics
- View student applications
- View student CGPA and department
- Update application status
- Manage application workflow

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- Axios
- HTML
- CSS
- JavaScript

### Backend

- Python
- FastAPI
- SQLAlchemy
- Uvicorn

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- VS Code
- Linux / WSL

---

## 🏗️ System Architecture

```text
React Frontend
      ↓
     Axios
      ↓
FastAPI Backend
      ↓
   SQLAlchemy
      ↓
 PostgreSQL

🗄️ Database Tables

The application contains five main tables:

users
students
companies
placement_drives
applications
🔄 Application Workflow
Student Workflow
Student Login
      ↓
Student Dashboard
      ↓
View Placement Drives
      ↓
Check Eligibility
      ↓
Apply for Placement
      ↓
Track Application Status
Admin Workflow
Admin Login
      ↓
Admin Dashboard
      ↓
View Applications
      ↓
Update Application Status
      ↓
Student Sees Updated Status
📊 Application Status

The system supports the following application statuses:

APPLIED
SHORTLISTED
INTERVIEW
SELECTED
REJECTED
🔐 Eligibility Checking

Before submitting an application, the backend checks:

Student CGPA
Student department
Placement drive requirements

If the student does not satisfy the requirements, the application is rejected.

The system also prevents a student from applying to the same placement drive more than once.

▶️ How to Run
Backend
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload

Backend:

http://localhost:8000

API Documentation:

http://localhost:8000/docs
Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173
🧪 Testing

The following functionality has been tested successfully:

Student registration
Student login
Admin login
Student dashboard
Admin dashboard
Placement drive retrieval
Application submission
Eligibility checking
Duplicate application prevention
Application status update
PostgreSQL database connectivity
Backend health check
Student application status tracking
Logout
🎯 Project Objective

The main objective of this project is to provide a centralized digital platform for managing student placement activities and reducing manual placement management.

👩‍💻 Project

Student Placement Management System

Built using React, FastAPI, SQLAlchemy and PostgreSQL.
