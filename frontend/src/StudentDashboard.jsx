import { useEffect, useState } from "react";
import api from "./api";

function StudentDashboard({ user, onLogout }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(
          `/applications/student/${user.user_id}`
        );

        setApplications(response.data);
      } catch (error) {
        console.error("Failed to load applications", error);
      }
    };

    fetchApplications();
  }, [user.user_id]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <p className="badge">STUDENT DASHBOARD</p>

        <h1>Welcome, {user.name}!</h1>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

        <p className="dashboard-subtitle">
          Track your placement applications and their current status.
        </p>

        <h2>My Applications</h2>

        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="application-list">
            {applications.map((application) => (
              <div
                className="application-card"
                key={application.application_id}
              >
                <h3>{application.job_role}</h3>

                <p>
                  Application ID: {application.application_id}
                </p>

                <p>
                  Status: <strong>{application.status}</strong>
                </p>

                <p>
                  Applied On:{" "}
                  {application.applied_at
                    ? new Date(
                        application.applied_at
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
