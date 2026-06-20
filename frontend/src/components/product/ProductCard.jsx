import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      store: product.store,
      stock: product.stock,
    }));
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="card-dark overflow-hidden">
        {/* Image */}
        <div className="relative h-52 overflow-hidden" style={{ background: '#1a1a1a' }}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl"
              style={{ background: 'linear-gradient(135deg, #1a1000, #2d1a00)' }}
            >
              🎨
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>

          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: '#8a8070', border: '1px solid rgba(255,255,255,0.1)' }}>
                Out of Stock
              </span>
            </div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 left-3">
              <span className="badge-gold text-xs">Only {product.stock} left</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#5a5045' }}>
            {product.store?.storeName || 'Artisan Store'}
          </p>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-snug" style={{ color: '#f5f0e8' }}>
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-4">
            <StarRating rating={product.averageRating} />
            <span className="text-xs" style={{ color: '#5a5045' }}>({product.totalReviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: product.stock > 0 ? 'linear-gradient(135deg, #c8922a, #e8b84b)' : '#2a2a2a',
                color: product.stock > 0 ? '#0d0d0d' : '#5a5045',
                boxShadow: product.stock > 0 ? '0 4px 15px rgba(200,146,42,0.3)' : 'none',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;