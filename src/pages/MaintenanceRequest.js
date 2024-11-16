import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Sidebar component with navigation
import '../styles/App.css'; // Custom styling

function MaintenanceRequest() {
  const [searchTerm, setSearchTerm] = useState('');
  const maintenanceRequests = [
    { id: '001', date: '09/01/2024', name: 'Rhome UName', room: '001', description: 'Leaking sink', status: 'Pending' },
    { id: '002', date: '09/15/2024', name: 'Rhome UName', room: '002', description: 'Broken window', status: 'Pending' },
    { id: '003', date: '09/16/2024', name: 'Rhome UName', room: '003', description: 'Heating issue', status: 'In Progress' },
    // Add more as needed
  ];

  const filteredRequests = maintenanceRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="content">
        <h2>Maintenance Requests</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Room</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.date}</td>
                <td>{request.name}</td>
                <td>{request.room}</td>
                <td>{request.description}</td>
                <td><span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceRequest;
