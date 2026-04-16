import React from "react";

function RolePanel({ role }) {
  return (
    <div className="role-panel">
      <h3>Access Level</h3>
      <p><strong>{role}</strong></p>

      {role === "ADMIN" && (
        <p>You have full system control including users, assets, and allocations.</p>
      )}

      {role === "MANAGER" && (
        <p>You can manage assets, review users, and handle allocations.</p>
      )}

      {role === "EMPLOYEE" && (
        <p>You can view only your assigned asset records.</p>
      )}
    </div>
  );
}

export default RolePanel;