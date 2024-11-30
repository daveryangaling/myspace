import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './bootstrap/css/bootstrap.min.css';
//import '../styles/SignUpPage.css'; // Ensure the correct CSS file path

// Temporary in-memory storage for user data
const tempStorage = [];

const SignUpPage = () => {
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-custom">
      <div className="form-container text-center">
        <div className="mb-4">
          <img src="./images/logo.png" alt="MySpace Logo" className="logo" />
          <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger small">{error}</p>}
          {feedback && <p className="text-success small">{feedback}</p>}
          <Button variant="primary" type="submit" block>
            Sign Up
          </Button>
        </Form>
        <hr />
        <Button variant="outline-danger" block>
          <i className="fab fa-google"></i> Sign Up with Google
        </Button>
        <Button variant="outline-primary" block>
          <i className="fab fa-facebook-f"></i> Sign Up with Facebook
        </Button>
        <p className="mt-3">
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
