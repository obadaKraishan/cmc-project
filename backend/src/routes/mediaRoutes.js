const express = require('express');
const {
  uploadMedia,
  deleteMedia,
  getAllMedia,
} = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Private routes with role checks
router.post('/upload', protect, checkRole(['admin', 'editor']), uploadMedia);
router.delete('/:id', protect, checkRole(['admin']), deleteMedia);
router.get('/', protect, getAllMedia);

module.exports = router;
