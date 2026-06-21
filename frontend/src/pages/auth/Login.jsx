import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); dispatch(login(formData)); };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--cream)' }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--brown) 0%, var(--brown-light) 40%, var(--clay) 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'var(--terracotta)' }}></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'var(--clay-light)' }}></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 rounded-full opacity-5" style={{ background: 'white' }}></div>

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
            AC
          </div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Artisan's Corner
          </span>
        </Link>

        <div className="relative z-10">
          <span className="badge badge-clay mb-6 inline-flex" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}>
            ✦ Handcrafted Marketplace
          </span>
          <h2 className="text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Where craft<br />
            <em className="not-italic" style={{ color: 'var(--terracotta-light)' }}>meets commerce</em>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join thousands of artisans and buyers discovering unique handcrafted products every day.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '500+', l: 'Artisans' },
              { n: '2K+', l: 'Products' },
              { n: '10K+', l: 'Buyers' },
              { n: '4.9★', l: 'Rating' },
            ].map((s) => (
              <div key={s.l} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{s.n}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.25)' }}>© 2024 Artisan's Corner</p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8">
            <p className="section-label mb-2">Welcome back</p>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Sign in
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#dc2626' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label>Email address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="input-field" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold" style={{ color: 'var(--terracotta)' }}>
              Create one free
            </Link>
          </p>

          {/* Demo Box */}
          <div className="mt-8 p-4 rounded-2xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--terracotta)', fontFamily: 'DM Sans, sans-serif' }}>
              ✦ Demo Credentials
            </p>
            <div className="space-y-2">
              {[
                { role: 'Buyer', email: 'buyer@demo.com', pass: 'demo123' },
                { role: 'Vendor', email: 'vendor@demo.com', pass: 'demo123' },
              ].map((d) => (
                <div key={d.role} className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{d.role}</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{d.email} / {d.pass}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;