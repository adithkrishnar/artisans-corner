const StarRating = ({ rating, size = 'sm' }) => {
  const starSize = size === 'lg' ? 'text-2xl' : 'text-sm';
  return (
    <div className={`flex items-center gap-0.5 ${starSize}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= Math.round(rating) ? '#D4A96A' : '#D1D5DB' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;