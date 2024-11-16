import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Sidebar component with navigation
import '../styles/App.css'; // Custom styling

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

  const handleSave = () => {
    console.log("Payment information saved.");
    // Here you could add code to handle saving to a database or API
  };

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="content">
        <h2>Payment Management</h2>
        <div className="payment-form">
          <label>Tenant Name:</label>
          <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} />

          <label>Room Number:</label>
          <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />

          <label>Room Type:</label>
          <input type="text" value={roomType} onChange={(e) => setRoomType(e.target.value)} />

          <label>Lease Start Date:</label>
          <input type="date" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} />

          <label>Lease End Date:</label>
          <input type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} />

          <label>Total Amount Due:</label>
          <input type="number" value={totalAmountDue} onChange={(e) => setTotalAmountDue(e.target.value)} />

          <label>Amount Paid:</label>
          <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
            <option value="Paid">Paid</option>
          </select>

          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <div className="button-group">
            <button onClick={handleSave} className="save-button">Save</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;
