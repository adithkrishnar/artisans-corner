import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
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
      <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-4xl"
              style={{ backgroundColor: '#D4A96A' }}
            >
              🎨
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1">{product.store?.storeName || 'Artisan Store'}</p>
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{product.title}</h3>

          <div className="flex items-center gap-1 mb-2">
            <StarRating rating={product.averageRating} />
            <span className="text-xs text-gray-400">({product.totalReviews})</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-[#8B5E3C]">${product.price}</span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{ backgroundColor: product.stock > 0 ? '#8B5E3C' : '#9CA3AF' }}
              className="text-white text-xs px-3 py-1.5 rounded-lg transition hover:opacity-90 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;