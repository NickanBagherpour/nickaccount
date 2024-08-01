import { useQuery } from '@tanstack/react-query';

import { fetchApi } from '@/utils/api-client';

export const getBalance = async (): Promise<{ balance: number }> => {
  return fetchApi<{ balance: number }>({ path: '/api/balance' });
};

export const useBalance = () => {
  return useQuery<{ balance: number }, Error>({
    queryKey: ['balance'],
    queryFn: getBalance,
  });
};