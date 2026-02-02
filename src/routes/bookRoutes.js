const express = require('express');
const bookController = require('../controllers/bookController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Public: Get all books, Get single book
// Protected: Create, Update, Delete
router.route('/')
  .get(bookController.getAllBooks)
  .post(protect, bookController.createBook); 

router.route('/:id')
  .get(bookController.getBookById)
  .patch(protect, bookController.updateBook)
  .delete(protect, bookController.deleteBook);

module.exports = router;
