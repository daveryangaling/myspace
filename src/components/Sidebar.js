import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>MySpace</h3>
      <Link to="/admin-dashboard">Admin Dashboard</Link>
      <Link to="/tenant-dashboard">Tenant Dashboard</Link>
      <Link to="/property-information">Property Information</Link>
      <Link to="/room-dashboard">Room Dashboard</Link>
      <Link to="/payment-information">Payment Information</Link>
      <Link to="/maintenance-request">Maintenance Request</Link>
    </div>
  );
}

export default Sidebar;
