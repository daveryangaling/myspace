import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../bootstrap/css/bootstrap.min.css';
import '../styles/App.css';

function PaymentInformation() {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetch("/paymentData.json")
      .then(response => response.json())
      .then(data => setPayments(data));
  }, []);

  const handleToggleDetails = (index) => {
    if (selectedPayment === index) {
      setSelectedPayment(null);
    } else {
      setSelectedPayment(index);
    }
  };

  return (
    <div className="container-fluid tenant-dashboard-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content-container">
        <div className="card p-4 form-card">
          <h3 className="card-title">Payment Summary</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>Room</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{payment.id}</td>
                    <td>{payment.date}</td>
                    <td>{payment.tenantName}</td>
                    <td>{payment.roomNumber}</td>
                    <td>{payment.description}</td>
                    <td>
                      <span className={`badge bg-${payment.status === 'Pending' ? 'warning' : 'success'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleToggleDetails(index)}
                      >
                        {selectedPayment === index ? 'Hide Details' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {selectedPayment === index && (
                    <tr>
                      <td colSpan="7">
                        <div className="payment-details p-3">
                          <p><strong>No. of Properties:</strong> {payment.noOfProperties}</p>
                          <p><strong>Property Type:</strong> {payment.propertyType}</p>
                          <p><strong>Property Number:</strong> {payment.propertyNumber}</p>
                          <p><strong>Total Amount Due:</strong> ₱{payment.totalAmountDue}</p>
                          <p><strong>Due Date:</strong> {payment.dueDate}</p>
                          <p><strong>Method:</strong> {payment.paymentMethod}</p>
                          <p><strong>Amount Paid:</strong> ₱{payment.amountPaid}</p>
                          <p><strong>Balance:</strong> ₱{payment.balance}</p>
                          <p><strong>Proof:</strong> <a href={payment.proof} target="_blank" rel="noopener noreferrer">{payment.proof}</a></p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;
