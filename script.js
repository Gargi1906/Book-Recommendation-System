const apiKey = 'AIzaSyB9C87pPgBTZIhPgHr5mq0-PS6kcGfht6A';

// Event listener for search button
document.getElementById('submitPreferences').addEventListener('click', () => {
    const genre = document.getElementById('genre').value;
    const author = document.getElementById('author').value;
    getBookRecommendations(genre, author);
});

// Fetch personalized book recommendations based on search criteria
async function getBookRecommendations(genre, author) {
    const query = `${genre} ${author}`;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=10`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayBooks(data.items);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Fetch general book recommendations on page load
function fetchBookRecommendations() {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${apiKey}&maxResults=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                displayBooks(data.items);
            } else {
                console.error('No books found');
            }
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Function to display book recommendations with links
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${volumeInfo.imageLinks?.thumbnail}" alt="Book Cover">
            <div>
                <h3>${volumeInfo.title}</h3>
                <p>${volumeInfo.authors?.join(', ')}</p>
                <p>${volumeInfo.description}</p>
                <a href="${volumeInfo.infoLink}" target="_blank">More Info</a> <!-- Link to detailed book information -->
            </div>
        `;
        bookList.appendChild(li);
    });
}

// Fetch book recommendations when the page loads
window.onload = function() {
    fetchBookRecommendations();
};
