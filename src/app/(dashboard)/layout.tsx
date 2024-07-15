'use client';

import React, { useState } from 'react';

import AppBar from '@/components/dashboard/appbar';
import Sidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <AppBar toggleSidebar={toggleSidebar} />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900'>
          <div className='container mx-auto px-6 py-8'>{children}</div>
        </main>
      </div>
    </div>
  );
}
