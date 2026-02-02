const bookRepository = require('../repositories/bookRepository');
const AppError = require('../utils/appError');

class BookService {
  async createBook(data) {
    return await bookRepository.create(data);
  }

  async getAllBooks(query) {
    const { page, limit, sort, genre, search } = query;
    return await bookRepository.findAll({ 
      filter: { genre, search }, 
      sort, 
      page: page || 1, 
      limit: limit || 10 
    });
  }

  async getBookById(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    return book;
  }

  async updateBook(id, data) {
    const updatedBook = await bookRepository.update(id, data);
    if (!updatedBook) {
      throw new AppError('Book not found', 404);
    }
    return updatedBook;
  }

  async deleteBook(id) {
    const deleted = await bookRepository.delete(id);
    if (!deleted) {
      throw new AppError('Book not found', 404);
    }
    return deleted;
  }
}

module.exports = new BookService();
