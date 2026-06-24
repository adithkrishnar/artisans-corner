import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Pinterest, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Marketplace: [
    { label: 'Browse Products', to: '/' },
    { label: 'Become a Seller', to: '/become-seller' },
    { label: 'Gift Cards', to: '/' },
    { label: 'Artisan Stories', to: '/' },
  ],
  Account: [
    { label: 'Sign In', to: '/login' },
    { label: 'Create Account', to: '/register' },
    { label: 'My Orders', to: '/orders' },
    { label: 'Seller Dashboard', to: '/dashboard/seller' },
  ],
  Support: [
    { label: 'Help Centre', to: '/' },
    { label: 'Returns & Refunds', to: '/' },
    { label: 'Shipping Info', to: '/' },
    { label: 'Privacy Policy', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--text-primary)', color: 'rgba(255,255,255,0.65)' }}>
      {/* Newsletter */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Join our community</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Get updates on new artisans, products and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input text-sm flex-1 md:w-72"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              />
              <button className="btn btn-accent btn-sm flex-shrink-0">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                AC
              </div>
              <span className="font-display text-lg font-bold text-white">Artisan's Corner</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '260px' }}>
              A premium marketplace celebrating independent artisans and the beauty of handcrafted goods from around the world.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Pinterest, label: 'Pinterest' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,122,74,0.2)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(196,122,74,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="label-sm text-white mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={e => e.target.style.color = 'white'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2024 Artisan's Corner. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="flex items-center gap-1.5"><span>🔒</span> Secured by Stripe</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><span>☁️</span> Cloudinary CDN</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><span>⚡</span> Built with React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}