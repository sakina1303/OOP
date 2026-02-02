# Book Library CRUD API

A full-fledged CRUD backend application for managing a book library, built with **Node.js** and **Express**. Ideally suited for learning **Object-Oriented Programming (OOP)** principles in backend development.

## 🚀 Features

- **OOP Pattern**: Clean architecture using Controllers, Services, and Repositories.
- **Complete CRUD**: Create, Read (List + Single), Update, Delete books.
- **Authentication**: Secure User Registration and Login using JWT (JSON Web Tokens).
- **Search & Filter**: Search books by title/author and filter by genre.
- **Sorting & Pagination**: Efficient data handling for large lists.
- **Frontend**: Includes a basic HTML/CSS/JS frontend to test the API.
- **In-Memory Storage**: Uses a simulated database (Repository pattern) for easy setup without external dependencies.

## 🛠️ Project Structure

```bash
src/
├── config/         # Configuration files
├── controllers/    # Route handlers (Class interfaces)
├── middlewares/    # Auth and Error handling
├── models/         # Data classes (Book, User)
├── repositories/   # Data access layer (Simulated DB)
├── routes/         # API Route definitions
├── services/       # Business logic
├── utils/          # Utility classes (AppError)
│
public/             # Frontend files (HTML/CSS/JS)
server.js           # Application entry point
```

## 📦 Installation

1.  **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd crud-project-
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Setup Environment**:
    The project comes with a default `.env` file configuration:
    ```env
    PORT=3000
    JWT_SECRET=supersecretkey
    ```

## 🏃‍♂️ usage

### 1. Start the Server

```bash
npm start
# OR for development (auto-restart)
npm run dev
```

### 2. Access the Application

Open your browser and visit: **`http://localhost:3000`**

### 3. API Endpoints

#### **Authentication**

- **POST** `/api/v1/auth/register` - Register a new account
  - Body: `{ "username": "admin", "password": "123" }`
- **POST** `/api/v1/auth/login` - Login to get a token
  - Body: `{ "username": "admin", "password": "123" }`

#### **Books**

- **GET** `/api/v1/books` - List all books (Public)
  - Query Params: `?page=1&limit=5&sort=-price&search=atsby&genre=Classic`
- **GET** `/api/v1/books/:id` - Get details of a single book (Public)
- **POST** `/api/v1/books` - Add a new book (**Protected**)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ "title": "...", "author": "...", "genre": "...", "price": 10.5, "publishedYear": 2021 }`
- **PATCH** `/api/v1/books/:id` - Update a book (**Protected**)
- **DELETE** `/api/v1/books/:id` - Delete a book (**Protected**)

## 🛡️ Architecture Note

This project strictly follows the **Controller → Service → Repository** flow:

1.  **Controller**: Receives the HTTP request, validates input, and calls the Service.
2.  **Service**: Contains the business logic (e.g., "User already exists check").
3.  **Repository**: Deals directly with the data storage (Arrays/Database).
