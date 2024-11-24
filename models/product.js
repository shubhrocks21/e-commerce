const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Seller reference
  stock: { type: Number, required: true },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
