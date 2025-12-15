const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection - hardcoded URI as per requirements
const MONGODB_URI = "mongodb://localhost:27017/booksdb";

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import route file
const booksRoute = require('./routes/books.routes');

// Mount the route at /api/books
app.use('/api/books', booksRoute);

// Integrity check endpoint
app.get('/api/integrity-check42', (req, res) => {
    res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        statusCode: err.status || 500,
        error: err.message || 'Internal server error',
        message: 'An error occurred'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Book App running on port " + port);
});
