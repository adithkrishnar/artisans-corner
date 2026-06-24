import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="text-center max-w-md animate-fade-up">
        <p className="font-display font-bold mb-3" style={{ fontSize: '8rem', lineHeight: 1, color: 'var(--border)' }}>404</p>
        <div className="text-5xl mb-6">🎨</div>
        <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Page not found</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg inline-flex">
          <ArrowLeft size={18} /> Back to Marketplace
        </Link>
      </div>
    </div>
  );
}