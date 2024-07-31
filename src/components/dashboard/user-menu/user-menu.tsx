'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Dropdown } from '@/ui-kit';
import { User } from '@/types/user.type';
import { ROUTES } from '@/constants/routes';
import { signOutAction } from '@/actions/auth.action';

type UserMenuProps = {
  user: User;
};

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOutAction();

    if (result.success) {
      router.replace(ROUTES.HOME);
    }
  };

  return (
    <Dropdown
      trigger={
        <button className='flex items-center space-x-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none'>
          <img className='h-8 w-8 rounded-full' src={user.image || ''} alt={user.name || 'User'} />
          <span>{user.name}</span>
        </button>
      }
      className="z-50" // Add a high z-index to ensure it appears above other elements
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
  );
}
