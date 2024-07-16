'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Selector } from '@/ui-kit';
import { ROUTES } from '@/constants/routes';
import { APP_NAME } from '@/constants/config';
import { FiSun, FiMoon, FiCloud, FiMenu, FiX, FiGlobe } from 'react-icons/fi';

// Navigation items
const navItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, protected: true },
  { name: 'Marketing', href: ROUTES.MARKETING },
  { name: 'Contact Us', href: ROUTES.CONTACT },
];

// Language options
const languages = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'فارسی' },
];

// Theme options
const themes = [
  { value: 'light', label: 'Light', icon: FiSun },
  { value: 'dark', label: 'Dark', icon: FiMoon },
  { value: 'winter', label: 'Winter', icon: FiCloud },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [currentTheme, setCurrentTheme] = useState('light');
  const router = useRouter();
  const isAuthenticated = false; // Replace with your auth logic

  // Handle Sign In button click
  function handleSignIn() {
    router.push(ROUTES.AUTH);
  }

  // Get the current theme icon
  const ThemeIcon = themes.find((theme) => theme.value === currentTheme)?.icon || FiSun;

  return (
    <header className='bg-white dark:bg-gray-800 shadow'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo and Navigation Items */}
          <div className='flex items-center'>
            <Link href={ROUTES.HOME} className='text-xl font-bold text-gray-800 dark:text-white mr-8'>
              {APP_NAME}
            </Link>
            <div className='hidden md:flex items-center space-x-4'>
              {navItems.map(
                (item) =>
                  (!item.protected || isAuthenticated) && (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
                    >
                      {item.name}
                    </Link>
                  ),
              )}
            </div>
          </div>

          {/* Language Selector, Theme Selector, and Sign In Button */}
          <div className='hidden md:flex items-center space-x-4'>
            <Selector
              size='small'
              options={languages}
              value={currentLang}
              onChange={setCurrentLang}
              icon={<FiGlobe />}
              placeholder='Select Language'
            />
            <Selector
              size='small'
              options={themes}
              value={currentTheme}
              onChange={setCurrentTheme}
              icon={<ThemeIcon />}
              placeholder='Select Theme'
            />
            <Button variant='contained' color='primary' size='small' onClick={handleSignIn}>
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
            >
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? <FiX className='h-6 w-6' /> : <FiMenu className='h-6 w-6' />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navItems.map(
                (item) =>
                  (!item.protected || isAuthenticated) && (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ),
              )}
            </div>
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
                <Selector
                  size='small'
                  options={themes}
                  value={currentTheme}
                  onChange={setCurrentTheme}
                  icon={<ThemeIcon />}
                  placeholder='Select Theme'
                />
              </div>
              <Button variant='contained' color='primary' fullWidth size='small' onClick={handleSignIn}>
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
