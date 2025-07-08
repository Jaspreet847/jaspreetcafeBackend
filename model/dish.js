const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    updatedAt: Date,
    createdAt: Date

});

const Dish = mongoose.model('dishes', dishSchema);

module.exports = Dish;
