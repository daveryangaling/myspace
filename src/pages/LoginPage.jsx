import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './bootstrap/css/bootstrap.min.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // Role: 'owner' or 'tenant'
  const [error, setError] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch registered users from JSON file
  useEffect(() => {
    fetch('/registeredUsers.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        return response.json();
      })
      .then((data) => setRegisteredUsers(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !selectedRole) {
      setError('Please fill in all fields and select a role.');
      return;
    }

    // Check if the email and password match any registered user
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    // Allow login for both registered and unregistered users
    if (user || !registeredUsers.some((user) => user.email === email)) {
      // Navigate based on selected role
      if (selectedRole === 'owner') {
        navigate('/admin-dashboard');
      } else if (selectedRole === 'tenant') {
        navigate('/tenant-dashboard');
      }
    } else {
      // Invalid email or password for registered users
      setError('Invalid email or password.');
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url('./assets/images/loginbg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: '400px', width: '100%', borderRadius: '10px' }}
      >
        <h2 className="text-center mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <button
              type="button"
              className={`btn ${selectedRole === 'owner' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedRole('owner')}
            >
              Owner
            </button>
            <button
              type="button"
              className={`btn ${selectedRole === 'tenant' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedRole('tenant')}
            >
              Tenant
            </button>
          </div>
          {error && <p className="text-danger small">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/signup" className="d-block">
            Don't have an account? Sign Up
          </Link>
          <Link to="/forgot-password" className="d-block">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
