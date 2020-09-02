const express = require("express");
const path = require("path");
const fs = require("fs");

//setting up Express and the PORT
const app = express();
const PORT = process.env.PORT || 3000;

let savedNotes = [];

//MiddleWare for POSTing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function(req, res){
    var notes = req.body;
    
    savedNotes.push(notes);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(savedNotes), function(err){
        if(err) throw err;
        console.log("File updated.")
    })

    res.json(notes);
})

app.get("/api/notes", function(req, res){
    // res.json(savedNotes);
    fs.readFile(__dirname + "/db/db.json", function(err, data){
        if(err) throw err;
        console.log(JSON.stringify(data[i]));
    })
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});