const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', authenticate, authorize('admin'), userController.getAllUsers); // Admin only
router.post('/login', userController.login); // Public login route

module.exports = router;
