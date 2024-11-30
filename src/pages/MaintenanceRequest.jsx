import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Sidebar component with navigation
import './bootstrap/css/bootstrap.min.css';
import '../styles/App.css'; // Ensure you import your global CSS
import { Modal, Button, Form } from 'react-bootstrap';

function MaintenanceRequest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  // Fetch maintenance requests from JSON file
  useEffect(() => {
    fetch('/maintenanceRequest.json')
      .then((response) => response.json())
      .then((data) => setMaintenanceRequests(data))
      .catch((error) => console.error('Error fetching maintenance requests:', error));
  }, []);

  const filteredRequests = maintenanceRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (request) => {
    setSelectedRequest({ ...request });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRequest({
      ...selectedRequest,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const updatedRequests = maintenanceRequests.map(request =>
      request.id === selectedRequest.id ? selectedRequest : request
    );
    setMaintenanceRequests(updatedRequests);
    handleCloseModal();
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = maintenanceRequests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setMaintenanceRequests(updatedRequests);
  };

  return (
    <div className="tenant-dashboard-container">
      <Sidebar />
      <div className="content-container">
        <h2 className="my-4">Maintenance Requests</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Room</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.date}</td>
                <td>{request.name}</td>
                <td>{request.room}</td>
                <td>
                  <Button variant="link" onClick={() => handleShowModal(request)}>
                    View
                  </Button>
                </td>
                <td>
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className={`form-select bg-${request.status.toLowerCase() === 'pending' ? 'warning' : request.status.toLowerCase() === 'in progress' ? 'info' : 'success'}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <Form>
              <Form.Group className="mb-3" controlId="formID">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={selectedRequest.id}
                  onChange={handleInputChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  value={selectedRequest.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedRequest.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRoom">
                <Form.Label>Room</Form.Label>
                <Form.Control
                  type="text"
                  name="room"
                  value={selectedRequest.room}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={selectedRequest.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={selectedRequest.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MaintenanceRequest;
