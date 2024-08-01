'use client';

import React, { forwardRef } from 'react';

import { FaSpinner, FaChevronDown } from 'react-icons/fa';

import { SelectProps } from './select.types';
import { getSelectStyles, getLabelStyles, getHelperTextStyles, getIconStyles, selectStyles } from './select.styles';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      id,
      helperText,
      error,
      size = 'medium',
      variant = 'outlined',
      fullWidth = false,
      className = '',
      disabled = false,
      loading = false,
      options,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const selectClasses = getSelectStyles(size, variant, hasError, fullWidth);
    const labelClasses = getLabelStyles(size, hasError);
    const helperTextClasses = getHelperTextStyles(hasError);
    const iconClasses = getIconStyles(size);

    return (
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={id ?? props?.name} className={`${labelClasses} dark:text-gray-300`}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id ?? props?.name}
            className={`${selectClasses} ${className} dark:bg-gray-800 dark:text-white dark:border-gray-600 pr-10`}
            disabled={disabled || loading}
            {...props}
          >
            <option value="">{loading ? 'Loading...' : 'Select an option'}</option>
            {!loading && options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className={`${iconClasses} flex items-center justify-center`}>
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaChevronDown />
            )}
          </div>
        </div>
        {(helperText || error) && <p className={`${helperTextClasses} dark:text-gray-400`}>{error || helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
