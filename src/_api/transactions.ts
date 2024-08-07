import { useMutation, useQuery, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { Transaction, TransactionWithCategory } from '@/types/transaction.type';
import { fetchApi } from '@/utils/api-client';
import { queryClient } from '@/lib';

type GetTransactionsResponse = TransactionWithCategory[];
type AddTransactionRequest = Omit<Transaction, 'id'>;
type AddTransactionResponse = TransactionWithCategory;

interface AddTransactionOptions {
  onSuccess?: () => void;
}

export const getTransactions = async (): Promise<TransactionWithCategory[]> => {
  return fetchApi({ path: '/api/transactions' });
};

export const useTransactions = (): UseQueryResult<GetTransactionsResponse, Error> => {
  return useQuery<GetTransactionsResponse, Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<TransactionWithCategory> => {
  return fetchApi({
    path: '/api/transactions/add',
    method: 'POST',
    body: JSON.stringify(transaction),
  });
};

export const useAddTransaction = (
  options?: AddTransactionOptions,
): UseMutationResult<AddTransactionResponse, Error, AddTransactionRequest> => {
  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });

      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};

export const useAddTransaction1 = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: submit, isPending: isLoading } = useMutation({
    mutationFn: addTransaction,
    onSuccess: onSuccess,
  });

  return {
    submit,
    isLoading,
  };
};
