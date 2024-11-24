const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stock: { type: Number, default: 0 },
  approved: { type: Boolean, default: false },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
