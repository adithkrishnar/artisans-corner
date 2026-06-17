import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#8B5E3C' }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3">🎨 Artisan's Corner</h3>
            <p className="text-sm opacity-75 leading-relaxed">
              A marketplace for unique handcrafted products. Support local artisans and find one-of-a-kind treasures.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm opacity-75 hover:opacity-100 transition">Home</Link>
              <Link to="/register" className="block text-sm opacity-75 hover:opacity-100 transition">Create Account</Link>
              <Link to="/become-seller" className="block text-sm opacity-75 hover:opacity-100 transition">Become a Seller</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Buyers</h4>
            <div className="space-y-2">
              <Link to="/cart" className="block text-sm opacity-75 hover:opacity-100 transition">Shopping Cart</Link>
              <Link to="/orders" className="block text-sm opacity-75 hover:opacity-100 transition">My Orders</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 pt-6 text-center">
          <p className="text-sm opacity-60">© 2024 Artisan's Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;