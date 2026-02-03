const bookService = require('../services/bookService');
const AppError = require('../utils/appError');

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

class BookController {
  /**
   * Validate required fields for book creation
   * @private
   * @param {Object} data - Book data to validate
   * @throws {AppError} If validation fails
   */
  _validateBookData(data) {
    const { title, author, price } = data;
    const missingFields = [];

    if (!title?.trim()) missingFields.push('title');
    if (!author?.trim()) missingFields.push('author');
    if (price === undefined || price === null) missingFields.push('price');

    if (missingFields.length > 0) {
      throw new AppError(
        `Missing required fields: ${missingFields.join(', ')}`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Validate price is a positive number
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      throw new AppError(
        'Price must be a positive number',
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }

  /**
   * Create a new book
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async createBook(req, res, next) {
    try {
      this._validateBookData(req.body);
      
      const book = await bookService.createBook(req.body);
      
      res.status(HTTP_STATUS.CREATED).json({
        status: 'success',
        data: { book }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get all books with optional filtering, pagination, and sorting
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllBooks(req, res, next) {
    try {
      const result = await bookService.getAllBooks(req.query);
      
      res.status(HTTP_STATUS.OK).json({
        status: 'success',
        ...result
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a single book by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getBookById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.params.id);
      
      res.status(HTTP_STATUS.OK).json({
        status: 'success',
        data: { book }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a book by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateBook(req, res, next) {
    try {
      // Validate only if fields are provided
      if (Object.keys(req.body).length === 0) {
        throw new AppError(
          'Please provide at least one field to update',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const book = await bookService.updateBook(req.params.id, req.body);
      
      res.status(HTTP_STATUS.OK).json({
        status: 'success',
        data: { book }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a book by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async deleteBook(req, res, next) {
    try {
      await bookService.deleteBook(req.params.id);
      
      res.status(HTTP_STATUS.NO_CONTENT).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookController();
