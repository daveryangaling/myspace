import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/App.css';

function RoomDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header title="Room Information" userName="Admin" />

        <div className="room-types">
          <div className="room-card">
            <img src="path_to_image/one_bedroom.jpg" alt="One Bedroom" />
            <p>One Bedroom</p>
          </div>
          <div className="room-card">
            <img src="path_to_image/two_bedroom.jpg" alt="Two Bedroom" />
            <p>Two Bedroom</p>
          </div>
          <div className="room-card">
            <img src="path_to_image/kitchen.jpg" alt="Kitchen" />
            <p>Kitchen</p>
          </div>
          <div className="room-card">
            <img src="path_to_image/studio.jpg" alt="Studio" />
            <p>Studio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDashboard;
