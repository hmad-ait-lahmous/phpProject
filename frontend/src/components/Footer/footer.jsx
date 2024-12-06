import React from "react";
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About myCar</h4>
          <p>
            myCar offers a wide selection of vehicles at competitive prices to ensure an enjoyable experience.
          </p>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/cookies-policy">Cookies Policy</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 H&A myCar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
