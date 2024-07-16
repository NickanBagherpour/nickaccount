export const buttonBaseStyles =
  'font-bold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200';

export const buttonSizeStyles = {
  small: 'px-2 py-1 text-sm h-8',
  medium: 'px-4 py-2 h-10',
  large: 'px-6 py-3 text-lg h-12',
};

export const buttonVariantStyles = {
  contained: 'dark:text-white text-gray-900',
  outlined: 'bg-transparent border',
  text: 'bg-transparent',
  link: 'bg-transparent underline hover:no-underline',
  tuna: 'bg-opacity-20 border',
};

export const buttonFullWidthStyles = 'w-full';

export const buttonColorStyles = {
  primary: {
    contained: 'bg-blue-600 hover:bg-blue-700 dark:text-white focus:ring-blue-500',
    outlined:
      'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-10 focus:ring-blue-500',
    text: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-10 focus:ring-blue-500',
    link: 'text-blue-600 hover:text-blue-700 underline hover:no-underline focus:ring-blue-500',
    tuna: 'bg-blue-600 border-blue-600 text-blue-600 hover:bg-blue-700 hover:bg-opacity-30 focus:ring-blue-500',
  },
  secondary: {
    contained: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outlined:
      'border border-gray-600 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:bg-opacity-10 focus:ring-gray-500',
    text: 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:bg-opacity-10 focus:ring-gray-500',
    link: 'text-gray-600 hover:text-gray-700 underline hover:no-underline focus:ring-gray-500',
    tuna: 'bg-gray-600 border-gray-600 text-gray-600 hover:bg-gray-700 hover:bg-opacity-30 focus:ring-gray-500',
  },
  danger: {
    contained: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outlined:
      'border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-10 focus:ring-red-500',
    text: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-10 focus:ring-red-500',
    link: 'text-red-600 hover:text-red-700 underline hover:no-underline focus:ring-red-500',
    tuna: 'bg-red-600 border-red-600 text-red-600 hover:bg-red-700 hover:bg-opacity-30 focus:ring-red-500',
  },
  success: {
    contained: 'bg-green-600 hover:bg-green-700 dark:text-white focus:ring-green-500',
    outlined:
      'border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-10 focus:ring-green-500',
    text: 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-10 focus:ring-green-500',
    link: 'text-green-600 hover:text-green-700 underline hover:no-underline focus:ring-green-500',
    tuna: 'bg-green-600 border-green-600 text-green-600 hover:bg-green-700 hover:bg-opacity-30 focus:ring-green-500',
  },
};

export const buttonDisabledStyles = {
  contained: 'bg-gray-400 text-gray-500 cursor-not-allowed',
  outlined: 'border-gray-400 text-gray-400 cursor-not-allowed',
  text: 'text-gray-400 cursor-not-allowed',
  link: 'text-gray-400 no-underline cursor-not-allowed',
  tuna: 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed',
};
