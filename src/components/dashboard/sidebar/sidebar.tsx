// src/components/Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`bg-gray-800 text-gray-100 w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <nav>
          <Link
            href={ROUTES.DASHBOARD}
            className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white'
          >
            Dashboard
          </Link>
          <Link
            href={ROUTES.REPORT_1}
            className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white'
          >
            Report 1
          </Link>
          <Link
            href={ROUTES.REPORT_2}
            className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white'
          >
            Report 2
          </Link>
        </nav>
      </aside>
    </>
  );
}
