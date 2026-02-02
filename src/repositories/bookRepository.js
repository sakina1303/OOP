const Book = require('../models/book');

class BookRepository {
  constructor() {
    this.books = [];
  }

  async create(bookData) {
    const book = new Book(bookData);
    this.books.push(book);
    return book;
  }

  async findAll({ filter = {}, sort = null, page = 1, limit = 10 }) {
    let result = [...this.books];

    // Filter
    if (filter.genre) {
      result = result.filter(b => b.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(search) || 
        b.author.toLowerCase().includes(search)
      );
    }

    // Sort
    if (sort) {
      const isDesc = sort.startsWith('-');
      const field = isDesc ? sort.substring(1) : sort;
      result.sort((a, b) => {
        if (a[field] < b[field]) return isDesc ? 1 : -1;
        if (a[field] > b[field]) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const total = result.length;
    const paginatedResult = result.slice(startIndex, endIndex);

    return { 
      books: paginatedResult, 
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id) {
    return this.books.find(b => b.id === id);
  }

  async update(id, updateData) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    // Maintain id and createdAt, merge other fields
    const currentBook = this.books[index];
    const updatedBook = new Book({
        ...currentBook,
        ...updateData,
        id: currentBook.id,
        createdAt: currentBook.createdAt
    });
    
    this.books[index] = updatedBook;
    return updatedBook;
  }

  async delete(id) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
}

module.exports = new BookRepository();
