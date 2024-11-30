const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const feedbackFilePath = path.join(__dirname, 'public', 'feedbacks.json');

// Endpoint to handle feedback submission
app.post('/api/feedbacks', (req, res) => {
  const newFeedback = req.body;

  fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read feedbacks file' });
    }

    const feedbacks = JSON.parse(data);
    feedbacks.push(newFeedback);

    fs.writeFile(feedbackFilePath, JSON.stringify(feedbacks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save feedback' });
      }

      res.status(201).json(newFeedback);
    });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
