import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(200,146,42,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: 'linear-gradient(135deg, #c8922a, #e8b84b)', color: '#0d0d0d', boxShadow: '0 0 15px rgba(200,146,42,0.3)' }}>
                AC
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
                Artisan's Corner
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#5a5045' }}>
              A curated marketplace for unique handcrafted products from independent artisans worldwide.
            </p>
            <div className="flex gap-2 mt-6">
              {['T', 'I', 'F'].map((s, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200" style={{ background: 'rgba(200,146,42,0.08)', color: '#5a5045', border: '1px solid rgba(200,146,42,0.15)' }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(200,146,42,0.15)'; e.target.style.color = '#c8922a'; }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(200,146,42,0.08)'; e.target.style.color = '#5a5045'; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Marketplace',
              links: [
                { to: '/', label: 'Browse Products' },
                { to: '/register', label: 'Create Account' },
                { to: '/become-seller', label: 'Become a Seller' },
              ]
            },
            {
              title: 'Account',
              links: [
                { to: '/login', label: 'Sign In' },
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/orders', label: 'My Orders' },
                { to: '/dashboard/seller', label: 'Vendor Dashboard' },
              ]
            }
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: '#c8922a' }}>
                {col.title}
              </h4>
              <div className="space-y-3">
                {col.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-sm transition-colors duration-200"
                    style={{ color: '#5a5045' }}
                    onMouseEnter={e => e.target.style.color = '#f5f0e8'}
                    onMouseLeave={e => e.target.style.color = '#5a5045'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(200,146,42,0.08)' }}>
          <p className="text-xs" style={{ color: '#3a3025' }}>
            © 2024 Artisan's Corner. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: '#3a3025' }}>
            <span>🔒 Secured by Stripe</span>
            <span>·</span>
            <span>☁️ Cloudinary CDN</span>
            <span>·</span>
            <span>🚀 Powered by React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;