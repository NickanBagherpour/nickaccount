
import { useMutation, useQuery } from '@tanstack/react-query';

import { Transaction, TransactionWithCategory } from '@/types/transaction.type';
import { fetchApi } from '@/utils/api-client';
import { queryClient } from '@/lib';

export const getTransactions = async (): Promise<TransactionWithCategory[]> => {
  return fetchApi({ path: '/api/transactions' });
};


export const useTransactions = () => {
  return useQuery<TransactionWithCategory[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });
};

export const addTransaction = async (transaction: Omit<Transaction, 'id' >): Promise<TransactionWithCategory> => {
  return fetchApi({ 
    path: '/api/transactions/add', 
    method: 'POST', 
    body: JSON.stringify(transaction) 
  });
};

export const useAddTransaction1 = () => {

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
};


export const useAddTransaction = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: submit, isPending: isLoading } = useMutation({
    mutationFn: addTransaction,
    onSuccess: onSuccess,
  });

  return {
    submit,
    isLoading,
  };
};