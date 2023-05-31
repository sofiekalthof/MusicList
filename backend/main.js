var $lsnuL$dotenv = require("dotenv");
var $lsnuL$express = require("express");
var $lsnuL$cors = require("cors");
var $lsnuL$mongodb = require("mongodb");


$lsnuL$dotenv.config();



var $43d7963e56408b24$require$MongoClient = $lsnuL$mongodb.MongoClient;

var $43d7963e56408b24$require$ObjectId = $lsnuL$mongodb.ObjectId;
// Create Express app
const $43d7963e56408b24$var$app = $lsnuL$express();
// Add CORS to all routes and methods
$43d7963e56408b24$var$app.use($lsnuL$cors());
// Enable parsing of JSON bodies
$43d7963e56408b24$var$app.use($lsnuL$express.json());
// Initialize parameters
// const port = eval("process.env.PORT") || 3600;
const $43d7963e56408b24$var$port = 3600;
const $43d7963e56408b24$var$dbName = "mean-musiclist";
const $43d7963e56408b24$var$collectionName = "musiclist";
// database connection string
const $43d7963e56408b24$var$dbUrl = "mongodb+srv://Sofie:bgtqlt3qPp6Pith9@meanstacktestcluster.4s1iu9n.mongodb.net/?retryWrites=true&w=majority";
let $43d7963e56408b24$var$dbConnection;
// Define server routes
// List all passwords
// TODO: Task - Write whole GET Request
$43d7963e56408b24$var$app.route("/music").get(async (req, res)=>{
    let passwords = [];
    passwords = await $43d7963e56408b24$var$dbConnection.collection($43d7963e56408b24$var$collectionName).find().toArray();
    res.json(passwords);
});
// Get a title
$43d7963e56408b24$var$app.route("/music/:id").get(async (req, res)=>{
    const id = req.params.id;
    const result = await $43d7963e56408b24$var$dbConnection.collection($43d7963e56408b24$var$collectionName).findOne({
        _id: new $43d7963e56408b24$require$ObjectId(id)
    });
    if (!result) {
        res.status(404).json({
            error: "Could not find"
        });
        return;
    }
    res.json(result);
});
// Create a new title
$43d7963e56408b24$var$app.route("/music").post(async (req, res)=>{
    const doc = req.body;
    const result = await $43d7963e56408b24$var$dbConnection.collection($43d7963e56408b24$var$collectionName).insertOne(doc);
    res.status(201).json({
        _id: result.insertedId
    });
});
// Update a title
$43d7963e56408b24$var$app.route("/music/:id").put(async (req, res)=>{
    const id = req.params.id;
    const doc = req.body;
    // make sure the id field is correct object type
    doc._id = new $43d7963e56408b24$require$ObjectId(id);
    const result = await $43d7963e56408b24$var$dbConnection.collection($43d7963e56408b24$var$collectionName).updateOne({
        _id: new $43d7963e56408b24$require$ObjectId(id)
    }, {
        $set: doc
    });
    if (result.matchedCount == 0) {
        res.status(404).json({});
        return;
    }
    res.json({});
});
// Delete a title
$43d7963e56408b24$var$app.route("/music/:id").delete(async (req, res)=>{
    const id = req.params.id;
    // TODO: Task - Write delete query only
    await $43d7963e56408b24$var$dbConnection.collection($43d7963e56408b24$var$collectionName).deleteOne({
        _id: new $43d7963e56408b24$require$ObjectId(id)
    });
    res.json({});
});
// Start server and listen for requests
$43d7963e56408b24$var$app.listen($43d7963e56408b24$var$port, function() {
    console.log("Listening on " + $43d7963e56408b24$var$port + ".");
});
// database connection
$43d7963e56408b24$require$MongoClient.connect($43d7963e56408b24$var$dbUrl).then((client)=>{
    $43d7963e56408b24$var$dbConnection = client.db($43d7963e56408b24$var$dbName);
}).catch((err)=>{
    console.log(err);
});


//# sourceMappingURL=main.js.map
