import React, { forwardRef } from 'react';
import { InputProps } from './input.types';
import { getInputStyles, getLabelStyles, getHelperTextStyles, inputStyles } from './input.styles';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'medium',
      variant = 'outlined',
      fullWidth = false,
      startAdornment,
      endAdornment,
      className = '',
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const inputClasses = getInputStyles(size, variant, hasError, fullWidth);
    const labelClasses = getLabelStyles(size, hasError);
    const helperTextClasses = getHelperTextStyles(hasError);

    return (
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={props?.id ?? props?.name} className={`${labelClasses} dark:text-gray-300`}>
            {label}
          </label>
        )}
        <div className='relative'>
          {startAdornment && (
            <span className={`${inputStyles.adornment.base} ${inputStyles.adornment.start}`}>{startAdornment}</span>
          )}
          <input
            ref={ref}
            className={`${inputClasses} ${className} ${
              startAdornment ? 'pl-10' : ''
            } ${endAdornment ? 'pr-10' : ''} dark:bg-gray-800 dark:text-white dark:border-gray-600`}
            {...props}
          />
          {endAdornment && (
            <span className={`${inputStyles.adornment.base} ${inputStyles.adornment.end}`}>{endAdornment}</span>
          )}
        </div>
        {(helperText || error) && <p className={`${helperTextClasses} dark:text-gray-400`}>{error || helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
