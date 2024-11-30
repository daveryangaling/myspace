const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json());

// A mock user store (use a database in production)
const users = {};

// POST endpoint to initiate password reset
app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Check if user exists (for demo purposes, dynamically add them if not found)
  if (!users[email]) {
    users[email] = { password: 'defaultPassword' }; // Add a default user (optional)
  }

  // Generate a unique reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  // Save token in the user's data
  users[email].resetToken = resetToken;

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'nafyang0915@gmail.com', // Replace with your email
      pass: 'Jarmen1105!', // Replace with your email password or app password
    },
  });

  try {
    // Send the reset link via email
    await transporter.sendMail({
      from: 'nafyang0915@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

// POST endpoint to verify token and reset password
app.post('/api/reset-password/verify', (req, res) => {
  const { token, email, newPassword } = req.body;

  // Validate email and token
  if (!email || !users[email] || users[email].resetToken !== token) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  // Update the password
  users[email].password = newPassword;
  delete users[email].resetToken;

  res.json({ message: 'Password successfully reset' });
});

// Start the server
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
