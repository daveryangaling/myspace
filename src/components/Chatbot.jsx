// src/components/Chatbot.js
import React, { useEffect } from 'react';
//import '../styles/Chatbot.css'; // Import a CSS file for additional styling

const Chatbot = () => {
  useEffect(() => {
    // Add Chatling script to the document
    const script1 = document.createElement('script');
    script1.innerHTML = `window.chtlConfig = { chatbotId: "9782213171" }`;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://chatling.ai/js/embed.js";
    script2.async = true;
    script2.setAttribute('data-id', '9782213171');
    script2.id = 'chatling-embed-script';
    document.body.appendChild(script2);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="chatbot-container">
      <div id="chatling-embed-container" />
    </div>
  );
};

export default Chatbot;
