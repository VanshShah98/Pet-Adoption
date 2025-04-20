const jwt = require('jsonwebtoken');
const User = require('../models/User');

const routeAuth = (publicRoutes = []) => {
  return async (req, res, next) => {
    // Check if the current route is public
    const isPublicRoute = publicRoutes.some(route => {
      const { path, method } = route;
      return req.path === path && (!method || req.method === method);
    });

    if (isPublicRoute) {
      return next();
    }

    try {
      // Get token from header
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'No token, authorization denied'
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Token is not valid'
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        success: false,
        error: 'Token is not valid'
      });
    }
  };
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Access denied. Admin only.'
    });
  }
};

module.exports = { routeAuth, admin }; 