'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ROUTES } from '@/constants';

// Define an interface for the props passed to the wrapped component
interface WithClientAuthProps {
  // Add any specific props might require here
  // (e.g., initialData: any)
}

export const withClientAuth = <P extends WithClientAuthProps>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === 'unauthenticated') {
        const isSameOrigin = document.referrer.includes(window.location.origin);
        if (isSameOrigin) {
          router.push(document.referrer);
        } else {
          router.push(ROUTES.HOME);
        }
      }
    }, [status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>; // Or loading component
    }

    if (status === 'authenticated') {
      return <Component {...props} />;
    }

    return null;
  };
};
