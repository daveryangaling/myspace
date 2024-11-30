import React from "react";
import { Link } from "react-router-dom";
import "../styles/TenantSide.css";

function TenantInformation() {
  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="logo">
          <img src="../assets/logo.png" alt="MySpace Logo" />
          <h1>MySpace</h1>
        </div>
        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul>
          <li>
              <Link to="/tenant-dashboard">
                <i className="fa fa-home" aria-hidden="true"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/tenant-information">
                <i className="fa fa-user" aria-hidden="true"></i>
                Tenant Information
              </Link>
            </li>
            <li>
              <Link to="/room-information">
                <i className="fa fa-home" aria-hidden="true"></i>
                Room Information
              </Link>
            </li>
            <li>
              <Link to="/tenant-payment-method">
                <i className="fa fa-credit-card" aria-hidden="true"></i>
                Payment Method
              </Link>
            </li>
            <li>
              <Link to="/tenant-maintenance-request">
                <i className="fa fa-wrench" aria-hidden="true"></i>
                Maintenance Request
              </Link>
            </li>
          </ul>
        </nav>

        {/* Log Out Button */}
        <div className="logout">
          <Link to="/">
            <button>Log Out</button>
          </Link>
        </div>
      </aside>

      {/* Main Content Section */}
      <main className="main-content">
        <header>
          <h1>Tenant Dashboard</h1>
        </header>

        <div className="tenant-info">
          <div className="info-card">
            <h2>Tenant Information</h2>
            <form className="tenant-form">
              <div className="form-group">
                <label htmlFor="tenantName">Tenant Name:</label>
                <input
                  type="text"
                  id="tenantName"
                  placeholder="FName LName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Lot, Barangay, St."
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="text"
                  id="contactNumber"
                  placeholder="Enter Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="@gmail.com"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TenantInformation;
