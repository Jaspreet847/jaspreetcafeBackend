const express = require('express');
const router = express.Router();
const Cart = require('../model/carts');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_y4w0fpWH1AqajN',
  key_secret: 'nh2Cd5ELlrBvN6rtWlalP0xO',
});

const EMAIL_USER = 'jaspreetjammu249@gmail.com';
const EMAIL_PASS = 'dbnc muda bklh zhat';

// ✅ Create Razorpay Order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert ₹ to paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error('❌ Error creating Razorpay order:', err);
    res.status(500).json({ message: 'Failed to create order', error: err });
  }
});

// ✅ Final Checkout Route (save + email invoice)
router.post('/checkout', async (req, res) => {
  const { userEmail, items } = req.body;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cart = new Cart({ userEmail, items, total });

  try {
    await cart.save();

    const itemList = items.map(item =>
      `<li>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</li>`
    ).join('');

    const emailHtml = `
      <h2>Jaspreet Cafe Invoice</h2>
      <ul>${itemList}</ul>
      <p><strong>Total: ₹${total}</strong></p>
      <p>Thank you for shopping with Jaspreet Cafe!</p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: `Jaspreet Cafe <${EMAIL_USER}>`,
      to: userEmail,
      subject: 'Your Invoice from Jaspreet Cafe',
      html: emailHtml
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ Error sending email:', err);
        return res.status(500).json({ message: 'Failed to send invoice email', error: err });
      }

      res.json({ message: '✅ Invoice sent to your email.', cart });
    });

  } catch (err) {
    console.error('❌ Checkout error:', err);
    res.status(500).json({ message: 'Checkout failed', error: err });
  }
});

module.exports = router;
