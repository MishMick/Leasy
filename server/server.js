// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from React Native
app.use(express.json()); // Parse JSON bodies

listings = [
  {
    id: 1,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+1',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+2',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 1',
    description: 'This is the first card description.',
  },
  {
    id: 2,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+2',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+3',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 2',
    description: 'This is the second card description.',
  },
  {
    id: 3,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+3',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+4',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 3',
    description: 'This is the third card description.',
  },
  {
    id: 4,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+4',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+5',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 4',
    description: 'This is the fourth card description.',
  },
  {
    id: 5,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+5',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+6',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 5',
    description: 'This is the fifth card description.',
  },
];
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
