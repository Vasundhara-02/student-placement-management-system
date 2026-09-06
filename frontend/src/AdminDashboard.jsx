import { useEffect, useState } from "react";
import api from "./api";

function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState({});
  const [applications, setApplications] = useState([]);

  const loadData = async () => {
    try {
      const statsResponse = await api.get("/admin/dashboard");
      const applicationsResponse = await api.get("/admin/applications");

      setStats(statsResponse.data);
      setApplications(applicationsResponse.data);
    } catch (error) {
      console.error("Failed to load admin data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(
        `/admin/applications/${applicationId}/status`,
        null,
        {
          params: { status },
        }
      );

      loadData();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Failed to update status"
      );
    }
  };

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "A";
  };

  return (
    <div className="admin-dashboard">

      {/* NAVBAR */}

      <header className="admin-navbar">
        <div className="admin-brand">
          <div className="admin-brand-icon">🎓</div>

          <div>
            <strong>PlacementHub</strong>
            <span>Admin Portal</span>
          </div>
        </div>

        <div className="admin-user-area">
          <div className="admin-avatar">
            {getInitial(user.name)}
          </div>

          <div className="admin-user-info">
            <strong>{user.name}</strong>
            <span>Administrator</span>
          </div>

          <button
            className="admin-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>


      {/* MAIN CONTENT */}

      <main className="admin-content">

        {/* WELCOME */}

        <section className="admin-welcome">
          <div>
            <p className="admin-label">
              ADMINISTRATION
            </p>

            <h1>
              Welcome back, {user.name} 👋
            </h1>

            <p>
              Manage students, placement opportunities and
              applications from your central dashboard.
            </p>
          </div>

          <div className="admin-welcome-icon">
            📊
          </div>
        </section>


        {/* STATISTICS */}

        <section className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon blue">
              👨‍🎓
            </div>

            <div>
              <span>Total Students</span>
              <strong>
                {stats.total_students || 0}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon purple">
              🏢
            </div>

            <div>
              <span>Companies</span>
              <strong>
                {stats.total_companies || 0}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon orange">
              💼
            </div>

            <div>
              <span>Placement Drives</span>
              <strong>
                {stats.total_placement_drives || 0}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon green">
              📋
            </div>

            <div>
              <span>Applications</span>
              <strong>
                {stats.total_applications || 0}
              </strong>
            </div>
          </div>

        </section>


        {/* OVERVIEW */}

        <section className="admin-overview">

          <div>
            <span>Selected Students</span>
            <strong>
              {stats.selected_students || 0}
            </strong>
          </div>

          <div>
            <span>Active Applications</span>
            <strong>
              {stats.active_applications || 0}
            </strong>
          </div>

          <div>
            <span>System Status</span>
            <strong className="system-active">
              ● Active
            </strong>
          </div>

        </section>


        {/* APPLICATIONS */}

        <section className="admin-applications-section">

          <div className="admin-section-header">

            <div>
              <p className="admin-label">
                PLACEMENT MANAGEMENT
              </p>

              <h2>
                Student Applications
              </h2>

              <p>
                Review applications and update their placement
                progress.
              </p>
            </div>

            <div className="application-count">
              {applications.length} Application
              {applications.length !== 1 ? "s" : ""}
            </div>

          </div>


          {applications.length === 0 ? (

            <div className="admin-empty">
              <div>📋</div>

              <h3>
                No applications yet
              </h3>

              <p>
                Student applications will appear here when
                they apply for placement drives.
              </p>
            </div>

          ) : (

            <div className="admin-application-list">

              {applications.map((application) => (

                <div
                  className="admin-application-card"
                  key={application.application_id}
                >

                  {/* APPLICATION HEADER */}

                  <div className="application-card-header">

                    <div className="admin-student">

                      <div className="student-avatar">
                        {getInitial(application.student)}
                      </div>

                      <div>
                        <h3>
                          {application.student}
                        </h3>

                        <span>
                          Application #
                          {application.application_id}
                        </span>
                      </div>

                    </div>


                    <span
                      className={`admin-status ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>

                  </div>


                  {/* APPLICATION DETAILS */}

                  <div className="application-details">

                    <div>
                      <span>Company</span>
                      <strong>
                        🏢 {application.company}
                      </strong>
                    </div>

                    <div>
                      <span>Job Role</span>
                      <strong>
                        💼 {application.job_role}
                      </strong>
                    </div>

                    <div>
                      <span>Department</span>
                      <strong>
                        🎓 {application.department}
                      </strong>
                    </div>

                    <div>
                      <span>CGPA</span>
                      <strong>
                        ⭐ {application.cgpa}
                      </strong>
                    </div>

                  </div>


                  {/* STATUS UPDATE */}

                  <div className="application-actions">

                    <div>
                      <span>
                        Update Application Status
                      </span>

                      <p>
                        Move the candidate through the
                        placement process.
                      </p>
                    </div>

                    <select
                      className="admin-status-select"
                      value={application.status}
                      onChange={(event) =>
                        updateStatus(
                          application.application_id,
                          event.target.value
                        )
                      }
                    >
                      <option value="APPLIED">
                        APPLIED
                      </option>

                      <option value="SHORTLISTED">
                        SHORTLISTED
                      </option>

                      <option value="INTERVIEW">
                        INTERVIEW
                      </option>

                      <option value="SELECTED">
                        SELECTED
                      </option>

                      <option value="REJECTED">
                        REJECTED
                      </option>
                    </select>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* FOOTER */}

      <footer className="admin-footer">
        <strong>
          🎓 PlacementHub
        </strong>

        <span>
          Student Placement Management System © 2026
        </span>
      </footer>

    </div>
  );
}

export default AdminDashboard;
