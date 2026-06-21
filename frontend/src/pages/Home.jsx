import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/productService';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = ['All', 'Home Decor', 'Jewelry', 'Clothing', 'Art', 'Pottery', 'Woodwork', 'Candles', 'Textiles', 'Food & Drink', 'Other'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const res = await getAllProducts(params);
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [category, page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--brown) 0%, var(--brown-light) 50%, var(--clay) 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--terracotta-light), transparent)' }}></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--clay-light), transparent)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, white, transparent)' }}></div>
          {/* Grid */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-up">
              <div className="badge badge-clay mb-6 inline-flex" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'DM Sans, sans-serif' }}>
                ✦ Handmade with Passion
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-none" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.03em' }}>
                Discover<br />
                <em className="not-italic" style={{ color: 'var(--terracotta-light)' }}>Unique</em><br />
                Artisan<br />
                Creations
              </h1>

              <p className="text-lg mb-10 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif' }}>
                Support independent artisans and bring home one-of-a-kind handmade products you won't find anywhere else.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Link to="/" onClick={() => { setCategory('All'); setSearchInput(''); setSearch(''); }} className="btn-primary px-8 py-3.5 text-sm">
                  Shop Now
                </Link>
                <Link to="/become-seller" className="btn-ghost px-8 py-3.5 text-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Become a Seller
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { n: '500+', l: 'Artisans' },
                  { n: '2K+', l: 'Products' },
                  { n: '10K+', l: 'Happy Buyers' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{s.n}</p>
                    <p className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Search + Featured */}
            <div className="animate-fade-up hidden lg:block" style={{ animationDelay: '0.2s' }}>
              <div className="p-6 rounded-3xl" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <form onSubmit={handleSearch} className="mb-6">
                  <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif' }}>
                    Search Products
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Handmade pottery, jewelry..."
                        className="flex-1 bg-transparent py-3 text-sm outline-none text-white"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      />
                    </div>
                    <button type="submit" className="btn-primary px-5 py-3 text-sm">
                      Search
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.slice(1, 5).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setPage(1); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                      className="p-3.5 rounded-xl text-left transition-all duration-200 group"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <p className="text-sm font-medium text-white group-hover:text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>{cat}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Browse →</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: '🚚', text: 'Free Shipping on orders over $100' },
              { icon: '🔒', text: 'Secure Stripe Payments' },
              { icon: '✦', text: 'Verified Independent Artisans' },
              { icon: '↩️', text: 'Easy 30-Day Returns' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                <span className="text-base">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-2">Our Collection</p>
            <h2 className="section-title">
              {category === 'All' ? 'All Products' : category}
            </h2>
            {!loading && (
              <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                Showing {products.length} of {total} products
              </p>
            )}
          </div>
          {search && (
            <button
              onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
              className="btn-ghost text-sm self-start"
            >
              Clear "{search}" ✕
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 uppercase tracking-wide"
              style={{
                background: category === cat ? 'var(--terracotta)' : 'var(--white)',
                color: category === cat ? 'white' : 'var(--text-secondary)',
                border: category === cat ? '1px solid var(--terracotta)' : '1px solid var(--border)',
                boxShadow: category === cat ? '0 4px 12px rgba(196,113,74,0.25)' : 'none',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="h-52 skeleton"></div>
                <div className="p-4 space-y-3">
                  <div className="h-2.5 skeleton w-1/2"></div>
                  <div className="h-3.5 skeleton"></div>
                  <div className="h-3 skeleton w-3/4"></div>
                  <div className="h-9 skeleton rounded-xl mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-5">🔍</div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              No products found
            </h3>
            <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>Try a different category or search term</p>
            <button onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); }} className="btn-primary px-8 py-3">
              View all products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, i) => (
                <div key={product._id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="btn-ghost px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        background: page === i + 1 ? 'var(--terracotta)' : 'var(--white)',
                        color: page === i + 1 ? 'white' : 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: page === i + 1 ? '700' : '400',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="btn-ghost px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--brown), var(--clay))', marginTop: '2rem' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <span className="badge badge-clay inline-flex mb-5" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}>
            ✦ For Creators
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            Empowering Artisans,<br />Preserving Traditions
          </h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
            Join our community of creators and customers who value handmade, sustainable, and meaningful products.
          </p>
          <Link to="/become-seller" className="btn-primary px-10 py-4 inline-block text-base">
            Open Your Store →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;