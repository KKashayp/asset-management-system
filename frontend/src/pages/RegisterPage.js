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
    <div className="login-page">
      <div className="login-card auth-card-wide">
        <p className="auth-mini-title">Create Account</p>
        <h1>Join Asset Management System</h1>
        <p className="auth-description">
          Register to access your employee portal and view assigned asset records
          securely from anywhere.
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
            Public registration creates an employee account. Higher-level access
            such as manager and admin is controlled internally by the system.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;