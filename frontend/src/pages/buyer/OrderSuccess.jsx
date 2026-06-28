import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Sparkles } from 'lucide-react';
import API from '../../api/axios';

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem('orderComplete');
    API.get('/orders/my-orders')
      .then(res => { if (res.data.orders.length > 0) setOrder(res.data.orders[0]); })
      .catch(console.error);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(16,185,129,0.07) 0%, transparent 100%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196,122,74,0.06) 0%, transparent 100%)',
      }} />

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1 }} className="animate-fade-up">

        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            position: 'relative',
            width: '96px', height: '96px',
            margin: '0 auto 1.75rem',
          }}>
            {/* Outer ring animation */}
            <div style={{
              position: 'absolute', inset: '-8px', borderRadius: '50%',
              background: 'rgba(16,185,129,0.1)',
              animation: 'pulseRing 2s ease-out infinite',
            }} />
            <div style={{
              width: '96px', height: '96px', borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.08) 100%)',
              border: '1.5px solid rgba(16,185,129,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(16,185,129,0.2)',
            }}>
              <CheckCircle size={46} style={{ color: '#059669' }} />
            </div>
          </div>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 14px', borderRadius: '999px',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
            color: '#059669', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            <Sparkles size={11} /> Order Confirmed
          </div>

          <h1 className="font-display" style={{
            fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)',
            lineHeight: 1.15, marginBottom: '0.625rem',
          }}>
            Order Placed! 🎉
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '340px', margin: '0 auto' }}>
            Thank you for your purchase. Your order has been received and is being processed by the artisan.
          </p>
        </div>

        {/* Order summary card */}
        {order && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '1.75rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.125rem',
            }}>Order Summary</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { l: 'Order ID',        v: order._id,                                mono: true  },
                { l: 'Total Paid',      v: `$${order.totalAmount?.toFixed(2)}`,      bold: true  },
                { l: 'Platform Fee (5%)', v: `$${order.platformFee?.toFixed(2)}`                 },
                { l: 'Vendor Payout',   v: `$${order.vendorPayout?.toFixed(2)}`,     green: true },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{row.l}</span>
                  <span style={{
                    fontSize: row.mono ? '0.75rem' : '0.875rem',
                    fontFamily: row.mono ? 'monospace' : row.bold ? 'Playfair Display, serif' : 'DM Sans, sans-serif',
                    fontWeight: row.bold ? 700 : 500,
                    color: row.green ? '#059669' : row.bold ? 'var(--primary)' : 'var(--text-primary)',
                    maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {row.v}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Status</span>
                <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{order.orderStatus}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '0.9375rem', borderRadius: '12px', border: 'none',
            background: 'var(--primary)', color: '#fff',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 700,
            textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 3px 12px rgba(122,82,48,0.35)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,82,48,0.35)'; }}
          >
            Continue Shopping <ArrowRight size={17} />
          </Link>
          <Link to="/orders" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '0.875rem', borderRadius: '12px',
            background: 'var(--surface)', border: '1.5px solid var(--border)',
            color: 'var(--text-secondary)',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Package size={17} /> View All Orders
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
