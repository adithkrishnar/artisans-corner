import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setLocalError('Passwords do not match');
    if (formData.password.length < 6) return setLocalError('Password must be at least 6 characters');
    dispatch(register({ name: formData.name, email: formData.email, password: formData.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0d0d0d' }}>
      {/* Background glow */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #c8922a, transparent)' }}></div>
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #e8b84b, transparent)' }}></div>

      <div className="w-full max-w-md relative animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: 'linear-gradient(135deg, #c8922a, #e8b84b)', color: '#0d0d0d', boxShadow: '0 0 20px rgba(200,146,42,0.4)' }}>
              AC
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
              Artisan's Corner
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
            Create your account
          </h1>
          <p className="text-sm" style={{ color: '#5a5045' }}>Join the handcrafted marketplace</p>
        </div>

        <div className="gradient-border p-6">
          {(error || localError) && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              <span>⚠</span> {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#5a5045' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="input-dark"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#5a5045' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className="input-dark pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#5a5045' }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#5a5045' }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
                className="input-dark"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Creating account...
                </>
              ) : 'Create Account →'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#5a5045' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold" style={{ color: '#c8922a' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;