const express = require('express');
const {
  getAllUsers,
  assignRoleToUser,
  getAllRoles,
  createRole,
  deleteRole,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/role', protect, admin, assignRoleToUser);

// Role routes
router.get('/roles', protect, admin, getAllRoles);
router.post('/roles', protect, admin, createRole);
router.delete('/roles/:id', protect, admin, deleteRole);

module.exports = router;
