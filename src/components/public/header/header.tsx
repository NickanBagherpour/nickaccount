import Link from 'next/link';
import { FiGlobe } from 'react-icons/fi';

import { auth } from '@/auth';
import { ROUTES } from '@/constants/routes';
import { APP_NAME } from '@/constants/config';
import { Button, Selector } from '@/ui-kit';

import AuthButton from '../auth-button';
import ThemeSelector from '../theme-selector';
import MobileMenu from '../mobile-menu';

const navItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, protected: true },
  { name: 'Marketing', href: ROUTES.MARKETING },
  { name: 'Contact Us', href: ROUTES.CONTACT },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'فارسی' },
];

const Header: React.FC = async () => {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <header className='bg-white dark:bg-gray-800 shadow'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
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

          <div className='hidden md:flex items-center space-x-4'>
            <Selector
              size='small'
              options={languages}
              value='en'
              // onChange={() => {}}
              icon={<FiGlobe />}
              placeholder='Select Language'
            />
            <ThemeSelector />
            <AuthButton isAuthenticated={isAuthenticated} />
          </div>

          <MobileMenu
            navItems={navItems.filter((item) => !item.protected || isAuthenticated)}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;