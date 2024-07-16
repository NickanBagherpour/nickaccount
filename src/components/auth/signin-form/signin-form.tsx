import React from 'react';
import { FaGithub } from 'react-icons/fa';

import { Input, Button } from '@/ui-kit';
import { signInAction, signInWithCreds } from '@/actions/auth.action';

export const SignInForm: React.FC = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signInWithCreds(formData);
    if (result.error) {
      // Handle error (e.g., show error message)
    } else {
      // Handle successful sign-in (e.g., redirect to dashboard)
    }
  };

  const handleGithubSignIn = () => {
    signInAction('github');
  };

  return (
    <div className='space-y-6'>
      <Button onClick={handleGithubSignIn} fullWidth variant='outlined' color='secondary' icon={<FaGithub />}>
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
        <Input label='Email address' type='email' id='email' name='email' autoComplete='email' required fullWidth />
        <Input
          label='Password'
          type='password'
          id='password'
          name='password'
          autoComplete='current-password'
          required
          fullWidth
        />
        <Button type='submit' fullWidth>
          Sign in
        </Button>
      </form>
    </div>
  );
};
