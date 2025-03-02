import express from 'express';
import cors from 'cors';
import { supabase } from './supabase.js';

// server/server.js

const app = express();
const port = 3000;
// Middleware
app.use(cors()); // Allow cross-origin requests from React Native
app.use(express.json()); // Parse JSON bodies

//const listings = require('../data/listings.json');

const fetchListings = async () => {
  const { data, error } = await supabase.from('listings').select('*');
  
  if (error) console.error(error);
  return data;
};

const createListing = async (listing) => {
  const { data, error } = await supabase.from('listings').insert([listing]);

  if (error) console.error(error);
  return data;
};

const fetchListingById = async (id) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single(); // Ensures only one record is returned

  if (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
  return data;
};

// GET listings API endpoint
app.get('/api/listings', (req, res) => {
  fetchListings()
    .then(listings => {
      console.log("Listings ", listings);
      res.json({
        result: listings,
        success: true,
      });
    })
    .catch(error => {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Get listing by id API endpoint
app.get('/api/listings/:id', (req, res) => {
  const itemId = req.params.id;

  fetchListingById(itemId)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(error => {
      console.error('Error fetching listing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
