// backend/src/routes/pageRoutes.js
const express = require('express');
const { createPage } = require('../controllers/pageController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, createPage);
// Other routes...

module.exports = router;