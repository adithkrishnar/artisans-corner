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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Shop' },
    ...(user ? [
      user.isVendor
        ? { to: '/dashboard/seller', label: 'Dashboard' }
        : { to: '/become-seller', label: 'Sell' },
      { to: '/orders', label: 'Orders' },
    ] : []),
  ];

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250, 247, 242, 0.97)' : 'rgba(250, 247, 242, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--terracotta), var(--clay))' }}
            >
              AC
            </div>
            <div>
              <p className="text-base font-bold leading-none" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--brown)' }}>
                Artisan's Corner
              </p>
              <p className="text-xs leading-none mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                Handcrafted Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to ||
                (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--terracotta-dark)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(196,113,74,0.08)' : 'transparent',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2.5 rounded-xl transition-all duration-200 group"
                  style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: 'var(--terracotta)' }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* User */}
                <div className="flex items-center gap-2 pl-2 ml-1" style={{ borderLeft: '1px solid var(--border)' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, var(--terracotta), var(--clay))' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-semibold leading-none" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-xs leading-none mt-0.5 capitalize" style={{ color: 'var(--text-muted)' }}>
                      {user.role}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{ color: 'var(--text-muted)', background: 'var(--cream-dark)', border: '1px solid var(--border)' }}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link to="/cart" className="relative p-2 rounded-lg" style={{ background: 'var(--cream-dark)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center font-bold text-white" style={{ background: 'var(--terracotta)', fontSize: '0.6rem' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              className="p-2 rounded-lg transition-all duration-200"
              style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 space-y-1 animate-fade-in" style={{ borderTop: '1px solid var(--border)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{ color: '#ef4444' }}
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
                <Link to="/register" className="block mx-4 btn-primary text-center text-sm">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;