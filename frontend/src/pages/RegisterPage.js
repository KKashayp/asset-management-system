import React, { useState } from "react";
import { registerUser } from "../services/api";

function RegisterPage() {
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
      alert("Registration successful. Your role is EMPLOYEE.");
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="login-page enhanced-login-page">
      <div className="login-layout">
        <div className="login-hero-panel">
          <div className="hero-badge">Employee Access Portal</div>

          <h1 className="hero-title">Create Your Account</h1>

          <p className="hero-subtitle">
            Register to access your personal asset workspace, review assigned
            resources, and track allocation details securely from a centralized platform.
          </p>

          <div className="hero-section">
            <h3>Why register?</h3>
            <p>
              Employee accounts allow users to monitor their assigned assets,
              view allocation history, and stay connected to the organization’s
              digital asset management workflow.
            </p>
          </div>

          <div className="hero-feature-grid">
            <div className="hero-feature-card">
              <h4>View Assigned Assets</h4>
              <p>Check which assets are currently allocated to your account.</p>
            </div>

            <div className="hero-feature-card">
              <h4>Track Allocation History</h4>
              <p>Review allocation dates, returns, and usage details.</p>
            </div>

            <div className="hero-feature-card">
              <h4>Secure Access</h4>
              <p>Use authenticated role-based access with protected sessions.</p>
            </div>

            <div className="hero-feature-card">
              <h4>Cloud Availability</h4>
              <p>Access your records from anywhere through the deployed platform.</p>
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
              <span>Access Type</span>
              <strong>Role Based</strong>
            </div>
          </div>

          <div className="hero-footer-note">
            Public registration creates an employee account. Elevated roles such
            as manager and admin are assigned internally by authorized administrators.
          </div>
        </div>

        <div className="login-card auth-card-wide">
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

          <div className="auth-note-box">
            <h4>Access model</h4>
            <p>
              Self-registration is intended for employees. Manager and admin
              accounts are controlled internally for security and governance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;