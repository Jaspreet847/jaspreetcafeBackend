const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
    updatedAt:Date,
    createdAt:Date
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
