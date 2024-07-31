import { SelectSize, SelectVariant } from './select.types';

export const selectStyles = {
  base: 'w-full transition-all duration-200 ease-in-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
  size: {
    small: 'px-2 py-1 text-sm',
    medium: 'px-3 py-2',
    large: 'px-4 py-3 text-lg',
  },
  variant: {
    outlined: 'border rounded-md focus:ring-2 focus:ring-opacity-50 dark:border-gray-600',
    filled: 'bg-gray-100 dark:bg-gray-700 border-b-2 focus:bg-white dark:focus:bg-gray-600',
    standard: 'border-b-2 dark:border-gray-600',
  },
  state: {
    normal: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400',
    error: 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500 dark:focus:border-red-400 dark:focus:ring-red-400',
  },
  label: {
    base: 'block mb-1 font-medium transition-all duration-200 ease-in-out',
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
    state: {
      normal: 'text-gray-700 dark:text-gray-300',
      error: 'text-red-500 dark:text-red-400',
    },
  },
  helperText: {
    base: 'mt-1 text-sm',
    state: {
      normal: 'text-gray-600 dark:text-gray-400',
      error: 'text-red-500 dark:text-red-400',
    },
  },
  icon: {
    base: 'absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none',
    size: {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-6 h-6',
    },
  },
};

export const getSelectStyles = (
  size: SelectSize,
  variant: SelectVariant,
  error: boolean,
  fullWidth: boolean
) => {
  return `
    ${selectStyles.base}
    ${selectStyles.size[size]}
    ${selectStyles.variant[variant]}
    ${error ? selectStyles.state.error : selectStyles.state.normal}
    ${fullWidth ? 'w-full' : ''}
    appearance-none
  `;
};

export const getLabelStyles = (size: SelectSize, error: boolean) => {
  return `
    ${selectStyles.label.base}
    ${selectStyles.label.size[size]}
    ${error ? selectStyles.label.state.error : selectStyles.label.state.normal}
  `;
};

export const getHelperTextStyles = (error: boolean) => {
  return `
    ${selectStyles.helperText.base}
    ${error ? selectStyles.helperText.state.error : selectStyles.helperText.state.normal}
  `;
};

export const getIconStyles = (size: SelectSize) => {
  return `
    ${selectStyles.icon.base}
    ${selectStyles.icon.size[size]}
  `;
};
