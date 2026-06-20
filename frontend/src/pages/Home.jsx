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
    <div style={{ background: '#0d0d0d', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #c8922a, transparent)', animation: 'pulse 6s ease-in-out infinite' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #e8b84b, transparent)', animation: 'pulse 8s ease-in-out infinite reverse' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #a06820, transparent)', animation: 'pulse 10s ease-in-out infinite' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(200,146,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="text-center max-w-4xl mx-auto animate-fade-up">
            <div className="badge-gold inline-block mb-6">✦ Handcrafted Marketplace</div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8', letterSpacing: '-0.03em' }}>
              Discover
              <span className="gradient-text block">Artisan</span>
              Treasures
            </h1>

            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#8a8070', lineHeight: '1.8' }}>
              A curated marketplace for unique handcrafted products from independent creators around the world.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div
                className="flex gap-2 p-2 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,146,42,0.2)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex-1 flex items-center gap-3 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#5a5045' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search handcrafted products..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: '#f5f0e8', fontFamily: 'DM Sans, sans-serif' }}
                  />
                  <style>{`input::placeholder { color: #5a5045; }`}</style>
                </div>
                <button type="submit" className="btn-gold text-sm px-6 py-2.5">
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex items-center justify-center gap-12">
              {[
                { number: '500+', label: 'Artisans' },
                { number: '2K+', label: 'Products' },
                { number: '10K+', label: 'Happy Buyers' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stat.number}</p>
                  <p className="text-xs uppercase tracking-widest mt-1" style={{ color: '#5a5045' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: '#5a5045' }}>
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #c8922a, transparent)' }}></div>
        </div>
      </section>

      {/* Features strip */}
      <div style={{ borderTop: '1px solid rgba(200,146,42,0.1)', borderBottom: '1px solid rgba(200,146,42,0.1)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: '✦', text: 'Free Worldwide Shipping' },
              { icon: '✦', text: 'Stripe Secured Payments' },
              { icon: '✦', text: 'Verified Artisans Only' },
              { icon: '✦', text: 'Easy 30-Day Returns' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#8a8070' }}>
                <span style={{ color: '#c8922a' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="badge-gold inline-block mb-3">✦ Collection</div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
              {category === 'All' ? 'All Products' : category}
            </h2>
            {!loading && (
              <p className="text-sm mt-1" style={{ color: '#5a5045' }}>
                {total} {total === 1 ? 'product' : 'products'} available
              </p>
            )}
          </div>
          {search && (
            <button
              onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
              className="text-sm transition-all duration-200"
              style={{ color: '#c8922a' }}
            >
              Clear search ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-300 uppercase tracking-wider"
              style={{
                background: category === cat
                  ? 'linear-gradient(135deg, #c8922a, #e8b84b)'
                  : 'rgba(255,255,255,0.04)',
                color: category === cat ? '#0d0d0d' : '#5a5045',
                border: category === cat ? 'none' : '1px solid rgba(200,146,42,0.15)',
                boxShadow: category === cat ? '0 4px 15px rgba(200,146,42,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#161616', border: '1px solid rgba(200,146,42,0.1)' }}>
                <div className="h-52 skeleton"></div>
                <div className="p-4 space-y-3">
                  <div className="h-2 skeleton w-1/2"></div>
                  <div className="h-3 skeleton"></div>
                  <div className="h-3 skeleton w-3/4"></div>
                  <div className="h-8 skeleton rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
              No products found
            </h3>
            <p className="mb-8" style={{ color: '#5a5045' }}>Try a different category or search term</p>
            <button
              onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); }}
              className="btn-gold px-8 py-3"
            >
              View all products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div key={product._id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-fade-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="btn-outline px-5 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      background: page === i + 1 ? 'linear-gradient(135deg, #c8922a, #e8b84b)' : 'rgba(255,255,255,0.04)',
                      color: page === i + 1 ? '#0d0d0d' : '#5a5045',
                      border: '1px solid rgba(200,146,42,0.15)',
                      fontWeight: page === i + 1 ? '700' : '400',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="btn-outline px-5 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(200,146,42,0.1)', marginTop: '4rem' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'linear-gradient(135deg, #c8922a, transparent)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="badge-gold inline-block mb-4">✦ For Creators</div>
          <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
            Start selling your craft
          </h2>
          <p className="mb-10 max-w-xl mx-auto" style={{ color: '#8a8070' }}>
            Join thousands of independent artisans. Set up your store in minutes and reach buyers worldwide.
          </p>
          <Link to="/become-seller" className="btn-gold px-10 py-4 text-base inline-block">
            Open Your Store →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;