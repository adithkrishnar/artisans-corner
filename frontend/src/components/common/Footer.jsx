import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--brown)', color: 'rgba(255,255,255,0.7)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, var(--terracotta), var(--clay))' }}>
                AC
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Artisan's Corner
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              A curated marketplace celebrating independent artisans and the beauty of handcrafted goods from around the world.
            </p>
            <div className="flex gap-2">
              {['T', 'I', 'F', 'P'].map((s, i) => (
                
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Marketplace',
              links: [
                { to: '/', label: 'Browse Products' },
                { to: '/register', label: 'Create Account' },
                { to: '/become-seller', label: 'Become a Seller' },
                { to: '/login', label: 'Sign In' },
              ]
            },
            {
              title: 'My Account',
              links: [
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/orders', label: 'My Orders' },
                { to: '/dashboard/seller', label: 'Vendor Dashboard' },
                { to: '/become-seller', label: 'Open a Store' },
              ]
            }
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold mb-5 uppercase tracking-widest text-white">
                {col.title}
              </h4>
              <div className="space-y-3">
                {col.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2024 Artisan's Corner. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span>🔒 Secured by Stripe</span>
            <span>·</span>
            <span>☁️ Images by Cloudinary</span>
            <span>·</span>
            <span>⚡ Powered by React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;