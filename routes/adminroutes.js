const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');

// Admin: Get sales analytics
router.get('/sales-report', auth(['admin']), adminController.getSalesReport);

// Admin: Get user activity
router.get('/user-activity', auth(['admin']), adminController.getUserActivity);

module.exports = router;
