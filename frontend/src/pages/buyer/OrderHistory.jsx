import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import API from '../../api/axios';

const STATUS_CONFIG = {
  Processing: 'badge-blue',
  Shipped: 'badge-orange',
  Delivered: 'badge-green',
  Cancelled: 'badge-red',
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/orders/my-orders').then(res => setOrders(res.data.orders)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="spinner-primary" style={{ width: '2rem', height: '2rem', borderWidth: '3px' }}></div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container py-10" style={{ maxWidth: '800px' }}>
        <div className="mb-8">
          <p className="label-sm section-eyebrow mb-1">Account</p>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>My Orders</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 card-flat">
            <Package size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <h2 className="font-display text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Start shopping to see your orders here</p>
            <Link to="/" className="btn btn-primary btn-lg">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="label-xs mb-1" style={{ color: 'var(--text-muted)' }}>Order ID</p>
                    <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{order._id}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge ${STATUS_CONFIG[order.orderStatus] || 'badge-muted'}`}>{order.orderStatus}</span>
                    <span className="badge badge-green">{order.paymentStatus}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-5" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  {order.products.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">🎨</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <span className="font-display font-bold flex-shrink-0" style={{ color: 'var(--primary)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Platform fee: ${order.platformFee?.toFixed(2)}</div>
                  <div className="text-right">
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>Total Paid</p>
                    <p className="font-display text-xl font-bold" style={{ color: 'var(--primary)' }}>${order.totalAmount?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}