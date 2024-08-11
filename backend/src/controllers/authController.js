const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Log the incoming request data for debugging
  console.log('Register request:', req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please include all fields' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with the role
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'viewer',  // Default to 'viewer' if no role is provided
    });

    // Return JWT token
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,  // Include the role in the response
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc Authenticate a user & get token
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please include all fields' });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,  // Include the role in the response
    });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
