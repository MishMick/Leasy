// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from React Native
app.use(express.json()); // Parse JSON bodies

// Sample API endpoint
app.get('/api/listings', (req, res) => {
  res.json({
    result: [
      {
        id: 1,
        images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+1' }],
        title: 'Listing 1',
        description: 'This is the first card description.',
      },
      {
        id: 2,
        images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+2' }],
        title: 'Listing 2',
        description: 'This is the second card description.',
      },
      {
        id: 3,
        images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+3' }],
        title: 'Listing 3',
        description: 'This is the third card description.',
      },
      {
        id: 4,
        images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+4' }],
        title: 'Listing 4',
        description: 'This is the fourth card description.',
      },
      {
        id: 5,
        images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+5' }],
        title: 'Listing 5',
        description: 'This is the fifth card description.',
      },
    ],
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});