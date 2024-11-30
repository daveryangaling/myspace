import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './bootstrap/css/bootstrap.min.css';
import '../styles/App.css'; // Import your custom CSS

function PropertyInformation() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [newProperty, setNewProperty] = useState({ name: '', type: '', status: 'Available', tenant: '', image: '' });
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);

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

  const handleNewPropertyChange = (event) => {
    const { name, value } = event.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const addProperty = () => {
    setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
    setNewProperty({ name: '', type: '', status: 'Available', tenant: '', image: '' });
    setShowAddPropertyForm(false);
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const editProperty = (id, updatedProperty) => {
    setProperties(properties.map(property => (property.id === id ? updatedProperty : property)));
    closePropertyDetails();
  };

  const renderFeedback = (status) => {
    return status === 'Available'
      ? <p className="alert alert-success">This property is available for rent. Feel free to contact us for more details!</p>
      : <p className="alert alert-info">This property is currently occupied. Please check back later for availability.</p>;
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
          <button onClick={() => setShowAddPropertyForm(!showAddPropertyForm)} className="btn btn-primary">
            {showAddPropertyForm ? 'Close Add Property Form' : 'Add New Property'}
          </button>
        </div>

        {showAddPropertyForm && (
          <div className="new-property-form mt-4">
            <h3>Add New Property</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProperty.name}
              onChange={handleNewPropertyChange}
            />
            <select
              name="type"
              value={newProperty.type}
              onChange={handleNewPropertyChange}
            >
              <option value="">Select Type</option>
              <option value="Single Family Home">Single Family Home</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Commercial Space">Commercial Space</option>
              <option value="Parking Lot">Parking Lot</option>
              <option value="Bed Spacer">Bed Spacer</option>
            </select>
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
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProperty.image}
              onChange={handleNewPropertyChange}
            />
            <button onClick={addProperty} className="btn btn-primary">Add Property</button>
          </div>
        )}

        <div className="row mt-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`col-md-4 mb-4 property-card ${property.status === 'Occupied' ? 'bg-danger' : 'bg-success'} text-white p-3`}
              style={{ cursor: 'pointer' }}
            >
              <img src={`${process.env.PUBLIC_URL}/${property.image}`} alt={property.name} onClick={() => openPropertyDetails(property)} style={{ width: '100%' }} />
              <h3>{property.name}</h3>
              <p>{property.type}</p>
              <span>{property.status}</span>
              <button onClick={() => deleteProperty(property.id)} className="btn btn-danger">Delete</button>
              <button onClick={() => openPropertyDetails(property)} className="btn btn-secondary">Edit</button>
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
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={selectedProperty.image}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, image: e.target.value })}
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
