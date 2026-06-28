import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Star, Shield, RefreshCw, Truck, Sparkles, ChevronRight, X } from 'lucide-react';
import { getAllProducts } from '../api/productService';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = [
  { name: 'All', icon: '✦' },
  { name: 'Home Decor', icon: '🏡' },
  { name: 'Clothing', icon: '👗' },
  { name: 'Pottery', icon: '🏺' },
  { name: 'Candles', icon: '🕯️' },
  { name: 'Jewelry', icon: '💍' },
  { name: 'Art', icon: '🎨' },
  { name: 'Woodwork', icon: '🪵' },
  { name: 'Textiles', icon: '🧵' },
  { name: 'Food & Drink', icon: '🍯' },
  { name: 'Other', icon: '✨' },
];

const FEATURES = [
  { icon: Truck,     title: 'Free Shipping',    desc: 'On orders over $100' },
  { icon: Shield,    title: 'Secure Payments',  desc: 'Protected by Stripe'  },
  { icon: Star,      title: 'Verified Artisans', desc: 'Curated quality'     },
  { icon: RefreshCw, title: 'Easy Returns',     desc: '30-day guarantee'     },
];

// Floating product cards in the hero – decorative illustration
function HeroProductMosaic({ scrollToProducts }) {
  const cards = [
    { emoji: '🏺', label: 'Hand-thrown Ceramic Vase', price: '$68', color: '#C47A4A', top: '8%',  left: '0%',   rotate: '-4deg' },
    { emoji: '🧵', label: 'Linen Macramé Wall Art',   price: '$45', color: '#7A5230', top: '38%', left: '12%',  rotate: '3deg'  },
    { emoji: '🕯️', label: 'Soy Pillar Candle Set',    price: '$32', color: '#A06840', top: '2%',  left: '52%',  rotate: '5deg'  },
    { emoji: '💍', label: 'Sterling Silver Ring',      price: '$95', color: '#5C3D22', top: '55%', left: '58%',  rotate: '-3deg' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden' }}>
      {/* Glowing orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,122,74,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {cards.map((c, i) => (
        <button
          key={i}
          onClick={scrollToProducts}
          style={{
            position: 'absolute',
            top: c.top, left: c.left,
            transform: `rotate(${c.rotate})`,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '12px',
            cursor: 'pointer', textAlign: 'left',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            minWidth: '190px', maxWidth: '220px',
            animation: `floatCard${i} ${3.5 + i * 0.4}s ease-in-out infinite`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = `rotate(0deg) translateY(-4px)`;
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = `rotate(${c.rotate}) translateY(0)`;
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: '2rem', flexShrink: 0 }}>{c.emoji}</span>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.label}</p>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent)' }}>{c.price}</p>
          </div>
        </button>
      ))}

      <style>{`
        @keyframes floatCard0 { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-10px)} }
        @keyframes floatCard1 { 0%,100%{transform:rotate(3deg) translateY(0)} 50%{transform:rotate(3deg) translateY(-8px)} }
        @keyframes floatCard2 { 0%,100%{transform:rotate(5deg) translateY(0)} 50%{transform:rotate(5deg) translateY(-12px)} }
        @keyframes floatCard3 { 0%,100%{transform:rotate(-3deg) translateY(0)} 50%{transform:rotate(-3deg) translateY(-9px)} }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('All');
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]           = useState(0);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const res = await getAllProducts(params);
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [category, page, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); setPage(1); };

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(145deg, #1E1209 0%, #2F1E0E 40%, #3D2A1A 70%, #5C3D22 100%)',
          padding: '5rem 0 0',
          position: 'relative',
        }}
      >
        {/* Ambient glows */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 15% 60%, rgba(196,122,74,0.22) 0%, transparent 100%), radial-gradient(ellipse 50% 40% at 85% 25%, rgba(122,82,48,0.28) 0%, transparent 100%)',
        }} />
        {/* Subtle grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        <div className="container mx-auto relative">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'center',
            minHeight: '480px',
          }} className="hero-grid">

            {/* Left – copy */}
            <div style={{ paddingBottom: '4rem' }}>
              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '999px',
                background: 'rgba(196,122,74,0.18)',
                border: '1px solid rgba(196,122,74,0.3)',
                color: '#F0A870', fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={12} /> Handmade with Passion
              </div>

              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  marginBottom: '1.25rem',
                }}
              >
                Discover{' '}
                <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 700 }}>Unique</span>
                <br />Artisan Creations
              </h1>

              <p style={{
                fontSize: '1rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.58)',
                maxWidth: '400px', marginBottom: '2rem',
              }}>
                Support independent artisans and bring home one-of-a-kind handmade products you won't find anywhere else.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} style={{
                display: 'flex', gap: '10px', maxWidth: '420px', marginBottom: '1.75rem',
              }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0 14px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.2s',
                }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(196,122,74,0.5)'}
                  onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
                >
                  <Search size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                  <input
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search handcrafted products..."
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      padding: '11px 0', fontSize: '0.875rem',
                      color: '#fff', fontFamily: 'DM Sans, sans-serif',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '0 22px', borderRadius: '12px', border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 2px 8px rgba(196,122,74,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(196,122,74,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(196,122,74,0.4)'; }}
                >
                  Search
                </button>
              </form>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '2.5rem' }}>
                <button
                  onClick={scrollToProducts}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 28px', borderRadius: '12px', border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 4px 14px rgba(196,122,74,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,122,74,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(196,122,74,0.4)'; }}
                >
                  Shop Now <ArrowRight size={17} />
                </button>
                <Link
                  to="/become-seller"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 28px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#fff',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 600,
                    textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Become a Seller
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {[{ n: '500+', l: 'Artisans' }, { n: '2,000+', l: 'Products' }, { n: '10K+', l: 'Happy Buyers' }].map(s => (
                  <div key={s.l}>
                    <p className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{s.n}</p>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginTop: '3px' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – floating product cards */}
            <div className="hero-mosaic-wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <HeroProductMosaic scrollToProducts={scrollToProducts} />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div aria-hidden="true" style={{ position: 'relative', height: '64px', marginTop: '2rem' }}>
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}
            preserveAspectRatio="none">
            <path d="M0 64V32C240 0 480 64 720 40C960 16 1200 64 1440 36V64H0Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════ TRUST BAR ══════════════════════ */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container mx-auto" style={{ padding: '1.5rem 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }} className="features-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-lg)',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(122,82,48,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={19} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1px' }}>{title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ PRODUCTS SECTION ══════════════════════ */}
      <section id="products-section" className="container mx-auto" style={{ padding: '4rem 2rem 5rem' }}>

        {/* Section header */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '1rem',
          marginBottom: '1.75rem',
        }}>
          <div>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.375rem',
            }}>
              Our Collection
            </p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700,
              color: 'var(--text-primary)', lineHeight: 1.15,
            }}>
              {category === 'All' ? 'All Products' : category}
            </h2>
            {!loading && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {total} {total === 1 ? 'product' : 'products'} available
              </p>
            )}
          </div>
          {search && (
            <button
              onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '999px',
                background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)',
                color: '#dc2626', fontSize: '0.8125rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,38,38,0.06)'}
            >
              <X size={13} /> Clear "{search}"
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div style={{
          display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px',
          marginBottom: '2.25rem', scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(cat => {
            const isActive = category === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => { setCategory(cat.name); setPage(1); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 18px', borderRadius: '999px', border: 'none',
                  background: isActive ? 'var(--primary)' : 'var(--surface)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 2px 10px rgba(122,82,48,0.28)' : 'none',
                  outline: isActive ? 'none' : '1.5px solid var(--border)',
                  fontSize: '0.8125rem', fontWeight: isActive ? 700 : 500,
                  fontFamily: 'DM Sans, sans-serif',
                  cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--primary-lightest)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.outline = '1.5px solid rgba(122,82,48,0.3)';
                  }
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--surface)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.outline = '1.5px solid var(--border)';
                  }
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '0.875rem' }}>{cat.icon}</span>
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="product-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
                overflow: 'hidden', border: '1px solid var(--border)',
              }}>
                <div className="skeleton" style={{ height: '220px' }} />
                <div style={{ padding: '1.125rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="skeleton" style={{ height: '10px', width: '45%', borderRadius: '6px' }} />
                  <div className="skeleton" style={{ height: '14px', width: '90%', borderRadius: '6px' }} />
                  <div className="skeleton" style={{ height: '10px', width: '60%', borderRadius: '6px' }} />
                  <div className="skeleton" style={{ height: '36px', borderRadius: '8px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '1.25rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.625rem' }}>
              No products found
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Try a different category or search term
            </p>
            <button
              onClick={() => { setCategory('All'); setSearch(''); setSearchInput(''); }}
              style={{
                padding: '11px 28px', borderRadius: '12px', border: 'none',
                background: 'var(--primary)', color: '#fff',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(122,82,48,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View all products
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="product-grid">
              {products.map((product, i) => (
                <div
                  key={product._id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                gap: '10px', marginTop: '3.5rem',
              }}>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '9px 18px', borderRadius: '10px',
                    background: 'var(--surface)', border: '1.5px solid var(--border)',
                    color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                    opacity: page === 1 ? 0.4 : 1,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (page !== 1) { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  ← Previous
                </button>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: page === i + 1 ? 'var(--primary)' : 'var(--surface)',
                        color: page === i + 1 ? '#fff' : 'var(--text-secondary)',
                        border: `1.5px solid ${page === i + 1 ? 'var(--primary)' : 'var(--border)'}`,
                        fontSize: '0.875rem', fontWeight: 600,
                        fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: page === i + 1 ? '0 2px 8px rgba(122,82,48,0.28)' : 'none',
                      }}
                      onMouseEnter={e => { if (page !== i + 1) { e.currentTarget.style.background = 'var(--primary-lightest)'; e.currentTarget.style.borderColor = 'rgba(122,82,48,0.3)'; } }}
                      onMouseLeave={e => { if (page !== i + 1) { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)'; } }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '9px 18px', borderRadius: '10px',
                    background: 'var(--surface)', border: '1.5px solid var(--border)',
                    color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                    opacity: page === totalPages ? 0.4 : 1,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (page !== totalPages) { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .hero-mosaic-wrap { display: none !important; }
          .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
}
