const Product = require('../models/Product');

// Create a product
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, image } = req.body;

  try {
    const product = new Product({ name, description, price, stock, image, seller: req.user.id });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch seller's products
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get unapproved products
exports.getUnapprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ approved: false }).populate('seller', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Approve product
exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product approved', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
