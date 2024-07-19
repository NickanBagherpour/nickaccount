export const sidebarStyles = {
  overlay: (isOpen: boolean) => `
    fixed inset-0 bg-gray-800 dark:bg-gray-900 winter:bg-blue-900 bg-opacity-75 z-20 transition-opacity duration-300
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `,
  sidebar: (isOpen: boolean) => `
    bg-white dark:bg-gray-800 winter:bg-blue-100 
    text-gray-800 dark:text-gray-100 winter:text-blue-900 
    w-64 space-y-2 py-7 px-2 fixed inset-y-0 left-0 transform
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:relative md:translate-x-0 transition duration-200 ease-in-out z-30
  `,
  link: (isActive: boolean, depth: number) => `
    block py-2.5 px-4 rounded transition duration-200 flex items-center justify-between
    ${isActive 
      ? 'bg-gray-200 dark:bg-gray-700 winter:bg-blue-300 text-gray-900 dark:text-white winter:text-blue-900' 
      : 'hover:bg-gray-100 dark:hover:bg-gray-700 winter:hover:bg-blue-200 hover:text-gray-900 dark:hover:text-white winter:hover:text-blue-900'}
    ${depth > 0 ? `pl-${4 + depth * 2}` : ''}
    ${depth === 1 
      ? 'bg-gray-100 dark:bg-gray-750 winter:bg-blue-150' 
      : depth === 2 
        ? 'bg-gray-50 dark:bg-gray-775 winter:bg-blue-175' 
        : ''}
  `,
  subMenu: (isOpen: boolean) => `
    overflow-hidden transition-all duration-200 ease-in-out
    ${isOpen ? 'max-h-screen' : 'max-h-0'}
  `,
  icon: `mr-2`,
  chevron: (isOpen: boolean) => `
    transition-transform duration-200 ml-2 text-xs
    ${isOpen ? 'transform rotate-180' : ''}
  `,
}
