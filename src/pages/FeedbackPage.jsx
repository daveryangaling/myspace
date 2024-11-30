import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, FormControl, InputGroup } from 'react-bootstrap';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import '../styles/App.css';

const FeedbackPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from the JSON file
  useEffect(() => {
    fetch("/feedbacks.json")
      .then(response => response.json())
      .then(data => setFeedbacks(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
    setModalShow(true);
  };

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.id.toString().includes(searchTerm) || feedback.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      <Sidebar /> {/* Add the Sidebar component here */}
      <div className="main-content p-4">
        <h2>Property Feedbacks</h2>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <Table striped bordered hover>
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
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.date}</td>
                <td>{feedback.name}</td>
                <td>{feedback.property}</td>
                <td>
                  <Button variant="primary" onClick={() => handleView(feedback)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Feedback Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedFeedback && (
              <>
                <p><strong>ID:</strong> {selectedFeedback.id}</p>
                <p><strong>Date:</strong> {selectedFeedback.date}</p>
                <p><strong>Name:</strong> {selectedFeedback.name}</p>
                <p><strong>Property:</strong> {selectedFeedback.property}</p>
                <p><strong>Description:</strong> {selectedFeedback.description}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FeedbackPage;
