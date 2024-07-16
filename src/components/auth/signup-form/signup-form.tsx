import React from 'react';

import { Input,Button } from '@/ui-kit';

export const SignUpForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full name"
        type="text"
        id="name"
        name="name"
        autoComplete="name"
        required
        fullWidth
      />
      <Input
        label="Email address"
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        required
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        id="password"
        name="password"
        autoComplete="new-password"
        required
        fullWidth
      />
      <Button type="submit" fullWidth>
        Sign up
      </Button>
    </form>
  );
};
