export const selectorStyles = {
  container: 'relative',
  select: `
    flex items-center justify-between
    w-full
    bg-white dark:bg-gray-800 winter:bg-winter-primary
    border border-gray-300 dark:border-gray-600 winter:border-winter-secondary
    text-gray-700 dark:text-gray-200 winter:text-gray-900
    rounded-md
    shadow-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition duration-150 ease-in-out
  `,
  icon: `
    flex-shrink-0
    text-gray-400
    mr-2
  `,
  label: `
    flex-grow
    truncate
  `,
  arrow: `
    flex-shrink-0
    text-gray-400
    ml-2
  `,
  disabled: `
    bg-gray-100 dark:bg-gray-700 winter:bg-winter-secondary
    cursor-not-allowed
  `,
  size: {
    small: 'text-sm h-8',
    medium: 'text-base h-10',
    large: 'text-lg h-12',
  },
  padding: {
    small: 'px-2',
    medium: 'px-3',
    large: 'px-4',
  },
  iconSize: {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  },
  optionsContainer: `
    absolute z-10 w-full mt-1
    bg-white dark:bg-gray-800 winter:bg-winter-primary
    border border-gray-300 dark:border-gray-600 winter:border-winter-secondary
    rounded-md shadow-lg
    overflow-hidden
  `,
  option: {
    base: `
      py-1 px-4
      text-gray-700 dark:text-gray-200 winter:text-gray-900
      hover:bg-gray-100 dark:hover:bg-gray-700 winter:hover:bg-winter-secondary
      cursor-pointer
    `,
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
  },
}
