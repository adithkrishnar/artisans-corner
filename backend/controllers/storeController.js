const { validationResult } = require('express-validator');
const Store = require('../models/Store');
const User = require('../models/User');

exports.createStore = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const existingStore = await Store.findOne({ owner: req.user._id });
    if (existingStore)
      return res.status(400).json({ success: false, message: 'You already have a store' });

    const nameExists = await Store.findOne({ storeName: req.body.storeName });
    if (nameExists)
      return res.status(400).json({ success: false, message: 'Store name already taken' });

    const logo = req.file ? req.file.path : '';

    const store = await Store.create({
      owner: req.user._id,
      storeName: req.body.storeName,
      description: req.body.description || '',
      logo,
    });

    await User.findByIdAndUpdate(req.user._id, {
      role: 'vendor',
      isVendor: true,
      store: store._id,
    });

    res.status(201).json({
      success: true,
      message: 'Store created! You are now a vendor.',
      store,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({ owner: req.user._id });
    if (!store)
      return res.status(404).json({ success: false, message: 'Store not found' });
    res.status(200).json({ success: true, store });
  } catch (error) {
    next(error);
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({ owner: req.user._id });
    if (!store)
      return res.status(404).json({ success: false, message: 'Store not found' });

    if (req.body.storeName) store.storeName = req.body.storeName;
    if (req.body.description) store.description = req.body.description;
    if (req.file) store.logo = req.file.path;

    await store.save();
    res.status(200).json({ success: true, message: 'Store updated', store });
  } catch (error) {
    next(error);
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id).populate('owner', 'name email');
    if (!store)
      return res.status(404).json({ success: false, message: 'Store not found' });
    res.status(200).json({ success: true, store });
  } catch (error) {
    next(error);
  }
};