import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {},
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      // show notif
      console.log('🚀 ~ react query error:', error);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});
