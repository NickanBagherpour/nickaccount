'use client';

import React from 'react';
import Link from 'next/link';

import { Dropdown } from '@/ui-kit';
import { APP_NAME } from '@/constants/config';
import { ROUTES } from '@/constants/routes';
import { User } from '@/types/user.type';
import { signOutAction } from '@/actions/auth.action';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';

type AppBarProps = {
  toggleSidebar: () => void;
  user: Omit<User, 'hashedPassword'> | null;
};

export default function AppBar({ toggleSidebar, user }: AppBarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOutAction();

    if (result.success) {
      router.replace(ROUTES.HOME);
    }
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow'>
      <div className='container mx-auto px-6 py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <button onClick={toggleSidebar} className='text-gray-500 focus:outline-none md:hidden'>
              <FaBars className='h-5 w-5 mx-2' />
            </button>
            <Link href={ROUTES.HOME} className='text-gray-800 dark:text-white text-xl font-bold ml-2'>
              {APP_NAME}
            </Link>
          </div>
          {user && (
            <Dropdown
              trigger={
                <button className='flex items-center space-x-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none'>
                  <img className='h-8 w-8 rounded-full' src={user.image || ''} alt={user.name || 'User'} />
                  <span>{user.name}</span>
                </button>
              }
            >
              <Link
                href='/profile'
                className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                role='menuitem'
              >
                Profile
              </Link>
              <Link
                href='/settings'
                className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                role='menuitem'
              >
                Settings
              </Link>
              <form action={handleSignOut}>
                <button
                  type='submit'
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                  role='menuitem'
                >
                  Sign out
                </button>
              </form>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}
