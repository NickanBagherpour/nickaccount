import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Input, Button } from '@/ui-kit';
import { signUpWithCredsAction } from '@/actions/auth.action';
import { useFormAction } from '@/hooks';
import { ROUTES } from '@/constants';

export const SignUpForm: React.FC = () => {
  const { state, formAction, pending } = useFormAction(signUpWithCredsAction);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(ROUTES.HOME); // Redirect after successful sign-in
      router.refresh();
    }
  }, [state.success]);

  return (
    <form action={formAction} className='space-y-6'>
      {state.error && <div className='text-red-500 text-sm'>{state.error}</div>}
      {state.success && <div className='text-green-500 text-sm'>Account created successfully!</div>}
      <Input label='Full name' type='text' name='name' autoComplete='name' required fullWidth />
      <Input label='Email address' type='email' name='email' autoComplete='email' required fullWidth />
      <Input label='Password' type='password' name='password' autoComplete='new-password' required fullWidth />
      <Button type='submit' fullWidth loading={pending}>
        Sign up
      </Button>
    </form>
  );
};
