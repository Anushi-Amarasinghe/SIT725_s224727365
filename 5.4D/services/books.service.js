// Service handles the actual data (MongoDB database)
// Only queries - returns plain objects

const mongoose = require('mongoose');
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

async function createBook(bookData) {
    // Convert price string to Decimal128
    const Decimal128 = mongoose.mongo.Decimal128 || mongoose.Types.Decimal128;
    const bookToCreate = {
        ...bookData,
        price: Decimal128.fromString(bookData.price.toString())
    };
    
    const book = new Book(bookToCreate);
    await book.save();
    
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

async function updateBook(id, bookData) {
    // Check if book exists
    const existingBook = await Book.findOne({ id: id });
    if (!existingBook) {
        return null;
    }
    
    // Convert price string to Decimal128 if provided
    const updateData = { ...bookData };
    if (updateData.price !== undefined) {
        const Decimal128 = mongoose.mongo.Decimal128 || mongoose.Types.Decimal128;
        updateData.price = Decimal128.fromString(updateData.price.toString());
    }
    
    // Update the book (id field is immutable, so it won't be updated)
    const updatedBook = await Book.findOneAndUpdate(
        { id: id },
        updateData,
        { new: true, runValidators: true }
    );
    
    // Convert Decimal128 price to string for JSON serialization
    return {
        id: updatedBook.id,
        title: updatedBook.title,
        author: updatedBook.author,
        year: updatedBook.year,
        genre: updatedBook.genre,
        summary: updatedBook.summary,
        price: updatedBook.price ? updatedBook.price.toString() : null
    };
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};

