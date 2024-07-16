'use client';

import Link from 'next/link';

import { APP_NAME } from '@/constants/config';
import { Button } from '@/ui-kit';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  function handleSignIn() {
    throw new Error('Function not implemented.');
  }

  function handleSignUp() {
    throw new Error('Function not implemented.');
  }

  return (
    <header className='bg-white dark:bg-gray-800 shadow'>
      <nav className='container mx-auto px-6 py-3'>
        <div className='flex justify-between items-center'>
          <Link href={ROUTES.HOME} className='text-xl font-bold'>
            {APP_NAME}
          </Link>

          <div>
            <Button variant='contained' color='primary' className='mr-2' onClick={handleSignIn} loading={false}>
              Sign In
            </Button>

            <Button variant='contained' color='success' onClick={handleSignUp} loading={false}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
