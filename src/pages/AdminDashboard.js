import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/App.css';

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header title="Admin Dashboard" userName="Admin" />

        {/* Dashboard Metrics Section */}
        <div className="dashboard-metrics">
          <div className="metric-card">
            <h3>Total Tenants</h3>
            <p>45</p>
            <button>More Information</button>
          </div>
          <div className="metric-card">
            <h3>Total Rooms</h3>
            <p>80</p>
            <button>More Information</button>
          </div>
          <div className="metric-card">
            <h3>Monthly Earnings</h3>
            <p>₱6,000.00</p>
            <button>More Information</button>
          </div>
          <div className="metric-card">
            <h3>Total Requests</h3>
            <p>26</p>
            <button>More Information</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
