import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes] = await Promise.all([getProductById(id), getProductReviews(id)]);
        setProduct(pRes.data.product);
        setReviews(rRes.data.reviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ _id: product._id, title: product.title, price: product.price, imageUrl: product.imageUrl, store: product.store, stock: product.stock, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewAdded = (newReview) => setReviews([newReview, ...reviews]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--terracotta)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center">
          <p className="text-2xl mb-4">😕</p>
          <p style={{ color: 'var(--text-muted)' }}>Product not found</p>
          <Link to="/" className="btn-primary mt-4 inline-block">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{product.title}</span>
        </div>

        {/* Main Product */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {/* Image */}
          <div className="space-y-3">
            <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title} className="w-full h-96 md:h-[500px] object-cover" />
              ) : (
                <div className="w-full h-96 md:h-[500px] flex items-center justify-center text-8xl" style={{ background: 'linear-gradient(135deg, var(--cream-dark), var(--beige))' }}>
                  🎨
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <Link to="/" className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--terracotta)', fontFamily: 'DM Sans, sans-serif' }}>
                {product.store?.storeName}
              </Link>
              <span className="text-xs mx-2" style={{ color: 'var(--border-dark)' }}>·</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{product.category}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', lineHeight: '1.2' }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.averageRating} size="md" />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                {product.averageRating > 0 ? product.averageRating : 'No'} rating
              </span>
              <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                ({product.totalReviews} {product.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--brown)' }}>
                ${product.price}
              </span>
              <span
                className="badge text-xs"
                style={{
                  background: product.stock > 0 ? 'rgba(107,115,85,0.1)' : 'rgba(239,68,68,0.08)',
                  color: product.stock > 0 ? 'var(--olive)' : '#dc2626',
                  border: `1px solid ${product.stock > 0 ? 'rgba(107,115,85,0.2)' : 'rgba(239,68,68,0.15)'}`,
                }}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.8' }}>
              {product.description}
            </p>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>Quantity</span>
                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)', background: 'var(--white)' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary w-full py-4 text-sm mb-3 relative overflow-hidden"
            >
              {added ? '✓ Added to Cart!' : product.stock > 0 ? 'Add to Cart →' : 'Out of Stock'}
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: '🚚', text: 'Free Shipping' },
                { icon: '↩️', text: '30-Day Returns' },
                { icon: '🔒', text: 'Secure Payment' },
              ].map((f, i) => (
                <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                  <div className="text-xl mb-1">{f.icon}</div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-2 gap-8">
          <ReviewForm productId={id} onReviewAdded={handleReviewAdded} />

          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                Customer Reviews
              </h3>
              <span className="badge badge-clay text-xs">{reviews.length} reviews</span>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>No reviews yet</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>Be the first to review this product</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, var(--terracotta), var(--clay))' }}>
                          {review.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{review.user?.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;