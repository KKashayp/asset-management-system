import React from "react";

function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-content">
        <h3>Asset Management System</h3>

        <p>
          Developed as a full-stack project to manage assets, users, and
          allocations with secure role-based access.
        </p>

        <div className="footer-details">
          <p><strong>Developer:</strong> Kritarth Kashyap</p>
          <p><strong>Email:</strong> kritarthkashyap123@gmail.com</p>
          <p><strong>University:</strong> Chandigarh University</p>
        </div>

        <p className="footer-copy">
          © 2026 Asset Management System | All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;