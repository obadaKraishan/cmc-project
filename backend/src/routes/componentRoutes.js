// backend/src/routes/componentRoutes.js
const express = require('express');
const { createComponent } = require('../controllers/componentController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, createComponent);
// Other routes...

module.exports = router;
