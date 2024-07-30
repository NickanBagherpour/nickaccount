import { HTMLAttributes, ReactNode } from 'react';
import { SpacingValue } from '../types';

export type CardColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: SpacingValue;
  bordered?: boolean;
  elevated?: boolean;
  hoverable?: boolean;
  color?: CardColor;
}