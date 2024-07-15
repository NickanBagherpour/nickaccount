import React from 'react';
import { BoxProps, SpacingProps } from './box.types';
import { boxStyles } from './box.styles';
import { classNames } from '@/utils/class-names';

export const Box: React.FC<BoxProps> = ({ 
  children,
  padding = 'none',
  margin = 'none',
  display = 'block',
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
  const getPaddingClasses = (padding: BoxProps['padding']) => {
    if (typeof padding === 'string') {
      return boxStyles.padding[padding];
    }
    if (padding && typeof padding === 'object') {
      return classNames(
        padding.top && boxStyles.paddingTop[padding.top],
        padding.right && boxStyles.paddingRight[padding.right],
        padding.bottom && boxStyles.paddingBottom[padding.bottom],
        padding.left && boxStyles.paddingLeft[padding.left],
        padding.x && boxStyles.paddingX[padding.x],
        padding.y && boxStyles.paddingY[padding.y]
      );
    }
    return '';
  };

  const getMarginClasses = (margin: BoxProps['margin']) => {
    if (typeof margin === 'string') {
      return boxStyles.margin[margin];
    }
    if (margin && typeof margin === 'object') {
      return classNames(
        margin.top && boxStyles.marginTop[margin.top],
        margin.right && boxStyles.marginRight[margin.right],
        margin.bottom && boxStyles.marginBottom[margin.bottom],
        margin.left && boxStyles.marginLeft[margin.left],
        margin.x && boxStyles.marginX[margin.x],
        margin.y && boxStyles.marginY[margin.y]
      );
    }
    return '';
  };

  const classes = classNames(
    boxStyles.base,
    getPaddingClasses(padding),
    getMarginClasses(margin),
    boxStyles.display[display],
    justifyContent && boxStyles.justifyContent[justifyContent],
    alignItems && (boxStyles.alignItems as Record<string, string>)[alignItems],
    bordered && boxStyles.bordered,
    rounded && boxStyles.rounded,
    boxStyles.shadow[shadow],
    boxStyles.width[width],
    boxStyles.height[height],
    className
  );

  const boxStyle = {
    ...style,
    backgroundColor: bgColor,
  };

  return (
    <div className={classes} style={boxStyle} {...props}>
      {children}
    </div>
  );
};
