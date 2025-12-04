var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var Movie = require("./models/Movie");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/moviecollection")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

// Get all movies
app.get("/api/movies", function (req, res) {
    Movie.find()
        .then(function (movies) {
            res.json(movies);
        })
        .catch(function (err) {
            res.status(500).json({ error: err.message });
        });
});

// Add new movie
app.post("/api/movies", function (req, res) {
    var movie = new Movie(req.body);
    movie.save()
        .then(function (savedMovie) {
            res.json(savedMovie);
        })
        .catch(function (err) {
            res.status(400).json({ error: err.message });
        });
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Movie App running on port " + port);
});
