import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentForm from '../../components/checkout/PaymentForm';

const STEPS = ['Review Cart', 'Shipping', 'Payment'];

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  if (items.length === 0 && !sessionStorage.getItem('orderComplete')) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="section-label mb-1">Purchase</p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
            Checkout
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((label, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={{
                    background: index < step ? 'var(--olive)' : index === step ? 'var(--terracotta)' : 'var(--beige)',
                    color: index <= step ? 'white' : 'var(--text-muted)',
                    border: index === step ? '2px solid var(--terracotta-dark)' : '2px solid transparent',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {index < step ? '✓' : index + 1}
                </div>
                <span className="text-xs mt-1.5 font-medium" style={{ color: index <= step ? 'var(--terracotta)' : 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                  {label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 rounded transition-all duration-300" style={{ background: index < step ? 'var(--olive)' : 'var(--beige)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 0 */}
            {step === 0 && (
              <div className="card-flat">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--terracotta)' }}>1</div>
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                    Review Cart
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">🎨</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{item.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: 'var(--brown)', fontFamily: 'Playfair Display, serif' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep(1)} className="btn-primary w-full py-3.5 text-sm">
                  Continue to Shipping →
                </button>
              </div>
            )}

            {step === 1 && (
              <ShippingForm
                onSubmit={(data) => { setShippingData(data); setStep(2); }}
                onBack={() => setStep(0)}
              />
            )}

            {step === 2 && (
              <PaymentForm shippingData={shippingData} onBack={() => setStep(1)} />
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="card-flat">
              <h3 className="font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>Order Summary</h3>
              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Subtotal</span>
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
                <div className="flex justify-between font-bold pt-3 text-base" style={{ borderTop: '1.5px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="space-y-2 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { icon: '🔒', text: 'Secured by Stripe' },
                  { icon: '✦', text: 'Verified artisans' },
                  { icon: '↩️', text: '30-day returns' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                    <span>{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;