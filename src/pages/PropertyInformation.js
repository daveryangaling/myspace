import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/App.css';

const propertiesData = [
  { id: 1, name: 'Property 1', type: 'Single Family Home', status: 'Available' },
  { id: 2, name: 'Property 2', type: 'Condo', status: 'Occupied' },
  { id: 3, name: 'Property 3', type: 'Apartment', status: 'Available' },
  { id: 4, name: 'Property 4', type: 'Townhouse', status: 'Occupied' },
  { id: 5, name: 'Property 5', type: 'Duplex', status: 'Available' },
  // Add more property details as needed
];

function PropertyInformation() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header title="Property Information" userName="Admin" />
        <div className="property-info-container">
          {propertiesData.map((property) => (
            <div
              key={property.id}
              className={`property-card ${property.status === 'Occupied' ? 'occupied' : 'available'}`}
              onClick={() => openPropertyDetails(property)}
            >
              <h3>{property.name}</h3>
              <p>{property.type}</p>
              <span>{property.status}</span>
            </div>
          ))}
        </div>

        {selectedProperty && (
          <div className="property-details-modal">
            <div className="property-details-content">
              <h2>{selectedProperty.name}</h2>
              <p>Type: {selectedProperty.type}</p>
              <p>Status: {selectedProperty.status}</p>
              <button className="close-button" onClick={closePropertyDetails}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyInformation;
