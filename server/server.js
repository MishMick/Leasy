// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from React Native
app.use(express.json()); // Parse JSON bodies

// Sample API endpoint
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from the local server!',
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});