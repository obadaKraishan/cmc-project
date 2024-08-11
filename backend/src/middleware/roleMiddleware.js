const User = require('../models/User');

// Middleware to check if the user has one of the required roles
const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate('role');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (roles.includes(user.role)) {
        next();
      } else {
        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = { checkRole };
