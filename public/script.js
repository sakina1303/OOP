const API_URL = '/api/v1';
let token = localStorage.getItem('token');
let isLoginMode = true;
let currentPage = 1;

// Elements
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const toggleAuth = document.getElementById('toggle-auth');
const authMessage = document.getElementById('auth-message');
const authBtn = document.getElementById('auth-btn');

const logoutBtn = document.getElementById('logout-btn');
const addBookForm = document.getElementById('add-book-form');
const booksBody = document.getElementById('books-body');
const searchInput = document.getElementById('search-input');
const genreInput = document.getElementById('genre-input');
const filterBtn = document.getElementById('filter-btn');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// Init
if (token) {
    showApp();
} else {
    showAuth();
}

// Auth Logic
toggleAuth.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    authTitle.textContent = isLoginMode ? 'Login' : 'Register';
    authBtn.textContent = isLoginMode ? 'Login' : 'Register';
    toggleAuth.textContent = isLoginMode ? 'Need to Register?' : 'Already have an account?';
    authMessage.textContent = '';
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (data.status === 'success') {
            if (isLoginMode) {
                token = data.token;
                localStorage.setItem('token', token);
                showApp();
            } else {
                authMessage.style.color = 'green';
                authMessage.textContent = 'Registration successful! Please login.';
                // Switch to login mode
                toggleAuth.click();
            }
        } else {
            authMessage.style.color = 'red';
            authMessage.textContent = data.message;
        }
    } catch (err) {
        authMessage.textContent = 'Error connecting to server';
    }
});

logoutBtn.addEventListener('click', () => {
    token = null;
    localStorage.removeItem('token');
    showAuth();
});

function showAuth() {
    authContainer.style.display = 'block';
    appContainer.style.display = 'none';
}

function showApp() {
    authContainer.style.display = 'none';
    appContainer.style.display = 'block';
    fetchBooks();
}

// Book Logic
async function fetchBooks() {
    const search = searchInput.value;
    const genre = genreInput.value;
    
    let url = `${API_URL}/books?page=${currentPage}&limit=5&sort=-createdAt`;
    if (search) url += `&search=${search}`;
    if (genre) url += `&genre=${genre}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.status === 'success') {
            renderBooks(data.books);
            // Simple pagination handling
            pageInfo.textContent = `Page ${currentPage} of ${data.pagination.totalPages || 1}`;
            prevPageBtn.disabled = currentPage <= 1;
            nextPageBtn.disabled = currentPage >= (data.pagination.totalPages || 1);
        }
    } catch (err) {
        console.error('Failed to fetch books', err);
    }
}

function renderBooks(books) {
    booksBody.innerHTML = '';
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>$${book.price}</td>
            <td><button class="delete-btn" onclick="deleteBook('${book.id}')">Delete</button></td>
        `;
        booksBody.appendChild(row);
    });
}

addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookData = {
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        genre: document.getElementById('book-genre').value,
        price: parseFloat(document.getElementById('book-price').value),
        publishedYear: parseInt(document.getElementById('book-year').value)
    };

    try {
        const res = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData)
        });
        const data = await res.json();
        
        if (data.status === 'success') {
            addBookForm.reset();
            fetchBooks();
        } else {
            alert(data.message || 'Error adding book');
        }
    } catch (err) {
        alert('Error adding book');
    }
});

async function deleteBook(id) {
    if (!confirm('Are you sure?')) return;
    
    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (res.status === 204) {
            fetchBooks();
        } else {
            alert('Failed to delete');
        }
    } catch (err) {
        alert('Error deleting book');
    }
}

// Filter listeners
filterBtn.addEventListener('click', () => {
    currentPage = 1;
    fetchBooks();
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchBooks();
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    fetchBooks();
});

// Expose deleteBook to window for onclick
window.deleteBook = deleteBook;
