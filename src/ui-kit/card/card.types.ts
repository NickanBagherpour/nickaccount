import { HTMLAttributes, ReactNode } from 'react';

export type CardColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  bordered?: boolean;
  elevated?: boolean;
  hoverable?: boolean;
  color?: CardColor;
}