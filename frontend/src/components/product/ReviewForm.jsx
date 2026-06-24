import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { createReview } from '../../api/reviewService';
import StarRating from './StarRating';

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function ReviewForm({ productId, onReviewAdded }) {
  const { user } = useSelector(s => s.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (rating === 0) { setError('Please select a rating'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await createReview(productId, { rating, comment });
      setSuccess('Review submitted!');
      setRating(0);
      setComment('');
      onReviewAdded(res.data.review);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally { setLoading(false); }
  };

  if (!user) return (
    <div className="card-flat text-center py-10">
      <div className="text-4xl mb-3">⭐</div>
      <h3 className="font-display text-lg font-bold mb-2">Share your experience</h3>
      <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Sign in to leave a review</p>
      <Link to="/login" className="btn btn-primary btn-sm">Sign In to Review</Link>
    </div>
  );

  return (
    <div className="card-flat">
      <h3 className="font-display text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Write a Review</h3>

      {error && <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>⚠ {error}</div>}
      {success && <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', color: '#059669' }}>✓ {success}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="form-label">Your Rating</label>
          <div className="flex items-center gap-3">
            <StarRating rating={0} size="lg" interactive value={rating} onChange={setRating} />
            {rating > 0 && <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{RATING_LABELS[rating]}</span>}
          </div>
        </div>

        <div>
          <label className="form-label">Your Review</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} required rows={4}
            placeholder="Share your experience with this product..." className="input" />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full btn-lg">
          {loading ? <><div className="spinner"></div> Submitting...</> : <><Send size={16} /> Submit Review</>}
        </button>
      </form>
    </div>
  );
}