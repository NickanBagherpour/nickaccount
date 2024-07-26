'use client';

import React, { useState } from 'react';

import { Nullable } from '@/types/utility.type';
import Sidebar from '@/components/dashboard/sidebar';
import AppBar from '@/components/dashboard/appbar';
import { User } from '@/types/user.type';

interface DashboardScaffoldProps {
  children: React.ReactNode;
  user: Nullable<User>;
}

export default function DashboardScaffold({ children, user }: DashboardScaffoldProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className='flex flex-col flex-1 overflow-hidden'>

        <AppBar toggleSidebar={toggleSidebar} user={user} />

        {children}
      </div>
    </>
  );
}