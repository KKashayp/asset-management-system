import React, { useState } from "react";
import { loginUser } from "../services/api";

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getErrorMessage = (error) => {
    const data = error?.response?.data;

    if (!data) {
      return error.message || "Login failed";
    }

    if (typeof data === "string") {
      return data;
    }

    if (data.message) {
      return data.message;
    }

    return "Login failed";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);

      onLogin(response.data.token);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card auth-card-wide">
        <p className="auth-mini-title">Welcome Back</p>
        <h1>Asset Management System</h1>
        <p className="auth-description">
          Sign in to access your secure workspace for asset tracking, allocation,
          user management, and operational monitoring.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="auth-note-box">
          <h4>Why use this platform?</h4>
          <p>
            Manage organizational assets with role-based access, secure
            authentication, and real-time allocation visibility.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;