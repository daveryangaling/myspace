import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Email:", email);
    // Simulate sending the reset password code (replace with actual logic)
    alert('A password reset link has been sent to your email');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button label="Send Code" type="submit" className="button" />
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
