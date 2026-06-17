const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(helmet());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin.endsWith('.vercel.app') ||
      origin === 'http://localhost:5173'
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

module.exports = app;