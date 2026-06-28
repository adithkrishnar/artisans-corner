import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, RefreshCw, Truck, X } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

const TRUST = [
  { icon: Shield,    text: 'Secured by Stripe'       },
  { icon: RefreshCw, text: 'Easy 30-day returns'      },
  { icon: Truck,     text: 'Free shipping over $100'  },
];

export default function Cart() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { items } = useSelector(s => s.cart);
  const { user }  = useSelector(s => s.auth);

  const subtotal    = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const platformFee = subtotal * 0.05;
  const total       = subtotal + platformFee;

  /* ── Empty state ── */
  if (items.length === 0) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '360px' }} className="animate-fade-up">
        <div style={{
          width: '96px', height: '96px', borderRadius: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.75rem',
          background: 'var(--surface)', border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <ShoppingBag size={40} style={{ color: 'var(--text-muted)' }} />
        </div>
        <h2 className="font-display" style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.625rem' }}>
          Your cart is empty
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Discover unique handcrafted products from our artisans
        </p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 28px', borderRadius: '12px', border: 'none',
          background: 'var(--primary)', color: '#fff',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 700,
          textDecoration: 'none', transition: 'all 0.2s ease',
          boxShadow: '0 3px 12px rgba(122,82,48,0.35)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Browse Products <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="container mx-auto" style={{ padding: '3rem 2rem' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2.25rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.375rem' }}>Shopping</p>
          <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>My Cart</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }} className="cart-grid">

          {/* ── Cart Items ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {items.map(item => (
              <div
                key={item._id}
                style={{
                  display: 'flex', gap: '1.25rem',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xl)', padding: '1.25rem',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '84px', height: '84px', borderRadius: '14px',
                  overflow: 'hidden', flexShrink: 0,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                }}>
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>🎨</div>
                  }
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '3px' }}>
                        {item.store?.storeName || 'Artisan Store'}
                      </p>
                      <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      style={{
                        flexShrink: 0, width: '32px', height: '32px', borderRadius: '8px',
                        background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.15)',
                        color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.14)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.07)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    {/* Quantity stepper */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center',
                      border: '1.5px solid var(--border)', borderRadius: '10px', overflow: 'hidden',
                    }}>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        style={{
                          width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ width: '36px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        disabled={item.quantity >= item.stock}
                        style={{
                          width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'none', border: 'none', cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                          color: 'var(--text-secondary)', opacity: item.quantity >= item.stock ? 0.35 : 1,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (item.quantity < item.stock) e.currentTarget.style.background = 'var(--bg)'; }}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="font-display" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={() => dispatch(clearCart())}
              style={{
                alignSelf: 'flex-start', background: 'none', border: 'none',
                fontSize: '0.8125rem', color: 'var(--text-muted)', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', padding: '4px 0',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Clear entire cart ×
            </button>
          </div>

          {/* ── Order Summary ── */}
          <div style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)', padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
            }}>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
                {[
                  { label: `Subtotal (${items.length} items)`, value: `$${subtotal.toFixed(2)}`, green: false },
                  { label: 'Platform Fee (5%)',                value: `$${platformFee.toFixed(2)}`, green: false },
                  { label: 'Shipping',                         value: 'Free', green: true },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>{row.label}</span>
                    <span style={{ color: row.green ? '#059669' : 'inherit', fontWeight: row.green ? 600 : 400 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  paddingTop: '12px', marginTop: '4px',
                  borderTop: '1.5px solid var(--border)',
                  fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)',
                }}>
                  <span>Total</span>
                  <span className="font-display" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => user ? navigate('/checkout') : navigate('/login')}
                style={{
                  width: '100%', padding: '0.9375rem',
                  borderRadius: '12px', border: 'none',
                  background: 'var(--primary)', color: '#fff',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: '0 3px 12px rgba(122,82,48,0.35)',
                  marginBottom: '10px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,82,48,0.35)'; }}
              >
                {user ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                <ArrowRight size={17} />
              </button>

              <Link to="/" style={{
                width: '100%', padding: '0.8125rem',
                borderRadius: '12px', border: '1.5px solid var(--border)',
                background: 'transparent', color: 'var(--text-secondary)',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)', padding: '1rem 1.25rem',
            }}>
              {TRUST.map(({ icon: Icon, text }, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 0', fontSize: '0.8125rem', color: 'var(--text-muted)',
                  borderBottom: i < TRUST.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <Icon size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
