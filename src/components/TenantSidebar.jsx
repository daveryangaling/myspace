import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import '../styles/TenantSide.css'; // Custom CSS for the sidebar
import Chatbot from './Chatbot'; // Import your Chatbot component

const TenantSidebar = ({ userName }) => {
  const location = useLocation(); // Get the current URL path
  const [isVisible, setIsVisible] = useState(true); // State to control sidebar visibility
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // State to control chatbot visibility

  useEffect(() => {
    let timer;
    const handleMouseMove = () => {
      setIsVisible(true); // Show sidebar when mouse is moved
      clearTimeout(timer); // Clear any existing timer
      timer = setTimeout(() => {
        setIsVisible(true); // Hide sidebar after 3 seconds
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove); // Listen for mouse movement

    // Cleanup the event listener and timer on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <aside className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        {/* Logo Section */}
        <div className="logo">
          <img src="./images/logo.png" alt="MySpace Logo" />
          <h1>MySpace</h1>
          <div className="chatbot-icon" onClick={() => setIsChatbotVisible(!isChatbotVisible)}>
            <i className="fa fa-comments" aria-hidden="true"></i>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="user-profile">
          <div className="profile-picture">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <p>{userName ? `Welcome, ${userName}` : 'Welcome, Tenant'}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul>
            <li className={location.pathname === '/tenant-dashboard' ? 'active' : ''}>
              <Link to="/tenant-dashboard">
                <i className="fa fa-home" aria-hidden="true"></i>
                Dashboard
              </Link>
            </li>
            <li className={location.pathname === '/tenant-information' ? 'active' : ''}>
              <Link to="/tenant-information">
                <i className="fa fa-user" aria-hidden="true"></i>
                Tenant Information
              </Link>
            </li>
            <li className={location.pathname === '/room-information' ? 'active' : ''}>
              <Link to="/room-information">
                <i className="fa fa-home" aria-hidden="true"></i>
                Room Information
              </Link>
            </li>
            <li className={location.pathname === '/tenant-payment-method' ? 'active' : ''}>
              <Link to="/tenant-payment-method">
                <i className="fa fa-credit-card" aria-hidden="true"></i>
                Payment Method
              </Link>
            </li>
            <li className={location.pathname === '/tenant-property-information' ? 'active' : ''}>
              <Link to="/tenant-property-information">
                <i className="fa fa-home" aria-hidden="true"></i>
                Property Information
              </Link>
            </li>
            <li className={location.pathname === '/tenant-maintenance-request' ? 'active' : ''}>
              <Link to="/tenant-maintenance-request">
                <i className="fa fa-wrench" aria-hidden="true"></i>
                Maintenance Request
              </Link>
            </li>
            <li className={location.pathname === '/tenant-feedback' ? 'active' : ''}>
              <Link to="/tenant-feedback">
                <i className="fa fa-comment" aria-hidden="true"></i>
                Feedback
              </Link>
            </li>
          </ul>
        </nav>

        {/* Log Out Link */}
        <Link to="/" className="logout-link">
          Log Out
        </Link>
      </aside>

      {/* Conditionally Render the Chatbot */}
      {isChatbotVisible && (
        <div className="chatbot-container">
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default TenantSidebar;
