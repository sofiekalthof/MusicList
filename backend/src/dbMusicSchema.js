const mongoose = require("./dbConnection.js");

// Initialize parameters
const collectionName = process.env.DB_COLLECTION;

// Create mongoose schema
const musicSchema = new mongoose.Schema({
    //Task 1.2 Starts here

    // Task 1.2 Ends here
})

// Create model from schema
let musicModel = mongoose.model(collectionName, schema=musicSchema, collectionName);

// Export model
module.exports = musicModel;