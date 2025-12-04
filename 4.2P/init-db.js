var mongoose = require('mongoose');
var Movie = require('./models/Movie');

var sampleMovies = [
    {
        title: "Scooby-Doo: Mystery Adventures",
        genre: "Mystery Comedy",
        director: "Raja Gosnell",
        releaseYear: 2002,
        rating: 7.2,
        posterUrl: "images/scooby.jpeg",
        synopsis: "A fun and light-hearted mystery story where a group of friends — and their iconic talking dog — team up to solve spooky puzzles. Full of humour, teamwork, and classic 'Scooby snacks' moments."
    },
    {
        title: "Alvin & Chipmunks: The Musical Journey",
        genre: "Musical Comedy",
        director: "Tim Hill",
        releaseYear: 2007,
        rating: 6.5,
        posterUrl: "images/alvin.jpeg",
        synopsis: "A lively comedy featuring three musical chipmunks who bring chaos, energy, and plenty of catchy songs wherever they go. A perfect mix of music, friendship, and funny moments."
    },
    {
        title: "Moana: Voyage of the Oceans",
        genre: "Adventure Animation",
        director: "Ron Clements & John Musker",
        releaseYear: 2016,
        rating: 8.9,
        posterUrl: "images/moana.jpeg",
        synopsis: "An inspiring adventure about a brave young girl who sets sail across the ocean to save her island. The story highlights courage, culture, and discovering who you truly are."
    }
];

mongoose.connect("mongodb://localhost:27017/moviecollection")
    .then(function () {
        console.log("Connected to MongoDB");
        return Movie.deleteMany({});
    })
    .then(function () {
        console.log("Cleared existing movies");
        return Movie.insertMany(sampleMovies);
    })
    .then(function (movies) {
        console.log("Inserted " + movies.length + " sample movies");
        console.log("Database initialized successfully!");
        process.exit(0);
    })
    .catch(function (err) {
        console.log("Error:", err);
        process.exit(1);
    });
