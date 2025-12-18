const expect = require('chai').expect;
const bookService = require('../services/books.service');

describe('Book price calculation', function () {
    it('should calculate discounted price correctly for valid inputs', function () {
        const result = bookService.calculateDiscountedPrice(100, 10);
        expect(result).to.equal(90);
    });

    it('should handle 0% discount as an edge case', function () {
        const result = bookService.calculateDiscountedPrice(59.99, 0);
        expect(result).to.equal(59.99);
    });

    it('should throw an error for negative prices', function () {
        expect(() => bookService.calculateDiscountedPrice(-10, 20)).to.throw('Price cannot be negative');
    });

    it('should throw an error when discount is greater than 100%', function () {
        expect(() => bookService.calculateDiscountedPrice(100, 150)).to.throw('Discount percent must be between 0 and 100');
    });
});


