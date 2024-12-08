import React from 'react';
import './PleaseSignIn.css';
import { Link } from 'react-router-dom';

const PleaseSignIn = () => {
  return (
    <div className="please-signin">
      <h1>Access Restricted</h1>
      <p>You must be signed in to access this page.</p>
      <Link to="/" className="signin-btn">
        Sign In
      </Link>
    </div>
  );
};

export default PleaseSignIn;
