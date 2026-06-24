import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '../../features/cart/cartSlice';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      _id: product._id, title: product.title, price: product.price,
      imageUrl: product.imageUrl, store: product.store, stock: product.stock,
    }));
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="card card-hover h-full flex flex-col">
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: '220px', background: 'var(--bg)' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: 'scale(1)' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl"
              style={{ background: 'linear-gradient(135deg, var(--bg), var(--border))' }}>
              🎨
            </div>
          )}

          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: 'linear-gradient(to top, rgba(47,36,30,0.5), transparent)' }}>
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="btn btn-sm flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
              style={{ background: product.stock > 0 ? 'var(--primary)' : 'rgba(255,255,255,0.4)', color: 'white', borderColor: 'transparent', backdropFilter: 'blur(10px)' }}>
              <ShoppingCart size={14} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <button onClick={e => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)' }}>
            <Heart size={14} style={{ color: 'var(--primary)' }} />
          </button>

          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(248,245,241,0.85)', backdropFilter: 'blur(4px)' }}>
              <span className="badge badge-muted">Out of Stock</span>
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 left-3">
              <span className="badge badge-orange">Only {product.stock} left</span>
            </div>
          )}
        </div>

        <div className="card-body flex flex-col flex-1 p-6">
          <p className="label-xs mb-1.5 line-clamp-1" style={{ color: 'var(--text-muted)' }}>
            {product.store?.storeName || 'Artisan Store'}
          </p>
          <h3 className="text-base font-semibold mb-3 line-clamp-2 flex-1" style={{ color: 'var(--text-primary)', lineHeight: '1.4', fontFamily: 'DM Sans, sans-serif' }}>
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.averageRating} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({product.totalReviews})</span>
          </div>

          <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            <span className="font-display text-xl font-bold" style={{ color: 'var(--primary)' }}>
              ${product.price}
            </span>
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="btn btn-sm"
              style={{
                background: product.stock > 0 ? 'var(--primary-lightest)' : 'var(--bg)',
                color: product.stock > 0 ? 'var(--primary)' : 'var(--text-muted)',
                borderColor: product.stock > 0 ? 'rgba(122,82,48,0.2)' : 'var(--border)',
              }}>
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
