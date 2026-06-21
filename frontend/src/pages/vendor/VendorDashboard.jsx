import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMyProducts, deleteProduct } from '../../api/productService';
import { getVendorAnalytics } from '../../api/analyticsService';

const VendorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    try {
      const [pRes, aRes] = await Promise.all([getMyProducts(), getVendorAnalytics()]);
      setProducts(pRes.data.products);
      setAnalytics(aRes.data.analytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent mx-auto mb-4 animate-spin" style={{ borderColor: 'var(--terracotta)', borderTopColor: 'transparent' }}></div>
          <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Sales', value: `$${(analytics?.totalRevenue || 0).toFixed(2)}`, sub: 'Revenue generated', icon: '💰', color: 'var(--terracotta)' },
    { label: 'Your Payout', value: `$${(analytics?.vendorPayout || 0).toFixed(2)}`, sub: '95% of revenue', icon: '📈', color: 'var(--olive)' },
    { label: 'Total Orders', value: analytics?.totalOrders || 0, sub: 'Orders received', icon: '📦', color: 'var(--clay)' },
    { label: 'Products', value: analytics?.totalProducts || 0, sub: 'Active listings', icon: '🎨', color: 'var(--brown)' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-1">Vendor Dashboard</p>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
              Here's what's happening with your store today.
            </p>
          </div>
          <Link to="/dashboard/seller/add-product" className="btn-primary text-sm px-6 py-3 self-start">
            + Add New Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="badge badge-terracotta text-xs" style={{ background: 'rgba(196,113,74,0.08)' }}>Live</span>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {analytics?.chartData?.length > 0 && (
          <div className="card-flat mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label mb-1">Analytics</p>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                  Revenue Overview
                </h2>
              </div>
              <span className="badge badge-clay text-xs">Last 6 months</span>
            </div>
            <div className="flex items-end gap-3 h-40">
              {analytics.chartData.map((item, index) => {
                const maxRevenue = Math.max(...analytics.chartData.map((d) => d.revenue));
                const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 4;
                return (
                  <div key={index} className="flex flex-col items-center flex-1 group">
                    <p className="text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--terracotta)', fontFamily: 'DM Sans, sans-serif' }}>
                      ${item.revenue.toFixed(0)}
                    </p>
                    <div
                      className="w-full rounded-t-xl transition-all duration-500 cursor-pointer"
                      style={{
                        height: `${Math.max(height, 4)}%`,
                        background: 'linear-gradient(to top, var(--terracotta-dark), var(--terracotta-light))',
                        minHeight: '6px',
                      }}
                    />
                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="card-flat">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="section-label mb-1">Inventory</p>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                My Products
              </h2>
            </div>
            <Link to="/dashboard/seller/add-product" className="btn-secondary text-xs px-4 py-2">
              + Add Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                No products yet
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                Start by adding your first handcrafted product
              </p>
              <Link to="/dashboard/seller/add-product" className="btn-primary text-sm px-6 py-2.5">
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto" style={{ borderTop: '1px solid var(--border)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--cream)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="table-row">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg">🎨</div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                              {product.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>ID: {product._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="badge badge-clay text-xs">{product.category}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold" style={{ color: 'var(--brown)', fontFamily: 'Playfair Display, serif' }}>
                          ${product.price}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="badge text-xs"
                          style={{
                            background: product.stock > 5 ? 'rgba(107,115,85,0.1)' : product.stock > 0 ? 'rgba(196,113,74,0.1)' : 'rgba(239,68,68,0.1)',
                            color: product.stock > 5 ? 'var(--olive)' : product.stock > 0 ? 'var(--terracotta)' : '#dc2626',
                            border: `1px solid ${product.stock > 5 ? 'rgba(107,115,85,0.2)' : product.stock > 0 ? 'rgba(196,113,74,0.2)' : 'rgba(239,68,68,0.2)'}`,
                          }}
                        >
                          {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm" style={{ color: 'var(--terracotta)' }}>★</span>
                          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                            {product.averageRating || '—'}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({product.totalReviews})</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/dashboard/seller/edit-product/${product._id}`}
                            className="btn-ghost text-xs px-3 py-1.5"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200"
                            style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)', fontFamily: 'DM Sans, sans-serif' }}
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
    </div>
  );
};

export default VendorDashboard;