import React, { useState } from "react";
import { registerUser, loginUser } from "../services/api";
import Footer from "../components/Footer";

function RegisterPage({ onLogin, onShowLogin }) {
  const [formData, setFormData] = useState({
    name: "",
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
      return error.message || "Registration failed";
    }

    if (typeof data === "string") {
      return data;
    }

    if (data.message) {
      return data.message;
    }

    if (data.errors) {
      return Object.values(data.errors).join(", ");
    }

    return "Registration failed";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      const loginResponse = await loginUser({
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("role", loginResponse.data.role);
      localStorage.setItem("email", loginResponse.data.email);

      onLogin(loginResponse.data.token);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="page-container">
      <div className="login-page enhanced-login-page">
        <div className="animated-bg">
          <span className="bg-orb orb-1"></span>
          <span className="bg-orb orb-2"></span>
          <span className="bg-orb orb-3"></span>
          <span className="bg-grid"></span>
        </div>

        <div className="login-layout">
          <div className="login-hero-panel saas-panel">
            <div className="hero-badge">Employee Access Portal</div>

            <h1 className="hero-title">
              Join the
              <br />
              <span className="hero-gradient-text">Asset Platform</span>
            </h1>

            <p className="hero-subtitle">
              Register to access your personal asset workspace, review assigned
              resources, and track allocation details securely from anywhere.
            </p>

            <div className="hero-section">
              <h3>Why register?</h3>
              <p>
                Employee accounts allow users to monitor assigned assets, review
                allocation details, and stay connected to the organization’s
                digital asset management workflow.
              </p>
            </div>

            <div className="hero-section">
              <h3>About Developer</h3>
              <p>
                This project is developed by Kritarth Kashyap as a full-stack
                enterprise application demonstrating secure authentication,
                role-based access, and cloud deployment.
              </p>
              <p>
                Email:{" "}
                <a href="mailto:kritarthkashyap123@gmail.com">
                  kritarthkashyap123@gmail.com
                </a>
              </p>
            </div>

            <div className="hero-feature-grid">
              <div className="hero-feature-card">
                <h4>Assigned Asset View</h4>
                <p>Review your current assets and allocation details easily.</p>
              </div>

              <div className="hero-feature-card">
                <h4>Cloud Access</h4>
                <p>Open your dashboard securely from a deployed online platform.</p>
              </div>

              <div className="hero-feature-card">
                <h4>Protected Access</h4>
                <p>Use secure authenticated sessions with role-based permissions.</p>
              </div>

              <div className="hero-feature-card">
                <h4>Centralized Records</h4>
                <p>Keep all asset-related details organized in one place.</p>
              </div>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-box">
                <span>Default Role</span>
                <strong>Employee</strong>
              </div>
              <div className="hero-stat-box">
                <span>Security</span>
                <strong>JWT Enabled</strong>
              </div>
              <div className="hero-stat-box">
                <span>Model</span>
                <strong>Role Based</strong>
              </div>
            </div>
          </div>

          <div className="login-card auth-card-wide saas-login-card">
            <p className="auth-mini-title">Create Account</p>
            <h1>Join Asset Management System</h1>
            <p className="auth-description">
              Register to access your employee portal and manage your asset-related
              information in a secure environment.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

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
                placeholder="Create your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit">Register</button>
            </form>

            <div className="auth-switch-link">
              <span>Already have an account? </span>
              <button type="button" onClick={onShowLogin}>
                Login here
              </button>
            </div>

            <div className="auth-note-box">
              <h4>Access model</h4>
              <p>
                Self-registration creates an employee account. Higher-level roles
                are controlled internally for security and governance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RegisterPage;