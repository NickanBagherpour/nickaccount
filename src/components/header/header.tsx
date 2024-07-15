'use client';

import { APP_NAME } from '@/constants/config';
import Link from 'next/link';

export default function Header() {

    function handleSignIn() {
        throw new Error('Function not implemented.');
    }

  return (
    <header className='bg-white dark:bg-gray-800 shadow'>
      <nav className='container mx-auto px-6 py-3'>
        <div className='flex justify-between items-center'>
          <Link href='/' className='text-xl font-bold'>
            {APP_NAME}
          </Link>
          <div>
            <button
              onClick={handleSignIn}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2'
            >
              Sign In
            </button>
            <Link href='/signup' className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
