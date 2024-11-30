import React, { useState } from 'react';
import TenantSidebar from '../components/TenantSidebar';  // Make sure you have this component
import '../bootstrap/css/bootstrap.min.css';
import '../styles/TenantSide.css';

function TenantMaintenanceRequest() {
  const [requestStatus, setRequestStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you would handle the request submission process
    const success = true; // This should be the result of your request process

    if (success) {
      setRequestStatus('Your request was sent successfully.');
    } else {
      setRequestStatus('Your request was declined. Please try again.');
    }
  };

  return (
    <div className="dashboard-container"> {/* Flex container for sidebar and main content */}
      <TenantSidebar /> {/* Ensure the sidebar is included */}

      <div className="main-content">
        <div className="container mt-5">
          <div className="card">
            <div className="card-header text-center">
              <h2>Maintenance Request</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="issue">Issue:</label>
                  <textarea
                    className="form-control"
                    id="issue"
                    rows="5"
                    placeholder="Enter Here"
                  ></textarea>
                </div>
                <div className="form-group mt-3">
                  <label>Attachment:</label>
                  <div className="d-flex justify-content-between">
                    <input type="file" className="form-control-file" />
                    <input type="file" className="form-control-file" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
              </form>
              {requestStatus && <div className="alert alert-info mt-3">{requestStatus}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantMaintenanceRequest;
