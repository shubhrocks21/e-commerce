const express = require('express');
const Order = require('../models/Order');
const { verifyCustomer, verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Order
router.post('/create', verifyCustomer, async (req, res) => {
  const { products, totalPrice, shippingAddress } = req.body;

  try {
    const order = new Order({ customer: req.user.id, products, totalPrice, shippingAddress });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Order Status (Admin Only)
router.put('/update/:id', verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
