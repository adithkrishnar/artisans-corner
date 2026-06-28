import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Minus, Plus, Check, Shield, Truck, RefreshCw, ChevronRight, Heart, Share2, Star } from 'lucide-react';
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
  const [wished, setWished] = useState(false);

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid var(--border)', borderTopColor: 'var(--primary)',
        animation: 'spin 0.7s linear infinite',
      }} />
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }} className="animate-fade-up">
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</p>
        <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Product not found</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>This product may have been removed or doesn't exist.</p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '11px 24px', borderRadius: '12px', background: 'var(--primary)',
          color: '#fff', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600, fontSize: '0.9375rem',
          boxShadow: '0 3px 12px rgba(122,82,48,0.35)',
        }}>
          Back to Shop
        </Link>
      </div>
    </div>
  );

  const inStock = product.stock > 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="container mx-auto" style={{ padding: '2.5rem 2rem' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            Home
          </Link>
          <ChevronRight size={12} />
          <span>{product.category}</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{product.title}</span>
        </div>

        {/* ── Main product grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'start' }} className="product-detail-grid">

          {/* Image */}
          <div>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              aspectRatio: '1', background: 'var(--bg-soft)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
            }}>
              {product.imageUrl
                ? <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', background: 'linear-gradient(135deg, var(--bg), var(--border))' }}>🎨</div>
              }
              {/* Badge */}
              {!inStock && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(248,245,241,0.82)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="badge badge-muted" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Store + category */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
              <Link to="/" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none' }}>
                {product.store?.storeName}
              </Link>
              <span style={{ color: 'var(--border-strong)', fontSize: '0.75rem' }}>·</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{product.category}</span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '1rem' }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <StarRating rating={product.averageRating} size="md" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {product.averageRating > 0 ? product.averageRating.toFixed(1) : 'No'} rating
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                ({product.totalReviews} {product.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Price + stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span className="font-display" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                ${product.price}
              </span>
              <span className={`badge ${inStock ? 'badge-green' : 'badge-red'}`}>
                {inStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: '1px', background: 'var(--border)', marginBottom: '1.25rem' }} />

            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              {product.description}
            </p>

            {/* Quantity */}
            {inStock && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '60px' }}>Quantity</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  ><Minus size={14} /></button>
                  <span style={{ width: '44px', textAlign: 'center', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  ><Plus size={14} /></button>
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart} disabled={!inStock}
                style={{
                  flex: 1, padding: '0.9375rem 1rem',
                  borderRadius: '12px', border: 'none',
                  background: added ? '#059669' : inStock ? 'var(--primary)' : 'var(--bg)',
                  color: inStock ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 700,
                  cursor: inStock ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: inStock && !added ? '0 3px 12px rgba(122,82,48,0.35)' : inStock && added ? '0 3px 12px rgba(5,150,105,0.35)' : 'none',
                  border: !inStock ? '1.5px solid var(--border)' : 'none',
                }}
                onMouseEnter={e => { if (inStock && !added) { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.4)'; } }}
                onMouseLeave={e => { if (inStock && !added) { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,82,48,0.35)'; } }}
              >
                {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> {inStock ? 'Add to Cart' : 'Out of Stock'}</>}
              </button>

              <button
                onClick={() => setWished(w => !w)}
                style={{
                  width: '50px', height: '50px', borderRadius: '12px', border: '1.5px solid var(--border)',
                  background: wished ? 'rgba(239,68,68,0.08)' : 'var(--surface)',
                  color: wished ? '#ef4444' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = wished ? '#ef4444' : 'var(--text-muted)'; }}
              >
                <Heart size={18} style={{ fill: wished ? '#ef4444' : 'none', transition: 'fill 0.2s' }} />
              </button>
            </div>

            {/* Trust chips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[{ icon: Truck, text: 'Free Shipping' }, { icon: Shield, text: 'Secure Payment' }, { icon: RefreshCw, text: '30-Day Returns' }].map(({ icon: Icon, text }) => (
                <div key={text} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  padding: '12px 8px', borderRadius: '12px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  textAlign: 'center', transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Icon size={17} style={{ color: 'var(--primary)' }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="product-detail-grid">
          <ReviewForm productId={id} onReviewAdded={r => setReviews([r, ...reviews])} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Customer Reviews
              </h3>
              <span className="badge badge-primary">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
            </div>

            {reviews.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '3rem 1rem',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⭐</div>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>No reviews yet</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Be the first to review this product</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reviews.map(review => (
                  <div key={review._id} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)', padding: '1.125rem 1.25rem',
                    transition: 'box-shadow 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontSize: '0.875rem', fontWeight: 700, flexShrink: 0,
                        }}>
                          {review.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{review.user?.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
}
