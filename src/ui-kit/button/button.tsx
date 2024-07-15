import React from 'react';

import { ButtonProps } from './button.types';
import * as S from './button.styles';
import { classNames } from '@/utils/class-names';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  icon,
  loading = false,
  className = '',
  ...props
}) => {
  const isDisabled = loading || props.disabled;

  const baseClasses = S.buttonBaseStyles;
  const sizeClasses = S.buttonSizeStyles[size];
  const variantClasses = S.buttonVariantStyles[variant];
  const colorClasses = S.buttonColorStyles[color][variant];
  const disabledClasses = isDisabled ? S.buttonDisabledStyles[variant] : '';

  const consistentHeightClasses = 'relative inline-flex items-center justify-center';
  const classes = classNames(
    baseClasses,
    sizeClasses,
    variantClasses,
    !isDisabled && colorClasses,
    disabledClasses,
    consistentHeightClasses,
    className,
  );

  return (
    <button className={classes} disabled={isDisabled} {...props}>
      {loading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
            <circle className='opacity-40' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path className='opacity-70' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z'></path>
          </svg>
        </span>
      )}

      <span className='flex items-center justify-center' style={{ opacity: loading ? 0.4 : 1 }}>
        {icon && <span className='mr-2'>{icon}</span>}
        <span>{children}</span>
      </span>
    </button>
  );
};
