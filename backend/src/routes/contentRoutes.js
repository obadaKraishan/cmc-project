const express = require('express');
const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllContent);
router.get('/:id', getContentById);

// Private routes with role checks
router.post('/', protect, checkRole(['admin', 'editor']), createContent);
router.put('/:id', protect, checkRole(['admin', 'editor']), updateContent);
router.delete('/:id', protect, checkRole(['admin']), deleteContent);

module.exports = router;
