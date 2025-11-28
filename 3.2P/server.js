var express = require("express");
var path = require("path");
var multer = require("multer");
var app = express();

var imagesDir = path.join(__dirname, "public/images");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var ext = path.extname(file.originalname) || "";
    cb(null, uniqueSuffix + ext.toLowerCase());
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image uploads are allowed"));
    }
  },
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// In-memory storage for movies
var movies = [
  {
    title: "Scooby-Doo: Mystery Adventures",
    image: "images/scooby.jpeg",
    link: "More Info",
    description: "A fun and light-hearted mystery story where a group of friends — and their iconic talking dog — team up to solve spooky puzzles. Full of humour, teamwork, and classic \"Scooby snacks\" moments."
  },
  {
    title: "Alvin & Chipmunks: The Musical Journey",
    image: "images/alvin.jpeg",
    link: "More Info",
    description: "A lively comedy featuring three musical chipmunks who bring chaos, energy, and plenty of catchy songs wherever they go. A perfect mix of music, friendship, and funny moments."
  },
  {
    title: "Moana: Voyage of the Oceans",
    image: "images/moana.jpeg",
    link: "More Info",
    description: "An inspiring adventure about a brave young girl who sets sail across the ocean to save her island. The story highlights courage, culture, and discovering who you truly are.ne of the best superhero films ever made."
  }
];

// GET all movies
app.get("/movies", function (req, res) {
  res.json(movies);
});

// POST - Add a new movie
app.post("/movies", function (req, res) {
  var newMovie = {
    title: req.body.title,
    image: req.body.image || "images/movie1.jpeg",
    link: req.body.link || "More Info",
    description: req.body.description
  };

  if (!newMovie.title || !newMovie.description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  movies.push(newMovie);
  res.status(201).json({ message: "Movie added successfully", movie: newMovie });
});

app.post("/upload", upload.single("movieImage"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  res.json({ imagePath: "images/" + req.file.filename });
});

app.use(function (err, req, res, next) {
  if (err) {
    console.error("Upload error:", err.message);
    return res.status(400).json({ error: err.message || "Unexpected error" });
  }
  next();
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Movie App running on port " + port);
});
