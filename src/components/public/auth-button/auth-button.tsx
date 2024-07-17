'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/ui-kit';
import { ROUTES } from '@/constants/routes';

export default function AuthButton({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push(ROUTES.AUTH);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.HOME);
    router.refresh();
  };

  return isAuthenticated ? (
    <Button variant='contained' color='danger' size='small' onClick={handleSignOut}>
      Sign Out
    </Button>
  ) : (
    <Button variant='contained' color='success' size='small' onClick={handleSignIn}>
      Sign In
    </Button>
  );
}
