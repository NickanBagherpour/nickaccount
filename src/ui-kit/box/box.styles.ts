
import { SpacingStyleKey, SpacingStyleValue, SpacingValue } from './box.types';

export const boxStyles = {
  base: 'transition-all duration-300',
  padding: {
    none: 'p-0',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  paddingX: {
    none: 'px-0',
    xs: 'px-1',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
    xl: 'px-8',
  },
  paddingY: {
    none: 'py-0',
    xs: 'py-1',
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6',
    xl: 'py-8',
  },
  paddingTop: {
    none: 'pt-0',
    xs: 'pt-1',
    sm: 'pt-2',
    md: 'pt-4',
    lg: 'pt-6',
    xl: 'pt-8',
  },
  paddingRight: {
    none: 'pr-0',
    xs: 'pr-1',
    sm: 'pr-2',
    md: 'pr-4',
    lg: 'pr-6',
    xl: 'pr-8',
  },
  paddingBottom: {
    none: 'pb-0',
    xs: 'pb-1',
    sm: 'pb-2',
    md: 'pb-4',
    lg: 'pb-6',
    xl: 'pb-8',
  },
  paddingLeft: {
    none: 'pl-0',
    xs: 'pl-1',
    sm: 'pl-2',
    md: 'pl-4',
    lg: 'pl-6',
    xl: 'pl-8',
  },
  margin: {
    none: 'm-0',
    xs: 'm-1',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
  },
  marginX: {
    none: 'mx-0',
    xs: 'mx-1',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-6',
    xl: 'mx-8',
  },
  marginY: {
    none: 'my-0',
    xs: 'my-1',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
    xl: 'my-8',
  },
  marginTop: {
    none: 'mt-0',
    xs: 'mt-1',
    sm: 'mt-2',
    md: 'mt-4',
    lg: 'mt-6',
    xl: 'mt-8',
  },
  marginRight: {
    none: 'mr-0',
    xs: 'mr-1',
    sm: 'mr-2',
    md: 'mr-4',
    lg: 'mr-6',
    xl: 'mr-8',
  },
  marginBottom: {
    none: 'mb-0',
    xs: 'mb-1',
    sm: 'mb-2',
    md: 'mb-4',
    lg: 'mb-6',
    xl: 'mb-8',
  },
  marginLeft: {
    none: 'ml-0',
    xs: 'ml-1',
    sm: 'ml-2',
    md: 'ml-4',
    lg: 'ml-6',
    xl: 'ml-8',
  },
  bordered: 'border border-gray-200 dark:border-gray-700',
  rounded: 'rounded-md',
  shadow: {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  },
  width: {
    auto: 'w-auto',
    full: 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  },
  height: {
    auto: 'h-auto',
    full: 'h-full',
    screen: 'h-screen',
  },
};

export const getSpacingClass = (
  type: 'padding' | 'margin',
  direction: 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y',
  value: SpacingValue
): string => {
  const key = `${type}${direction.charAt(0).toUpperCase() + direction.slice(1)}` as SpacingStyleKey;
  return (boxStyles[key] as SpacingStyleValue)[value];
};