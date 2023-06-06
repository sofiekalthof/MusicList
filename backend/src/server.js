const express = require("express");
const cors = require("cors");
const musicModel = require("./dbMusicSchema.js");

// Define port
const port = 3600;

// Create Express app
const app = express();

// Add CORS to all routes and methods
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// Start listening to the port
app.listen(port, () => {
    console.log("Listening on " + port + ".");
  }); 

// Get all music
app.route("/music").get(async (req, res) => {
    let music = [];
    try{
      music = await musicModel.find({});
      res.status(201).json(music);
    } catch(err) {
      res.status(500).send(err);
    }
});

// Get a specific music title
app.route("/music/:id").get(async (req, res) => {
    const id = req.params.id;

    try{
      const result = await musicModel.findById(id);

      if (!result) {
        res.status(404).json({ error: "Searched music not found" });
        return;
      }
      res.status(201).json(result);
    } catch(err) {
      res.status(500).send(err);
    }
});

// Create a new music
app.route("/music").post(async (req, res) => {
    const doc = new musicModel(req.body);
    console.log(doc);
    try {
      await doc.save();
      
      res.status(201).json({ message: "New music created" });
    } catch(err) {
      res.status(500).send(err);
    }
  });

// Update music
app.route("/music/:id").put(async (req, res) => {
    const id = req.params.id;
    const docBody = req.body;

    try {
      const result = await musicModel.findByIdAndUpdate(id, docBody);

      if (result.matchedCount == 0) {
        res.status(404).json({ error: "Could not find music to update" });
        return;
      }
      res.status(201).json(result);
    } catch(err) {
      res.status(500).send(err);
    }
  });

// Delete music
app.route("/music/:id").delete(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await musicModel.findByIdAndDelete(id);

      if (!result) {
        res.status(404).json({ error: "Music not found" });
      }
      res.status(201).send(result);
    } catch(err) {
      res.status(500).send(err);
    }
  });
