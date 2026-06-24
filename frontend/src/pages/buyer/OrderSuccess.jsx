import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import API from '../../api/axios';

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem('orderComplete');
    API.get('/orders/my-orders').then(res => { if (res.data.orders.length > 0) setOrder(res.data.orders[0]); }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <CheckCircle size={48} style={{ color: '#059669' }} />
          </div>
          <h1 className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Order Placed!</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        {order && (
          <div className="card-flat mb-6">
            <p className="label-sm section-eyebrow mb-4">Order Summary</p>
            <div className="space-y-3">
              {[
                { l: 'Order ID', v: order._id, mono: true },
                { l: 'Total Paid', v: `$${order.totalAmount?.toFixed(2)}`, bold: true },
                { l: 'Platform Fee (5%)', v: `$${order.platformFee?.toFixed(2)}` },
                { l: 'Vendor Payout', v: `$${order.vendorPayout?.toFixed(2)}`, green: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{row.l}</span>
                  <span className={`text-sm ${row.mono ? 'font-mono text-xs' : ''}`}
                    style={{ color: row.green ? '#059669' : row.bold ? 'var(--primary)' : 'var(--text-primary)', fontWeight: row.bold ? '700' : '500', fontFamily: row.bold ? 'Playfair Display, serif' : 'DM Sans, sans-serif' }}>
                    {row.v}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Status</span>
                <span className="badge badge-blue">{order.orderStatus}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/" className="btn btn-primary btn-lg w-full justify-center">
            Continue Shopping <ArrowRight size={18} />
          </Link>
          <Link to="/orders" className="btn btn-ghost btn-lg w-full justify-center">
            <Package size={18} /> View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}