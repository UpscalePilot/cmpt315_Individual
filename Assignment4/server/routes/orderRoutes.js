// routes/orderRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// POST /orders - Place a new order
router.post('/orders', async (req, res) => {
  const { productId, quantity, emailId, deliveryDate } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Retrieve the product document with the current session
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check for sufficient stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Deduct the quantity from the product stock
    product.stock -= quantity;
    await product.save({ session });

    // Create the order
    const order = new Order({ productId, quantity, emailId, deliveryDate });
    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    res.status(201).json(order);
  } catch(err) {
    // Abort the transaction on error
    await session.abortTransaction();
    res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

// GET /orders - Fetch all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('productId');
    res.json(orders);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
