import React from 'react';
import { FaGithub } from 'react-icons/fa';

import { Input, Button } from '@/ui-kit';

export const SignInForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleGithubSignIn = () => {
    // Implement GitHub sign-in logic here
    console.log('Sign in with GitHub');
  };

  return (
    <div className='space-y-6'>
      <Button
        onClick={handleGithubSignIn}
        fullWidth
        variant="outlined"
        color="secondary"
        icon={<FaGithub />}
      >
        Sign in with GitHub
      </Button>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-700'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-gray-900 text-gray-400'>Or continue with</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Input label='Email address' type='email' id='email' name='email' autoComplete='email' required fullWidth 
        error='Please enter your email address.' />
        <Input
          label='Password'
          type='password'
          id='password'
          name='password'
          autoComplete='current-password'
          required
          fullWidth
          helperText='Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        />
        <Button type='submit' fullWidth>
          Sign in
        </Button>
      </form>
    </div>
  );
};
