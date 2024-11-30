import React, { useState } from 'react';
import TenantSidebar from '../components/TenantSidebar';
import './bootstrap/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function RoomInformation() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="main-content">
    <div className="container-fluid">
      <TenantSidebar />
      <div className="col" style={{ marginLeft: '250px' }}>
        {/* Main content area */}
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of One Bedroom')}>
              <img src="../assets/1bed.jpg" className="card-img-top" alt="One Bedroom" />
              <div className="card-body">
                <p className="card-text">One Bedroom</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of Two Bedroom')}>
              <img src="../assets/2bed.jpg" className="card-img-top" alt="Two Bedroom" />
              <div className="card-body">
                <p className="card-text">Two Bedroom</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of Kitchen')}>
              <img src="../assets/kitchen.jpg" className="card-img-top" alt="Kitchen" />
              <div className="card-body">
                <p className="card-text">Kitchen</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" onClick={() => handleShowModal('Description of Studio')}>
              <img src="../assets/studio.jpg" className="card-img-top" alt="Studio" />
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
    </div>
  );
}

export default RoomInformation;
