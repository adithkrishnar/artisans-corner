import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentForm from '../../components/checkout/PaymentForm';

const STEPS = ['Cart Review', 'Shipping', 'Payment'];

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#8B5E3C] mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition"
                style={{
                  backgroundColor: index <= step ? '#8B5E3C' : '#E5E7EB',
                  color: index <= step ? 'white' : '#9CA3AF',
                }}
              >
                {index < step ? '✓' : index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500">{label}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className="flex-1 h-1 mx-2 rounded"
                style={{ backgroundColor: index < step ? '#8B5E3C' : '#E5E7EB' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Step 0 - Cart Review */}
          {step === 0 && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-[#8B5E3C] mb-4">Review Your Cart</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 py-3 border-b last:border-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div style={{ backgroundColor: '#D4A96A' }} className="w-12 h-12 rounded-lg flex items-center justify-center text-white">
                        🎨
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-[#8B5E3C]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                style={{ backgroundColor: '#8B5E3C' }}
                className="w-full text-white py-3 rounded-xl font-semibold mt-6 hover:opacity-90 transition"
              >
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Step 1 - Shipping */}
          {step === 1 && (
            <ShippingForm
              onSubmit={(data) => {
                setShippingData(data);
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          )}

          {/* Step 2 - Payment */}
          {step === 2 && (
            <PaymentForm
              shippingData={shippingData}
              onBack={() => setStep(1)}
            />
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-xl shadow p-5 h-fit">
          <h3 className="font-semibold text-[#8B5E3C] mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Fee (5%)</span>
              <span>${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;