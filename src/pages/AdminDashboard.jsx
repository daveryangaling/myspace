import React from 'react';
import Sidebar from '../components/Sidebar';
//import Header from '../components/Header';
import './bootstrap/css/bootstrap.min.css';
import '../styles/App.css'; // Ensure you import your global CSS

function AdminDashboard() {
  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        {/*<Header title="Admin Dashboard" userName="Admin" />*/}

        {/* Dashboard Metrics Section */}
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Tenants</h3>
                <p className="card-text">45</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Rooms</h3>
                <p className="card-text">80</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Monthly Earnings</h3>
                <p className="card-text">₱6,000.00</p>
                <button className="btn btn-primary">More Information</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="card-title">Total Requests</h3>
                <p className="card-text">26</p>
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
