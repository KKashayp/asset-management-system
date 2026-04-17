import React, { useState } from "react";
import { loginUser } from "../services/api";
import Footer from "../components/Footer";

function LoginPage({ onLogin, onShowRegister }) {
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
            <div className="hero-badge">Enterprise SaaS Platform</div>

            <h1 className="hero-title">
              Smart Asset
              <br />
              Management for
              <span className="hero-gradient-text"> Modern Teams</span>
            </h1>

            <p className="hero-subtitle">
              Streamline asset tracking, role-based access, allocation workflows,
              and operational control from one centralized cloud platform.
            </p>

            <div className="hero-cta-row">
              <div className="hero-cta-box">
                <strong>Secure Access</strong>
                <span>JWT authentication with protected APIs</span>
              </div>
              <div className="hero-cta-box">
                <strong>Live Operations</strong>
                <span>Manage assets, users, and allocations instantly</span>
              </div>
            </div>

            <div className="hero-section">
              <h3>What this app does</h3>
              <p>
                This system helps organizations register assets, assign them to
                employees, monitor availability, and maintain secure role-based
                workflows for administrators, managers, and employees.
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
                <h4>Role-Based Access</h4>
                <p>Separate dashboards for admin, manager, and employee users.</p>
              </div>

              <div className="hero-feature-card">
                <h4>Asset Tracking</h4>
                <p>Monitor available, allocated, and maintenance assets easily.</p>
              </div>

              <div className="hero-feature-card">
                <h4>Secure Login</h4>
                <p>Protected authentication and token-based user sessions.</p>
              </div>

              <div className="hero-feature-card">
                <h4>Allocation Control</h4>
                <p>Assign, return, and review assets with centralized visibility.</p>
              </div>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-box">
                <span>Security</span>
                <strong>JWT Enabled</strong>
              </div>
              <div className="hero-stat-box">
                <span>Access Model</span>
                <strong>RBAC Ready</strong>
              </div>
              <div className="hero-stat-box">
                <span>Deployment</span>
                <strong>Cloud Hosted</strong>
              </div>
            </div>
          </div>

          <div className="login-card auth-card-wide saas-login-card">
            <p className="auth-mini-title">Welcome Back</p>
            <h1>Asset Management System</h1>
            <p className="auth-description">
              Sign in to access your secure workspace for asset tracking,
              allocation, user management, and operational monitoring.
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

            <div className="auth-switch-link">
              <span>New user? </span>
              <button type="button" onClick={onShowRegister}>
                Register here
              </button>
            </div>

            <div className="auth-note-box">
              <h4>Why use this platform?</h4>
              <p>
                Manage organizational assets with role-based access, secure
                authentication, and real-time allocation visibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;