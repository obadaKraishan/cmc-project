const User = require('../models/User');

// Middleware to check if the user has one of the required roles
const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(`User role: ${user.role}`); // Debugging: log the user's role
      if (roles.includes(user.role)) {
        next();
      } else {
        console.log('Forbidden: You do not have the required role');
        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
      }
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = { checkRole };
