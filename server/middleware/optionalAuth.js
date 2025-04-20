const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is provided, continue without authentication
    if (!token) {
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');

    if (user) {
      // Add user to request object if found
      req.user = user;
    }

    next();
  } catch (error) {
    // If token is invalid, continue without authentication
    console.error('Optional auth error:', error);
    next();
  }
};

module.exports = optionalAuth; 