import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, RefreshCw, Truck } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(s => s.cart);
  const { user } = useSelector(s => s.auth);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center" style={{ maxWidth: '360px' }}>
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <ShoppingBag size={40} style={{ color: 'var(--text-muted)' }} />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3">Your cart is empty</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Discover unique handcrafted products from our artisans
        </p>
        <Link to="/" className="btn btn-primary btn-lg">Browse Products</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="mb-10">
          <p className="label-sm section-eyebrow mb-1">Shopping</p>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>My Cart</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item._id} className="card p-6 flex gap-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🎨</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="label-xs mb-1" style={{ color: 'var(--text-muted)' }}>{item.store?.storeName || 'Artisan Store'}</p>
                      <h3 className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item._id))}
                      className="btn btn-danger btn-sm flex-shrink-0" style={{ padding: '0.375rem' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-150"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-150 disabled:opacity-30"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-display text-lg font-bold" style={{ color: 'var(--primary)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={() => dispatch(clearCart())}
              className="text-sm transition-colors duration-200" style={{ color: 'var(--text-muted)' }}>
              Clear cart ×
            </button>
          </div>

          <div className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="card-flat p-8">
              <h2 className="font-display text-lg font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                {[
                  { label: `Subtotal (${items.length} items)`, value: `$${subtotal.toFixed(2)}` },
                  { label: 'Platform Fee (5%)', value: `$${platformFee.toFixed(2)}` },
                  { label: 'Shipping', value: 'Free', green: true },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>{row.label}</span>
                    <span style={{ color: row.green ? '#059669' : 'inherit' }}>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base pt-3" style={{ borderTop: '1.5px solid var(--border)', color: 'var(--text-primary)' }}>
                  <span>Total</span>
                  <span className="font-display" style={{ color: 'var(--primary)' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={() => user ? navigate('/checkout') : navigate('/login')}
                className="btn btn-primary btn-lg w-full mb-3">
                {user ? 'Proceed to Checkout' : 'Sign in to Checkout'} <ArrowRight size={18} />
              </button>
              <Link to="/" className="btn btn-ghost btn-lg w-full justify-center">← Continue Shopping</Link>
            </div>

            <div className="card-flat p-8">
              {[
                { icon: Shield, text: 'Secured by Stripe' },
                { icon: RefreshCw, text: 'Easy 30-day returns' },
                { icon: Truck, text: 'Free shipping over $100' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 text-sm" style={{ color: 'var(--text-muted)', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <Icon size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
