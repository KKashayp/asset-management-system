import React from "react";

function RolePanel({ role }) {
  const getTitle = () => {
    if (role === "ADMIN") return "Administrator Access";
    if (role === "MANAGER") return "Manager Access";
    if (role === "EMPLOYEE") return "Employee Access";
    return "User Access";
  };

  const getDescription = () => {
    if (role === "ADMIN") {
      return "You can control user access, manage assets, review allocations, and supervise the overall asset lifecycle from a single dashboard.";
    }
    if (role === "MANAGER") {
      return "You can add assets, track inventory, allocate resources, and monitor asset utilization across the organization.";
    }
    if (role === "EMPLOYEE") {
      return "You can view your assigned assets and keep track of current and past allocation records in a secure environment.";
    }
    return "Your account provides role-based access to the asset management platform.";
  };

  return (
    <div className="role-panel">
      <h3>{getTitle()}</h3>
      <p><strong>Role:</strong> {role}</p>
      <p>{getDescription()}</p>
    </div>
  );
}

export default RolePanel;