import { SelectHTMLAttributes, ReactNode } from 'react';

export type Option = {
  value: string;
  label: string;
};

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled' | 'standard';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  fullWidth?: boolean;
  options: Option[];
  loading?: boolean;
}
