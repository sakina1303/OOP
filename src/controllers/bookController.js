const bookService = require('../services/bookService');
const AppError = require('../utils/appError');

class BookController {
  async createBook(req, res, next) {
    try {
      const { title, author, price } = req.body;
      if (!title || !author || !price) {
        return next(new AppError('Please provide title, author and price', 400));
      }
      
      const book = await bookService.createBook(req.body);
      res.status(201).json({ status: 'success', data: { book } });
    } catch (err) {
      next(err);
    }
  }

  async getAllBooks(req, res, next) {
    try {
      const result = await bookService.getAllBooks(req.query);
      res.status(200).json({ status: 'success', ...result });
    } catch (err) {
      next(err);
    }
  }

  async getBookById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.params.id);
      res.status(200).json({ status: 'success', data: { book } });
    } catch (err) {
      next(err);
    }
  }

  async updateBook(req, res, next) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      res.status(200).json({ status: 'success', data: { book } });
    } catch (err) {
      next(err);
    }
  }

  async deleteBook(req, res, next) {
    try {
      await bookService.deleteBook(req.params.id);
      res.status(204).json({ status: 'success', data: null });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookController();
