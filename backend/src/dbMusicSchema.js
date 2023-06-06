const mongoose = require("./dbConnection.js");

// Initialize parameters
const collectionName = process.env.DB_COLLECTION;

// Create mongoose schema
const musicSchema = new mongoose.Schema({
  category: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Create model from schema
let musicModel = mongoose.model(collectionName, schema=musicSchema, collectionName);

// Export model
module.exports = musicModel;