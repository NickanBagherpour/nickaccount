import React from 'react';
import { useFormStatus } from 'react-dom';

import { Input,Button } from '@/ui-kit';
import { signUpWithCredsAction } from '@/actions/auth.action';

export const SignUpForm: React.FC = () => {

  const { pending } = useFormStatus();
  
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   console.log('event', event);

  //   const formData = new FormData(event.currentTarget);
  //   const result = await signUpWithCredsAction(formData);
  //   if (result.error) {
  //     // Handle error (e.g., show error message)
  //     alert(result?.error);
  //   } else {
  //     // Handle successful sign-up (e.g., show success message, redirect)
  //   }
  // };

  return (
    <form action={signUpWithCredsAction} className="space-y-6">
      <Input
        label="Full name"
        type="text"
        name="name"
        autoComplete="name"
        required
        fullWidth
      />
      <Input
        label="Email address"
        type="email"
        name="email"
        autoComplete="email"
        required
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        required
        fullWidth
      />
      <Button type="submit" fullWidth loading={pending}>
        Sign up
      </Button>
    </form>
  );
};
