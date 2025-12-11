// Fetch books on page load
window.addEventListener('DOMContentLoaded', function() {
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            // Handle MVC response format: { statusCode, data, message }
            const books = data.data || data;
            renderBooks(books);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            document.getElementById('books-list').innerHTML = '<li>Error loading books</li>';
        });
});

function renderBooks(books) {
    const list = document.getElementById('books-list');
    list.innerHTML = '';
    
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
        `;
        list.appendChild(li);
    });
}
