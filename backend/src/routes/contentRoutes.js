const express = require('express');
const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllContent);
router.get('/:id', getContentById);

// Private routes
router.post('/', protect, createContent);
router.put('/:id', protect, updateContent);
router.delete('/:id', protect, deleteContent);

module.exports = router;
