const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  emailId: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, default: 'Confirmed' } // NEW FIELD
});

module.exports = mongoose.model('Order', orderSchema);
