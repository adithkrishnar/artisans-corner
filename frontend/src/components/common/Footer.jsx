import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

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
    <footer
      style={{
        background: 'var(--text-primary)',
        color: 'rgba(255,255,255,0.65)',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Join our community
              </h3>
              <p
                className="text-sm"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Get updates on new artisans, products and exclusive offers.
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input text-sm flex-1 md:w-72"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                }}
              />
              <button className="btn btn-accent btn-sm flex items-center gap-2">
                <Mail size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary), var(--accent))',
                }}
              >
                AC
              </div>
              <span className="font-display text-xl font-bold text-white">
                Artisan's Corner
              </span>
            </Link>
            <p
              className="text-sm leading-7"
              style={{
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '280px',
              }}
            >
              A premium marketplace celebrating independent artisans and the
              beauty of handcrafted products from around the world.
            </p>
            <p
              className="mt-6 text-sm"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Crafted with ❤️ for artisans worldwide.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{
                        color: 'rgba(255,255,255,0.45)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            © 2024 Artisan's Corner. All rights reserved.
          </p>
          <div
            className="flex items-center gap-4 text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <span>🔒 Secured by Stripe</span>
            <span>•</span>
            <span>☁️ Cloudinary CDN</span>
            <span>•</span>
            <span>⚡ Built with React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
