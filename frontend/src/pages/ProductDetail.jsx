import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById } from '../api/productService';
import { getProductReviews } from '../api/reviewService';
import { addToCart } from '../features/cart/cartSlice';
import StarRating from '../components/product/StarRating';
import ReviewForm from '../components/product/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          getProductById(id),
          getProductReviews(id),
        ]);
        setProduct(productRes.data.product);
        setReviews(reviewsRes.data.reviews);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      store: product.store,
      stock: product.stock,
      quantity,
    }));
  };

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Product Info Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div
              className="w-full h-96 flex items-center justify-center text-white text-6xl"
              style={{ backgroundColor: '#D4A96A' }}
            >
              🎨
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-2">
              {product.store?.storeName} · {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.title}</h1>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.averageRating} size="lg" />
              <span className="text-gray-500 text-sm">
                {product.averageRating} ({product.totalReviews} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[#8B5E3C]">${product.price}</span>
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{ backgroundColor: product.stock > 0 ? '#8B5E3C' : '#9CA3AF' }}
            className="w-full text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Review Form */}
        <ReviewForm productId={id} onReviewAdded={handleReviewAdded} />

        {/* Reviews List */}
        <div>
          <h3 className="text-lg font-semibold text-[#8B5E3C] mb-4">
            Customer Reviews ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-xl shadow p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{review.user?.name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;