import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './bootstrap/css/bootstrap.min.css';
import '../styles/App.css'; // Ensure you import your global CSS

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalTenants: 0,
    totalRooms: 0,
    monthlyEarnings: 0,
    totalRequests: 0
  });

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/path/to/you/data.json')
      .then((response) => response.json())
      .then((data) => setDashboardData(data));
  }, []);

  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        {/* Dashboard Metrics Section */}
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Tenants</h3>
                <p className="card-text">{dashboardData.totalTenants}</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Rooms</h3>
                <p className="card-text">{dashboardData.totalRooms}</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Monthly Earnings</h3>
                <p className="card-text">₱{dashboardData.monthlyEarnings.toFixed(2)}</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Maintenance Requests</h3>
                <p className="card-text">{dashboardData.totalMaintenanceRequests}</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Renting Requests</h3>
                <p className="card-text">{dashboardData.totalRentingRequests}</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Payment Requests</h3>
                <p className="card-text">{dashboardData.totalPaymentRequests}</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
