import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <a href="/" className="navbar-logo">
          myCar
        </a>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logout Button */}
        <a className="navbar-cta" onClick={handleLogOut}>
          Log Out
        </a>
      </div>
    </nav>
  );
}
