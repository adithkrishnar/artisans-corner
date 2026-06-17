import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🎨</div>
        <h1 className="text-6xl font-bold text-[#8B5E3C] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          style={{ backgroundColor: '#8B5E3C' }}
          className="text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;