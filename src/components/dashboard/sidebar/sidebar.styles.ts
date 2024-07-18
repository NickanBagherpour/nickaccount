// components/dashboard/sidebar.styles.ts
export const sidebarStyles = {
    overlay: (isOpen: boolean) => `
      fixed inset-0 bg-gray-800 bg-opacity-75 z-20 transition-opacity duration-300
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `,
    sidebar: (isOpen: boolean) => `
      bg-gray-800 text-gray-100 w-64 space-y-2 py-7 px-2 fixed inset-y-0 left-0 transform
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 transition duration-200 ease-in-out z-30
    `,
    link: (isActive: boolean, depth: number) => `
      block py-2.5 px-4 rounded transition duration-200 flex items-center justify-between
      ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}
      ${depth > 0 ? `pl-${4 + depth * 2}` : ''}
      ${depth === 1 ? 'bg-gray-750' : depth === 2 ? 'bg-gray-775' : ''}
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
  };
  