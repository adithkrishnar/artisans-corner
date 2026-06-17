import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ backgroundColor: '#8B5E3C' }} className="text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🎨 Artisan's Corner
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:opacity-80 transition text-sm">Home</Link>

          {user ? (
            <>
              {user.isVendor ? (
                <Link to="/dashboard/seller" className="hover:opacity-80 transition text-sm">
                  Dashboard
                </Link>
              ) : (
                <Link to="/become-seller" className="hover:opacity-80 transition text-sm">
                  Become Seller
                </Link>
              )}

              <Link to="/orders" className="hover:opacity-80 transition text-sm">
                My Orders
              </Link>

              <Link to="/cart" className="relative hover:opacity-80 transition text-sm">
                🛒 Cart
                {cartCount > 0 && (
                  <span
                    style={{ backgroundColor: '#D4A96A' }}
                    className="absolute -top-2 -right-4 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-3 ml-2">
                <span className="text-sm opacity-80">Hi, {user.name.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  style={{ backgroundColor: '#D4A96A' }}
                  className="text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:opacity-80 transition text-sm">Login</Link>
              <Link
                to="/register"
                style={{ backgroundColor: '#D4A96A' }}
                className="text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-white border-opacity-20 pt-4 space-y-3">
          <Link to="/" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>Home</Link>
          {user ? (
            <>
              {user.isVendor ? (
                <Link to="/dashboard/seller" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              ) : (
                <Link to="/become-seller" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>Become Seller</Link>
              )}
              <Link to="/orders" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>My Orders</Link>
              <Link to="/cart" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
              <button onClick={handleLogout} className="block text-sm hover:opacity-80 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-sm hover:opacity-80" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;