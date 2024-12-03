import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import TenantSidebar from '../components/TenantSidebar';
import '../styles/TenantSide.css';

const TenantDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [userName, setUserName] = useState('');
  const [editing, setEditing] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setProperties(data));

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedSelectedProperties = JSON.parse(localStorage.getItem('selectedProperties')) || [];
    setSelectedProperties(storedSelectedProperties);
  }, []);

  const handleEditClick = () => setEditing(true);
  const handleSaveClick = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('selectedProperties', JSON.stringify(selectedProperties));
    setEditing(false);
  };

  const handleCheckboxChange = (property) => {
    if (selectedProperties.includes(property)) {
      setSelectedProperties(selectedProperties.filter(item => item !== property));
    } else {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container d-flex">
      <TenantSidebar userName={userName} setUserName={setUserName} />

      <div className="main-content flex-grow-1 p-3">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Tenant Dashboard</h2>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search properties"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" className="ml-2" onClick={() => setEditing(true)}>Edit Dashboard Information</Button>
          </Form>
        </header>

        {editing && (
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="formUserName">
                <Form.Label className="mr-2">User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="text-right">
              <Button onClick={handleSaveClick} className="mr-2">Save</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </Col>
          </Row>
        )}
        
        <Container fluid>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Rent</th>
                <th>Lease Start</th>
                <th>Lease End</th>
                {editing && <th>Select</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property, index) => (
                selectedProperties.includes(property.name) || editing ? (
                  <tr key={index}>
                    <td>{property.name}</td>
                    <td>{property.address}</td>
                    <td>{property.rent}</td>
                    <td>{property.leaseStart}</td>
                    <td>{property.leaseEnd}</td>
                    {editing && (
                      <td>
                        <Form.Check
                          type="checkbox"
                          label="Select"
                          checked={selectedProperties.includes(property.name)}
                          onChange={() => handleCheckboxChange(property.name)}
                        />
                      </td>
                    )}
                  </tr>
                ) : null
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default TenantDashboard;
