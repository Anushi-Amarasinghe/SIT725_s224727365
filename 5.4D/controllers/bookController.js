// Import the service
const bookService = require('../services/books.service');

// Controller uses the service to get data
exports.getAllBooks = async (_req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json({
            statusCode: 200,
            data: books,
            message: 'Books retrieved successfully'
        });
    } catch (err) {
        next(err);
    }
};

// Controller uses the service to get book by id
exports.getBookById = async (req, res, next) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Book not found',
                message: 'Book with the given ID does not exist'
            });
        }
        res.status(200).json({
            statusCode: 200,
            data: book,
            message: 'Book retrieved successfully'
        });
    } catch (err) {
        next(err);
    }
};

// Controller for creating a new book
exports.createBook = async (req, res, next) => {
    try {
        // Extract only allowed fields
        const allowedFields = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];
        const bookData = {};
        
        // Check for extra fields
        const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
        if (extraFields.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: `Unexpected fields: ${extraFields.join(', ')}. Only allowed fields are: ${allowedFields.join(', ')}`
            });
        }
        
        // Copy only allowed fields
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                bookData[field] = req.body[field];
            }
        });
        
        const book = await bookService.createBook(bookData);
        res.status(201).json({
            statusCode: 201,
            data: book,
            message: 'Book created successfully'
        });
    } catch (err) {
        // Handle duplicate key error (MongoDB unique constraint)
        if (err.code === 11000 || (err.name === 'MongoServerError' && err.message && err.message.includes('duplicate key'))) {
            return res.status(409).json({
                statusCode: 409,
                error: 'Conflict',
                message: 'A book with this ID already exists'
            });
        }
        
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message).join('; ');
            return res.status(400).json({
                statusCode: 400,
                error: 'Validation Error',
                message: errors
            });
        }
        
        next(err);
    }
};

// Controller for updating an existing book
exports.updateBook = async (req, res, next) => {
    try {
        // Extract only allowed fields (excluding id as it's immutable)
        const allowedFields = ['title', 'author', 'year', 'genre', 'summary', 'price'];
        const updateData = {};
        
        // Check for extra fields
        const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key) && key !== 'id');
        if (extraFields.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: `Unexpected fields: ${extraFields.join(', ')}. Only allowed fields are: ${allowedFields.join(', ')}. Note: id field cannot be changed.`
            });
        }
        
        // Reject id field if present in update
        if (req.body.id !== undefined) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'ID field is immutable and cannot be changed'
            });
        }
        
        // Copy only allowed fields
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });
        
        const book = await bookService.updateBook(req.params.id, updateData);
        if (!book) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Book with the given ID does not exist'
            });
        }
        
        res.status(200).json({
            statusCode: 200,
            data: book,
            message: 'Book updated successfully'
        });
    } catch (err) {
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message).join('; ');
            return res.status(400).json({
                statusCode: 400,
                error: 'Validation Error',
                message: errors
            });
        }
        
        next(err);
    }
};

