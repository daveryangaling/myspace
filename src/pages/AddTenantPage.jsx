import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Form, Button, Col, Row, Table, Modal } from 'react-bootstrap';
import './bootstrap/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import '../styles/App.css'; // Import the custom CSS file

function AddTenantPage() {
  const [tenants, setTenants] = useState([]);
  const [currentTenant, setCurrentTenant] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthday: '',
    address: '',
    occupation: '',
    email: '',
    phone: '',
    propertyCount: '',
    propertyType: '',
    propertyNumber: '',
    moveInDate: '',
    moveOutDate: '',
    leaseAgreement: '',
    leaseTerm: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTenants = tenants.map((tenant, index) =>
        index === editIndex ? currentTenant : tenant
      );
      setTenants(updatedTenants);
      setEditIndex(null);
    } else {
      setTenants([...tenants, currentTenant]);
    }
    setCurrentTenant({
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      address: '',
      occupation: '',
      email: '',
      phone: '',
      propertyCount: '',
      propertyType: '',
      propertyNumber: '',
      moveInDate: '',
      moveOutDate: '',
      leaseAgreement: '',
      leaseTerm: '',
    });
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setCurrentTenant(tenants[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedTenants = tenants.filter((_, i) => i !== index);
    setTenants(updatedTenants);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Header title="Tenant Management" userName="Name of Owner" />
        <div className="dashboard-background">
          <Button variant="primary" onClick={handleShowModal}>
            Add Tenant
          </Button>
          <div className="tenant-list">
            <h3>Tenant List</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Birthday</th>
                  <th>Address</th>
                  <th>Occupation</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Property Count</th>
                  <th>Property Type</th>
                  <th>Property Number</th>
                  <th>Move In Date</th>
                  <th>Move Out Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant, index) => (
                  <tr key={index}>
                    <td>{tenant.firstName}</td>
                    <td>{tenant.lastName}</td>
                    <td>{tenant.gender}</td>
                    <td>{tenant.birthday}</td>
                    <td>{tenant.address}</td>
                    <td>{tenant.occupation}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.phone}</td>
                    <td>{tenant.propertyCount}</td>
                    <td>{tenant.propertyType}</td>
                    <td>{tenant.propertyNumber}</td>
                    <td>{tenant.moveInDate}</td>
                    <td>{tenant.moveOutDate}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Tenant' : 'Add Tenant'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h3>Tenant Information</h3>
            <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={currentTenant.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={currentTenant.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={currentTenant.gender}
                onChange={handleChange}
                placeholder="Enter gender"
              />
            </Form.Group>

            <Form.Group controlId="birthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={currentTenant.birthday}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={currentTenant.address}
                onChange={handleChange}
                placeholder="Enter home address"
              />
            </Form.Group>

            <Form.Group controlId="occupation">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                name="occupation"
                value={currentTenant.occupation}
                onChange={handleChange}
                placeholder="Enter occupation"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentTenant.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={currentTenant.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <h3>Property Information</h3>

            <Form.Group controlId="propertyCount">
              <Form.Label>Number of Properties</Form.Label>
              <Form.Control
                type="number"
                name="propertyCount"
                value={currentTenant.propertyCount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="propertyType">
              <Form.Label>Property Type</Form.Label>
              <Form.Control
                type="text"
                name="propertyType"
                value={currentTenant.propertyType}
                onChange={handleChange}
                placeholder="Enter property type"
              />
            </Form.Group>

            <Form.Group controlId="propertyNumber">
              <Form.Label>Property Number</Form.Label>
              <Form.Control
                type="text"
                name="propertyNumber"
                value={currentTenant.propertyNumber}
                onChange={handleChange}
                placeholder="Enter property number"
              />
            </Form.Group>

            <Form.Group controlId="moveInDate">
              <Form.Label>Move In Date</Form.Label>
              <Form.Control
                type="date"
                name="moveInDate"
                value={currentTenant.moveInDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="moveOutDate">
              <Form.Label>Move Out Date</Form.Label>
              <Form.Control
                type="date"
                name="moveOutDate"
                value={currentTenant.moveOutDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="leaseAgreement">
              <Form.Label>Lease Agreement</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group controlId="leaseTerm">
              <Form.Check
                type="checkbox"
                name="leaseTerm"
                label="Short Term"
                checked={currentTenant.leaseTerm === 'Short Term'}
                onChange={() =>
                  setCurrentTenant((prevTenant) => ({
                    ...prevTenant,
                    leaseTerm:
                      prevTenant.leaseTerm === 'Short Term'
                        ? ''
                        : 'Short Term',
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                name="leaseTerm"
                label="Long Term"
                checked={currentTenant.leaseTerm === 'Long Term'}
                onChange={() =>
                  setCurrentTenant((prevTenant) => ({
                    ...prevTenant,
                    leaseTerm:
                      prevTenant.leaseTerm === 'Long Term'
                        ? ''
                        : 'Long Term',
                  }))
                }
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editIndex !== null ? 'Update Tenant' : 'Add Tenant'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddTenantPage;
