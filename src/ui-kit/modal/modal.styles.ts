export const modalStyles = {
  overlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
  container: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden',
  header: 'flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700',
  title: 'text-lg font-semibold text-gray-900 dark:text-white',
  closeButton: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150 ease-in-out',
  content: 'p-4',
  size: {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full',
  },
  fullscreen: 'w-screen h-screen rounded-none', // Add this line
};
