const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

class AuthService {
  async register(username, password) {
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new AppError('Username already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // User model will be instantiated in repo
    const user = await userRepository.create({ username, password: hashedPassword });
    
    // Create a safe user object to return
    const safeUser = { id: user.id, username: user.username };
    return safeUser;
  }

  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: { id: user.id, username: user.username } };
  }
}

module.exports = new AuthService();
