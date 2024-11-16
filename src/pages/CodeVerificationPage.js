import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function CodeVerificationPage() {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Verification Code:", code);
    // Simulate resetting password (replace with real logic)
    alert('Password reset successful');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Code Verification</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button label="Reset Password" type="submit" className="button" />
        </form>
      </div>
    </div>
  );
}

export default CodeVerificationPage;
