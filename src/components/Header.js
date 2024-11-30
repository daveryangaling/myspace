import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // Assuming you want to add specific styles for the header

function Header({ title, userName }) {
  return (
    <div className="header">
      <div className="header-logo">
        <h3>MySpace</h3>
      </div>
      <div className="header-title">
        <h2>{title}</h2>
      </div>
      <div className="header-user">
        <span>Welcome, {userName}</span>
        <Link to="/" className="logout-button">Log Out</Link>
      </div>
    </div>
  );
}

export default Header;
