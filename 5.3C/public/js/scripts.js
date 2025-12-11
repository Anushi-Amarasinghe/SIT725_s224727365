// Handle button click to fetch books
window.addEventListener('DOMContentLoaded', function() {
    const getBooksBtn = document.getElementById('getBooksBtn');
    getBooksBtn.addEventListener('click', function() {
        fetch('/api/books')
            .then(response => response.json())
            .then(data => {
                // Handle MVC response format: { statusCode, data, message }
                const books = data.data || data;
                renderBooks(books);
                // Hide book details when showing list
                document.getElementById('book-details').classList.remove('show');
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                document.getElementById('books-list').innerHTML = '<li>Error loading books</li>';
            });
    });
});

function renderBooks(books) {
    const list = document.getElementById('books-list');
    list.innerHTML = '';
    
    books.forEach(book => {
        const li = document.createElement('li');
        // Format price to show AUD currency - only title and price in list
        const price = book.price ? parseFloat(book.price).toFixed(2) + ' AUD' : 'Price not available';
        li.className = 'book-item';
        li.textContent = `${book.title} ${price}`;
        li.dataset.bookId = book.id;
        
        // Add click handler to fetch book details
        li.addEventListener('click', function() {
            // Remove selected class from all items
            document.querySelectorAll('#books-list li').forEach(item => {
                item.classList.remove('selected');
            });
            // Add selected class to clicked item
            li.classList.add('selected');
            
            // Fetch book details
            fetchBookDetails(book.id);
        });
        
        list.appendChild(li);
    });
}

function fetchBookDetails(bookId) {
    fetch(`/api/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
            // Handle MVC response format: { statusCode, data, message }
            const book = data.data || data;
            displayBookDetails(book);
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}

function displayBookDetails(book) {
    document.getElementById('detail-title').textContent = book.title || '';
    document.getElementById('detail-author').textContent = book.author || '';
    document.getElementById('detail-year').textContent = book.year || '';
    document.getElementById('detail-genre').textContent = book.genre || '';
    document.getElementById('detail-summary').textContent = book.summary || '';
    
    // Format price
    const price = book.price ? parseFloat(book.price).toFixed(2) + ' AUD' : 'Price not available';
    document.getElementById('detail-price').textContent = price;
    
    // Show book details section
    document.getElementById('book-details').classList.add('show');
}
