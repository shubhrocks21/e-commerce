const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Sales Report
exports.getSalesReport = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { status: 'Delivered' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);

    const topProducts = await Order.aggregate([
      { $group: { _id: '$product', totalQuantity: { $sum: '$quantity' } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } },
      { $unwind: '$productDetails' },
    ]);

    res.status(200).json({ totalSales: totalSales[0]?.totalRevenue || 0, topProducts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Activity
exports.getUserActivity = async (req, res) => {
  try {
    const activeCustomers = await Order.aggregate([
      { $group: { _id: '$customer', totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'customerDetails' } },
      { $unwind: '$customerDetails' },
    ]);

    const activeSellers = await Product.aggregate([
      { $group: { _id: '$seller', totalProducts: { $sum: 1 } } },
      { $sort: { totalProducts: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'sellerDetails' } },
      { $unwind: '$sellerDetails' },
    ]);

    res.status(200).json({ activeCustomers, activeSellers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
