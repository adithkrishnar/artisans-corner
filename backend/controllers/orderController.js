const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const Store = require('../models/Store');

// @desc   Create Stripe Payment Intent
// @route  POST /api/orders/create-payment-intent
// @access Private (buyer)
exports.createPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in cart' });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const platformFee = parseFloat((subtotal * 0.05).toFixed(2));
    const total = parseFloat((subtotal + platformFee).toFixed(2));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        buyerId: req.user._id.toString(),
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      total,
      platformFee,
      subtotal,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Create Order after successful payment
// @route  POST /api/orders/create
// @access Private (buyer)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentIntentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in cart' });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const platformFee = parseFloat((subtotal * 0.05).toFixed(2));
    const vendorPayout = parseFloat((subtotal * 0.95).toFixed(2));
    const totalAmount = parseFloat((subtotal + platformFee).toFixed(2));

    // Build order items
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) continue;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}`,
        });
      }

      orderItems.push({
        product: product._id,
        vendor: product.vendor,
        store: product.store,
        title: product.title,
        imageUrl: product.imageUrl,
        price: item.price,
        quantity: item.quantity,
      });
    }

    // Create order
    const order = await Order.create({
      buyer: req.user._id,
      products: orderItems,
      totalAmount,
      platformFee,
      vendorPayout,
      shippingAddress,
      paymentStatus: 'paid',
      orderStatus: 'Processing',
      stripePaymentIntentId: paymentIntentId,
    });

    // Update store stats
    const storeUpdates = {};
    for (const item of orderItems) {
      const storeId = item.store.toString();
      if (!storeUpdates[storeId]) {
        storeUpdates[storeId] = { sales: 0, earnings: 0 };
      }
      storeUpdates[storeId].sales += item.quantity;
      storeUpdates[storeId].earnings += item.price * item.quantity * 0.95;
    }

    for (const [storeId, data] of Object.entries(storeUpdates)) {
      await Store.findByIdAndUpdate(storeId, {
        $inc: { totalSales: data.sales, totalEarnings: data.earnings },
      });
    }

    // Decrease stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Get buyer's orders
// @route  GET /api/orders/my-orders
// @access Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};