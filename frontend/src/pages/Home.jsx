import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productService';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = ['All', 'Home Decor', 'Jewelry', 'Clothing', 'Art', 'Pottery', 'Woodwork', 'Candles', 'Textiles', 'Food & Drink', 'Other'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const res = await getAllProducts(params);
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={{ backgroundColor: '#8B5E3C' }} className="text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Handcrafted Treasures</h1>
        <p className="text-lg opacity-90 mb-8">Support local artisans and find unique handmade products</p>
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2.5 rounded-lg text-gray-800 text-sm focus:outline-none"
          />
          <button
            type="submit"
            style={{ backgroundColor: '#D4A96A' }}
            className="text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
              style={{
                backgroundColor: category === cat ? '#8B5E3C' : '#F5F0E8',
                color: category === cat ? 'white' : '#8B5E3C',
                border: '1px solid #8B5E3C',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No products found</p>
            <p className="text-gray-300 text-sm mt-2">Try a different category or search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  style={{ backgroundColor: '#8B5E3C' }}
                  className="text-white px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  style={{ backgroundColor: '#8B5E3C' }}
                  className="text-white px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;