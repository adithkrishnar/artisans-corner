const express = require('express');
const router = express.Router();
const { getVendorAnalytics, getVendorOrders } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/vendor', protect, authorize('vendor', 'admin'), getVendorAnalytics);
router.get('/orders', protect, authorize('vendor', 'admin'), getVendorOrders);

module.exports = router;
