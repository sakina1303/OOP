const User = require('../models/user');

class UserRepository {
  constructor() {
    this.users = [];
  }

  async create(userData) {
    const user = new User(userData);
    this.users.push(user);
    return user;
  }

  async findByUsername(username) {
    return this.users.find(u => u.username === username);
  }
    
  async findById(id) {
      return this.users.find(u => u.id === id);
  }
}

module.exports = new UserRepository();
