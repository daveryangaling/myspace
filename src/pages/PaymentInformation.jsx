import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Sidebar component with navigation
import '../bootstrap/css/bootstrap.min.css'; // Corrected import path
import '../styles/App.css'; // Make sure to import the global CSS

function PaymentInformation() {
  const [tenantName, setTenantName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [leaseStart, setLeaseStart] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');
  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = () => {
    // Simulate saving process
    const success = true; // This should be the result of your save process

    if (success) {
      setSaveStatus('Payment summary was successfully saved.');
    } else {
      setSaveStatus('Failed to save payment summary. Please try again.');
    }

    console.log("Payment information saved.");
    // Here you could add code to handle saving to a database or API
  };

  return (
    <div className="container-fluid tenant-dashboard-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content-container">
        <h2 className="my-4">Payment Management</h2>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Tenant"
          />
        </div>
        <div className="card p-4 form-card">
          <h3 className="card-title">Payment Summary</h3>
          <div className="form-group">
            <label>Tenant Name:</label>
            <input
              type="text"
              className="form-control"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Room Number:</label>
            <input
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Room Type:</label>
            <input
              type="text"
              className="form-control"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Lease Start Date:</label>
            <input
              type="date"
              className="form-control"
              value={leaseStart}
              onChange={(e) => setLeaseStart(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Lease End Date:</label>
            <input
              type="date"
              className="form-control"
              value={leaseEnd}
              onChange={(e) => setLeaseEnd(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Total Amount Due:</label>
            <input
              type="number"
              className="form-control"
              value={totalAmountDue}
              onChange={(e) => setTotalAmountDue(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Amount Paid:</label>
            <input
              type="number"
              className="form-control"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="GCash">GCash</option>
            </select>
          </div>
          <div className="form-group">
            <label>Proof of Payment:</label>
            <input type="file" className="form-control-file" />
          </div>
          <div className="button-group mt-4 form-row">
            <button onClick={handleSave} className="btn btn-primary">Save</button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
          {saveStatus && <div className="alert alert-info mt-3">{saveStatus}</div>}
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;
