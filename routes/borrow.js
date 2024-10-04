const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.post('/borrow/:bookId', borrowController.borrowBook);
router.post('/return/:bookId', borrowController.returnBook);

module.exports = router;