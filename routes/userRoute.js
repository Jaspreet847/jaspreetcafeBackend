// routes/products.js
const express = require('express');
const router = express.Router();
const User = require('../model/user')

// Genearate verification code

function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Example code generation
}

// Define routes related to products
router.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


router.get('/api/user/:id', (req, res) => {
    try {

        const userId = req.params.id;
        // Find the item by ID
        const userData = User.find((user) => user._id === userId);
        if (userData) {
            res.json(userData); // Respond with the userData as JSON
        } else {
            res.status(404).json({ error: 'userData not found' });
        }
    } catch (error) {

    }
});

router.post('/api/user/register', async (req, res) => {
    try {
        const formData = req.body;
        const userModal = await User.findOne({ email: formData.email });
        if (userModal) {
            return res.send({
                status: false,
                message: "User already Register"
            })
        } else {
            const users = new User({
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await users.save();
            res.send({
                status: true,
                data: users
            })
            res.json(users);
        }
    } catch (error) {
        console.log("error", error)
    }
});


router.post('/api/user/login', async (req, res) => {
    try {
        const formData = req.body;
        const userModal = await User.findOne({ email: formData.email });
        if (!userModal) {
            return res.send({ message: 'User Not Exist' });
        } else {
            if (userModal.password !== formData.password) {
                return res.send({ message: 'Wrong Password' });
            } else {
                return res.send({
                    status: true,
                    data: userModal
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
});


router.get('/api/users', async (req, res) => {
    try {
        const userData = await User.find();
        if (userData) {
            return  {
                status: true,
                result: userData
            }
        }

    } catch (error) {
        console.log(error)
    }
});


router.delete('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            await User.deleteOne({ _id: userId });
            return {
                status: true,
            }
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
