const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/', authenticate, authorize('admin'), bookController.createBook); // Admin only
router.get('/', bookController.getAllBooks); // Public route
router.get('/:id', authenticate, bookController.getBookById); // Authenticated users

module.exports = router;
