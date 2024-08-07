import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchApi } from '@/utils/api-client';

interface BalanceResponse {
  balance: number;
}

type BalanceError = Error;

export const getBalance = async (): Promise<BalanceResponse> => {
  return fetchApi<BalanceResponse>({ path: '/api/balance' });
};

export const useBalance = (): UseQueryResult<BalanceResponse, BalanceError> => {
  return useQuery<BalanceResponse, BalanceError>({
    queryKey: ['balance'],
    queryFn: getBalance,
  });
};
