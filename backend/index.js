require('dotenv').config()
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

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


let dbConnection;

// Define server routes
// Task 2.2 Starts here
app.route("/music").get(async (req, res) => {
    let music = [];
  
    music = await dbConnection
                            .collection(collectionName)
                            .find()
                            .toArray();

    res.status(201).json(music);
});
// Task 2.2 Ends here

// Get a title
app.route("/music/:id").get(async (req, res) => {
    const id = req.params.id;
    const result = await dbConnection
                        .collection(collectionName)
                        .findOne({_id: new ObjectId(id)});
  
    if (!result) {
      res.status(404).json({ error: "Could not find music with that title" });
      return;
    }
  
    res.status(201).json(result);
});

// Create a new title
app.route("/music").post(async (req, res) => {
    const doc = req.body;
    const result = await dbConnection.collection(collectionName)
                                        .insertOne(doc);
    res.status(201).json({ _id: result.insertedId });
  });

// Update a title
app.route("/music/:id").put(async (req, res) => {
    const id = req.params.id;
    const doc = req.body;

    // make sure the id field is correct object type
    doc._id = new ObjectId(id);

    const result = await dbConnection.collection(collectionName)
                                        .updateOne({ _id: new ObjectId(id) }, { $set: doc });
  
    if (result.matchedCount == 0) {
      res.status(404).json({ error: "could not find the music to update" });
      return;
    }
  
    res.status(201).json(result);
  });

  // Delete a title
app.route("/music/:id").delete(async (req, res) => {
    const id = req.params.id;
  
    // Task 2.1 Starts here
    const result = await dbConnection.colection(collectionName)
                                        .deleteOne({ _id: new ObjectId(id) });
    
    // Task 2.2 Ends here
    if (!result) {
      res.status(404).json({ error: "Could not find music to delete" });
      return;
    }
  
    res.status(201).json(result);
  });

  
// Start server and listen for requests
app.listen(port, function () {
    console.log("Listening on " + port + ".");
  });

// database connection
MongoClient.connect(dbUrl)
  .then(client => {
    dbConnection = client.db(dbName)
  })
  .catch(err => {
    console.log(err)
  })