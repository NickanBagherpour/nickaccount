import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { APP_NAME } from '@/constants/config';

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-800'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8 xl:col-span-1'>
            <Image src='/logo.svg' alt='NicAccount Logo' width={150} height={50} />
            <p className='text-gray-500 dark:text-gray-400 text-base'>
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className='flex space-x-6'>{/* Add social media icons here */}</div>
          </div>
          <div className='mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Solutions</h3>
                <ul className='mt-4 space-y-4'>
                  <li>
                    <Link
                      href='#'
                      className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    >
                      Marketing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    >
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    >
                      Commerce
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='mt-12 md:mt-0'>
                <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Support</h3>
                <ul className='mt-4 space-y-4'>
                  <li>
                    <Link
                      href='#'
                      className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    >
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-200 pt-8'>
          <p className='text-base text-gray-400 xl:text-center'>&copy; 2024 {APP_NAME}, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
