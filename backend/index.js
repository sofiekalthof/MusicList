require('dotenv').config()
const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

// Create Express app
const app = express();

// Add CORS to all routes and methods
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// Initialize parameters
// const port = eval("process.env.PORT") || 3600;
const port = 3600;
const dbName = process.env.DB_NAME;
const collectionName = process.env.DB_COLLECTION;

// database connection string
const dbUrl = process.env.MONGODB_URL;

// create database connection
mongoose.connect(dbUrl, {
  dbName: dbName
  })
  .then(() => {
    console.log("Connected to DB");
    // start listening to the port
    app.listen(port, () => {
      console.log("Listening on " + port + ".");
    });  
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

// schema for music list​
const musicListSchema= new mongoose.Schema({
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

// create model from schema
const musicListModel = mongoose.model(collectionName, schema=musicListSchema);

// Define server routes
// Task 2.2 Starts here
app.route("/music").get(async (req, res) => {
    try {
      let music = [];
      music = await musicListModel.find({});

      res.status(201).json(music);
    } catch(err) {
      res.status(500).json(err);
    }
});
// Task 2.2 Ends here

// Get a title
app.route("/music/:id").get(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await musicListModel.findOne({ _id = new ObjectId(id)});

      if (!result) {
        res.status(404).json({ error: "Could not find music with that title" });
        return;
      }

      res.status(201).json(result);
    } catch(err) {
      res.status(500).json(err);
    }
});

// Create a new title
app.route("/music").post(async (req, res) => {
    const doc = req.body;

    try {
      const newDoc = musicListModel(doc);
      const result = await newDoc.save();

      res.status(201).json({ _id: result.insertedId });
    } catch(err) {
      res.status(500).json(err);
    } 
});

// Update a title
app.route("/music/:id").put(async (req, res) => {
    const id = req.params.id;
    const doc = req.body;

    try {
      const result = await musicListModel.findByIdAndUpdate(id, doc);
    
      if (result.matchedCount == 0) {
        res.status(404).json({ error: "could not find the music to update" });
        return;
      }
    
      res.status(201).json(result);
    } catch(err) {
      res.status(500).json(err);
    } 
});

  // Delete a title
app.route("/music/:id").delete(async (req, res) => {
    const id = req.params.id;
  
    try {
    // Task 2.1 Starts here
    const result = await musicListModel.findByIdAndDelete(id);

    // Task 2.2 Ends here
    if (!result) {
      res.status(404).json({ error: "Could not find music to delete" });
      return;
    }

    res.status(201).json(result);
    } catch(err) {
      res.status(500).json(err);
    } 
});
