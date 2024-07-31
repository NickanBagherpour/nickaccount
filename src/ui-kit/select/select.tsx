'use client';

import React from 'react';
import { SelectProps } from './select.types';
import { getSelectStyles, getLabelStyles, getHelperTextStyles, getIconStyles } from './select.styles';
import { classNames } from '@/utils/class-names';

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  size = 'medium',
  variant = 'outlined',
  error = false,
  helperText,
  fullWidth = false,
  className = '',
}) => {
  return (
    <div className={classNames('relative', fullWidth ? 'w-full' : '', className)}>
      <label className={getLabelStyles(size, error)}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={getSelectStyles(size, variant, error, fullWidth)}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className={getIconStyles(size)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {helperText && (
        <p className={getHelperTextStyles(error)}>
          {helperText}
        </p>
      )}
    </div>
  );
};
