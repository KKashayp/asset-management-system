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
      console.log("Register error:", error);
      console.log("Backend response:", error?.response?.data);
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;