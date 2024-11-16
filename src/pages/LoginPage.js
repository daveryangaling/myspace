import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input'; 
import Button from '../components/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Debugging: Check if form values are correct
    console.log("Email:", email, "Password:", password);

    // Updated validation logic
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      console.log("Validation failed: Missing fields");
      return;
    }

    // Simulate successful login (replace with real login logic/API call)
    console.log("Login successful");

    // Redirect to dashboard (or any other page after successful login)
    navigate('/admin-dashboard'); 
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <Button label="Log In" type="submit" className="button" />
        </form>
        <Link to="/signup" className="link">Don't have an account? Sign Up</Link>
        <Link to="/forgot-password" className="link">Forgot password?</Link>
      </div>
    </div>
  );
}

export default LoginPage;
