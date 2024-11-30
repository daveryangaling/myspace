import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import TenantSidebar from '../components/TenantSidebar'; // Import TenantSidebar
import '../styles/TenantSide.css'; // Ensure the CSS is linked properly

const TenantDashboard = () => {
  const properties = [
    {
      name: 'Apartment 1A',
      address: '123 Main St, City, State',
      rent: '$1200/month',
      leaseStart: '01/01/2023',
      leaseEnd: '12/31/2023',
    },
    {
      name: 'Apartment 2B',
      address: '456 Elm St, City, State',
      rent: '$1500/month',
      leaseStart: '02/01/2023',
      leaseEnd: '01/31/2024',
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <TenantSidebar />

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
