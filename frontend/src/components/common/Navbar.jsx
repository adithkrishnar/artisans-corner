import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(13, 13, 13, 0.95)'
          : 'rgba(13, 13, 13, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(200, 146, 42, 0.2)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #c8922a, #e8b84b)',
                color: '#0d0d0d',
                boxShadow: '0 0 15px rgba(200,146,42,0.4)',
              }}
            >
              AC
            </div>
            <span
              className="text-lg font-bold tracking-tight transition-all duration-300"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: '#f5f0e8',
                letterSpacing: '0.02em',
              }}
            >
              Artisan's Corner
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Marketplace' },
              ...(user ? [
                user.isVendor
                  ? { to: '/dashboard/seller', label: 'Dashboard' }
                  : { to: '/become-seller', label: 'Sell' },
                { to: '/orders', label: 'Orders' },
              ] : []),
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: location.pathname === link.to || location.pathname.startsWith(link.to + '/') && link.to !== '/'
                    ? '#e8b84b'
                    : '#8a8070',
                  background: location.pathname === link.to
                    ? 'rgba(200,146,42,0.1)'
                    : 'transparent',
                }}
                onMouseEnter={e => {
                  if (location.pathname !== link.to) {
                    e.target.style.color = '#f5f0e8';
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (location.pathname !== link.to) {
                    e.target.style.color = '#8a8070';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="relative p-2.5 rounded-xl transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,146,42,0.15)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors" style={{ color: '#8a8070' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #c8922a, #e8b84b)',
                        color: '#0d0d0d',
                        boxShadow: '0 0 10px rgba(200,146,42,0.5)',
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-2 pl-3" style={{ borderLeft: '1px solid rgba(200,146,42,0.15)' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #c8922a, #e8b84b)',
                      color: '#0d0d0d',
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#c8b8a0' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{
                      color: '#8a8070',
                      border: '1px solid rgba(200,146,42,0.15)',
                    }}
                    onMouseEnter={e => {
                      e.target.style.color = '#ef4444';
                      e.target.style.borderColor = 'rgba(239,68,68,0.3)';
                      e.target.style.background = 'rgba(239,68,68,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.color = '#8a8070';
                      e.target.style.borderColor = 'rgba(200,146,42,0.15)';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium transition-all duration-200"
                  style={{ color: '#8a8070' }}
                  onMouseEnter={e => e.target.style.color = '#f5f0e8'}
                  onMouseLeave={e => e.target.style.color = '#8a8070'}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-gold text-sm px-5 py-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-all duration-200"
            style={{ color: '#8a8070', background: 'rgba(255,255,255,0.05)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 space-y-1"
            style={{ borderTop: '1px solid rgba(200,146,42,0.15)' }}
          >
            {[
              { to: '/', label: 'Marketplace' },
              ...(user ? [
                user.isVendor
                  ? { to: '/dashboard/seller', label: 'Dashboard' }
                  : { to: '/become-seller', label: 'Sell on AC' },
                { to: '/orders', label: 'My Orders' },
                { to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
              ] : [
                { to: '/login', label: 'Sign In' },
                { to: '/register', label: 'Get Started' },
              ]),
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                style={{ color: '#c8b8a0' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg"
                style={{ color: '#ef4444' }}
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;