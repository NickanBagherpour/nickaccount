'use server';

import React from 'react';

import DashboardScaffold from '@/components/dashboard/dashboard-scaffold';
import { withAuth } from '@/hocs/with-auth';
import { userProfileAction } from '@/actions/auth.action';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {

   const response = await userProfileAction();
   const user = response.data;

  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      <DashboardScaffold user={user}>
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900'>
          <div className='container mx-auto px-6 py-8'>{children}</div>
        </main>
      </DashboardScaffold>
    </div>
  );
};

export default withAuth(DashboardLayout);
