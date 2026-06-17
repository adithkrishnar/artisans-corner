import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        setOrders(res.data.orders);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-yellow-100 text-yellow-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#8B5E3C] mb-8">My Orders</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
          <Link
            to="/"
            style={{ backgroundColor: '#8B5E3C' }}
            className="text-white px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">ORDER ID</p>
                  <p className="text-sm font-medium text-gray-700">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">DATE</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-b py-4 mb-4 space-y-3">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div
                        style={{ backgroundColor: '#D4A96A' }}
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      >
                        🎨
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#8B5E3C]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                      {order.paymentStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Platform fee: ${order.platformFee?.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total Paid</p>
                  <p className="text-xl font-bold text-[#8B5E3C]">
                    ${order.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;