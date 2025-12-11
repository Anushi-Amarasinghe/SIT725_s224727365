// Service handles the actual data (MongoDB database)
// Only queries - returns plain objects

const Book = require('../models/Book');

async function getAllBooks() {
    const books = await Book.find({});
    // Convert Decimal128 price to string for JSON serialization
    return books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year,
        genre: book.genre,
        summary: book.summary,
        price: book.price ? book.price.toString() : null
    }));
}

async function getBookById(id) {
    const book = await Book.findOne({ id: id });
    if (!book) {
        return null;
    }
    // Convert Decimal128 price to string for JSON serialization
    return {
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year,
        genre: book.genre,
        summary: book.summary,
        price: book.price ? book.price.toString() : null
    };
}

module.exports = {
    getAllBooks,
    getBookById
};

