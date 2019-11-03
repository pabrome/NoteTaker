var express = require("express");
var path = require("path");

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//End Points
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});  