import React from "react";
import "./Navbar.css";

const Navbar = () => {
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
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>

        {/* Call to Action */}
        <a href="/signup" className="navbar-cta">
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
