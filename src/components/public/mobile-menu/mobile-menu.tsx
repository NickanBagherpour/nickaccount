'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';

import { Button, Selector } from '@/ui-kit';
import { NavItem } from '@/types/nav-item.type';

import AuthButton from '../auth-button/auth-button';
import ThemeSelector from '../theme-selector/theme-selector';
import { LOCALE } from '@/constants';

const languages = LOCALE.map(locale => ({
  value: locale.code,
  label: locale.name
}));

export default function MobileMenu({
  navItems,
  isAuthenticated,
}: {
  navItems: NavItem[];
  isAuthenticated: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  return (
    <div className='md:hidden'>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
      >
        <span className='sr-only'>Open main menu</span>
        {isMenuOpen ? <FiX className='h-6 w-6' /> : <FiMenu className='h-6 w-6' />}
      </Button>

      {isMenuOpen && (
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium'
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className='pt-4 pb-3 border-t border-gray-700'>
            <div className='relative mb-2'>
              <Selector
                size='small'
                options={languages}
                value={currentLang}
                onChange={setCurrentLang}
                icon={<FiGlobe />}
                placeholder='Select Language'
              />
            </div>
            <div className='relative mb-2'>
              <ThemeSelector />
            </div>
            <AuthButton isAuthenticated={isAuthenticated} />
          </div>
        </div>
      )}
    </div>
  );
}
