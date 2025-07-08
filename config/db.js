require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB Atlas connection URL
const atlasUri = process.env.MONGODB_ATLAS_URI;

if (!atlasUri) {
  console.error('MongoDB Atlas URI is not defined. Please set MONGODB_ATLAS_URI in your .env file');
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const db = mongoose.connection;

// Error handling
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Connection established
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;
