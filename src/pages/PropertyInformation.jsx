import React, { useState } from 'react';
//import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './bootstrap/css/bootstrap.min.css';
import '../styles/App.css'; // Import your custom CSS

const initialProperties = [
  { id: 1, name: 'Property 1', type: 'Single Family Home', status: 'Available', tenant: 'John Doe' },
  { id: 2, name: 'Property 2', type: 'Condo', status: 'Occupied', tenant: 'Jane Smith' },
  { id: 3, name: 'Property 3', type: 'Apartment', status: 'Available', tenant: 'Michael Johnson' },
  { id: 4, name: 'Property 4', type: 'Townhouse', status: 'Occupied', tenant: 'Emily Davis' },
  { id: 5, name: 'Property 5', type: 'Duplex', status: 'Available', tenant: 'Chris Brown' },
  // Add more property details as needed
];

function PropertyInformation() {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyType, setPropertyType] = useState('Room');
  const [filterType, setFilterType] = useState('All');
  const [newProperty, setNewProperty] = useState({ name: '', type: '', status: 'Available', tenant: '' });

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleNewPropertyChange = (event) => {
    const { name, value } = event.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const addProperty = () => {
    setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
    setNewProperty({ name: '', type: '', status: 'Available', tenant: '' });
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const editProperty = (id, updatedProperty) => {
    setProperties(properties.map(property => (property.id === id ? updatedProperty : property)));
    closePropertyDetails();
  };

  const renderFeedback = (status) => {
    if (status === 'Available') {
      return <p className="alert alert-success">This property is available for rent. Feel free to contact us for more details!</p>;
    } else {
      return <p className="alert alert-info">This property is currently occupied. Please check back later for availability.</p>;
    }
  };

  const filteredProperties = filterType === 'All' 
    ? properties 
    : properties.filter(property => property.type === filterType);

  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        {/*<Header title="Property Information" userName="Admin" />*/}
        <div className="property-info-header">
          <h2>Property Information</h2>
          <div className="property-type-dropdown">
            <select value={propertyType} onChange={handlePropertyTypeChange}>
              <option value="Room">Room</option>
              <option value="Bed Spacer">Bed Spacer</option>
              <option value="Apartment">Apartment</option>
              <option value="Condominium">Condominium</option>
              <option value="Parking Lot">Parking Lot</option>
              <option value="Commercial Space">Commercial Space</option>
            </select>
          </div>
          <div className="property-filter-dropdown">
            <select value={filterType} onChange={handleFilterTypeChange}>
              <option value="All">All</option>
              <option value="Single Family Home">Single Family Home</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Duplex">Duplex</option>
              {/* Add more types as needed */}
            </select>
          </div>
        </div>
        <div className="row mt-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`col-md-4 mb-4 property-card ${property.status === 'Occupied' ? 'bg-danger' : 'bg-success'} text-white p-3`}
              onClick={() => openPropertyDetails(property)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{property.name}</h3>
              <p>{property.type}</p>
              <span>{property.status}</span>
              <button onClick={() => deleteProperty(property.id)} className="btn btn-danger">Delete</button>
            </div>
          ))}
        </div>

        <div className="new-property-form">
          <h3>Add New Property</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProperty.name}
            onChange={handleNewPropertyChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newProperty.type}
            onChange={handleNewPropertyChange}
          />
          <select
            name="status"
            value={newProperty.status}
            onChange={handleNewPropertyChange}
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
          <input
            type="text"
            name="tenant"
            placeholder="Tenant"
            value={newProperty.tenant}
            onChange={handleNewPropertyChange}
          />
          <button onClick={addProperty} className="btn btn-primary">Add Property</button>
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
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={selectedProperty.name}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, name: e.target.value })}
                  />
                  <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={selectedProperty.type}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, type: e.target.value })}
                  />
                  <select
                    name="status"
                    value={selectedProperty.status}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, status: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                  <input
                    type="text"
                    name="tenant"
                    placeholder="Tenant"
                    value={selectedProperty.tenant}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, tenant: e.target.value })}
                  />
                  {renderFeedback(selectedProperty.status)}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => editProperty(selectedProperty.id, selectedProperty)}
                  >
                    Save Changes
                  </button>
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

export default PropertyInformation;
