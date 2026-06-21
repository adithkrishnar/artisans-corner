import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" style={{ background: 'var(--beige)' }}>
            🛒
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
            Your cart is empty
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            Discover unique handcrafted products from our artisans
          </p>
          <Link to="/" className="btn-primary px-8 py-3 text-sm">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="section-label mb-1">Shopping</p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
            My Cart
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item._id} className="card p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🎨</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                        {item.store?.storeName || 'Artisan Store'}
                      </p>
                      <h3 className="font-semibold text-sm line-clamp-1" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                        {item.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="flex-shrink-0 text-xs px-2.5 py-1 rounded-lg transition-all duration-200"
                      style={{ color: '#dc2626', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)', background: 'var(--white)' }}>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        className="w-8 h-8 flex items-center justify-center text-lg transition-colors duration-200 font-medium"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center text-lg transition-colors duration-200 font-medium disabled:opacity-30"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-base font-bold" style={{ color: 'var(--brown)', fontFamily: 'Playfair Display, serif' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}
            >
              Clear cart ✕
            </button>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card-flat">
              <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Platform Fee (5%)</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--olive)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between pt-3 font-bold text-base" style={{ borderTop: '1.5px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => user ? navigate('/checkout') : navigate('/login')}
                className="btn-primary w-full py-3.5 text-sm mb-3"
              >
                {user ? 'Proceed to Checkout →' : 'Sign in to Checkout →'}
              </button>

              <Link to="/" className="block text-center text-sm transition-colors duration-200" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                ← Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-4 p-4 rounded-2xl" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              {[
                { icon: '🔒', text: 'Secured by Stripe' },
                { icon: '↩️', text: 'Easy 30-day returns' },
                { icon: '✦', text: 'Verified artisans' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;