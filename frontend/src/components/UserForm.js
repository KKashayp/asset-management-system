import React, { useState } from "react";

function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "EMPLOYEE"
    });
  };

  return (
    <div className="card">
      <div className="section-title">
        <h2>Add User</h2>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
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

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="MANAGER">MANAGER</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;