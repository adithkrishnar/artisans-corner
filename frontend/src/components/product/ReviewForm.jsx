import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview } from '../../api/reviewService';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { setError('Please select a rating'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await createReview(productId, { rating, comment });
      setSuccess('Review submitted successfully!');
      setRating(0);
      setComment('');
      onReviewAdded(res.data.review);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="card-flat text-center py-10">
        <div className="text-4xl mb-3">⭐</div>
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
          Share your experience
        </h3>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
          Sign in to leave a review
        </p>
        <Link to="/login" className="btn-primary text-sm px-6 py-2.5 inline-block">Sign In to Review</Link>
      </div>
    );
  }

  return (
    <div className="card-flat">
      <h3 className="text-xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
        Write a Review
      </h3>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#dc2626' }}>
          <span>⚠</span> {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm" style={{ background: 'rgba(107,115,85,0.08)', border: '1px solid rgba(107,115,85,0.2)', color: 'var(--olive)' }}>
          <span>✓</span> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            Your Rating
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="transition-transform duration-150 hover:scale-110"
                style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill={star <= (hovered || rating) ? '#C4714A' : '#E0D5C8'}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-xs mt-1.5" style={{ color: 'var(--terracotta)', fontFamily: 'DM Sans, sans-serif' }}>
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            placeholder="Share your experience with this product..."
            className="input-field resize-none"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm">
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Submitting...
            </>
          ) : 'Submit Review →'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;