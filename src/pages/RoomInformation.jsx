import React, { useState } from 'react';
import TenantSidebar from '../components/TenantSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../styles/TenantSide.css'; // Ensure you import your CSS file

function RoomInformation() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <TenantSidebar />
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Room Information</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of One Bedroom')}>
              <div className="image-container">
                <img src="./images/1bed.jpg" className="card-img-top" alt="One Bedroom" />
              </div>
              <div className="card-body">
                <p className="card-text">One Bedroom</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of Two Bedroom')}>
              <div className="image-container">
                <img src="./images/2bed.jpg" className="card-img-top" alt="Two Bedroom" />
              </div>
              <div className="card-body">
                <p className="card-text">Two Bedroom</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of Kitchen')}>
              <div className="image-container">
                <img src="./images/kitchen.jpg" className="card-img-top" alt="Kitchen" />
              </div>
              <div className="card-body">
                <p className="card-text">Kitchen</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of Studio')}>
              <div className="image-container">
                <img src= "./images/studio.jpg" className="card-img-top" alt="Studio" />
              </div>
              <div className="card-body">
                <p className="card-text">Studio</p>
              </div>
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Room Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default RoomInformation;
