'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Tab } from '@/ui-kit';
import { SignInForm, SignUpForm } from '@/components/auth';
// import { AuthMode } from './types';

enum AuthMode {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuthMode>(AuthMode.SIGNIN);

  useEffect(() => {
    const mode = searchParams.get('mode') as AuthMode;
    if (Object.values(AuthMode).includes(mode)) {
      setActiveTab(mode);
    } else {
      setActiveTab(AuthMode.SIGNIN);
    }
  }, [searchParams]);

  const handleTabChange = (key: AuthMode) => {
    setActiveTab(key);
    router.push(`/auth?mode=${key}`);
  };

  const tabItems = [
    {
      key: AuthMode.SIGNIN,
      label: 'Sign In',
      content: <SignInForm />,
    },
    {
      key: AuthMode.SIGNUP,
      label: 'Sign Up',
      content: <SignUpForm />,
    },
  ];

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 text-black dark:bg-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold'>
            {activeTab === AuthMode.SIGNIN ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <Tab items={tabItems} activeKey={activeTab} onChange={(key) => handleTabChange(key as AuthMode)} fullWidth />
      </div>
    </div>
  );
}
