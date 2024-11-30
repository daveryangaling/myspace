import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TenantSidebar';
import './bootstrap/css/bootstrap.min.css';
import '../styles/TenantSide.css'; // Import your custom CSS

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

        <div className="row mt-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`col-md-4 mb-4 property-card ${property.status === 'Occupied' ? 'bg-danger' : 'bg-success'} text-white p-3`}
              style={{ cursor: 'pointer' }}
              onClick={() => openPropertyDetails(property)}
            >
              <img src={`${process.env.PUBLIC_URL}/${property.image}`} alt={property.name} style={{ width: '100%' }} />
              <h3>{property.name}</h3>
              <p>{property.type}</p>
              <span>{property.status}</span>
            </div>
          ))}
        </div>

        {selectedProperty && (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedProperty.name}</h5>
                  <button type="button" className="btn-close" onClick={closePropertyDetails}></button>
                </div>
                <div className="modal-body">
                  <p>Type: {selectedProperty.type}</p>
                  <p>Status: {selectedProperty.status}</p>
                  <p>Tenant: {selectedProperty.tenant}</p>
                  <img src={`${process.env.PUBLIC_URL}/${selectedProperty.image}`} alt={selectedProperty.name} style={{ width: '100%' }} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closePropertyDetails}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TenantPropertyInformation;
