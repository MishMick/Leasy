// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from React Native
app.use(express.json()); // Parse JSON bodies

const listings = require('../data/listings.json')

// Sample API endpoint
app.get('/api/listings', (req, res) => {
  res.json({
    result: listings,
    success: true,
  });
});

// Sample API endpoint
app.get('/api/listings/:id', (req, res) => {
  const itemId = req.params.id;
  const item = listings.find(item => item.id === parseInt(itemId));

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
