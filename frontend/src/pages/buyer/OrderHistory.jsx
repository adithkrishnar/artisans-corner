import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const STATUS_STYLES = {
  Processing: { bg: 'rgba(196,113,74,0.1)', color: 'var(--terracotta)', border: 'rgba(196,113,74,0.2)' },
  Shipped: { bg: 'rgba(107,115,85,0.1)', color: 'var(--olive)', border: 'rgba(107,115,85,0.2)' },
  Delivered: { bg: 'rgba(16,185,129,0.1)', color: '#059669', border: 'rgba(16,185,129,0.2)' },
  Cancelled: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.2)' },
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--terracotta)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="section-label mb-1">Account</p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>My Orders</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 card-flat">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>No orders yet</h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Start shopping to see your orders here</p>
            <Link to="/" className="btn-primary px-8 py-3 text-sm">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusStyle = STATUS_STYLES[order.orderStatus] || STATUS_STYLES.Processing;
              return (
                <div key={order._id} className="card p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                        Order ID
                      </p>
                      <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                        {order._id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="badge text-xs"
                        style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}
                      >
                        {order.orderStatus}
                      </span>
                      <span className="badge badge-green text-xs">
                        {order.paymentStatus}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-5" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    {order.products.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">🎨</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{item.title}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity} × ${item.price}</p>
                        </div>
                        <span className="text-sm font-bold flex-shrink-0" style={{ color: 'var(--brown)', fontFamily: 'Playfair Display, serif' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                      Platform fee: ${order.platformFee?.toFixed(2)}
                    </div>
                    <div className="text-right">
                      <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Total Paid</p>
                      <p className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--brown)' }}>
                        ${order.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;