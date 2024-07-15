import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Our App</h1>
      <p className='mb-4'>This is the public home page of our application.</p>
      <div className='space-x-4'>
        <Link href='/signin' className='text-blue-500 hover:underline'>
          Sign In
        </Link>
        <Link href='/signup' className='text-blue-500 hover:underline'>
          Sign Up
        </Link>
        <Link href='/dashboard' className='text-blue-500 hover:underline'>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
