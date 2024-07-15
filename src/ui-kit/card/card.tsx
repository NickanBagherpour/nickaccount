import React from 'react';

import { classNames } from '@/utils/class-names';
import { CardProps } from './card.types';
import { cardStyles } from './card.styles';

export const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'medium', 
  bordered = false,
  elevated = false,
  hoverable = false,
  color = 'default',
  className = '', 
  ...props 
}) => {
  const classes = classNames(
    cardStyles.base,
    cardStyles.padding[padding],
    cardStyles.color[color],
    bordered && cardStyles.bordered,
    elevated && cardStyles.elevated,
    hoverable && cardStyles.hoverable,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
