import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text' | 'link' | 'tuna';
  color?: ButtonColor;
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  loading?: boolean;
}
