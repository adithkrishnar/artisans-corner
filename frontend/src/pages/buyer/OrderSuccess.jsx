import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem('orderComplete');
    const fetchLatestOrder = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        if (res.data.orders.length > 0) setOrder(res.data.orders[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLatestOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--cream)' }}>
      <div className="w-full max-w-md animate-fade-up">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: 'linear-gradient(135deg, rgba(196,113,74,0.1), rgba(139,107,82,0.1))', border: '2px solid rgba(196,113,74,0.2)' }}
          >
            ✅
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
            Order Placed!
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <div className="card-flat mb-6">
            <p className="section-label mb-4">Order Summary</p>
            <div className="space-y-3">
              {[
                { label: 'Order ID', value: order._id, mono: true },
                { label: 'Total Paid', value: `$${order.totalAmount?.toFixed(2)}`, bold: true },
                { label: 'Platform Fee (5%)', value: `$${order.platformFee?.toFixed(2)}` },
                { label: 'Vendor Payout', value: `$${order.vendorPayout?.toFixed(2)}`, green: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{row.label}</span>
                  <span
                    className={`text-sm ${row.mono ? 'font-mono' : ''} ${row.bold ? 'font-bold text-base' : 'font-medium'}`}
                    style={{
                      color: row.green ? 'var(--olive)' : row.bold ? 'var(--brown)' : 'var(--text-primary)',
                      fontFamily: row.bold ? 'Playfair Display, serif' : 'DM Sans, sans-serif',
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Status</span>
                <span className="badge badge-terracotta text-xs">{order.orderStatus}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/" className="btn-primary w-full py-3.5 text-sm block text-center">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn-ghost w-full py-3.5 text-sm block text-center">
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;