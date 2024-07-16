import React from 'react';
import { useFormStatus } from 'react-dom';

import { Input,Button } from '@/ui-kit';
import { signUpWithCreds } from '@/actions/auth.action';

export const SignUpForm: React.FC = () => {

  const { pending } = useFormStatus();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signUpWithCreds(formData);
    if (result.error) {
      // Handle error (e.g., show error message)
    } else {
      // Handle successful sign-up (e.g., show success message, redirect)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
