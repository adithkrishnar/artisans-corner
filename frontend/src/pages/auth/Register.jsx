import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { register, clearError } from '../../features/auth/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(s => s.auth);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [localError, setLocalError] = useState('');
  const [showPw, setShowPw] = useState(false);

  useEffect(() => { if (user) navigate('/'); return () => dispatch(clearError()); }, [user]);

  const handleChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value }); setLocalError(''); };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setLocalError('Passwords do not match');
    if (formData.password.length < 6) return setLocalError('Password must be at least 6 characters');
    dispatch(register({ name: formData.name, email: formData.email, password: formData.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, var(--border), transparent)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, var(--border), transparent)' }}></div>
      </div>

      <div className="w-full max-w-md relative animate-fade-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>AC</div>
            <span className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Artisan's Corner</span>
          </Link>
          <p className="label-sm section-eyebrow mb-2">Join us</p>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Create your account</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Start your journey in the handcrafted marketplace</p>
        </div>

        <div className="card-flat">
          {(error || localError) && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl mb-5 text-sm animate-scale-in"
              style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>
              ⚠ {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[{ label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' }].map(f => (
              <div key={f.name}>
                <label className="form-label">{f.label}</label>
                <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                  required placeholder={f.placeholder} className="input" />
              </div>
            ))}

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} name="password" value={formData.password}
                  onChange={handleChange} required placeholder="Min. 6 characters" className="input" style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleChange} required placeholder="Re-enter password" className="input" />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full mt-2">
              {loading ? <><div className="spinner"></div> Creating account...</> : 'Create Account →'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold" style={{ color: 'var(--primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}