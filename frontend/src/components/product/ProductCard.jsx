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
      <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gray-50">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl"
              style={{ background: 'linear-gradient(135deg, #F0D5A0, #D4A96A)' }}
            >
              🎨
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 left-3">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            {product.store?.storeName || 'Artisan Store'}
          </p>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-snug">
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.averageRating} />
            <span className="text-xs text-gray-400">
              ({product.totalReviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-xl font-bold"
                style={{ color: '#6B4226' }}
              >
                ${product.price}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: product.stock > 0 ? '#6B4226' : '#9CA3AF' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
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