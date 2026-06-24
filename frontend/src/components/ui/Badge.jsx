import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'default',
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-secondary/10 text-secondary border border-secondary/20',
    secondary: 'bg-terracotta/10 text-terracotta border border-terracotta/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={14} />}
      {children}
    </div>
  );
};

export const Rating = ({ rating, count, interactive = false, onChange, size = 'md' }) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  const displayRating = interactive ? (hoverRating || rating) : rating;
  
  const sizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <motion.button
            key={star}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`transition-colors ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              size={sizes[size]}
              className={`${star <= displayRating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`}
            />
          </motion.button>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-text-muted font-medium">
          {rating} • {count} reviews
        </span>
      )}
    </div>
  );
};

export const Skeleton = ({ width = 'w-full', height = 'h-4', className = '', count = 1 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${width} ${height} ${className}`}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <Skeleton height="h-48 w-full" className="rounded-lg" />
    <Skeleton height="h-4" width="w-3/4" />
    <Skeleton height="h-4" width="w-1/2" />
    <div className="flex gap-2 pt-2">
      <Skeleton height="h-8" width="w-16" className="rounded-full" />
      <Skeleton height="h-8" width="w-16" className="rounded-full" />
    </div>
  </div>
);

export const Progress = ({ value, max = 100, label, size = 'md' }) => {
  const percentage = (value / max) * 100;
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">{label}</span>
          <span className="text-xs font-semibold text-text-muted">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`${sizes[size]} bg-cream-dark rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-linear-to-r from-secondary to-secondary-light rounded-full"
        />
      </div>
    </div>
  );
};

export const Alert = ({ variant = 'info', title, message, icon: Icon, action, onClose }) => {
  const variants = {
    info: 'bg-info/10 border-info/30 text-info',
    success: 'bg-success/10 border-success/30 text-success',
    warning: 'bg-warning/10 border-warning/30 text-warning',
    error: 'bg-error/10 border-error/30 text-error',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`border-l-4 p-4 rounded-lg ${variants[variant]} flex items-start gap-4`}
    >
      {Icon && <Icon size={20} className="mt-0.5 shrink-0" />}
      <div className="flex-1">
        {title && <p className="font-semibold text-sm">{title}</p>}
        {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
      </div>
      <div className="flex gap-2">
        {action && action}
        {onClose && (
          <button
            onClick={onClose}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Badge;
