const express = require('express');
const router = express.Router();
const {
  createPaymentIntent,
  createOrder,
  getMyOrders,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/create', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;