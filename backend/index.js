var $acq34$express = require("express");
var $acq34$cors = require("cors");
var $acq34$mongoose = require("mongoose");
var $acq34$dotenv = require("dotenv");



var $8f4b427d0f3a62da$exports = {};
var $cbca93fa3933a6d7$exports = {};


$acq34$dotenv.config();
// Initialize parameters
const $cbca93fa3933a6d7$var$dbName = "mean-musiclist";
// database connection string
const $cbca93fa3933a6d7$var$dbUrl = "mongodb+srv://Sofie:bgtqlt3qPp6Pith9@meanstacktestcluster.4s1iu9n.mongodb.net/?retryWrites=true&w=majority";
// create database connection
$acq34$mongoose.connect($cbca93fa3933a6d7$var$dbUrl, {
    dbName: $cbca93fa3933a6d7$var$dbName
}).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB", err);
});
$cbca93fa3933a6d7$exports = $acq34$mongoose;


// Initialize parameters
const $8f4b427d0f3a62da$var$collectionName = "musiclist";
// Create mongoose schema
const $8f4b427d0f3a62da$var$musicSchema = new $cbca93fa3933a6d7$exports.Schema({
    //Task 1.2 Starts here
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
let $8f4b427d0f3a62da$var$musicModel = $cbca93fa3933a6d7$exports.model($8f4b427d0f3a62da$var$collectionName, schema = $8f4b427d0f3a62da$var$musicSchema, $8f4b427d0f3a62da$var$collectionName);
// Export model
$8f4b427d0f3a62da$exports = $8f4b427d0f3a62da$var$musicModel;


// Define port
const $bd295355364a39aa$var$port = 3600;
// Create Express app
const $bd295355364a39aa$var$app = $acq34$express();
// Add CORS to all routes and methods
$bd295355364a39aa$var$app.use($acq34$cors());
// Enable parsing of JSON bodies
$bd295355364a39aa$var$app.use($acq34$express.json());
// Start listening to the port
$bd295355364a39aa$var$app.listen($bd295355364a39aa$var$port, ()=>{
    console.log("Listening on " + $bd295355364a39aa$var$port + ".");
});
// Get all music
// Task 2.2 Starts here
$bd295355364a39aa$var$app.route("/music").get(async (req, res)=>{
    let music = [];
    try {
        music = await $8f4b427d0f3a62da$exports.find({});
        res.status(201).json(music);
    } catch (err) {
        res.status(500).send("Server Error. Request could not be fulfilled.");
    }
});
// Task 2.2 Ends here
// Get a specific music title
$bd295355364a39aa$var$app.route("/music/:id").get(async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await $8f4b427d0f3a62da$exports.findById(id);
        if (!result) {
            res.status(404).json({
                error: "Searched music not found"
            });
            return;
        }
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Server Error. Request could not be fulfilled.");
    }
});
// Create a new music
$bd295355364a39aa$var$app.route("/music").post(async (req, res)=>{
    const doc = new $8f4b427d0f3a62da$exports(req.body);
    try {
        await doc.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(500).send("Server Error. Request could not be fulfilled.");
    }
});
// Update music
$bd295355364a39aa$var$app.route("/music/:id").put(async (req, res)=>{
    const id = req.params.id;
    const docBody = req.body;
    try {
        const result = await $8f4b427d0f3a62da$exports.findByIdAndUpdate(id, docBody);
        if (result.matchedCount == 0) {
            res.status(404).json({
                error: "Could not find music to update"
            });
            return;
        }
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Server Error. Request could not be fulfilled.");
    }
});
// Delete music
$bd295355364a39aa$var$app.route("/music/:id").delete(async (req, res)=>{
    const id = req.params.id;
    try {
        // Task 2.1 Starts here
        const result = await $8f4b427d0f3a62da$exports.findByIdAndDelete(id);
        // Task 2.1 Ends here
        if (!result) res.status(404).json({
            error: "Music not found"
        });
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Server Error. Request could not be fulfilled.");
    }
});


//# sourceMappingURL=index.js.map
