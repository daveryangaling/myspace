import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/TenantSidebar';
import './bootstrap/css/bootstrap.min.css';
import '../styles/TenantSide.css';
import { Modal, Button, Form } from 'react-bootstrap';

function TenantMaintenanceRequest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    issue: '',
    room: '',
    files: []
  });

  useEffect(() => {
    fetch('/maintenanceRequest.json')
      .then((response) => response.json())
      .then((data) => setMaintenanceRequests(data))
      .catch((error) => console.error('Error fetching maintenance requests:', error));
  }, []);

  const filteredRequests = maintenanceRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (request = null) => {
    if (request) {
      setSelectedRequest({ ...request });
      setIsEditing(true);
    } else {
      setSelectedRequest(null);
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setIsEditing(false);
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

  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({
      ...newRequest,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNewRequest({
      ...newRequest,
      files: [...e.target.files]
    });
  };

  const handleCreateRequest = () => {
    const newRequestData = {
      id: maintenanceRequests.length + 1,
      date: new Date().toISOString().split('T')[0],
      name: 'Tenant Name', // Replace with actual tenant name
      room: newRequest.room,
      description: newRequest.issue,
      status: 'Pending',
      files: newRequest.files
    };
    setMaintenanceRequests([...maintenanceRequests, newRequestData]);
    setNewRequest({ issue: '', room: '', files: [] });
    handleCloseModal();
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
        <Button variant="primary" onClick={() => handleShowModal()}>
          Create Maintenance Request
        </Button>
        <table className="table table-striped mt-3">
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
          <Modal.Title>{isEditing ? 'Edit Maintenance Request' : 'Create Maintenance Request'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formIssue">
              <Form.Label>Issue</Form.Label>
              <Form.Control
                as="select"
                name="issue"
                value={selectedRequest ? selectedRequest.issue : newRequest.issue}
                onChange={isEditing ? handleInputChange : handleNewRequestChange}
              >
                <option value="" disabled>Select an issue (Dropdown)</option>
                <option value="leaking_pipe">Leaking Pipe</option>
                <option value="broken_window">Broken Window</option>
                <option value="electrical_problem">Electrical Problem</option>
                <option value="heating_issue">Heating Issue</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRoom">
              <Form.Label>Room</Form.Label>
              <Form.Control
                as="select"
                name="room"
                value={selectedRequest ? selectedRequest.room : newRequest.room}
                onChange={isEditing ? handleInputChange : handleNewRequestChange}
              >
                <option value="" disabled>Select a room (Dropdown)</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="living_room">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFiles">
              <Form.Label>Attach Files</Form.Label>
              <Form.Control
                type="file"
                name="files"
                multiple
                onChange={isEditing ? handleFileChange : handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {isEditing ? (
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCreateRequest}>
              Submit Request
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TenantMaintenanceRequest;
