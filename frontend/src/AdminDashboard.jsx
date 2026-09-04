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

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <p className="badge">ADMIN DASHBOARD</p>

        <h1>Welcome, {user.name}!</h1>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total_students || 0}</h3>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <h3>{stats.total_companies || 0}</h3>
            <p>Companies</p>
          </div>

          <div className="stat-card">
            <h3>{stats.total_placement_drives || 0}</h3>
            <p>Placement Drives</p>
          </div>

          <div className="stat-card">
            <h3>{stats.total_applications || 0}</h3>
            <p>Applications</p>
          </div>
        </div>

        <h2>Applications</h2>

        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="application-list">
            {applications.map((application) => (
              <div
                className="application-card"
                key={application.application_id}
              >
                <h3>{application.student}</h3>

                <p>
                  Company: {application.company}
                </p>

                <p>
                  Role: {application.job_role}
                </p>

                <p>
                  CGPA: {application.cgpa}
                </p>

                <p>
                  Current Status:{" "}
                  <strong>{application.status}</strong>
                </p>

                <select
                  value={application.status}
                  onChange={(event) =>
                    updateStatus(
                      application.application_id,
                      event.target.value
                    )
                  }
                >
                  <option value="APPLIED">APPLIED</option>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
