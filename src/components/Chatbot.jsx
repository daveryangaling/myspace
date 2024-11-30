// src/components/Chatbot.js
import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const Chatbot = () => {
  return (
    <div className="chatbot-container" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)', backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="chat-window" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px', width: '400px' }}>
        <div className="chat-header" style={{ marginBottom: '20px' }}>
          <p>Hi my name is smartbot! How may I help you today?</p>
        </div>
        <div className="chat-buttons" style={{ marginBottom: '20px' }}>
          <Button variant="primary" block>Contact Agent</Button>
          <Button variant="primary" block>How can I see available rooms?</Button>
          <Button variant="primary" block>Where do I start?</Button>
        </div>
        <InputGroup>
          <FormControl
            placeholder="Enter your message..."
            aria-label="User message"
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default Chatbot;
