import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import { Form, Button, Col, Row, Table, Modal } from 'react-bootstrap';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
  leaseTerm: false,
};

function AddTenantPage() {
  const [tenants, setTenants] = useState([]);
  const [currentTenant, setCurrentTenant] = useState(INITIAL_TENANT_STATE);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const validateForm = () => {
    for (const key in currentTenant) {
      if (key !== 'leaseTerm' && !currentTenant[key]) {
        return false;
      }
    }
    return currentTenant.leaseTerm; // Ensure leaseTerm is checked
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill out all fields before submitting!");
      return;
    }

    if (editIndex !== null) {
      setTenants((prevTenants) =>
        prevTenants.map((tenant, index) =>
          index === editIndex ? currentTenant : tenant
        )
      );
      setEditIndex(null);
    } else {
      setTenants((prevTenants) => [...prevTenants, currentTenant]);
      toast.success("Tenant added successfully!");
    }

    generateDocument();
    resetForm();
  };

  const resetForm = () => {
    setCurrentTenant(INITIAL_TENANT_STATE);
    setShowModal(false);
  };

  const generateDocument = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.text('Tenant Agreement Document', 10, 10);

    doc.setFont('helvetica', 'normal');
    doc.text(`First Name: ${currentTenant.firstName}`, 10, 20);
    doc.text(`Last Name: ${currentTenant.lastName}`, 10, 30);
    doc.text(`Gender: ${currentTenant.gender}`, 10, 40);
    doc.text(`Birthday: ${currentTenant.birthday}`, 10, 50);
    doc.text(`Address: ${currentTenant.address}`, 10, 60);

    autoTable(doc, {
      startY: 70,
      head: [['Property Details', 'Value']],
      body: [
        ['Property Count', currentTenant.propertyCount],
        ['Property Type', currentTenant.propertyType],
        ['Move In Date', currentTenant.moveInDate],
        ['Move Out Date', currentTenant.moveOutDate],
      ],
    });

    doc.text('Sign Here: ____________________________', 10, doc.autoTable.previous.finalY + 20);
    doc.save(`${currentTenant.firstName}_Tenant_Agreement.pdf`);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => resetForm();

  return (
    <div className="tenant-dashboard-container">
      <ToastContainer />
      <Sidebar />
      <div className="content-container">
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
                      size="sm"
                      onClick={() => {
                        setCurrentTenant(tenants[index]);
                        setEditIndex(index);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setTenants((prevTenants) =>
                          prevTenants.filter((_, i) => i !== index)
                        )
                      }
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Tenant' : 'Add Tenant'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="propertyCount">
              <Form.Label>Property Count</Form.Label>
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
                as="select"
                name="propertyType"
                value={currentTenant.propertyType}
                onChange={handleChange}
              >
                <option value="">Select Property Type</option>
                <option value="Single Family Home">Single Family Home</option>
                <option value="Condo">Condo</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Duplex">Duplex</option>
                <option value="Commercial Space">Commercial Space</option>
                <option value="Parking Lot">Parking Lot</option>
                <option value="Bed Spacer">Bed Spacer</option>
              </Form.Control>
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

            <Form.Group controlId="leaseTerm">
              <Form.Check
                type="checkbox"
                name="leaseTerm"
                label="Agree to lease terms"
                checked={currentTenant.leaseTerm}
                onChange={handleCheckboxChange}
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
