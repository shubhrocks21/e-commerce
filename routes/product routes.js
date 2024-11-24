const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

// Seller routes
router.post('/create', auth(['seller']), productController.createProduct);
router.get('/my-products', auth(['seller']), productController.getMyProducts);

// Admin routes
router.get('/unapproved', auth(['admin']), productController.getUnapprovedProducts);
router.put('/approve/:id', auth(['admin']), productController.approveProduct);

module.exports = router;

