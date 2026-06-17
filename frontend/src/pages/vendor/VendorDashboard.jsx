import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProducts, deleteProduct } from '../../api/productService';
import { getVendorAnalytics } from '../../api/analyticsService';

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [productsRes, analyticsRes] = await Promise.all([
        getMyProducts(),
        getVendorAnalytics(),
      ]);
      setProducts(productsRes.data.products);
      setAnalytics(analyticsRes.data.analytics);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#8B5E3C]">Vendor Dashboard</h1>
        <Link
          to="/dashboard/seller/add-product"
          style={{ backgroundColor: '#8B5E3C' }}
          className="text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          + Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-[#8B5E3C]">${analytics.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Your Payout (95%)</p>
            <p className="text-2xl font-bold text-green-600">${analytics.vendorPayout.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-[#8B5E3C]">{analytics.totalOrders}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Products Listed</p>
            <p className="text-2xl font-bold text-[#8B5E3C]">{analytics.totalProducts}</p>
          </div>
        </div>
      )}

      {analytics?.chartData?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#8B5E3C] mb-4">Monthly Revenue (Last 6 Months)</h2>
          <div className="flex items-end gap-4 h-40">
            {analytics.chartData.map((item, index) => {
              const maxRevenue = Math.max(...analytics.chartData.map((d) => d.revenue));
              const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <p className="text-xs text-gray-500 mb-1">${item.revenue.toFixed(0)}</p>
                  <div
                    className="w-full rounded-t-md transition-all"
                    style={{ height: `${height}%`, backgroundColor: '#8B5E3C', minHeight: '4px' }}
                  />
                  <p className="text-xs text-gray-400 mt-1">{item.month}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#8B5E3C]">My Products</h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products yet.</p>
            <Link
              to="/dashboard/seller/add-product"
              className="mt-4 inline-block text-[#8B5E3C] font-semibold hover:underline"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#F5F0E8' }}>
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">Product</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">Category</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">Price</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">Stock</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div style={{ backgroundColor: '#D4A96A' }} className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs">
                            No img
                          </div>
                        )}
                        <span className="font-medium text-gray-800">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-[#8B5E3C]">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/dashboard/seller/edit-product/${product._id}`}
                          style={{ backgroundColor: '#D4A96A' }}
                          className="px-3 py-1 rounded text-xs font-medium text-white"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 rounded text-xs font-medium text-white bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;