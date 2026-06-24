import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { login, clearError } from '../../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(s => s.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { if (user) navigate('/'); return () => dispatch(clearError()); }, [user]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); dispatch(login(formData)); };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--text-primary) 0%, #3D2A1A 50%, #5C3D22 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(196,122,74,0.5) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(122,82,48,0.4) 0%, transparent 50%)' }}></div>

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', boxShadow: '0 4px 20px rgba(196,122,74,0.4)' }}>
            AC
          </div>
          <span className="font-display text-xl font-bold text-white">Artisan's Corner</span>
        </Link>

        <div className="relative z-10">
          <div className="badge mb-6 inline-flex" style={{ background: 'rgba(196,122,74,0.2)', borderColor: 'rgba(196,122,74,0.3)', color: '#F0A870' }}>
            <Sparkles size={10} /> Premium Marketplace
          </div>
          <h2 className="font-display text-5xl font-bold text-white mb-5" style={{ lineHeight: '1.1' }}>
            Where craft  

            <em className="not-italic" style={{ color: 'var(--accent)' }}>meets commerce</em>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '340px' }}>
            Join thousands of artisans and buyers discovering unique handcrafted products.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[{ n: '500+', l: 'Artisans' }, { n: '2K+', l: 'Products' }, { n: '10K+', l: 'Buyers' }, { n: '4.9★', l: 'Rating' }].map(s => (
              <div key={s.l} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="font-display text-2xl font-bold text-white">{s.n}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2024 Artisan's Corner</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-16">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8">
            <p className="label-sm section-eyebrow mb-2">Welcome back</p>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Sign in</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl mb-6 text-sm animate-scale-in"
              style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Email address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                required placeholder="you@example.com" className="input" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                  onChange={handleChange} required placeholder="Enter your password" className="input" style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
              {loading ? <><div className="spinner"></div> Signing in...</> : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold" style={{ color: 'var(--primary)' }}>Create one free</Link>
          </p>

          <div className="mt-12 p-6 rounded-2xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="label-xs section-eyebrow mb-3">✦ Demo Credentials</p>
            <div className="space-y-2">
              {[{ role: 'Buyer', email: 'buyer@demo.com', pass: 'demo123' }, { role: 'Vendor', email: 'vendor@demo.com', pass: 'demo123' }].map(d => (
                <div key={d.role} className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{d.role}</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{d.email} / {d.pass}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
