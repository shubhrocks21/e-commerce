const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');

// Customer routes
router.post('/place-order', auth(['customer']), orderController.placeOrder);
router.get('/my-orders', auth(['customer']), orderController.getMyOrders);

// Seller routes
router.get('/seller-orders', auth(['seller']), orderController.getSellerOrders);
router.put('/update-order-status/:id', auth(['seller']), orderController.updateOrderStatus);

// Admin routes
router.get('/all-orders', auth(['admin']), orderController.getAllOrders);

module.exports = router;
