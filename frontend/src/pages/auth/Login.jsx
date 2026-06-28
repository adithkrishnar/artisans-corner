import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { login, clearError } from '../../features/auth/authSlice';

const STATS = [
  { n: '500+', l: 'Artisans' },
  { n: '2K+',  l: 'Products' },
  { n: '10K+', l: 'Buyers'   },
  { n: '4.9★', l: 'Rating'   },
];

const INPUT_STYLE = {
  width: '100%',
  padding: '0.875rem 1.125rem',
  background: 'var(--surface)',
  border: '1.5px solid var(--border)',
  borderRadius: '12px',
  fontSize: '0.9375rem',
  fontFamily: 'DM Sans, sans-serif',
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'all 0.2s ease',
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(s => s.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); dispatch(login(formData)); };

  const focusStyle  = { borderColor: 'var(--border-focus)', boxShadow: '0 0 0 4px rgba(196,122,74,0.1)', background: 'var(--bg-soft)' };
  const blurStyle   = { borderColor: 'var(--border)', boxShadow: 'none', background: 'var(--surface)' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>

      {/* ── Left panel ── */}
      <div
        className="login-panel-left"
        style={{
          flex: '0 0 48%',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '3rem 3.5rem',
          background: 'linear-gradient(160deg, #1A0E06 0%, #2F1E0E 45%, #4A2E18 100%)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Glows */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse 70% 60% at 25% 65%, rgba(196,122,74,0.25) 0%, transparent 100%), radial-gradient(ellipse 50% 40% at 80% 15%, rgba(122,82,48,0.3) 0%, transparent 100%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />

        {/* Logo */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '0.8rem',
            boxShadow: '0 4px 16px rgba(196,122,74,0.4)',
          }}>AC</div>
          <span className="font-display" style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>Artisan's Corner</span>
        </Link>

        {/* Hero copy */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: '999px',
            background: 'rgba(196,122,74,0.2)', border: '1px solid rgba(196,122,74,0.3)',
            color: '#F0A870', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '1.5rem',
          }}>
            <Sparkles size={11} /> Premium Marketplace
          </div>

          <h2 className="font-display" style={{
            fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 800, color: '#fff',
            lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em',
          }}>
            Where craft <br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>meets commerce</em>
          </h2>

          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '320px', marginBottom: '2.5rem' }}>
            Join thousands of artisans and buyers discovering unique handcrafted products from around the world.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {STATS.map(s => (
              <div key={s.l} style={{
                padding: '1rem 1.25rem', borderRadius: '14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              >
                <p className="font-display" style={{ fontSize: '1.625rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{s.n}</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', position: 'relative', zIndex: 1 }}>
          © 2024 Artisan's Corner
        </p>
      </div>

      {/* ── Right panel ── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 3rem',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-up">

          {/* Header */}
          <div style={{ marginBottom: '2.25rem' }}>
            <p className="label-sm" style={{ color: 'var(--accent)', marginBottom: '6px', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700 }}>
              Welcome back
            </p>
            <h1 className="font-display" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              Sign in
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Enter your credentials to access your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="animate-scale-in" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 16px', borderRadius: '12px', marginBottom: '1.5rem',
              background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626',
              fontSize: '0.875rem',
            }}>
              ⚠ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Email address
              </label>
              <input
                type="email" name="email" value={formData.email}
                onChange={handleChange} required placeholder="you@example.com"
                style={INPUT_STYLE}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, blurStyle)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" value={formData.password}
                  onChange={handleChange} required placeholder="Enter your password"
                  style={{ ...INPUT_STYLE, paddingRight: '3rem' }}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e => Object.assign(e.target.style, blurStyle)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '0.9375rem',
                borderRadius: '12px', border: 'none',
                background: loading ? 'rgba(122,82,48,0.5)' : 'var(--primary)',
                color: '#fff', fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9375rem', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: loading ? 'none' : '0 3px 12px rgba(122,82,48,0.35)',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.4)'; } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,82,48,0.35)'; } }}
            >
              {loading ? <><div className="spinner" /> Signing in...</> : <>Sign In <ArrowRight size={17} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Create one free</Link>
          </p>

          {/* Demo credentials */}
          <div style={{
            marginTop: '2.25rem', padding: '1.25rem 1.5rem',
            borderRadius: '14px', background: 'var(--bg)',
            border: '1px solid var(--border)',
          }}>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.875rem',
            }}>✦ Demo Credentials</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { role: 'Buyer',  email: 'buyer@demo.com',  pass: 'demo123' },
                { role: 'Vendor', email: 'vendor@demo.com', pass: 'demo123' },
              ].map(d => (
                <div key={d.role} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)',
                    background: 'var(--primary-lightest)', border: '1px solid rgba(122,82,48,0.15)',
                    padding: '2px 8px', borderRadius: '6px',
                  }}>{d.role}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{d.email} / {d.pass}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .login-panel-left { display: none !important; } }
      `}</style>
    </div>
  );
}
