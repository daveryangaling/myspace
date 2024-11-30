import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './bootstrap/css/bootstrap.min.css';

// Temporary in-memory storage for user data
const tempStorage = [];

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous feedback
    setError('');
    setFeedback('');

    // Validation checks
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Invalid email format. Please include "@" in your email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Save user data in the temporary storage
    tempStorage.push({ email, password });

    // Provide feedback and navigate to home
    setFeedback('Sign up successful! Redirecting...');
    setTimeout(() => navigate('/'), 1500); // Redirect after showing feedback
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger small">{error}</p>}
          {feedback && <p className="text-success small">{feedback}</p>}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/" className="d-block">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
