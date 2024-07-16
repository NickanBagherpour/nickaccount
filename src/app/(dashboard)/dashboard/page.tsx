'use client';

import React, { useState } from 'react';

import { mockDashboardData } from '@/mocks';
import { Button, Card, Box, Input, Modal } from '@/ui-kit';

export default function DashboardPage() {
  const { totalUsers, totalRevenue, growthRate } = mockDashboardData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <Box padding='lg'>
      <Box margin={{ bottom: 'lg' }}>
        <h1 className='text-3xl font-semibold text-gray-800 dark:text-white'>Dashboard</h1>
      </Box>

      <Box margin={{ bottom: 'xl' }}>
        <Box display='flex' className='flex-wrap -mx-4'>
          <Box width='full' className='px-4 sm:w-1/2 xl:w-1/3' margin={{ bottom: 'md' }}>
            <Card padding='lg' hoverable className='flex items-center'>
              <Box padding='sm' className='bg-indigo-600 bg-opacity-75 rounded-full'>
                {/* You can add an icon here */}
              </Box>
              <Box margin={{ left: 'md' }}>
                <h4 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                  {totalUsers.toLocaleString()}
                </h4>
                <div className='text-gray-500 dark:text-gray-400'>Total Users</div>
              </Box>
            </Card>
          </Box>
          <Box width='full' className='px-4 sm:w-1/2 xl:w-1/3' margin={{ bottom: 'md' }}>
            <Card padding='lg' hoverable className='flex items-center'>
              <Box padding='sm' className='bg-green-600 bg-opacity-75 rounded-full'>
                {/* You can add an icon here */}
              </Box>
              <Box margin={{ left: 'md' }}>
                <h4 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                  ${totalRevenue.toLocaleString()}
                </h4>
                <div className='text-gray-500 dark:text-gray-400'>Total Revenue</div>
              </Box>
            </Card>
          </Box>
          <Box width='full' className='px-4 sm:w-1/2 xl:w-1/3' margin={{ bottom: 'md' }}>
            <Card padding='lg' hoverable className='flex items-center'>
              <Box padding='sm' className='bg-pink-600 bg-opacity-75 rounded-full'>
                {/* You can add an icon here */}
              </Box>
              <Box margin={{ left: 'md' }}>
                <h4 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>{growthRate}%</h4>
                <div className='text-gray-500 dark:text-gray-400'>Growth Rate</div>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>

      <Box margin={{ bottom: 'xl' }}>
        <Card >
          <Box display='flex' flexDirection='column' justifyContent='between' alignItems='center'>
            <h2 className='text-xl font-semibold'>User Information</h2>

            <form>
              <Input
                label='Username'
                placeholder='Enter your username'
                helperText='Username must be at least 3 characters long'
                size='medium'
                variant='outlined'
                fullWidth
              />
              <Input
                label='Password'
                type='password'
                placeholder='Enter your password'
                error='Password is required'
                size='medium'
                variant='filled'
                fullWidth
                // startAdornment={<LockIcon />}
              />
              <Button variant='contained' color='primary' size='small' onClick={() => setIsModalOpen(true)}>
                Update Profile
              </Button>
            </form>
          </Box>
        </Card>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        closeOnOverlayClick={true}
      >
        <p>This is the content of the modal.</p>
        <Button size='small' variant='tuna'>Submit</Button>
      </Modal>
      
      {/* Add more dashboard content here */}
    </Box>
  );
}
