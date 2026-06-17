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
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Discover handcrafted products from our artisans</p>
        <Link
          to="/"
          style={{ backgroundColor: '#8B5E3C' }}
          className="text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#8B5E3C] mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-5 flex gap-4">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <div
                  style={{ backgroundColor: '#D4A96A' }}
                  className="w-20 h-20 rounded-lg flex items-center justify-center text-white text-2xl"
                >
                  🎨
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.store?.storeName}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-400 hover:text-red-600 text-sm transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-lg disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-[#8B5E3C]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => dispatch(clearCart())}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-lg font-semibold text-[#8B5E3C] mb-5">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({items.length} items)</span>
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
            <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                navigate('/checkout');
              }
            }}
            style={{ backgroundColor: '#8B5E3C' }}
            className="w-full text-white py-3 rounded-xl font-semibold mt-6 hover:opacity-90 transition"
          >
            Proceed to Checkout
          </button>

          <Link
            to="/"
            className="block text-center text-sm text-[#8B5E3C] mt-4 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;