# Book Management REST API

A full-fledged CRUD backend application for managing a book library, built with **Node.js** and **Express**. This project demonstrates **Object-Oriented Programming (OOP)** principles and modern backend development best practices.

## Features

- **OOP Architecture**: Clean, maintainable code structure using Controllers, Services, and Repositories
- **Complete CRUD Operations**: Create, Read (List + Single), Update, and Delete books
- **JWT Authentication**: Secure user registration and login with JSON Web Tokens
- **Search & Filter**: Search books by title/author and filter by genre
- **Sorting & Pagination**: Efficient data handling for large datasets
- **Input Validation**: Comprehensive validation with detailed error messages
- **Error Handling**: Centralized error handling middleware
- **Frontend Interface**: Basic HTML/CSS/JavaScript frontend for testing the API
- **In-Memory Storage**: Repository pattern with simulated database for easy setup without external dependencies

## Project Structure

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

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route handlers (request/response logic)
├── middlewares/    # Authentication and error handling middleware
├── models/         # Data models (Book, User)
├── repositories/   # Data access layer (simulated database)
├── routes/         # API route definitions
├── services/       # Business logic layer
├── utils/          # Utility classes (AppError)
│
public/             # Frontend files (HTML/CSS/JS)
server.js           # Application entry point
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd CRUD-SESD
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:
   
   The project includes a default `.env` file with the following configuration:
   
   ```env
   PORT=3000
   JWT_SECRET=supersecretkey
   ```
   
   **Note**: For production environments, ensure you use a strong, unique JWT secret.

## Usage

## Usage

### Starting the Server

**Production mode**:
```bash
npm start
```

**Development mode** (with auto-restart using nodemon):
```bash
npm run dev
```

### Accessing the Application

- **Web Interface**: Open your browser and navigate to `http://localhost:3000`
- **API Base URL**: `http://localhost:3000/api/v1`

## API Endpoints

### Authentication

#### Register a New User
- **Endpoint**: `POST /api/v1/auth/register`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "123456"
  }
  ```

#### Login
- **Endpoint**: `POST /api/v1/auth/login`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "123456"
  }
  ```
- **Response**: Returns a JWT token to be used in protected routes

### Books

#### List All Books (Public)
- **Endpoint**: `GET /api/v1/books`
- **Query Parameters**:
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 10)
  - `sort` - Sort field (prefix with `-` for descending, e.g., `-price`)
  - `search` - Search by title or author
  - `genre` - Filter by genre
- **Example**: `GET /api/v1/books?page=1&limit=5&sort=-price&search=Gatsby&genre=Classic`

#### Get Single Book (Public)
- **Endpoint**: `GET /api/v1/books/:id`
- **Parameters**: `id` - Book ID

#### Create a Book (Protected)
- **Endpoint**: `POST /api/v1/books`
- **Headers**: 
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "price": 10.99,
    "publishedYear": 1925
  }
  ```

#### Update a Book (Protected)
- **Endpoint**: `PATCH /api/v1/books/:id`
- **Headers**: 
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Body**: Include only the fields you want to update
  ```json
  {
    "price": 12.99
  }
  ```

#### Delete a Book (Protected)
- **Endpoint**: `DELETE /api/v1/books/:id`
- **Headers**: 
  ```
  Authorization: Bearer <your-jwt-token>
  ```

## Architecture Overview

This project follows a layered architecture pattern with clear separation of concerns:

### Request Flow

```
Request → Routes → Controller → Service → Repository → Data Storage
```

### Layer Responsibilities

1. **Controller Layer** (`src/controllers/`)
   - Handles HTTP requests and responses
   - Validates input data
   - Calls appropriate service methods
   - Returns formatted responses

2. **Service Layer** (`src/services/`)
   - Contains business logic
   - Performs data validation and processing
   - Coordinates between controllers and repositories
   - Handles complex operations

3. **Repository Layer** (`src/repositories/`)
   - Direct interaction with data storage
   - Performs CRUD operations
   - Abstracts data access logic
   - Enables easy switching between storage solutions

### Benefits of This Architecture

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Each layer can be tested independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features or modify existing ones
- **Reusability**: Services and repositories can be reused across different controllers

## Development Best Practices

- **Error Handling**: Centralized error handling using custom `AppError` class
- **Input Validation**: Comprehensive validation at the controller level
- **JWT Authentication**: Secure token-based authentication for protected routes
- **Consistent API Responses**: Standardized response format across all endpoints
- **Code Documentation**: JSDoc comments for better code understanding

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **JWT (jsonwebtoken)**: Authentication tokens
- **bcryptjs**: Password hashing
- **dotenv**: Environment variable management

## Contributing

Feel free to submit issues and enhancement requests!
