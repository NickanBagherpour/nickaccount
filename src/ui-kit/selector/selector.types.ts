import { ReactNode } from 'react';

export interface SelectorOption {
  value: string;
  label: string;
}

export interface SelectorProps {
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}
