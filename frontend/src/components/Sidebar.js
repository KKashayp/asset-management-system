import React from "react";
import {
  FaChartPie,
  FaBoxOpen,
  FaExchangeAlt,
  FaUsers,
  FaClipboardList
} from "react-icons/fa";

function Sidebar({ role, activeTab, setActiveTab }) {
  const isAdmin = role === "ADMIN";
  const isManager = role === "MANAGER";
  const isEmployee = role === "EMPLOYEE";

  const items = [];

  if (isAdmin || isManager) {
    items.push({ label: "Overview", icon: <FaChartPie /> });
    items.push({ label: "Assets", icon: <FaBoxOpen /> });
    items.push({ label: "Allocations", icon: <FaExchangeAlt /> });
    items.push({ label: "Users", icon: <FaUsers /> });
  }

  if (isEmployee) {
    items.push({ label: "My Assets", icon: <FaClipboardList /> });
  }

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">AM</div>
        <div>
          <h2>AssetFlow</h2>
          <p>Enterprise Panel</p>
        </div>
      </div>

      <div className="sidebar-section-title">Navigation</div>

      <div className="sidebar-menu">
        {items.map((item) => (
          <button
            key={item.label}
            className={`sidebar-item ${activeTab === item.label ? "active" : ""}`}
            onClick={() => setActiveTab(item.label)}
            type="button"
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;