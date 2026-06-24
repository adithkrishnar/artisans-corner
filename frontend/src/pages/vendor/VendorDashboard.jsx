import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, TrendingUp, Package, ShoppingBag, DollarSign, Edit2, Trash2, BarChart2 } from 'lucide-react';
import { getMyProducts, deleteProduct } from '../../api/productService';
import { getVendorAnalytics } from '../../api/analyticsService';
import StarRating from '../../components/product/StarRating';

export default function VendorDashboard() {
  const { user } = useSelector(s => s.auth);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, aRes] = await Promise.all([getMyProducts(), getVendorAnalytics()]);
        setProducts(pRes.data.products);
        setAnalytics(aRes.data.analytics);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await deleteProduct(id); setProducts(p => p.filter(x => x._id !== id)); }
    catch { alert('Failed to delete'); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <div className="spinner-primary mx-auto mb-4" style={{ width: '2rem', height: '2rem', borderWidth: '3px' }}></div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
      </div>
    </div>
  );

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: `$${(analytics?.totalRevenue || 0).toFixed(2)}`, sub: 'Gross revenue', color: 'var(--primary)', bg: 'rgba(122,82,48,0.08)' },
    { icon: TrendingUp, label: 'Your Payout', value: `$${(analytics?.vendorPayout || 0).toFixed(2)}`, sub: '95% of revenue', color: '#059669', bg: 'rgba(16,185,129,0.08)' },
    { icon: ShoppingBag, label: 'Total Orders', value: analytics?.totalOrders || 0, sub: 'Orders received', color: '#2563eb', bg: 'rgba(59,130,246,0.08)' },
    { icon: Package, label: 'Products', value: analytics?.totalProducts || 0, sub: 'Active listings', color: 'var(--accent)', bg: 'rgba(196,122,74,0.08)' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="label-sm section-eyebrow mb-1">Vendor Dashboard</p>
            <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Here's what's happening with your store today.</p>
          </div>
          <Link to="/dashboard/seller/add-product" className="btn btn-primary self-start">
            <Plus size={16} /> Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <span className="badge badge-muted">Live</span>
              </div>
              <p className="font-display text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {analytics?.chartData?.length > 0 && (
          <div className="card-flat mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="label-sm section-eyebrow mb-1">Analytics</p>
                <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Revenue Overview</h2>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <BarChart2 size={15} /> Last 6 months
              </div>
            </div>
            <div className="flex items-end gap-3" style={{ height: '160px' }}>
              {analytics.chartData.map((item, i) => {
                const max = Math.max(...analytics.chartData.map(d => d.revenue));
                const h = max > 0 ? (item.revenue / max) * 100 : 4;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 group">
                    <p className="text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-semibold" style={{ color: 'var(--primary)' }}>
                      ${item.revenue.toFixed(0)}
                    </p>
                    <div className="w-full rounded-t-lg transition-all duration-500 cursor-pointer"
                      style={{ height: `${Math.max(h, 4)}%`, background: 'linear-gradient(to top, var(--primary), var(--accent))', minHeight: '6px' }} />
                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{item.month}</p>
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
              <p className="label-sm section-eyebrow mb-1">Inventory</p>
              <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>My Products</h2>
            </div>
            <Link to="/dashboard/seller/add-product" className="btn btn-secondary btn-sm">
              <Plus size={14} /> Add Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="font-display text-xl font-bold mb-2">No products yet</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Start by adding your first handcrafted product</p>
              <Link to="/dashboard/seller/add-product" className="btn btn-primary">Add Your First Product</Link>
            </div>
          ) : (
            <div className="overflow-x-auto" style={{ borderTop: '1px solid var(--border)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--bg)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 label-xs" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} className="table-row">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                            {p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">🎨</div>}
                          </div>
                          <div>
                            <p className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>#{p._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4"><span className="badge badge-primary">{p.category}</span></td>
                      <td className="px-4 py-4">
                        <span className="font-display font-bold" style={{ color: 'var(--primary)' }}>${p.price}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`badge ${p.stock > 5 ? 'badge-green' : p.stock > 0 ? 'badge-orange' : 'badge-red'}`}>
                          {p.stock > 0 ? `${p.stock} units` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={p.averageRating} size="xs" />
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({p.totalReviews})</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/dashboard/seller/edit-product/${p._id}`} className="btn btn-ghost btn-sm">
                            <Edit2 size={13} /> Edit
                          </Link>
                          <button onClick={() => handleDelete(p._id)} className="btn btn-danger btn-sm">
                            <Trash2 size={13} /> Delete
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
}