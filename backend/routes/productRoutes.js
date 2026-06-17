const express = require('express');
const router = express.Router();

const {
  createProduct,
  getMyProducts,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, authorize } = require('../middleware/authMiddleware');
const { createProductValidator, updateProductValidator } = require('../validators/productValidator');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getAllProducts);

// Private vendor routes (must come before /:id)
router.get('/my-products', protect, authorize('vendor', 'admin'), getMyProducts);
router.post('/', protect, authorize('vendor', 'admin'), upload.single('image'), createProductValidator, createProduct);
router.put('/:id', protect, authorize('vendor', 'admin'), upload.single('image'), updateProductValidator, updateProduct);
router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

// Public route (must come after /my-products)
router.get('/:id', getProductById);

module.exports = router;