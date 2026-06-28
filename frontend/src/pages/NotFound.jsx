import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(196,122,74,0.07) 0%, transparent 100%), radial-gradient(ellipse 50% 45% at 75% 65%, rgba(122,82,48,0.06) 0%, transparent 100%)',
      }} />

      <div style={{ textAlign: 'center', maxWidth: '440px', position: 'relative', zIndex: 1 }} className="animate-fade-up">

        {/* 404 numeral */}
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(7rem, 16vw, 10rem)', fontWeight: 900, lineHeight: 1,
            background: 'linear-gradient(135deg, var(--border) 0%, rgba(196,122,74,0.25) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem', letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          404
        </p>

        {/* Craft icon */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '20px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem', fontSize: '2.25rem',
          boxShadow: 'var(--shadow-md)',
        }}>
          🎨
        </div>

        <h2 className="font-display" style={{
          fontSize: '1.875rem', fontWeight: 800,
          color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '0.875rem',
        }}>
          Page not found
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.25rem' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back to the marketplace.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '12px', background: 'var(--primary)',
            color: '#fff', textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 700,
            transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 3px 12px rgba(122,82,48,0.35)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,82,48,0.35)'; }}
          >
            <Home size={16} /> Back to Marketplace
          </Link>
          <Link to="/?scroll=products" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '12px',
            background: 'var(--surface)', border: '1.5px solid var(--border)',
            color: 'var(--text-secondary)', textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Search size={15} /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}