import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentForm from '../../components/checkout/PaymentForm';

const STEPS = ['Review Cart', 'Shipping', 'Payment'];

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useSelector(s => s.cart);
  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState(null);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  if (items.length === 0 && !sessionStorage.getItem('orderComplete')) { navigate('/cart'); return null; }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12" style={{ maxWidth: '1100px' }}>
        <div className="mb-10">
          <p className="label-sm section-eyebrow mb-1">Purchase</p>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center mb-14">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={{
                    background: i < step ? '#059669' : i === step ? 'var(--primary)' : 'var(--border)',
                    color: i <= step ? 'white' : 'var(--text-muted)',
                  }}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <span className="text-xs mt-1.5 font-medium"
                  style={{ color: i <= step ? 'var(--primary)' : 'var(--text-muted)' }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 rounded transition-all duration-300"
                  style={{ background: i < step ? '#059669' : 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {step === 0 && (
              <div className="card-flat p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--primary)' }}>1</div>
                  <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Review Cart</h2>
                </div>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item._id} className="flex items-center gap-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">🎨</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                      </div>
                      <span className="font-display font-bold flex-shrink-0" style={{ color: 'var(--primary)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="btn btn-primary btn-lg w-full">Continue to Shipping →</button>
              </div>
            )}
            {step === 1 && <ShippingForm onSubmit={d => { setShippingData(d); setStep(2); }} onBack={() => setStep(0)} />}
            {step === 2 && <PaymentForm shippingData={shippingData} onBack={() => setStep(1)} />}
          </div>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24 space-y-4">
            <div className="card-flat p-8">
              <h3 className="font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>Order Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  { l: 'Subtotal', v: `$${subtotal.toFixed(2)}` },
                  { l: 'Platform Fee (5%)', v: `$${platformFee.toFixed(2)}` },
                  { l: 'Shipping', v: 'Free', green: true },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>{row.l}</span>
                    <span style={{ color: row.green ? '#059669' : 'inherit' }}>{row.v}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base pt-3" style={{ borderTop: '1.5px solid var(--border)', color: 'var(--text-primary)' }}>
                  <span>Total</span>
                  <span className="font-display" style={{ color: 'var(--primary)' }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="card-flat p-8 space-y-3">
              {[{ icon: '🔒', text: 'Secured by Stripe' }, { icon: '✦', text: 'Verified artisans' }, { icon: '↩️', text: '30-day returns' }].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
