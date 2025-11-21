// Load Express and path module
const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// Create a GET endpoint at /add
app.get('/add', (req, res) => {
    // Read query parameters a and b
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    // Check if values are valid numbers
    if (isNaN(a) || isNaN(b)) {
        return res.send("Error: Please provide valid numbers for a and b. Example: /add?a=5&b=10");
    }

    // Calculate the sum
    const sum = a + b;

    // Return result
    res.send(`The sum of ${a} and ${b} is ${sum}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
