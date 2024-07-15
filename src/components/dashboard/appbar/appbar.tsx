// src/components/AppBar.tsx
import React from 'react';
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';

import {Button, Dropdown} from '@/ui-kit';
import { APP_NAME } from '@/constants/config';
import { mockUsers } from '@/mocks';
import { ROUTES } from '@/constants/routes';

type AppBarProps = {
  toggleSidebar: () => void;
};

export default function AppBar({ toggleSidebar }: AppBarProps) {
  // const { data: session } = useSession();

  const session = {
    user: mockUsers[0],
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link href={ROUTES.HOME} className="text-gray-800 dark:text-white text-xl font-bold ml-2">
            {APP_NAME}
            </Link>
          </div>
          {session && (
            <Dropdown
              trigger={
                <button className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={session.user?.image}
                    alt={session.user?.name || 'User'}
                  />
                  <span>{session.user?.name}</span>
                </button>
              }
            >
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Settings</a>
              <button
                // onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                role="menuitem"
              >
                Sign out
              </button>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}
