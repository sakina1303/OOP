const crypto = require('crypto');

class Book {
  constructor({ title, author, genre, publishedYear, price, id = null, createdAt = null }) {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publishedYear = publishedYear;
    this.price = price;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Book;
