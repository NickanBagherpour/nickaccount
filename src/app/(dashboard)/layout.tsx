'use server';

import React from 'react';

import DashboardScaffold from '@/components/dashboard/dashboard-scaffold';
import { withAuth } from '@/hocs/with-auth';
import { userProfileAction } from '@/actions/auth.action';
import { Card } from '@/ui-kit';

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
          <div className='mx-auto px-8 py-8'>
            <Card className='container min-h-[30rem] w-full flex flex-col'>{children}</Card>
          </div>
        </main>
      </DashboardScaffold>
    </div>
  );
};

export default withAuth(DashboardLayout);
