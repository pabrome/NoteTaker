const express = require("express");
const path = require("path");
const fs = require("fs")


var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

//End Points
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    noteData = JSON.parse(fs.readFileSync("db/db.json"));
    res.json(noteData);
});

app.post("/api/notes", function(req, res) {
    newNote = req.body;
    noteData = JSON.parse(fs.readFileSync("db/db.json"));
    noteData.push(newNote);
    fs.writeFileSync("db/db.json",JSON.stringify(noteData));
});

app.delete("/api/notes", function(req, res) {
    noteTitle = req.body.title;
    console.log(noteTitle)
    noteData = JSON.parse(fs.readFileSync("db/db.json"));
    noteData = noteData.filter(note => note.title != noteTitle);
    fs.writeFileSync("db/db.json",JSON.stringify(noteData))
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});  