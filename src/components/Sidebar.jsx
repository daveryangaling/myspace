import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // Import custom CSS for sidebar

function Sidebar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;
    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timer); // Clear any existing timers
      timer = setTimeout(() => {
        setIsVisible(true); // Hide sidebar after 3 seconds
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener and timer on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="sidebar-title">MySpace</div>
      <ul className="sidebar-links">
        <li>
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/add-tenant">Tenants</Link>
        </li>
        <li>
          <Link to="/property-information">Property</Link>
        </li>
        <li>
          <Link to="/payment-information">Payment</Link>
        </li>
        <li>
          <Link to="/maintenance-request">Maintenance Request</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
      </ul>
      <Link to="/" className="logout-link">
        Log Out
      </Link>
    </div>
  );
}

export default Sidebar;
