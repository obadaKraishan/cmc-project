const express = require('express');
const {
  uploadMedia,
  deleteMedia,
  getAllMedia,
} = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Private routes
router.post('/upload', protect, uploadMedia);
router.delete('/:id', protect, deleteMedia);
router.get('/', protect, getAllMedia);

module.exports = router;
