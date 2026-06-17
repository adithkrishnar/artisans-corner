const Order = require('../models/Order');
const Store = require('../models/Store');
const Product = require('../models/Product');

// @desc   Get vendor analytics
// @route  GET /api/analytics/vendor
// @access Private (vendor)
exports.getVendorAnalytics = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const store = await Store.findOne({ owner: vendorId });
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found',
      });
    }

    // Total sales and earnings aggregation
    const salesAggregation = await Order.aggregate([
      {
        $match: {
          'products.vendor': vendorId,
          paymentStatus: 'paid',
        },
      },
      { $unwind: '$products' },
      {
        $match: {
          'products.vendor': vendorId,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ['$products.price', '$products.quantity'] },
          },
          totalOrders: { $sum: 1 },
          totalItemsSold: { $sum: '$products.quantity' },
        },
      },
    ]);

    const totalRevenue = salesAggregation[0]?.totalRevenue || 0;
    const totalOrders = salesAggregation[0]?.totalOrders || 0;
    const totalItemsSold = salesAggregation[0]?.totalItemsSold || 0;
    const platformFee = totalRevenue * 0.05;
    const vendorPayout = totalRevenue * 0.95;

    // Monthly chart data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyData = await Order.aggregate([
      {
        $match: {
          'products.vendor': vendorId,
          paymentStatus: 'paid',
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      { $unwind: '$products' },
      {
        $match: {
          'products.vendor': vendorId,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          monthlyRevenue: {
            $sum: { $multiply: ['$products.price', '$products.quantity'] },
          },
          monthlyOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Format monthly data for chart
    const chartData = monthlyData.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      revenue: item.monthlyRevenue,
      orders: item.monthlyOrders,
    }));

    // Total products listed
    const totalProducts = await Product.countDocuments({ vendor: vendorId });

    res.status(200).json({
      success: true,
      analytics: {
        totalRevenue,
        totalOrders,
        totalItemsSold,
        platformFee,
        vendorPayout,
        totalProducts,
        chartData,
      },
      store: {
        storeName: store.storeName,
        logo: store.logo,
        totalSales: store.totalSales,
        totalEarnings: store.totalEarnings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Get vendor orders (orders containing vendor's products)
// @route  GET /api/analytics/orders
// @access Private (vendor)
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const orders = await Order.find({ 'products.vendor': vendorId })
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });

    // Filter each order to show only this vendor's items
    const vendorOrders = orders.map((order) => ({
      _id: order._id,
      buyer: order.buyer,
      items: order.products.filter(
        (p) => p.vendor.toString() === vendorId.toString()
      ),
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: vendorOrders.length,
      orders: vendorOrders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};