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
      <div className="card">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '220px', background: 'var(--cream-dark)' }}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              style={{ transform: 'scale(1)', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, var(--cream-dark), var(--beige))' }}>
              🎨
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--terracotta)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(250,247,242,0.85)', backdropFilter: 'blur(4px)' }}>
              <span className="badge badge-clay text-xs">Out of Stock</span>
            </div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 left-3">
              <span className="badge badge-terracotta text-xs">Only {product.stock} left</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 line-clamp-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            {product.store?.storeName || 'Artisan Store'}
          </p>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.4' }}>
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.averageRating} />
            <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
              {product.averageRating > 0 ? `${product.averageRating}` : '—'} ({product.totalReviews})
            </span>
          </div>

          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <div>
              <span className="text-xl font-bold" style={{ color: 'var(--brown)', fontFamily: 'Playfair Display, serif' }}>
                ${product.price}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: product.stock > 0 ? 'var(--terracotta)' : 'var(--beige)',
                color: product.stock > 0 ? 'white' : 'var(--text-muted)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;