import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 John Doe Photography. All Rights Reserved.</p>
        <div className="footer-admin-link">
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;