import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { clearCart } from '../../features/cart/cartSlice';
import API from '../../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Segoe UI, sans-serif',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#e53e3e' },
  },
};

const CheckoutForm = ({ shippingData, total, platformFee, subtotal, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await API.post('/orders/create', {
          items,
          shippingAddress: shippingData,
          paymentIntentId: paymentIntent.id,
        });

  sessionStorage.setItem('orderComplete', 'true');
  dispatch(clearCart());
  navigate('/order-success');
}
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Shipping Summary */}
      <div className="bg-[#F5F0E8] rounded-lg p-4 mb-6">
        <p className="text-xs font-medium text-gray-500 mb-1">SHIPPING TO</p>
        <p className="text-sm text-gray-700">
          {shippingData?.street}, {shippingData?.city}, {shippingData?.state} {shippingData?.zip}, {shippingData?.country}
        </p>
      </div>

      {/* Card Element */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
          <p className="text-xs text-blue-600 font-medium">Test Card Details:</p>
          <p className="text-xs text-blue-500">Number: 4242 4242 4242 4242</p>
          <p className="text-xs text-blue-500">Expiry: Any future date | CVC: Any 3 digits</p>
        </div>
      </div>

      {/* Secure badge */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <span>🔒</span>
        <span>Secured by Stripe — your payment info is encrypted</span>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4 space-y-2 mb-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Platform Fee (5%)</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-gray-800 text-base pt-1 border-t">
          <span>Total</span>
          <span className="text-[#8B5E3C]">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !stripe}
        style={{ backgroundColor: loading ? '#9CA3AF' : '#8B5E3C' }}
        className="w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Processing...
          </>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const PaymentForm = ({ shippingData, onBack }) => {
  const { items } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState('');
  const [total, setTotal] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await API.post('/orders/create-payment-intent', { items });
        setClientSecret(res.data.clientSecret);
        setTotal(res.data.total);
        setPlatformFee(res.data.platformFee);
        setSubtotal(res.data.subtotal);
      } catch (err) {
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    createIntent();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <div className="animate-pulse">
          <p className="text-gray-400">Initializing secure payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#8B5E3C]">Secure Payment</h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Back
        </button>
      </div>

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <CheckoutForm
            shippingData={shippingData}
            total={total}
            platformFee={platformFee}
            subtotal={subtotal}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
    </div>
  );
};

export default PaymentForm;