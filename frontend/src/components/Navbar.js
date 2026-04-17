import React from "react";

function Navbar({ onLogout, role, email, activeTab }) {
  const getHeading = () => {
    if (activeTab === "Overview") return "Asset Management Dashboard";
    if (activeTab === "Assets") return "Asset Inventory";
    if (activeTab === "Allocations") return "Asset Allocation Center";
    if (activeTab === "Users") return "User Access Management";
    if (activeTab === "My Assets") return "My Assigned Assets";
    return "Asset Management System";
  };

  const getSubHeading = () => {
    if (role === "ADMIN") {
      return "Manage users, assets, and allocations with centralized control.";
    }
    if (role === "MANAGER") {
      return "Track assets, manage allocations, and monitor operational flow.";
    }
    if (role === "EMPLOYEE") {
      return "View your assigned assets and keep track of your allocations.";
    }
    return "Smart asset tracking and secure role-based management.";
  };

  return (
    <div className="topbar">
      <div>
        <p className="topbar-badge">Enterprise Asset Platform</p>
        <h1>{getHeading()}</h1>
        <p>{getSubHeading()}</p>
        <p className="topbar-user">
          <strong>{email}</strong> | Role: <strong>{role}</strong>
        </p>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;