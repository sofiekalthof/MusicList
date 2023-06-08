// Task 1.3 Starts here
const musicListModel = require("./dbMusicSchema.js")

const exampleMussicList = [
    {"category": "rock", "title": "It's My Life", "url": "https://www.youtube.com/watch?v=vx2u5uUu3DE"},
    {"category": "rock", "title": "Seven Nation Army", "url": "https://www.youtube.com/watch?v=0J2QdDbelmY"},
    {"category": "rock", "title": "Viva La Vida", "url": "https://www.youtube.com/watch?v=dvgZkm1xWPE"}
];

async function populateDatabase(){
    try {
        await musicListModel.insertMany(exampleMussicList);

        console.log("Database populated");
    } catch(err) {
        console.log("Error updating a password", err);
    }
}

populateDatabase();
// Task 1.3 Ends here