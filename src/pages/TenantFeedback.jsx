import React, { useState } from 'react';
import TenantSidebar from '../components/TenantSidebar'; // Import the sidebar component
import '../styles/TenantSide.css'; // Custom CSS for the feedback form

function TenantFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    property: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbacks([...feedbacks, { ...formData, id: feedbacks.length + 1 }]);
    setFormData({
      date: '',
      name: '',
      property: '',
      description: ''
    });
  };

  return (
    <div className="tenant-container">
      <TenantSidebar /> {/* Add the sidebar component here */}
      <div className="tenant-feedback">
        <h2>Provide Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Property:
            <input type="text" name="property" value={formData.property} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div className="feedback-list">
          <h3>Your Feedbacks</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>Property</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.id}>
                  <td>{feedback.id}</td>
                  <td>{feedback.date}</td>
                  <td>{feedback.name}</td>
                  <td>{feedback.property}</td>
                  <td>{feedback.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TenantFeedback;
