import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #6B4226, #D4A96A)' }}
              >
                AC
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Artisan's Corner
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A marketplace for unique handcrafted products. Supporting independent artisans worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {['Twitter', 'Instagram', 'Facebook'].map((social) => (
                
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-xs transition-colors duration-200"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Marketplace</h4>
            <div className="space-y-2.5">
              {[
                { to: '/', label: 'Browse Products' },
                { to: '/register', label: 'Create Account' },
                { to: '/become-seller', label: 'Become a Seller' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Account</h4>
            <div className="space-y-2.5">
              {[
                { to: '/login', label: 'Sign In' },
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/orders', label: 'My Orders' },
                { to: '/dashboard/seller', label: 'Vendor Dashboard' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 Artisan's Corner. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm">
            <span>🔒</span>
            <span>Secured by Stripe</span>
            <span className="mx-2">·</span>
            <span>☁️</span>
            <span>Powered by Cloudinary</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;