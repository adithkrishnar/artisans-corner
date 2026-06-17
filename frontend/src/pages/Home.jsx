import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/productService';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = ['All', 'Home Decor', 'Jewelry', 'Clothing', 'Art', 'Pottery', 'Woodwork', 'Candles', 'Textiles', 'Food & Drink', 'Other'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      setError('Failed to load products');
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
    <div>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #6B4226 0%, #8B5E3C 50%, #D4A96A 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>✨</span>
            <span>Handcrafted with love</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Discover Unique
            <br />
            <span style={{ color: '#F0D5A0' }}>Handcrafted Treasures</span>
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Support independent artisans and find one-of-a-kind products you won't find anywhere else.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search handcrafted products..."
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-white font-semibold rounded-xl text-sm transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#6B4226' }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12">
            {[
              { number: '500+', label: 'Artisans' },
              { number: '2K+', label: 'Products' },
              { number: '10K+', label: 'Happy Buyers' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.number}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            {[
              { icon: '🚚', text: 'Free Shipping' },
              { icon: '🔒', text: 'Secure Payments' },
              { icon: '↩️', text: 'Easy Returns' },
              { icon: '⭐', text: 'Verified Artisans' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={{
                backgroundColor: category === cat ? '#6B4226' : 'white',
                color: category === cat ? 'white' : '#6B7280',
                border: category === cat ? '1px solid #6B4226' : '1px solid #E5E7EB',
                boxShadow: category === cat ? '0 2px 8px rgba(107,66,38,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {search ? `Results for "${search}" · ` : ''}{total} products found
            </p>
            {search && (
              <button
                onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
                className="text-sm font-medium hover:underline"
                style={{ color: '#6B4226' }}
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try a different category or search term</p>
            <button
              onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); }}
              className="px-6 py-2.5 text-white font-semibold rounded-xl"
              style={{ backgroundColor: '#6B4226' }}
            >
              View all products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#6B4226', color: 'white' }}
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: page === i + 1 ? '#6B4226' : 'white',
                        color: page === i + 1 ? 'white' : '#6B7280',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#6B4226', color: 'white' }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-white border-t border-gray-100 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Are you an artisan?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Join thousands of independent creators selling their handcrafted products on Artisan's Corner.
          </p>
          <Link
            to="/become-seller"
            className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: '#6B4226' }}
          >
            Start Selling Today →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;