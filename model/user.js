const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password:String,
    updatedAt:Date,
    createdAt:Date

});

const User = mongoose.model('users', userSchema);

module.exports = User;
 