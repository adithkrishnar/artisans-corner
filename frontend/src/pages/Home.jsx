import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--cream)' }}>
      <div className="text-center max-w-md animate-fade-up">
        <p className="text-8xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--beige)' }}>404</p>
        <div className="text-5xl mb-6">🎨</div>
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
          Page not found
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary px-8 py-3.5 text-sm inline-block">
          Back to Marketplace
        </Link>
      </div>
    </div>
  );
};

export default NotFound;  