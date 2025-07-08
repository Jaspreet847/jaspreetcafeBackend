// routes/products.js
const express = require('express');
const Dish = require('../model/dish');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// Upload image file

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/dishes/') // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Genearate verification code

router.get('/api/dishes', async (req, res) => {
    try {
        const product = await Dish.find();
        if (product) {
            return res.send({
                status: true,
                result: product
            })
        }

    } catch (error) {
        console.log(error)
    }
});



router.post('/api/dish', async (req, res) => {
    try {
        console.log("formdata", req.body)
        const formData = req.body;
        if (formData) {
            const products = new Dish({
                title: formData.title,
                image: formData.image,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await products.save();
            res.send({
                status: true,
                data: products
            })
            res.json(products);
        }


    } catch (error) {
        console.log(error)
    }
});


// Handle file upload
router.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    return res.send(req.file);
});


router.delete('/api/dish/:id', async (req, res) => {
    try {
        const dishId = req.params.id;
        if (dishId) {
            await Dish.deleteOne({ _id: dishId });
            return res.send({
                status: true,
            })
        }
    } catch (error) {
        console.log(error)
    }
});


router.get('/api/dish/:id', async (req, res) => {
    try {
        const dishId = req.params.id;
        if (dishId) {
            const result = await Dish.findById(dishId);
            return  res.send({
                status: true,
                data:result
            });
        }
    } catch (error) {
        console.log(error)
    }
});

router.get('/api/dish/category', async (req, res) => {
    try {
        const category = "dessert";
        console.log("category",req.body)
        if (category) {
            const result = await Dish.find(category)
            if (result) {
                return res.send({
                    status: true,
                    data: result
                })
            }
        }
        console.log("category", req.body)
    } catch (error) {
        console.log(error)
    }
});

router.put('/api/dish', async (req, res) => {
    try {
        const formData = req.body;
        if (formData) {
            await Dish.findByIdAndUpdate(formData._id, formData, { new: true })
                .then((updatedUser) => {
                    if (updatedUser) {
                       return res.send({
                        status:true,
                        message:"Updated Successfully.",
                        data:updatedUser
                       })
                    } else {
                        return res.send({
                            status:false,
                            message:"Error in update Dish"
                        })
                    }
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
        }
    } catch (error) {
        console.log(error)
    }
});





module.exports = router;
