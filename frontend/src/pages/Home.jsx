import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Star, Shield, RefreshCw, Truck, Sparkles } from 'lucide-react';
import { getAllProducts } from '../api/productService';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = [
  { name: 'All', icon: '✦' },
  { name: 'Home Decor', icon: '🏡' },
  { name: 'Jewelry', icon: '💍' },
  { name: 'Clothing', icon: '👗' },
  { name: 'Art', icon: '🎨' },
  { name: 'Pottery', icon: '🏺' },
  { name: 'Woodwork', icon: '🪵' },
  { name: 'Candles', icon: '🕯️' },
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
    <div style={{ background: 'var(--bg)' }}>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--text-primary) 0%, #3D2A1A 45%, #5C3D22 100%)', minHeight: '92vh' }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(196,122,74,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(122,82,48,0.4) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(196,122,74,0.2) 0%, transparent 40%)' }}></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

        <div className="container relative" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="animate-fade-up">
              <div className="badge badge-accent mb-6 inline-flex" style={{ background: 'rgba(196,122,74,0.2)', borderColor: 'rgba(196,122,74,0.3)', color: '#F0A870' }}>
                <Sparkles size={10} /> Handmade with Passion
              </div>

              <h1 className="text-display-xl text-white mb-6" style={{ lineHeight: '1.08' }}>
                Discover<br />
                <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Unique</span><br />
                Artisan<br />
                Creations
              </h1>

              <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '440px' }}>
                Support independent artisans and bring home one-of-a-kind handmade products you won't find anywhere else.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-10" style={{ maxWidth: '480px' }}>
                <div className="flex-1 flex items-center gap-3 px-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                  <Search size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                  <input
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search handcrafted products..."
                    className="flex-1 bg-transparent py-3 text-sm text-white"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                </div>
                <button type="submit" className="btn btn-accent">Search</button>
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-12">
                <button onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                  className="btn btn-accent btn-lg">
                  Shop Now <ArrowRight size={18} />
                </button>
                <Link to="/become-seller" className="btn btn-lg"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                  Become a Seller
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-10">
                {[{ n: '500+', l: 'Artisans' }, { n: '2,000+', l: 'Products' }, { n: '10K+', l: 'Happy Buyers' }].map(s => (
                  <div key={s.l}>
                    <p className="text-2xl font-bold text-white font-display">{s.n}</p>
                    <p className="text-xs mt-0.5 label-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card */}
            <div className="animate-fade-up delay-200 hidden lg:block">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
                <p className="label-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Browse Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.slice(1, 9).map(cat => (
                    <button key={cat.name}
                      onClick={() => { setCategory(cat.name); setPage(1); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                      className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all duration-200 group"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,122,74,0.15)'; e.currentTarget.style.borderColor = 'rgba(196,122,74,0.3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm font-medium text-white">{cat.name}</span>
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
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(122,82,48,0.08)' }}>
                  <Icon size={18} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PRODUCTS ===== */}
      <section className="container section-gap">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="label-sm section-eyebrow mb-2">Our Collection</p>
            <h2 className="text-display-md" style={{ color: 'var(--text-primary)' }}>
              {category === 'All' ? 'All Products' : category}
            </h2>
            {!loading && <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>{total} products available</p>}
          </div>
          {search && (
            <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
              className="btn btn-ghost btn-sm self-start">
              Clear "{search}" ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.name}
              onClick={() => { setCategory(cat.name); setPage(1); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200"
              style={{
                background: category === cat.name ? 'var(--primary)' : 'var(--surface)',
                color: category === cat.name ? 'white' : 'var(--text-secondary)',
                border: `1.5px solid ${category === cat.name ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: category === cat.name ? '0 2px 8px rgba(122,82,48,0.25)' : 'none',
              }}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton" style={{ height: '220px' }}></div>
                <div className="card-body space-y-3">
                  <div className="skeleton" style={{ height: '12px', width: '50%' }}></div>
                  <div className="skeleton" style={{ height: '16px' }}></div>
                  <div className="skeleton" style={{ height: '14px', width: '70%' }}></div>
                  <div className="skeleton" style={{ height: '36px', borderRadius: '8px' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-5">🔍</div>
            <h3 className="text-display-sm mb-2">No products found</h3>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Try a different category or search term</p>
            <button onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); }} className="btn btn-primary">
              View all products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, i) => (
                <div key={product._id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-ghost btn-sm disabled:opacity-40">
                  ← Previous
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      className="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        background: page === i + 1 ? 'var(--primary)' : 'var(--surface)',
                        color: page === i + 1 ? 'white' : 'var(--text-secondary)',
                        border: '1.5px solid var(--border)',
                        fontWeight: page === i + 1 ? '700' : '400',
                      }}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="btn btn-ghost btn-sm disabled:opacity-40">
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--text-primary), #3D2A1A)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(196,122,74,0.5) 0%, transparent 60%)' }}></div>
        <div className="container section-gap relative text-center">
          <p className="label-sm mb-4" style={{ color: 'var(--accent)' }}>For Creators</p>
          <h2 className="text-display-lg text-white mb-5">
            Empowering Artisans,<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Preserving Traditions</span>
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Join our community of creators and customers who value handmade, sustainable, and meaningful products.
          </p>
          <Link to="/become-seller" className="btn btn-accent btn-xl inline-flex">
            Open Your Store <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}