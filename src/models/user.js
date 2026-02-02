const crypto = require('crypto');

class User {
  constructor({ username, password, id = null }) {
    this.id = id || crypto.randomUUID();
    this.username = username;
    this.password = password;
  }
}

module.exports = User;
