import React from 'react';
import { Link } from 'react-router-dom';
import './bootstrap/css/bootstrap.min.css';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div
      className="container.dev d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url('../assets/log_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: '500px', width: '100%', borderRadius: '10px', maxHeight: '120vh', height: '100%' }}
      >
        <div className="text-center mb-4">
          <img src="./images/logo.png" alt="MySpace Logo" className="logo" />
          <h1>Welcome to MySpace</h1>
        </div>
        <div className="text-center mb-4">
          <p>Your space, your way. Manage your properties with ease.</p>
          <Link to="/login" className="btn btn-primary w-100">Log In</Link>
          <Link to="/signup" className="btn btn-secondary w-100 mt-2">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
