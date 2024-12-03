import React, { useEffect, useState } from "react";
import "../styles/TenantSide.css";
import TenantSidebar from "../components/TenantSidebar";
import { Button, Form, Image, Row, Col } from "react-bootstrap";

function TenantInformation() {
  const [tenantData, setTenantData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("/tenantData.json")
      .then((response) => response.json())
      .then((data) => setTenantData(data));
  }, []);

  const handleEditClick = () => setEditing(true);
  const handleSaveClick = () => {
    // Save tenantData logic here
    setEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTenantData({ ...tenantData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container">
      <TenantSidebar />
      <main className="main-content">
        <header>
          <h2>Tenant Profile</h2>
          {editing ? (
            <>
              <Button onClick={handleSaveClick}>Save</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={handleEditClick}>Edit Information</Button>
          )}
        </header>

        <div className="tenant-info">
          <Row>
            <Col md={8}>
              <div className="info-card">
                <Form className="tenant-form">
                  <Form.Group>
                    <Form.Label htmlFor="tenantName">Tenant Name:</Form.Label>
                    <Form.Control
                      type="text"
                      id="tenantName"
                      value={tenantData.tenantName || ""}
                      readOnly={!editing}
                      onChange={(e) =>
                        setTenantData({ ...tenantData, tenantName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control
                      type="text"
                      id="address"
                      value={tenantData.address || ""}
                      readOnly={!editing}
                      onChange={(e) =>
                        setTenantData({ ...tenantData, address: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="contactNumber">Contact Number:</Form.Label>
                    <Form.Control
                      type="text"
                      id="contactNumber"
                      value={tenantData.contactNumber || ""}
                      readOnly={!editing}
                      onChange={(e) =>
                        setTenantData({ ...tenantData, contactNumber: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="email">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      value={tenantData.email || ""}
                      readOnly={!editing}
                      onChange={(e) =>
                        setTenantData({ ...tenantData, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="gender">Gender:</Form.Label>
                    <Form.Control
                      type="text"
                      id="gender"
                      value={tenantData.gender || ""}
                      readOnly={!editing}
                      onChange={(e) =>
                        setTenantData({ ...tenantData, gender: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="birthday">Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      id="birthday"
                      value={tenantData.birthday || ""}
                      readOnly={!editing}
                      onChange={(e) =>
                        setTenantData({ ...tenantData, birthday: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
              </div>
            </Col>
            <Col md={4} className="text-center">
              {tenantData.profilePicture && (
                <Image src={tenantData.profilePicture} roundedCircle alt="Profile Picture" width="150" height="150" />
              )}
              {editing && (
                <Form.Group>
                  <Form.Label htmlFor="profilePicture">Profile Picture:</Form.Label>
                  <Form.Control
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </Form.Group>
              )}
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
}

export default TenantInformation;
