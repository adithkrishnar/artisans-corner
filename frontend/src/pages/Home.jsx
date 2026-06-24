import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Star, Shield, RefreshCw, Truck, Sparkles } from 'lucide-react';
import { getAllProducts } from '../api/productService';
import ProductCard from '../components/product/ProductCard';

// Reordered to match the image: All, then Home Decor, Clothing, Pottery, Candles, Jewelry, Art, Woodwork, Textiles, then extras
const CATEGORIES = [
  { name: 'All', icon: '✦' },
  { name: 'Home Decor', icon: '🏡' },
  { name: 'Clothing', icon: '👗' },
  { name: 'Pottery', icon: '🏺' },
  { name: 'Candles', icon: '🕯️' },
  { name: 'Jewelry', icon: '💍' },
  { name: 'Art', icon: '🎨' },
  { name: 'Woodwork', icon: '🪵' },
  { name: 'Textiles', icon: '🧵' },
  { name: 'Food & Drink', icon: '🍯' },
  { name: 'Other', icon: '✨' },
];

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: Shield, title: 'Secure Payments', desc: 'Protected by Stripe' },
  { icon: Star, title: 'Verified Artisans', desc: 'Curated quality' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day guarantee' },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const res = await getAllProducts(params);
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [category, page, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); setPage(1); };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, var(--text-primary) 0%, #3D2A1A 45%, #5C3D22 100%)',
          padding: '6rem 0 5rem',
        }}
      >
        {/* Background textures - unchanged */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(196,122,74,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(122,82,48,0.4) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(196,122,74,0.2) 0%, transparent 40%)' }}></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left content */}
            <div className="space-y-6 md:space-y-8">
              <div className="badge badge-accent inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase" style={{ background: 'rgba(196,122,74,0.2)', border: '1px solid rgba(196,122,74,0.3)', color: '#F0A870' }}>
                <Sparkles size={14} /> Handmade with Passion
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Discover<br />
                <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Unique</span><br />
                Artisan<br />
                Creations
              </h1>

              <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed">
                Support independent artisans and bring home one-of-a-kind handmade products you won't find anywhere else.
              </p>

              {/* Search form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-md w-full">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 focus-within:border-accent/50 transition-colors">
                  <Search size={18} className="text-white/40 flex-shrink-0" />
                  <input
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search handcrafted products..."
                    className="w-full bg-transparent py-2.5 text-sm text-white placeholder-white/40 outline-none"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                </div>
                <button type="submit" className="btn btn-accent px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap">
                  Search
                </button>
              </form>

              {/* CTA Buttons - added mt-4 for spacing from search */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                  className="btn btn-accent px-8 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2"
                >
                  Shop Now <ArrowRight size={18} />
                </button>
                <Link
                  to="/become-seller"
                  className="btn px-8 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Become a Seller
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                {[{ n: '500+', l: 'Artisans' }, { n: '2,000+', l: 'Products' }, { n: '10K+', l: 'Happy Buyers' }].map(s => (
                  <div key={s.l}>
                    <p className="text-2xl md:text-3xl font-bold text-white font-display">{s.n}</p>
                    <p className="text-xs uppercase tracking-wider text-white/40 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Category cards - improved to fit properly */}
            <div className="hidden lg:block">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-4">Browse Categories</p>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.slice(1, 9).map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => { setCategory(cat.name); setPage(1); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                      className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:bg-accent/20 hover:border-accent/30 border border-white/10 bg-white/5 group min-w-0"
                    >
                      <span className="text-xl flex-shrink-0">{cat.icon}</span>
                      <span className="text-sm font-medium text-white truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '60px' }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 60V30C360 0 720 60 1440 30V60H0Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(122,82,48,0.08)' }}>
                  <Icon size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary" style={{ color: 'var(--text-primary)' }}>{title}</p>
                  <p className="text-xs text-muted" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PRODUCTS ===== */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">Our Collection</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {category === 'All' ? 'All Products' : category}
            </h2>
            {!loading && <p className="text-sm text-muted mt-1" style={{ color: 'var(--text-muted)' }}>{total} products available</p>}
          </div>
          {search && (
            <button
              onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
              className="btn btn-ghost btn-sm px-4 py-2 rounded-full text-sm"
            >
              Clear "{search}" ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => { setCategory(cat.name); setPage(1); }}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${category === cat.name
                  ? 'bg-primary text-white shadow-md shadow-primary/25 border-primary'
                  : 'bg-surface text-secondary border-border hover:bg-primary/10 hover:border-primary/30'
                }
                border-2
              `}
              style={{
                background: category === cat.name ? 'var(--primary)' : 'var(--surface)',
                color: category === cat.name ? 'white' : 'var(--text-secondary)',
                borderColor: category === cat.name ? 'var(--primary)' : 'var(--border)',
              }}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card bg-surface rounded-xl overflow-hidden shadow-sm">
                <div className="skeleton w-full h-56 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="skeleton h-3 w-1/2 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="skeleton h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="skeleton h-3 w-2/3 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="skeleton h-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-5">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-sm text-muted mb-8">Try a different category or search term</p>
            <button onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); }} className="btn btn-primary px-8 py-3 rounded-xl">
              View all products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {products.map((product, i) => (
                <div key={product._id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-14">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="btn btn-ghost btn-sm px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  ← Previous
                </button>
                <div className="flex gap-1.5">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`
                        w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                        ${page === i + 1
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'bg-surface text-secondary border-border hover:bg-primary/10'
                        }
                        border-2
                      `}
                      style={{
                        background: page === i + 1 ? 'var(--primary)' : 'var(--surface)',
                        color: page === i + 1 ? 'white' : 'var(--text-secondary)',
                        borderColor: page === i + 1 ? 'var(--primary)' : 'var(--border)',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="btn btn-ghost btn-sm px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--text-primary), #3D2A1A)' }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(196,122,74,0.5) 0%, transparent 60%)' }}></div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 relative text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">For Creators</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Empowering Artisans,<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Preserving Traditions</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto mt-4 mb-10 leading-relaxed">
            Join our community of creators and customers who value handmade, sustainable, and meaningful products.
          </p>
          <Link
            to="/become-seller"
            className="btn btn-accent px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow"
          >
            Open Your Store <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}