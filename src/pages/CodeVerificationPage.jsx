import React, { useState } from 'react';
import './bootstrap/css/bootstrap.min.css';

function CodeVerificationPage() {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Password reset successful');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Code Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="verificationCode" className="form-label">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              className="form-control"
              placeholder="Enter Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default CodeVerificationPage;
