const { body } = require('express-validator');

exports.createStoreValidator = [
  body('storeName')
    .trim()
    .notEmpty().withMessage('Store name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Store name must be 2-50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description max 500 characters'),
];