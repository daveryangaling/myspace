import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, FormControl } from 'react-bootstrap';
import Sidebar from '../components/TenantSidebar'; // Import the Sidebar component
import '../styles/TenantSide.css';

const TenantFeedback = () => {
  const [modalShow, setModalShow] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    date: '',
    name: '',
    property: '',
    description: ''
  });

  useEffect(() => {
    fetch('/feedbacks.json')
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedback:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedbacks([...feedbacks, { ...newFeedback, id: feedbacks.length + 1 }]);
    setModalShow(false);
  };

  return (
    <div className="d-flex">
      <Sidebar /> {/* Add the Sidebar component here */}
      <div className="main-content p-4">
        <h2>Tenant Feedbacks</h2>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Feedback
        </Button>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.date}</td>
                <td>{feedback.name}</td>
                <td>{feedback.property}</td>
                <td>{feedback.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newFeedback.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newFeedback.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formProperty">
                <Form.Label>Property</Form.Label>
                <Form.Control
                  as="select"
                  name="property"
                  value={newFeedback.property}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Property</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Parking Lot">Parking Lot</option>
                  <option value="Apartment">Apartment</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={newFeedback.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default TenantFeedback;
