const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    director: String,
    releaseYear: Number,
    rating: Number,
    posterUrl: String,
    synopsis: String
});

module.exports = mongoose.model('Movie', movieSchema);
