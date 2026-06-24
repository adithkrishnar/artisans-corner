import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="form-group">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            input-field
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-error' : ''}
            ${disabled ? 'bg-cream-dark' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-error text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  label,
  placeholder,
  error,
  disabled = false,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="form-group">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`
          textarea-field
          ${error ? 'border-error' : ''}
          ${disabled ? 'bg-cream-dark' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-error text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export const Select = forwardRef(({
  label,
  options,
  placeholder,
  error,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="form-group">
          {label}
        </label>
      )}
      <select
        ref={ref}
        disabled={disabled}
        className={`
          input-field appearance-none cursor-pointer
          ${error ? 'border-error' : ''}
          ${disabled ? 'bg-cream-dark' : ''}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled defaultValue>
            {placeholder}
          </option>
        )}
        {options?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-error text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50' : ''} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 rounded border-1.5 border-border cursor-pointer accent-secondary"
        {...props}
      />
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
    </label>
  );
};

export const Radio = ({
  name,
  label,
  value,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50' : ''} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 cursor-pointer accent-secondary"
        {...props}
      />
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
    </label>
  );
};

export default Input;
