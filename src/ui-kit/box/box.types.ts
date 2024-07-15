import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type SpacingValue = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpacingProps {
  top?: SpacingValue;
  right?: SpacingValue;
  bottom?: SpacingValue;
  left?: SpacingValue;
  x?: SpacingValue;
  y?: SpacingValue;
}

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: SpacingValue | SpacingProps;
  margin?: SpacingValue | SpacingProps;
  display?: CSSProperties['display'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  bordered?: boolean;
  rounded?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  width?: 'auto' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  height?: 'auto' | 'full' | 'screen';
  bgColor?:  CSSProperties['color'] | string;
}
