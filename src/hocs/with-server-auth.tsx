import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { ROUTES } from '@/constants';

// Define an interface for the props passed to the wrapped component
interface WithServerAuthProps {
  // Add any specific props might require here
  // (e.g., initialData: any)
}

export const withServerAuth = <P extends WithServerAuthProps>(
  Component: React.ComponentType<P>
) => {
  return async (props: P) => {
    const session = await auth();

    if (!session?.user) {
      redirect(ROUTES.HOME); // Redirect to home if not same origin
    }

    return <Component {...props} />;
  };
};