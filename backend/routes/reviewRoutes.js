const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { createReviewValidator } = require('../validators/reviewValidator');

router.get('/:productId', getProductReviews);
router.post('/:productId', protect, createReviewValidator, createReview);

module.exports = router;