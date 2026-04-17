import React from "react";

function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>Asset Management System</h3>
          <p>
            A full-stack enterprise platform to manage assets, users, and
            allocations with secure role-based access.
          </p>
        </div>

        <div className="footer-right">
          <h3>Developer</h3>
          <p>Kritarth Kashyap</p>
          <p>
            Email:{" "}
            <a href="mailto:kritarthkashyap123@gmail.com">
              kritarthkashyap123@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Asset Management System
      </div>
    </div>
  );
}

export default Footer;