import { withClientAuth } from './with-client-auth';
import { withServerAuth } from './with-server-auth';

// Define an interface for the props passed to the wrapped component
interface WithAuthProps {
  // Add any specific props might require here
  // (e.g., initialData: any)
}

export const withAuth = <P extends WithAuthProps>(Component: React.ComponentType<P>) => {
  if (typeof window === 'undefined') {
    // Server-side
    return withServerAuth(Component);
  } else {
    // Client-side
    return withClientAuth(Component);
  }
};
