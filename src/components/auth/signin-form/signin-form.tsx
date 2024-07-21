import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { FaGithub } from 'react-icons/fa';

import { Input, Button } from '@/ui-kit';
import { signInAction, signInWithCredsAction } from '@/actions/auth.action';
import { useFormAction } from '@/hooks';
import { ROUTES } from '@/constants';

export const SignInForm: React.FC = () => {
  const { state, formAction, pending } = useFormAction(signInWithCredsAction);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(ROUTES.HOME); // Redirect after successful sign-in
      router.refresh();
    }
  }, [state.success]);

  const handleGithubSignIn = async () => {
    await signInAction('github');
  };

  return (
    <div className='space-y-6'>
      {state.error && <div className='text-red-500 text-sm'>{state.error}</div>}
      {state.success && <div className='text-green-500 text-sm'>User logged in successfully!</div>}

      <Button onClick={handleGithubSignIn} fullWidth variant='outlined' color='secondary' icon={<FaGithub />}>
        Sign in with GitHub
      </Button>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-700'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-gray-900 dark:text-gray-400 text-gray-100'>Or continue with</span>
        </div>
      </div>

      <form action={formAction} className='space-y-6'>
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
        <Button type='submit' fullWidth loading={pending}>
          Sign in
        </Button>
      </form>
    </div>
  );
};
