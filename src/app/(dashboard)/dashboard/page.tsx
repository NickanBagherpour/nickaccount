import React from 'react';

import { mockDashboardData } from '@/mocks';

export default function DashboardPage() {
  const { totalUsers, totalRevenue, growthRate } = mockDashboardData;

  return (
    <div>
      <h1 className='text-3xl font-semibold text-gray-800 dark:text-white'>Dashboard</h1>
      <div className='mt-4'>
        <div className='flex flex-wrap -mx-6'>
          <div className='w-full px-6 sm:w-1/2 xl:w-1/3'>
            <div className='flex items-center px-5 py-6 bg-white dark:bg-gray-800 rounded-md shadow-sm'>
              <div className='p-3 bg-indigo-600 bg-opacity-75 rounded-full'>{/* You can add an icon here */}</div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                  {totalUsers.toLocaleString()}
                </h4>
                <div className='text-gray-500 dark:text-gray-400'>Total Users</div>
              </div>
            </div>
          </div>
          <div className='w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
            <div className='flex items-center px-5 py-6 bg-white dark:bg-gray-800 rounded-md shadow-sm'>
              <div className='p-3 bg-green-600 bg-opacity-75 rounded-full'>{/* You can add an icon here */}</div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                  ${totalRevenue.toLocaleString()}
                </h4>
                <div className='text-gray-500 dark:text-gray-400'>Total Revenue</div>
              </div>
            </div>
          </div>
          <div className='w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0'>
            <div className='flex items-center px-5 py-6 bg-white dark:bg-gray-800 rounded-md shadow-sm'>
              <div className='p-3 bg-pink-600 bg-opacity-75 rounded-full'>{/* You can add an icon here */}</div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>{growthRate}%</h4>
                <div className='text-gray-500 dark:text-gray-400'>Growth Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* You can add more dashboard content here */}
    </div>
  );
}
