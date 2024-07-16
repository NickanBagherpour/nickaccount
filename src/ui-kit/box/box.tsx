import React from 'react';

import { classNames } from '@/utils/class-names';

import { BoxProps, SpacingProps } from './box.types';
import { boxStyles, getSpacingClass } from './box.styles';
import { SpacingValue } from '../types';

export const Box: React.FC<BoxProps> = ({ 
  children,
  as: Component = 'div',
  padding = 'none',
  margin = 'none',
  display,
  flexDirection,
  justifyContent,
  alignItems,
  bordered = false,
  rounded = false,
  shadow = 'none',
  width = 'auto',
  height = 'auto',
  bgColor,
  className = '',
  style,
  ...props 
}) => {
  const getSpacingClasses = (type: 'padding' | 'margin', spacing: BoxProps['padding'] | BoxProps['margin']) => {
    if (typeof spacing === 'string') {
      return boxStyles[type][spacing];
    }
    if (spacing && typeof spacing === 'object') {
      return classNames(
        ...Object.entries(spacing).map(([key, value]) => 
          getSpacingClass(type, key as keyof SpacingProps, value as SpacingValue)
        )
      );
    }
    return '';
  };

  const classes = classNames(
    boxStyles.base,
    getSpacingClasses('padding', padding),
    getSpacingClasses('margin', margin),
    bordered && boxStyles.bordered,
    rounded && boxStyles.rounded,
    boxStyles.shadow[shadow],
    boxStyles.width[width],
    boxStyles.height[height],
    className
  );

  const boxStyle: React.CSSProperties = {
    ...style,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    backgroundColor: bgColor,
  };

  return (
    <Component className={classes} style={boxStyle} {...props}>
      {children}
    </Component>
  );
}
