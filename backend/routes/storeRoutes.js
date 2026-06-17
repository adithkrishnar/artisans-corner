const express = require('express');
const router = express.Router();
const { createStore, getMyStore, updateStore, getStoreById } = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');
const { createStoreValidator } = require('../validators/storeValidator');
const upload = require('../middleware/uploadMiddleware');

router.post('/create', protect, upload.single('logo'), createStoreValidator, createStore);
router.get('/my-store', protect, getMyStore);
router.put('/update', protect, upload.single('logo'), updateStore);
router.get('/:id', getStoreById);

module.exports = router;