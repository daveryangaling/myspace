import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TenantSidebar';
import './bootstrap/css/bootstrap.min.css';
import '../styles/TenantSide.css'; // Import your custom CSS
import { Carousel, Button, Modal } from 'react-bootstrap';

function TenantPropertyInformation() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetch("/properties.json")
      .then(response => response.json())
      .then(data => setProperties(data));
  }, []);

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredProperties = filterType === 'All' 
    ? properties 
    : properties.filter(property => property.type === filterType);

  const renderFeedback = (status) => {
    return status === 'Available'
      ? <p className="alert alert-success">This property is available for rent. Feel free to contact us for more details!</p>
      : <p className="alert alert-info">This property is currently occupied. Please check back later for availability.</p>;
  };

  const handleRentProperty = (property) => {
    alert(`You've chosen to rent ${property.name}. Please contact us for further details.`);
    // Add logic to handle the rent property action
  };

  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="property-info-header">
          <h2>Property Information</h2>
          <div className="property-filter-dropdown">
            <select value={filterType} onChange={handleFilterTypeChange}>
              <option value="All">All</option>
              <option value="Single Family Home">Single Family Home</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Commercial Space">Commercial Space</option>
              <option value="Parking Lot">Parking Lot</option>
              <option value="Bed Spacer">Bed Spacer</option>
            </select>
          </div>
        </div>

        <Carousel className="mt-4">
          {filteredProperties.map((property) => (
            <Carousel.Item key={property.id} onClick={() => openPropertyDetails(property)}>
              <img 
                src={`${process.env.PUBLIC_URL}/${property.image}`} 
                alt={property.name} 
                className="carousel-image" 
                style={{ cursor: 'pointer' }} 
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {selectedProperty && (
          <Modal show={selectedProperty !== null} onHide={closePropertyDetails}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProperty.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Type: {selectedProperty.type}</p>
              <p>Status: {selectedProperty.status}</p>
              <p>Tenant: {selectedProperty.tenant}</p>
              <img src={`${process.env.PUBLIC_URL}/${selectedProperty.image}`} alt={selectedProperty.name} style={{ width: '100%' }} />
              {renderFeedback(selectedProperty.status)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => handleRentProperty(selectedProperty)}>Rent this Property</Button>
              <Button variant="secondary" onClick={closePropertyDetails}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TenantPropertyInformation;
