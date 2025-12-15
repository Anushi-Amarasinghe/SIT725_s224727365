const mongoose = require('mongoose');
const Book = require('./models/Book');

// MongoDB connection - same URI as in server.js
const MONGODB_URI = "mongodb://localhost:27017/booksdb";

// Helper function to create Decimal128 from string
const Decimal128 = mongoose.mongo.Decimal128 || mongoose.Types.Decimal128;

// Sample books data with prices
const booksData = [
    {
        id: 'b1',
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        year: 2008,
        genre: 'Science Fiction',
        summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics.",
        price: Decimal128.fromString('29.99')
    },
    {
        id: 'b2',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        genre: 'Classic',
        summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester's secret and forging her own independence.",
        price: Decimal128.fromString('22.00')
    },
    {
        id: 'b3',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Classic',
        summary: 'Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage.',
        price: Decimal128.fromString('22.00')
    },
    {
        id: 'b4',
        title: 'The English Patient',
        author: 'Michael Ondaatje',
        year: 1992,
        genre: 'Historical Fiction',
        summary: 'In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss.',
        price: Decimal128.fromString('25.39')
    },
    {
        id: 'b5',
        title: 'Small Gods',
        author: 'Terry Pratchett',
        year: 1992,
        genre: 'Fantasy',
        summary: 'In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief. The Discworld is flat and is orbited by its sun, but Omnian doctrine says that the world is round and orbits the sun.',
        price: Decimal128.fromString('31.99')
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing books
        await Book.deleteMany({});
        console.log("Cleared existing books");

        // Insert books
        await Book.insertMany(booksData);
        console.log("Seeded database with 5 books");

        // Close connection
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();

