const express = require('express');
const Product = require('../models/Product');
const { verifySeller } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Product (Seller Only)
router.post('/create', verifySeller, async (req, res) => {
  const { name, description, price, stock, image } = req.body;

  try {
    const product = new Product({ name, description, price, stock, image, seller: req.user.id });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
