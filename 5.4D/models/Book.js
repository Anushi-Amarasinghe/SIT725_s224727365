const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Book ID is required'],
        unique: true,
        trim: true,
        minlength: [1, 'Book ID must be at least 1 character'],
        maxlength: [50, 'Book ID must not exceed 50 characters'],
        match: [/^[a-zA-Z0-9_-]+$/, 'Book ID must contain only alphanumeric characters, hyphens, or underscores']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character'],
        maxlength: [200, 'Title must not exceed 200 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        minlength: [1, 'Author name must be at least 1 character'],
        maxlength: [100, 'Author name must not exceed 100 characters'],
        match: [/^[a-zA-Z\s\.'-]+$/, 'Author name must contain only letters, spaces, periods, hyphens, or apostrophes']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1000, 'Year must be at least 1000'],
        validate: {
            validator: function(value) {
                if (!Number.isInteger(value)) {
                    return false;
                }
                const currentYear = new Date().getFullYear();
                return value <= currentYear;
            },
            message: 'Year must be an integer and cannot be in the future'
        }
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        minlength: [1, 'Genre must be at least 1 character'],
        maxlength: [50, 'Genre must not exceed 50 characters'],
        enum: {
            values: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Biography', 'History', 'Classic', 'Historical Fiction', 'Other'],
            message: 'Genre must be one of the allowed values'
        }
    },
    summary: {
        type: String,
        required: [true, 'Summary is required'],
        trim: true,
        minlength: [10, 'Summary must be at least 10 characters'],
        maxlength: [2000, 'Summary must not exceed 2000 characters']
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Price is required'],
        validate: {
            validator: function(value) {
                if (!value) return false;
                const numValue = parseFloat(value.toString());
                return numValue > 0 && numValue <= 10000;
            },
            message: 'Price must be a positive number between 0.01 and 10000.00 AUD'
        }
    }
}, {
    strict: true, // Reject fields not defined in schema
    strictQuery: true // Reject query fields not in schema
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

