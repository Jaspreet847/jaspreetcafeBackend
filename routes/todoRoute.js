// routes/products.js
const express = require('express');
const router = express.Router();
const Todo = require('../model/tododata')


// Define routes related to products
router.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
    createdAt:new Date(),
    updatedAt:new Date()
  });
  await newTodo.save();
  res.send(newTodo);

});

router.delete('/api/todos/delete/:id', async (req, res) => {
  try {
    const deletedItem = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
})

router.put('/api/todos/update/:id', async (req, res) => {
  try {
    const updatedItem = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
