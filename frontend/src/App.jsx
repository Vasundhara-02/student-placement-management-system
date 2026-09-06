import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Login from "./Login";
import Register from "./Register";
import api from "./api";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";


function Home({ drives }) {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <div className="logo-icon">🎓</div>
          PlacementHub
        </div>

        <div className="nav-links">

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Home
          </button>

          <button onClick={() => scrollTo("drives")}>
            Opportunities
          </button>

          <button onClick={() => scrollTo("about")}>
            About
          </button>

        </div>

        <div className="nav-actions">

          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>

      </nav>


      {/* HERO */}
      <section className="hero" id="home">

        <div>

          <div className="hero-badge">
            🎯 Your Career Starts Here
          </div>

          <h1>
            Build Your Career.
            <br />
            <span>Find Your Opportunity.</span>
          </h1>

          <p>
            PlacementHub connects students with the right
            placement opportunities. Discover companies,
            check your eligibility, apply for jobs, and track
            your placement journey in one place.
          </p>

          <div className="hero-actions">

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started →
            </button>

            <button
              className="secondary-btn"
              onClick={() => scrollTo("drives")}
            >
              Explore Opportunities
            </button>

          </div>

        </div>


        <div>

          <img
            src="/src/assets/hero.png"
            alt="Students preparing for career opportunities"
            className="hero-image"
          />

        </div>

      </section>


      {/* STATS */}
      <section className="section">

        <div className="stats">

          <div className="stat-card">
            <h3>500+</h3>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <h3>50+</h3>
            <p>Companies</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Opportunities</p>
          </div>

          <div className="stat-card">
            <h3>85%</h3>
            <p>Placement Success</p>
          </div>

        </div>

      </section>


      {/* PLACEMENT OPPORTUNITIES */}
      <section
        className="section"
        id="drives"
      >

        <div className="section-header">

          <h2>Latest Opportunities</h2>

          <p>
            Explore placement opportunities from leading
            companies and take the next step toward your career.
          </p>

        </div>


        {drives.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              💼
            </div>

            <h3>
              No opportunities available right now
            </h3>

            <p>
              New placement drives will appear here when
              they are published by the placement administrator.
            </p>

          </div>

        ) : (

          <div className="drive-grid">

            {drives.map((drive) => (

              <div
                className="drive-card"
                key={drive.id}
              >

                <div className="drive-card-header">

                  <div className="company-logo">
                    {drive.company
                      ?.charAt(0)
                      ?.toUpperCase() || "C"}
                  </div>

                  <span className="drive-status">
                    ● OPEN
                  </span>

                </div>


                <h3>
                  {drive.job_role}
                </h3>


                <p className="drive-company">
                  {drive.company}
                </p>


                <div className="drive-info">

                  <span>
                    💰 ₹{drive.package} LPA
                  </span>

                  <span>
                    🎓 CGPA {drive.minimum_cgpa}+
                  </span>

                  <span>
                    📚 {drive.eligible_department}
                  </span>

                </div>


                <div className="drive-deadline">

                  <span>
                    Application deadline
                  </span>

                  <strong>
                    {drive.last_date}
                  </strong>

                </div>


                <p className="drive-description">
                  {drive.description}
                </p>


                <button
                  className="primary-btn"
                  onClick={() => navigate("/login")}
                >
                  Login to Apply →
                </button>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ABOUT */}
      <section
        className="section about-section"
        id="about"
      >

        <div className="section-header">

          <h2>
            Everything You Need for Your Placement Journey
          </h2>

          <p>
            PlacementHub simplifies the complete placement
            process for students and administrators.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🔎
            </div>

            <h3>
              Discover Opportunities
            </h3>

            <p>
              Find placement drives that match your
              department and academic eligibility.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Check Eligibility
            </h3>

            <p>
              Automatically verify CGPA and department
              requirements before applying.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Track Applications
            </h3>

            <p>
              Follow your application from Applied to
              Shortlisted, Interview, and Selected.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div>

          <h2>
            Ready to Start Your Career Journey?
          </h2>

          <p>
            Create your student profile and discover
            your next opportunity.
          </p>

        </div>


        <button
          className="primary-btn"
          onClick={() => navigate("/register")}
        >
          Register Now →
        </button>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-content">

          <div>

            <div className="logo">

              <div className="logo-icon">
                🎓
              </div>

              PlacementHub

            </div>


            <p>
              A modern student placement management
              platform designed to simplify campus recruitment.
            </p>

          </div>


          <div>

            <h3>
              Platform
            </h3>

            <button
              onClick={() => navigate("/login")}
            >
              Student Login
            </button>

            <button
              onClick={() => navigate("/register")}
            >
              Student Registration
            </button>

            <button
              onClick={() => scrollTo("drives")}
            >
              Opportunities
            </button>

          </div>


          <div>

            <h3>
              For Students
            </h3>

            <button
              onClick={() => navigate("/register")}
            >
              Build Profile
            </button>

            <button
              onClick={() => scrollTo("drives")}
            >
              Find Opportunities
            </button>

            <button
              onClick={() => navigate("/login")}
            >
              Track Applications
            </button>

          </div>

        </div>


        <div className="footer-bottom">

          © 2026 PlacementHub.
          Student Placement Management System.

        </div>

      </footer>

    </div>
  );
}


/* LOGIN PAGE */
function LoginPage({ setUser }) {

  const navigate = useNavigate();


  const handleLogin = (userData) => {

    setUser(userData);

    if (userData.role === "ADMIN") {

      navigate("/admin-dashboard");

    } else {

      navigate("/student-dashboard");

    }

  };


  return (
    <Login
      onLogin={handleLogin}
      onRegister={() => navigate("/register")}
    />
  );
}


/* REGISTER PAGE */
function RegisterPage({ setUser }) {

  const navigate = useNavigate();


  const handleRegister = (userData) => {

    setUser(userData);

    navigate("/student-dashboard");

  };


  return (
    <Register
      onRegister={handleRegister}
      onBackToLogin={() => navigate("/login")}
    />
  );
}


/* STUDENT DASHBOARD */
function StudentDashboardPage({
  user,
  onLogout,
}) {

  if (!user) {

    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >

        <h2>
          Please login first
        </h2>

        <button
          className="primary-btn"
          onClick={() =>
            window.location.href = "/login"
          }
        >
          Go to Login
        </button>

      </div>
    );

  }


  return (
    <StudentDashboard
      user={user}
      onLogout={onLogout}
    />
  );
}


/* ADMIN DASHBOARD */
function AdminDashboardPage({
  user,
  onLogout,
}) {

  if (!user) {

    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >

        <h2>
          Please login first
        </h2>

        <button
          className="primary-btn"
          onClick={() =>
            window.location.href = "/login"
          }
        >
          Go to Login
        </button>

      </div>
    );

  }


  return (
    <AdminDashboard
      user={user}
      onLogout={onLogout}
    />
  );
}


/* MAIN APP */
function App() {

  const [user, setUser] = useState(null);

  const [drives, setDrives] = useState([]);


  useEffect(() => {

    loadDrives();

  }, []);


  const loadDrives = async () => {

    try {

      const response =
        await api.get("/drives/");

      setDrives(response.data);

    } catch (error) {

      console.error(
        "Unable to load placement drives",
        error
      );

    }

  };


  const handleLogout = () => {

    setUser(null);

  };


  return (

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <Home drives={drives} />
        }
      />


      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <LoginPage
            setUser={setUser}
          />
        }
      />


      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <RegisterPage
            setUser={setUser}
          />
        }
      />


      {/* STUDENT DASHBOARD */}
      <Route
        path="/student-dashboard"
        element={
          <StudentDashboardPage
            user={user}
            onLogout={handleLogout}
          />
        }
      />


      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminDashboardPage
            user={user}
            onLogout={handleLogout}
          />
        }
      />

    </Routes>

  );
}


export default App;
