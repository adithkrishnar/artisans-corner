import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Minus, Plus, Check, Shield, Truck, RefreshCw, ChevronRight } from 'lucide-react';
import { getProductById } from '../api/productService';
import { getProductReviews } from '../api/reviewService';
import { addToCart } from '../features/cart/cartSlice';
import StarRating from '../components/product/StarRating';
import ReviewForm from '../components/product/ReviewForm';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, rRes] = await Promise.all([getProductById(id), getProductReviews(id)]);
        setProduct(pRes.data.product);
        setReviews(rRes.data.reviews);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ _id: product._id, title: product.title, price: product.price, imageUrl: product.imageUrl, store: product.store, stock: product.stock, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="spinner-primary" style={{ width: '2.5rem', height: '2.5rem', borderWidth: '3px' }}></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="mb-4" style={{ color: 'var(--text-muted)' }}>Product not found</p>
        <Link to="/" className="btn btn-primary">Back to Shop</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
          <Link to="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <ChevronRight size={12} />
          <span>{product.category}</span>
          <ChevronRight size={12} />
          <span className="line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-20">
          <div>
            <div className="card overflow-hidden" style={{ aspectRatio: '1', background: 'var(--bg-soft)' }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl"
                  style={{ background: 'linear-gradient(135deg, var(--bg), var(--border))' }}>
                  🎨
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-3">
              <Link to="/" className="label-sm hover:underline" style={{ color: 'var(--accent)' }}>
                {product.store?.storeName}
              </Link>
              <span className="mx-2 text-xs" style={{ color: 'var(--border-strong)' }}>·</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{product.category}</span>
            </div>

            <h1 className="font-display text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)', lineHeight: '1.15' }}>
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.averageRating} size="md" />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {product.averageRating > 0 ? product.averageRating : 'No'} rating
              </span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                ({product.totalReviews} {product.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-5">
              <span className="font-display text-4xl font-bold" style={{ color: 'var(--primary)' }}>
                ${product.price}
              </span>
              <span className={`badge ${product.stock > 0 ? 'badge-green' : 'badge-red'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {product.description}
            </p>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Quantity</span>
                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {quantity}
                  </span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="btn btn-primary btn-xl w-full mb-4"
              style={{ background: added ? '#059669' : undefined, borderColor: added ? '#059669' : undefined }}>
              {added ? <><Check size={20} /> Added to Cart!</> : <><ShoppingCart size={20} /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</>}
            </button>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[{ icon: Truck, text: 'Free Shipping' }, { icon: Shield, text: 'Secure Payment' }, { icon: RefreshCw, text: '30-Day Returns' }].map(({ icon: Icon, text }) => (
                <div key={text} className="text-center p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <Icon size={18} className="mx-auto mb-1.5" style={{ color: 'var(--primary)' }} />
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
          <ReviewForm productId={id} onReviewAdded={r => setReviews([r, ...reviews])} />
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Customer Reviews</h3>
              <span className="badge badge-primary">{reviews.length} reviews</span>
            </div>
            {reviews.length === 0 ? (
              <div className="text-center py-12 card-flat">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No reviews yet</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Be the first to review this product</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review._id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                          {review.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{review.user?.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
