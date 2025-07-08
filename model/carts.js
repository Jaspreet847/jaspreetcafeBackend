const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
