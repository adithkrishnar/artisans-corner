import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '../../features/cart/cartSlice';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [wished, setWished] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      _id: product._id, title: product.title, price: product.price,
      imageUrl: product.imageUrl, store: product.store, stock: product.stock,
    }));
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(w => !w);
  };

  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;

  return (
    <Link to={`/product/${product._id}`} style={{ display: 'block', textDecoration: 'none' }} className="product-card-link">
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          height: '100%',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 1px 4px rgba(47,36,30,0.06)',
          position: 'relative',
        }}
        className="product-card"
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(47,36,30,0.14)';
          e.currentTarget.style.borderColor = 'var(--border-strong)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(47,36,30,0.06)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative', overflow: 'hidden', flexShrink: 0,
          height: '220px', background: 'var(--bg)',
        }} className="product-image-wrap">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
              }}
              className="product-img"
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3.5rem',
              background: 'linear-gradient(135deg, var(--bg) 0%, var(--border) 100%)',
            }}>
              🎨
            </div>
          )}

          {/* Hover overlay with CTA */}
          <div
            className="product-overlay"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(47,36,30,0.65) 0%, rgba(47,36,30,0.1) 60%, transparent 100%)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: '14px',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '9px 18px', borderRadius: '10px', border: 'none',
                background: inStock ? 'var(--primary)' : 'rgba(255,255,255,0.35)',
                color: '#fff', fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.8125rem', fontWeight: 600,
                cursor: inStock ? 'pointer' : 'default',
                backdropFilter: 'blur(8px)',
                transform: 'translateY(8px)',
                transition: 'transform 0.3s ease, box-shadow 0.2s ease',
                boxShadow: inStock ? '0 4px 14px rgba(122,82,48,0.4)' : 'none',
              }}
              className="product-add-btn"
            >
              <ShoppingCart size={14} />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWish}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '34px', height: '34px', borderRadius: '50%', border: 'none',
              background: wished ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0, transition: 'all 0.25s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
            className="product-wish-btn"
            aria-label="Wishlist"
          >
            <Heart
              size={15}
              style={{
                color: wished ? '#ef4444' : 'var(--primary)',
                fill: wished ? '#ef4444' : 'none',
                transition: 'all 0.2s',
              }}
            />
          </button>

          {/* Badges */}
          {!inStock && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(248,245,241,0.82)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="badge badge-muted">Out of Stock</span>
            </div>
          )}
          {lowStock && (
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
              <span className="badge badge-orange">Only {product.stock} left</span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{
          padding: '1rem 1.125rem 1.125rem',
          display: 'flex', flexDirection: 'column', flex: 1,
        }}>
          {/* Store */}
          <p className="label-xs" style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>
            {product.store?.storeName || 'Artisan Store'}
          </p>

          {/* Title */}
          <h3 style={{
            fontSize: '0.875rem', fontWeight: 600,
            color: 'var(--text-primary)', lineHeight: 1.45,
            marginBottom: '8px', flex: 1,
            fontFamily: 'DM Sans, sans-serif',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.title}
          </h3>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            <StarRating rating={product.averageRating} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({product.totalReviews})</span>
          </div>

          {/* Price + Add */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '10px', borderTop: '1px solid var(--border)',
          }}>
            <span className="font-display" style={{
              fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)',
            }}>
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '7px 13px', borderRadius: '9px',
                background: inStock ? 'var(--primary-lightest)' : 'var(--bg)',
                border: `1.5px solid ${inStock ? 'rgba(122,82,48,0.22)' : 'var(--border)'}`,
                color: inStock ? 'var(--primary)' : 'var(--text-muted)',
                fontSize: '0.8rem', fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif', cursor: inStock ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (inStock) {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }
              }}
              onMouseLeave={e => {
                if (inStock) {
                  e.currentTarget.style.background = 'var(--primary-lightest)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'rgba(122,82,48,0.22)';
                }
              }}
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .product-card-link:hover .product-overlay { opacity: 1 !important; }
        .product-card-link:hover .product-add-btn { transform: translateY(0) !important; }
        .product-card-link:hover .product-wish-btn { opacity: 1 !important; }
        .product-card-link:hover .product-img { transform: scale(1.07) !important; }
      `}</style>
    </Link>
  );
}
