const authService = require('../services/authService');
const AppError = require('../utils/appError');

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return next(new AppError('Please provide username and password', 400));
      }

      const user = await authService.register(username, password);
      res.status(201).json({ status: 'success', data: { user } });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return next(new AppError('Please provide username and password', 400));
      }

      const { token, user } = await authService.login(username, password);
      res.status(200).json({ status: 'success', token, data: { user } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
