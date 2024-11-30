import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import TenantSidebar from '../components/TenantSidebar'; // Import TenantSidebar
import '../styles/TenantSide.css'; // Ensure the CSS is linked properly

const TenantDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch properties data from JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setProperties(data));

    // Retrieve user name from local storage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <TenantSidebar userName={userName} />

      {/* Main Content Section */}
      <div className="main-content">
        <header>
          <h2>Properties Currently Rented</h2>
        </header>

        <div className="tenant-info">
          {properties.map((property, index) => (
            <Card key={index} className="info-card mb-4">
              <Card.Header>{property.name}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Address:</strong> {property.address}</ListGroup.Item>
                <ListGroup.Item><strong>Rent:</strong> {property.rent}</ListGroup.Item>
                <ListGroup.Item><strong>Lease Start:</strong> {property.leaseStart}</ListGroup.Item>
                <ListGroup.Item><strong>Lease End:</strong> {property.leaseEnd}</ListGroup.Item>
              </ListGroup>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
