const express = require('express');
const {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
} = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', protect, checkRole(['admin', 'editor']), createPage);
router.get('/', getAllPages);
router.get('/:id', getPageById);
router.put('/:id', protect, checkRole(['admin', 'editor']), updatePage);
router.delete('/:id', protect, checkRole(['admin']), deletePage);

module.exports = router;
