import React from "react";

function Sidebar({ role, activeTab, setActiveTab }) {
  const isAdmin = role === "ADMIN";
  const isManager = role === "MANAGER";
  const isEmployee = role === "EMPLOYEE";

  const menuItems = isEmployee
    ? [
        { label: "My Assets", icon: "●" }
      ]
    : [
        { label: "Overview", icon: "◉" },
        { label: "Assets", icon: "▣" },
        { label: "Allocations", icon: "◌" },
        ...(isAdmin ? [{ label: "Users", icon: "☰" }] : [])
      ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">AM</div>
        <div>
          <h2>AssetFlow</h2>
          <p>Smart Enterprise Panel</p>
        </div>
      </div>

      <div className="sidebar-section-title">Navigation</div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`sidebar-item ${activeTab === item.label ? "active" : ""}`}
            onClick={() => setActiveTab(item.label)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer-card">
        <h4>System Access</h4>
        <p>
          {isAdmin && "Full administrative access for users, assets, and allocations."}
          {isManager && "Operational access for asset and allocation management."}
          {isEmployee && "View access to personal asset allocation details."}
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;