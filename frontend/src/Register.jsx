import { useState } from "react";
import api from "./api";

function Register({ onRegister, onBackToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: "",
    cgpa: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await api.post("/students/register", null, {
        params: {
          name: form.name,
          email: form.email,
          password: form.password,
          department: form.department,
          year: Number(form.year),
          cgpa: Number(form.cgpa),
        },
      });

setSuccess(response.data.message);
setTimeout(() => {
  if (onRegister) {
    onRegister(response.data);
  }
}, 1000);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card register-card">
        <div className="login-icon">🎓</div>

        <h1>Create Student Account</h1>

        <p className="login-subtitle">
          Register to access placement opportunities
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder="e.g. Computer Science"
            value={form.department}
            onChange={handleChange}
            required
          />

          <label>Year</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          >
            <option value="">Select year</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Fourth Year</option>
          </select>

          <label>CGPA</label>
          <input
            type="number"
            name="cgpa"
            placeholder="e.g. 8.5"
            min="0"
            max="10"
            step="0.01"
            value={form.cgpa}
            onChange={handleChange}
            required
          />

          {error && <p className="login-error">{error}</p>}

          {success && (
            <p className="login-success">{success}</p>
          )}

          <button type="submit" className="primary-btn login-btn">
            Create Account
          </button>
        </form>

        <button
          type="button"
          className="secondary-btn"
          onClick={onBackToLogin}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;
