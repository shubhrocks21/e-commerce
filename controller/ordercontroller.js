const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order
exports.placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const totalPrice = product.price * quantity;

    const order = new Order({
      customer: req.user.id,
      seller: product.seller,
      product: productId,
      quantity,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch customer orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate('product', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch seller orders
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id }).populate('product', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status (Seller)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'name').populate('product', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

