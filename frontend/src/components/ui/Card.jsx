import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  ...props
}) => {
  const baseClass = glass ? 'card-glass' : 'card';
  return (
    <motion.div
      className={`${baseClass} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-6 border-b border-border ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-6 border-t border-border flex gap-3 ${className}`} {...props}>
    {children}
  </div>
);

export const StatCard = ({ icon: Icon, label, value, change, className = '' }) => {
  const isPositive = change >= 0;
  
  return (
    <Card className={`stat-card ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-text-muted text-sm font-medium mb-2">{label}</p>
          <p className="text-2xl font-bold text-text-primary font-playfair">{value}</p>
          {change !== undefined && (
            <p className={`text-xs mt-2 font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon className="text-secondary" size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

export const EmptyState = ({ icon: Icon, title, description, action, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4">
          <Icon size={32} className="text-text-muted" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-text-muted text-sm mb-6 max-w-sm">{description}</p>
      )}
      {action && (
        <div className="flex gap-3">
          {action}
        </div>
      )}
    </div>
  );
};

export default Card;
