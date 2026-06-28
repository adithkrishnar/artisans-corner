import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { register, clearError } from '../../features/auth/authSlice';

const INPUT_STYLE = {
  width: '100%',
  padding: '0.875rem 1rem 0.875rem 2.75rem',
  background: 'var(--surface)',
  border: '1.5px solid var(--border)',
  borderRadius: '12px',
  fontSize: '0.9375rem',
  fontFamily: 'DM Sans, sans-serif',
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'all 0.2s ease',
};

const FOCUS = { borderColor: 'var(--border-focus)', boxShadow: '0 0 0 4px rgba(196,122,74,0.1)', background: 'var(--bg-soft)' };
const BLUR  = { borderColor: 'var(--border)', boxShadow: 'none', background: 'var(--surface)' };

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(s => s.auth);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [localError, setLocalError] = useState('');
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user]);

  const handleChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value }); setLocalError(''); };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setLocalError('Passwords do not match');
    if (formData.password.length < 6) return setLocalError('Password must be at least 6 characters');
    dispatch(register({ name: formData.name, email: formData.email, password: formData.password }));
  };

  const displayError = localError || error;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient background glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse 55% 40% at 10% 10%, rgba(196,122,74,0.07) 0%, transparent 100%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(122,82,48,0.06) 0%, transparent 100%)',
      }} />

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1 }} className="animate-fade-up">

        {/* Logo + header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '13px',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: '0.875rem',
              boxShadow: '0 4px 16px rgba(196,122,74,0.35)',
            }}>AC</div>
            <span className="font-display" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Artisan's Corner</span>
          </Link>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem',
          }}>Join us</p>
          <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '0.375rem' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Start your journey in the handcrafted marketplace
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '2rem 2rem',
          boxShadow: '0 8px 32px rgba(47,36,30,0.10)',
        }}>
          {/* Error banner */}
          {displayError && (
            <div className="animate-scale-in" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 14px', borderRadius: '10px', marginBottom: '1.25rem',
              background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)',
              color: '#dc2626', fontSize: '0.875rem',
            }}>
              ⚠ {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4375rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} required placeholder="John Doe"
                  style={INPUT_STYLE}
                  onFocus={e => Object.assign(e.target.style, FOCUS)}
                  onBlur={e => Object.assign(e.target.style, BLUR)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4375rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} required placeholder="you@example.com"
                  style={INPUT_STYLE}
                  onFocus={e => Object.assign(e.target.style, FOCUS)}
                  onBlur={e => Object.assign(e.target.style, BLUR)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4375rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type={showPw ? 'text' : 'password'} name="password" value={formData.password}
                  onChange={handleChange} required placeholder="Min. 6 characters"
                  style={{ ...INPUT_STYLE, paddingRight: '3rem' }}
                  onFocus={e => Object.assign(e.target.style, FOCUS)}
                  onBlur={e => Object.assign(e.target.style, BLUR)}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', display: 'flex', alignItems: 'center', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4375rem' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="password" name="confirmPassword" value={formData.confirmPassword}
                  onChange={handleChange} required placeholder="Re-enter password"
                  style={INPUT_STYLE}
                  onFocus={e => Object.assign(e.target.style, FOCUS)}
                  onBlur={e => Object.assign(e.target.style, BLUR)}
                />
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
                marginTop: '0.375rem',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.4)'; } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,82,48,0.35)'; } }}
            >
              {loading ? <><div className="spinner" /> Creating account...</> : <>Create Account <ArrowRight size={17} /></>}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
