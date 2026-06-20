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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0d0d0d' }}>
      {/* Left - Decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden noise"
        style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a00 50%, #2d1200 100%)' }}
      >
        {/* Glow orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #c8922a, transparent)' }}></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #e8b84b, transparent)' }}></div>

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: 'linear-gradient(135deg, #c8922a, #e8b84b)', color: '#0d0d0d', boxShadow: '0 0 20px rgba(200,146,42,0.4)' }}>
            AC
          </div>
          <span className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
            Artisan's Corner
          </span>
        </Link>

        <div className="relative z-10">
          <div className="badge-gold mb-6 inline-block">Premium Marketplace</div>
          <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
            Where craft meets
            <span className="gradient-text block">commerce</span>
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#8a8070' }}>
            Join thousands of artisans and buyers in the most curated handcrafted marketplace.
          </p>

          <div className="space-y-4">
            {[
              { icon: '✦', text: 'Curated handcrafted products' },
              { icon: '✦', text: 'Secure Stripe payments' },
              { icon: '✦', text: 'Support independent creators' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span style={{ color: '#c8922a' }}>{item.icon}</span>
                <span className="text-sm" style={{ color: '#c8b8a0' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: '#4a4035' }}>
          © 2024 Artisan's Corner
        </p>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: '#8a8070' }}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#8a8070' }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="input-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#8a8070' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="input-dark pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm transition-all duration-200"
                  style={{ color: '#5a5045' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
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

          <p className="text-center text-sm mt-6" style={{ color: '#5a5045' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold transition-colors duration-200" style={{ color: '#c8922a' }}
              onMouseEnter={e => e.target.style.color = '#e8b84b'}
              onMouseLeave={e => e.target.style.color = '#c8922a'}
            >
              Create one free
            </Link>
          </p>

          {/* Demo Box */}
          <div className="mt-8 p-4 rounded-xl" style={{ background: 'rgba(200,146,42,0.05)', border: '1px solid rgba(200,146,42,0.15)' }}>
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#c8922a' }}>
              ✦ Demo Credentials
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#5a5045' }}>Buyer</span>
                <span className="text-xs font-mono" style={{ color: '#8a8070' }}>buyer@demo.com / demo123</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#5a5045' }}>Vendor</span>
                <span className="text-xs font-mono" style={{ color: '#8a8070' }}>vendor@demo.com / demo123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;