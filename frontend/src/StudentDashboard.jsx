import { useEffect, useState } from "react";
import api from "./api";

function StudentDashboard({ user, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [drives, setDrives] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const applicationsResponse = await api.get(
          `/applications/student/${user.user_id}`
        );

        setApplications(applicationsResponse.data);

        const drivesResponse = await api.get("/drives/");
        setDrives(drivesResponse.data);

        const profileResponse = await api.get(
          `/students/${user.user_id}`
        );

        setProfile(profileResponse.data);
      } catch (error) {
        console.error("Failed to load dashboard", error);
      }
    };

    loadDashboard();
  }, [user.user_id]);

  const selectedCount = applications.filter(
    (application) => application.status === "SELECTED"
  ).length;

  const shortlistedCount = applications.filter(
    (application) =>
      application.status === "SHORTLISTED" ||
      application.status === "INTERVIEW"
  ).length;

  return (
    <div className="student-dashboard">
      {/* TOP NAVBAR */}

      <header className="dashboard-navbar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">🎓</div>
          <div>
            <strong>PlacementHub</strong>
            <span>Student Portal</span>
          </div>
        </div>

        <div className="dashboard-user">
          <div className="user-avatar">
            {user.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div className="user-info">
            <strong>{user.name}</strong>
            <span>Student</span>
          </div>

          <button
            className="dashboard-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <main className="dashboard-content">

        {/* WELCOME */}

        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-label">
              STUDENT DASHBOARD
            </p>

            <h1>
              Welcome back, {user.name} 👋
            </h1>

            <p>
              Manage your profile, discover placement opportunities,
              and track your applications from one place.
            </p>
          </div>

          <div className="welcome-icon">
            🎯
          </div>
        </section>

        {/* STATISTICS */}

        <section className="dashboard-stats">

          <div className="dashboard-stat">
            <div className="stat-icon blue">
              💼
            </div>

            <div>
              <span>Applications</span>
              <strong>{applications.length}</strong>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-icon orange">
              ⭐
            </div>

            <div>
              <span>Shortlisted</span>
              <strong>{shortlistedCount}</strong>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-icon green">
              🏆
            </div>

            <div>
              <span>Selected</span>
              <strong>{selectedCount}</strong>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-icon purple">
              🔎
            </div>

            <div>
              <span>Opportunities</span>
              <strong>{drives.length}</strong>
            </div>
          </div>

        </section>

        {/* PROFILE */}

        <section className="dashboard-profile-section">

          <div className="dashboard-section-title">
            <div>
              <p className="dashboard-label">
                YOUR PROFILE
              </p>

              <h2>Student Profile</h2>
            </div>

            <span className="profile-status">
              ● Profile Active
            </span>
          </div>

          {profile ? (
            <div className="profile-grid">

              <div className="profile-item">
                <span>Name</span>
                <strong>{profile.name}</strong>
              </div>

              <div className="profile-item">
                <span>Department</span>
                <strong>{profile.department}</strong>
              </div>

              <div className="profile-item">
                <span>Year</span>
                <strong>Year {profile.year}</strong>
              </div>

              <div className="profile-item">
                <span>CGPA</span>
                <strong>{profile.cgpa}</strong>
              </div>

              <div className="profile-item">
                <span>Skills</span>
                <strong>
                  {profile.skills || "Add your skills"}
                </strong>
              </div>

              <div className="profile-item">
                <span>Resume</span>
                <strong>
                  {profile.resume || "Resume not uploaded"}
                </strong>
              </div>

            </div>
          ) : (
            <p>Loading profile...</p>
          )}

        </section>

        {/* OPPORTUNITIES */}

        <section className="dashboard-section">

          <div className="dashboard-section-title">
            <div>
              <p className="dashboard-label">
                CAREER OPPORTUNITIES
              </p>

              <h2>Latest Placement Drives</h2>

              <p>
                Explore opportunities and find companies that match
                your career goals.
              </p>
            </div>
          </div>

          {drives.length === 0 ? (
            <div className="dashboard-empty">
              <div>💼</div>

              <h3>No placement drives available</h3>

              <p>
                New opportunities will appear here when they are
                published by the placement administrator.
              </p>
            </div>
          ) : (
            <div className="dashboard-drive-grid">

              {drives.map((drive) => (
                <div
                  className="dashboard-drive-card"
                  key={drive.id}
                >
                  <div className="drive-card-top">
                    <div className="dashboard-company-logo">
                      {drive.company
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                    </div>

                    <span className="drive-badge">
                      OPEN
                    </span>
                  </div>

                  <h3>{drive.job_role}</h3>

                  <p className="company-name">
                    {drive.company}
                  </p>

                  <div className="dashboard-drive-details">
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
                    <span>Application deadline</span>
                    <strong>{drive.last_date}</strong>
                  </div>

<button
  className="dashboard-apply-btn"
  onClick={async () => {
    try {
      await api.post("/applications/", null, {
        params: {
          student_id: profile.student_id,
          drive_id: drive.id,
        },
      });

      alert("Application submitted successfully!");

      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Unable to submit application"
      );
    }
  }}
>
  Apply Now →
</button>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* APPLICATIONS */}

        <section className="dashboard-section">

          <div className="dashboard-section-title">
            <div>
              <p className="dashboard-label">
                APPLICATION TRACKER
              </p>

              <h2>My Applications</h2>

              <p>
                Track the progress of every placement application.
              </p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="dashboard-empty">
              <div>📋</div>

              <h3>No applications yet</h3>

              <p>
                Once you apply for a placement drive, your
                application status will appear here.
              </p>
            </div>
          ) : (
            <div className="application-table">

              <div className="application-table-header">
                <span>Job Role</span>
                <span>Application ID</span>
                <span>Applied On</span>
                <span>Status</span>
              </div>

              {applications.map((application) => (
                <div
                  className="application-row"
                  key={application.application_id}
                >
                  <strong>
                    {application.job_role}
                  </strong>

                  <span>
                    #{application.application_id}
                  </span>

                  <span>
                    {application.applied_at
                      ? new Date(
                          application.applied_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>

                  <span
                    className={`application-status ${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}

            </div>
          )}

        </section>

      </main>

      {/* FOOTER */}

      <footer className="dashboard-footer">
        <strong>🎓 PlacementHub</strong>
        <span>
          Student Placement Management System © 2026
        </span>
      </footer>
    </div>
  );
}

export default StudentDashboard;
