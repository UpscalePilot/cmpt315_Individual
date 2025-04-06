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
    const product = await Product.findById(productId).session(session);
    if (!product) throw new Error('Product not found');

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    product.stock -= quantity;
    await product.save({ session });

    const order = new Order({ productId, quantity, emailId, deliveryDate });
    await order.save({ session });

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /orders/cancel/:id - Cancel order if delivery is > 5 days away
router.put('/orders/cancel/:id', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(req.params.id).session(session);
    if (!order) {
      throw new Error('Order not found');
    }

    const deliveryDate = new Date(order.deliveryDate);
    const now = new Date();
    const daysUntilDelivery = (deliveryDate - now) / (1000 * 60 * 60 * 24);

    if (daysUntilDelivery <= 5) {
      return res.status(400).json({ message: 'Order cannot be canceled within 5 days of delivery.' });
    }

    // Update order status
    order.status = 'Cancelled';
    await order.save({ session });

    // Restore product stock
    const product = await Product.findById(order.productId).session(session);
    if (product) {
      product.stock += order.quantity;
      await product.save({ session });
    }

    await session.commitTransaction();
    res.json({ message: 'Order canceled and stock restored.' });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
