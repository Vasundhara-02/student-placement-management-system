import { useState } from "react";
import api from "./api";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", null, {
        params: {
          email,
          password,
        },
      });

      onLogin(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🎓</div>

        <h1>Student Login</h1>

        <p className="login-subtitle">
          Login to access your placement dashboard
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn login-btn"
          >
            Login
          </button>
        </form>

        {onRegister && (
          <p className="register-link">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onRegister}
            >
              Register here
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
