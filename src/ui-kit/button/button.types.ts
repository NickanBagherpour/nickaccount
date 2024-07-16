import { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: ReactNode;
  variant?: 'contained' | 'outlined' | 'text' | 'link' | 'tuna';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
}
