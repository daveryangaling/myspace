import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Form, Button, Col, Row, Table, Modal } from 'react-bootstrap';
import './bootstrap/css/bootstrap.min.css';
import '../styles/App.css';

const INITIAL_TENANT_STATE = {
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
  leaseTerm: false,
};

function AddTenantPage() {
  const [tenants, setTenants] = useState([]);
  const [currentTenant, setCurrentTenant] = useState(INITIAL_TENANT_STATE);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handlers for form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setCurrentTenant((prevTenant) => ({
      ...prevTenant,
      leaseTerm: e.target.checked,
    }));
  };

  // Submit handler for adding/updating tenant
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setTenants((prevTenants) =>
        prevTenants.map((tenant, index) =>
          index === editIndex ? currentTenant : tenant
        )
      );
      setEditIndex(null);
    } else {
      setTenants((prevTenants) => [...prevTenants, currentTenant]);
    }
    resetForm();
  };

  const resetForm = () => {
    setCurrentTenant(INITIAL_TENANT_STATE);
    setShowModal(false);
  };

  // Edit tenant
  const handleEdit = (index) => {
    setCurrentTenant(tenants[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  // Delete tenant
  const handleDelete = (index) => {
    setTenants((prevTenants) => prevTenants.filter((_, i) => i !== index));
  };

  // Modal visibility handlers
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => resetForm();

  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="dashboard-background">
          <Button variant="primary" onClick={handleShowModal}>
            Add Tenant
          </Button>

          {/* Tenant List */}
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
                        size="sm"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
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

      {/* Modal for Adding/Editing Tenant */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Tenant' : 'Add Tenant'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h5>Tenant Information</h5>
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
                as="select"
                name="gender"
                value={currentTenant.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
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
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={currentTenant.address}
                onChange={handleChange}
                placeholder="Enter address"
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
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={currentTenant.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <h5>Property Details</h5>
            <Row>
              <Col>
                <Form.Group controlId="propertyCount">
                  <Form.Label>Number of Properties</Form.Label>
                  <Form.Control
                    type="number"
                    name="propertyCount"
                    value={currentTenant.propertyCount}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="propertyType">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="propertyType"
                    value={currentTenant.propertyType}
                    onChange={handleChange}
                  >
                    <option value="">Select Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

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

            <Row>
              <Col>
                <Form.Group controlId="moveInDate">
                  <Form.Label>Move In Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="moveInDate"
                    value={currentTenant.moveInDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="moveOutDate">
                  <Form.Label>Move Out Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="moveOutDate"
                    value={currentTenant.moveOutDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="leaseAgreement">
              <Form.Label>Lease Agreement</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group controlId="leaseTerm">
              <Form.Check
                type="checkbox"
                name="leaseTerm"
                label="Lease term has been signed"
                checked={currentTenant.leaseTerm}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <div className="modal-footer">
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {editIndex !== null ? 'Update Tenant' : 'Add Tenant'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddTenantPage;
