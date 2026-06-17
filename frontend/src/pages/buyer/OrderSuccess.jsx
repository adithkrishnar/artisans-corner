import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
  sessionStorage.removeItem('orderComplete');
  const fetchLatestOrder = async () => {
    try {
      const res = await API.get('/orders/my-orders');
      if (res.data.orders.length > 0) {
        setOrder(res.data.orders[0]);
      }
    } catch (err) {
      console.error('Failed to fetch order');
    }
  };
  fetchLatestOrder();
}, []);;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F0FFF4' }}>
          <span className="text-4xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold text-[#8B5E3C] mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {order && (
          <div className="bg-[#F5F0E8] rounded-xl p-4 mb-6 text-left">
            <p className="text-xs font-medium text-gray-500 mb-3">ORDER SUMMARY</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium text-gray-800 text-xs">{order._id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Paid</span>
                <span className="font-bold text-[#8B5E3C]">${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (5%)</span>
                <span className="text-gray-800">${order.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vendor Payout (95%)</span>
                <span className="text-green-600">${order.vendorPayout.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </div>
        )}

        <Link
          to="/"
          style={{ backgroundColor: '#8B5E3C' }}
          className="block text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;