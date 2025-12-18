
const books = [
    {
        id: 'b1',
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        year: 2008,
        genre: 'Science Fiction',
        summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics."
    },
    {
        id: 'b2',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        genre: 'Classic',
        summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester's secret and forging her own independence."
    },
    {
        id: 'b3',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Classic',
        summary: 'Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage.'
    },
    {
        id: 'b4',
        title: 'The English Patient',
        author: 'Michael Ondaatje',
        year: 1992,
        genre: 'Historical Fiction',
        summary: 'In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss.'
    },
    {
        id: 'b5',
        title: 'Small Gods',
        author: 'Terry Pratchett',
        year: 1992,
        genre: 'Fantasy',
        summary: 'In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief. The Discworld is flat and is orbited by its sun, but Omnian doctrine says that the world is round and orbits the sun.'
    }
];

function getAllBooks() {
    return books;
}

function getBookById(id) {
    return books.find(book => book.id === id);
}

/**
 * Simple reusable calculation function that can be unit tested.
 * Calculates the discounted price given an original price and a discount percentage.
 *
 * @param {number} originalPrice - The original price of the item
 * @param {number} discountPercent - The discount as a percentage (0 - 100)
 * @returns {number} - The final price after applying the discount
 * @throws {Error} - If inputs are invalid
 */
function calculateDiscountedPrice(originalPrice, discountPercent) {
    if (typeof originalPrice !== 'number' || typeof discountPercent !== 'number') {
        throw new Error('Price and discount must be numbers');
    }

    if (originalPrice < 0) {
        throw new Error('Price cannot be negative');
    }

    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error('Discount percent must be between 0 and 100');
    }

    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;

    // Round to 2 decimal places to avoid floating point precision issues
    return Math.round(finalPrice * 100) / 100;
}

module.exports = {
    getAllBooks,
    getBookById,
    calculateDiscountedPrice
};

