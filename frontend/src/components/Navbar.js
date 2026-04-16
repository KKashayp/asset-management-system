import React from "react";

function Navbar({ onLogout, role, email, activeTab }) {
  return (
    <div className="topbar">
      <div>
        <h1>{activeTab}</h1>
        <p>{email} | Role: {role}</p>
      </div>

      <button type="button" className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;