const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());


// Define API routes
const todoRouter = require('./routes/todoRoute');
app.use('/', todoRouter);

const userRouter = require('./routes/userRoute');
app.use('/', userRouter);

const dishRouter = require('./routes/dishRoute');
app.use('/', dishRouter);

const cartRoutes = require('./routes/cartRoute');
app.use('/api/cart', cartRoutes);

// app listen port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
