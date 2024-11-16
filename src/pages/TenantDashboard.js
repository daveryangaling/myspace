import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/App.css';

function TenantDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header title="Tenant Information" userName="Admin" />

        <div className="tenant-info-card">
          <div className="profile-picture">
            {/* Placeholder for Profile Picture */}
            <i className="fas fa-user-circle fa-5x"></i>
          </div>
          <div className="tenant-info-form">
            <label>Tenant Name:</label>
            <input type="text" placeholder="Enter Tenant Name" />

            <label>Address:</label>
            <input type="text" placeholder="Enter Address" />

            <label>Contact Number:</label>
            <input type="text" placeholder="Enter Contact Number" />

            <label>Email:</label>
            <input type="email" placeholder="Enter Email" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
