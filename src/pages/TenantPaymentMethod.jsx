import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TenantSide.css';
import TenantSidebar from '../components/TenantSidebar';  // Make sure to import the sidebar

function TenantPaymentMethod() {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);

  // Example property prices; in a real application, these would be fetched from a database or API
  const propertyPrices = [1000, 1500, 2000]; // Example prices

  const totalAmountDue = propertyPrices.reduce((acc, price) => acc + price, 0);
  const balance = totalAmountDue - amountPaid;

  const handleAmountPaidChange = (e) => {
    setAmountPaid(parseFloat(e.target.value) || 0);
  };

  const handleSubmit = () => {
    // Here you would handle the payment process
    const success = true; // This should be the result of your payment process

    if (success) {
      setPaymentStatus('Payment was successfully sent.');
    } else {
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <TenantSidebar /> {/* Include the sidebar here */}
      
      <div className="main-content">
        <div className="payment-method-container p-3">
          <h3>Payment Method</h3>
          <div className="mb-3">
            <p>Total Amount Due: {totalAmountDue.toFixed(2)}</p>
            <label htmlFor="amountPaid">Amount Paid:</label>
            <input 
              type="number" 
              id="amountPaid" 
              className="form-control mb-2" 
              value={amountPaid} 
              onChange={handleAmountPaidChange} 
              min="0" 
              step="0.01"
            />
            <p>Balance: {balance.toFixed(2)}</p>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" />
            <label className="form-check-label" htmlFor="cash">
              Cash
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" id="gcash" value="gcash" />
            <label className="form-check-label" htmlFor="gcash">
              GCash <img src="../assets/gcas.png" alt="GCash" />
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" id="paymaya" value="paymaya" />
            <label className="form-check-label" htmlFor="paymaya">
              PayMaya <img src="../assets/maya.jpg" alt="PayMaya" />
            </label>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
          {paymentStatus && <div className="alert alert-info mt-3">{paymentStatus}</div>}
        </div>
      </div>
    </div>
  );
}

export default TenantPaymentMethod;
