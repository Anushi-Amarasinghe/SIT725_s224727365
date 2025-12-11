// Import the service
const bookService = require('../services/books.service');

// Controller uses the service to get data
exports.getAllBooks = (_req, res, next) => {
    try {
        const books = bookService.getAllBooks();
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
exports.getBookById = (req, res, next) => {
    try {
        const book = bookService.getBookById(req.params.id);
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

