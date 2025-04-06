const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products - Fetch all products with filtering and sorting
router.get('/products', async (req, res) => {
  try {
    const { sort = 'name', order = 'asc', category, price_gte, price_lte } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (price_gte || price_lte) {
      filter.price = {};
      if (price_gte) filter.price.$gte = parseFloat(price_gte);
      if (price_lte) filter.price.$lte = parseFloat(price_lte);
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const products = await Product.find(filter).sort({ [sort]: sortOrder });

    res.json(products);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
