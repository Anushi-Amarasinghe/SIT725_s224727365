const expect = require('chai').expect;
const request = require('request');

// Base URL for the running Express app
// Make sure you start the server first with: npm start
const baseUrl = 'http://localhost:3000/api/books';

describe('Books API', function () {
    it('should return status 200 and a list of books', function (done) {
        request.get(baseUrl, function (error, response, body) {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const json = JSON.parse(body);
            expect(json).to.have.property('data');
            expect(json.data).to.be.an('array');
            expect(json.data.length).to.be.greaterThan(0);
            done();
        });
    });

    it('should return a single book when a valid id is provided', function (done) {
        const validId = 'b1';

        request.get(`${baseUrl}/${validId}`, function (error, response, body) {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const json = JSON.parse(body);
            expect(json).to.have.property('data');
            expect(json.data).to.be.an('object');
            expect(json.data.id).to.equal(validId);
            done();
        });
    });

    it('should return 404 when an invalid id is provided', function (done) {
        const invalidId = 'does-not-exist';

        request.get(`${baseUrl}/${invalidId}`, function (error, response, body) {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(404);

            const json = JSON.parse(body);
            expect(json).to.have.property('error');
            expect(json.error).to.equal('Book not found');
            done();
        });
    });
});


