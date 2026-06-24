import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Menu, X, User, LayoutDashboard, Package, LogOut, ChevronDown, Store } from 'lucide-react';
import { logout } from '../../features/auth/authSlice';

const CATEGORIES = ['Home Decor', 'Jewelry', 'Clothing', 'Art', 'Pottery', 'Woodwork', 'Candles', 'Textiles'];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(s => s.auth);
  const { items } = useSelector(s => s.cart);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const categoriesRef = useRef(null);
  const profileRef = useRef(null);

  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) setCategoriesOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };
  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'}`}
        style={{ borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent' }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20 gap-8">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-transform duration-200 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                AC
              </div>
              <span className="font-display text-lg font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                Artisan's Corner
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              <Link to="/"
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: isActive('/') ? 'var(--primary)' : 'var(--text-secondary)', background: isActive('/') ? 'var(--primary-lightest)' : 'transparent' }}>
                Home
              </Link>

              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--text-secondary)' }}>
                  Categories <ChevronDown size={14} className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 card animate-slide-down" style={{ zIndex: 100, padding: '0.5rem' }}>
                    {CATEGORIES.map(cat => (
                      <Link key={cat} to={`/?category=${cat}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {!user?.isVendor && (
                <Link to="/become-seller"
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: isActive('/become-seller') ? 'var(--primary)' : 'var(--text-secondary)', background: isActive('/become-seller') ? 'var(--primary-lightest)' : 'transparent' }}>
                  Sell on AC
                </Link>
              )}

              {user?.isVendor && (
                <Link to="/dashboard/seller"
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: isActive('/dashboard') ? 'var(--primary)' : 'var(--text-secondary)', background: isActive('/dashboard') ? 'var(--primary-lightest)' : 'transparent' }}>
                  Dashboard
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Link to="/cart" className="relative p-2.5 rounded-xl transition-all duration-200 btn-ghost border">
                    <ShoppingBag size={18} style={{ color: 'var(--text-secondary)' }} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center text-white text-xs font-bold rounded-full"
                        style={{ background: 'var(--accent)', minWidth: '18px', height: '18px', fontSize: '0.65rem', padding: '0 4px' }}>
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 btn-ghost border">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                      <div className="absolute top-full right-0 mt-2 w-52 card animate-slide-down" style={{ zIndex: 100, padding: '0.5rem' }}>
                        <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid var(--border)' }}>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                          <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                        </div>
                        {[
                          { icon: Package, label: 'My Orders', to: '/orders' },
                          ...(user.isVendor ? [{ icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard/seller' }] : [{ icon: Store, label: 'Become Seller', to: '/become-seller' }]),
                        ].map(item => (
                          <Link key={item.to} to={item.to}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                            <item.icon size={15} /> {item.label}
                          </Link>
                        ))}
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                          <button onClick={handleLogout}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm w-full transition-all duration-150"
                            style={{ color: '#dc2626' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.06)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <LogOut size={15} /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                  <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              {user && (
                <Link to="/cart" className="relative p-2 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <ShoppingBag size={18} style={{ color: 'var(--text-secondary)' }} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center text-white font-bold rounded-full"
                      style={{ background: 'var(--accent)', minWidth: '16px', height: '16px', fontSize: '0.6rem', padding: '0 3px' }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg transition-all duration-200"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden animate-slide-down" style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)' }}>
            <div className="container py-4 space-y-1">
              {[
                { to: '/', label: 'Home' },
                ...(user ? [
                  { to: '/orders', label: 'My Orders' },
                  user.isVendor ? { to: '/dashboard/seller', label: 'Dashboard' } : { to: '/become-seller', label: 'Sell on AC' },
                ] : []),
                ...CATEGORIES.map(c => ({ to: `/?category=${c}`, label: c })),
              ].map(link => (
                <Link key={link.to} to={link.to}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                  style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium w-full"
                  style={{ color: '#dc2626' }}>
                  <LogOut size={15} /> Sign Out
                </button>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link to="/login" className="btn btn-ghost btn-sm flex-1 justify-center">Sign In</Link>
                  <Link to="/register" className="btn btn-primary btn-sm flex-1 justify-center">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
