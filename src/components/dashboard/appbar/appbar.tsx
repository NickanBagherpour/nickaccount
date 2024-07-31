'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FaBars } from 'react-icons/fa';


import { Dropdown } from '@/ui-kit';
import { APP_NAME } from '@/constants/config';
import { ROUTES } from '@/constants/routes';
import { User } from '@/types/user.type';
import { Nullable } from '@/types/utility.type';
import { signOutAction } from '@/actions/auth.action';
import UserMenu from '../user-menu/user-menu';

type AppBarProps = {
  toggleSidebar: () => void;
  user: Nullable<User>;
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
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
