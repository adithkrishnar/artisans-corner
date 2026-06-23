import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--brown)',
        color: 'rgba(255,255,255,0.7)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, var(--terracotta), var(--clay))',
                }}
              >
                AC
              </div>

              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Artisan&apos;s Corner
              </span>
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              A curated marketplace celebrating independent artisans and the
              beauty of handcrafted goods from around the world.
            </p>

            <div className="flex gap-2">
              {['T', 'I', 'F', 'P'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-widest text-white">
              Marketplace
            </h4>

            <div className="space-y-3">
              <Link
                to="/"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Browse Products
              </Link>

              <Link
                to="/register"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Create Account
              </Link>

              <Link
                to="/become-seller"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Become a Seller
              </Link>

              <Link
                to="/login"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-widest text-white">
              My Account
            </h4>

            <div className="space-y-3">
              <Link
                to="/cart"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Shopping Cart
              </Link>

              <Link
                to="/orders"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                My Orders
              </Link>

              <Link
                to="/dashboard/seller"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Vendor Dashboard
              </Link>

              <Link
                to="/become-seller"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Open a Store
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-6"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            © 2026 Artisan&apos;s Corner. All rights reserved.
          </p>

          <div
            className="flex items-center gap-4 text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <span>🔒 Secure Payments</span>
            <span>•</span>
            <span>☁️ Cloudinary Images</span>
            <span>•</span>
            <span>⚡ Built with React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;