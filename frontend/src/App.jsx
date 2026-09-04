import { useEffect, useState } from "react";
import Login from "./Login";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import api from "./api";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await api.get("/drives/");
        setDrives(response.data);
      } catch (error) {
        console.error("Failed to load placement drives", error);
      }
    };

    fetchDrives();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

const handleLogout = () => {
  setUser(null);
};

const handleApply = async (driveId) => {
  if (!user) {
    setShowLogin(true);
    return;
  }

  try {
    const response = await api.post("/applications/", null, {
      params: {
        student_id: user.user_id,
        drive_id: driveId,
      },
    });

    alert(response.data.message);
  } catch (error) {
    alert(
      error.response?.data?.detail || "Failed to apply"
    );
  }
};

  const checkBackend = async () => {
    try {
      const response = await api.get("/health");
      setMessage(`Backend Status: ${response.data.status}`);
    } catch (error) {
      setMessage("Backend is not connected");
    }
  };

  if (showLogin) {
    return <Login onLogin={handleLogin} />;
  }

if (user) {
  if (user.role === "ADMIN") {
    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <StudentDashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🎓 PlacementHub</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#drives">Placement Drives</a>
          <a href="#about">About</a>

          <button onClick={checkBackend}>
            Check Backend
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="badge">
              STUDENT PLACEMENT MANAGEMENT SYSTEM
            </p>

            <h1>
              Build Your Career.
              <br />
              <span>Find Your Opportunity.</span>
            </h1>

            <p className="hero-text">
              A centralized platform for students to discover placement
              opportunities, check eligibility, apply for jobs, and track
              application status.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => setShowLogin(true)}
              >
                Student Login
              </button>

              <a href="#drives" className="secondary-btn">
                View Placement Drives
              </a>
            </div>

            {message && (
              <p className="backend-message">
                {message}
              </p>
            )}

            {user && (
              <p className="backend-message">
                Welcome, {user.name}!
              </p>
            )}
          </div>
        </section>

        <section className="features" id="drives">
          <div className="section-heading">
            <p className="badge">
              PLACEMENT OPPORTUNITIES
            </p>

            <h2>Available Placement Drives</h2>
          </div>

          <div className="feature-grid">
            {drives.length === 0 ? (
              <p>No placement drives available.</p>
            ) : (
              drives.map((drive) => (
                <div className="feature-card" key={drive.id}>
                  <div className="icon">🏢</div>

                  <h3>{drive.company}</h3>

                  <p>
                    <strong>Role:</strong> {drive.job_role}
                  </p>

                  <p>
                    <strong>Package:</strong> ₹{drive.package} LPA
                  </p>

                  <p>
                    <strong>Minimum CGPA:</strong>{" "}
                    {drive.minimum_cgpa}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {drive.eligible_department}
                  </p>

                  <p>
                    <strong>Last Date:</strong>{" "}
                    {drive.last_date}
                  </p>

                  <p>{drive.description}</p>

<button
  className="primary-btn"
  onClick={() => handleApply(drive.id)}
>
  Apply Now
</button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>
          © 2026 PlacementHub — Student Placement Management System
        </p>
      </footer>
    </div>
  );
}

export default App;
