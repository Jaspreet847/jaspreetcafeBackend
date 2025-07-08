const express = require('express');
const router = express.Router();
const Cart = require('../model/carts');
const nodemailer = require('nodemailer');

// Replace with your email and app password
const EMAIL_USER = 'jaspreetjammu249@gmail.com@gmail.com';
const EMAIL_PASS = 'dbnc muda bklh zhat';

router.post('/checkout', async (req, res) => {
  const { userEmail, items } = req.body;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cart = new Cart({ userEmail, items, total });

  await cart.save();

  const itemList = items.map(item => 
    `<li>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</li>`
  ).join('');
  
  const emailHtml = `
    <h2>Deep Cafe Invoice</h2>
    <ul>${itemList}</ul>
    <p><strong>Total: ₹${total}</strong></p>
    <p>Thank you for shopping with Deep Cafe!</p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jaspreetjammu249@gmail.com',
      pass: 'dbnc muda bklh zhat'
    }
  });

  const mailOptions = {
    from: `Deep Cafe <${EMAIL_USER}>`,
    to: userEmail,
    subject: 'Your Invoice from Deep Cafe',
    html: emailHtml
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to send email', error: err });
    }
    res.json({ message: 'Invoice sent to your email.', cart });
  });
});

module.exports = router;
