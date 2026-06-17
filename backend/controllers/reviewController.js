const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc   Create review (verified buyers only)
// @route  POST /api/reviews/:productId
// @access Private (buyer)
exports.createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { productId } = req.params;
    const { rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id,
    });
    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    // Check if user is a verified buyer (has ordered this product)
    const verifiedPurchase = await Order.findOne({
      buyer: req.user._id,
      'products.product': productId,
      paymentStatus: 'paid',
    });
    if (!verifiedPurchase) {
      return res.status(403).json({
        success: false,
        message: 'Only verified buyers can review this product',
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      order: verifiedPurchase._id,
      rating,
      comment,
    });

    // Update product average rating
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      averageRating: avgRating.toFixed(1),
      totalReviews: reviews.length,
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'name');

    res.status(201).json({ success: true, message: 'Review added', review: populatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Get all reviews for a product
// @route  GET /api/reviews/:productId
// @access Public
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};