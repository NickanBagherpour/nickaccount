'use client';

import React from 'react';

import { Box, Button } from '@/ui-kit';
import TransactionTable from '@/components/transactions/transaction-table';
import TransactionDialogWrapper from '@/components/transactions/transaction-dialog/transaction-dialog-wrapper';
import { useTransactions, useBalance } from '@/_api';

export default function TransactionsPage() {
  const { data: transactions, error: transactionsError, isLoading: transactionsLoading } = useTransactions();
  const { data: balanceData, error: balanceError, isLoading: balanceLoading } = useBalance();


  const loading = transactionsLoading || balanceLoading;
  const error = transactionsError || balanceError;
  const balance = balanceData?.balance || 0;


 if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;


  return (
    <Box>
    <h1 className='text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0'>Transactions</h1>

    <Box className='my-4 flex justify-between items-center'>
      <div className='text-lg font-semibold'>
        Total Balance: ${balance.toFixed(2)}
      </div>
      <TransactionDialogWrapper onTransactionAdded={() => {
        // Invalidate queries to refresh data
        // queryClient.invalidateQueries({ queryKey: ['transactions'] });
        // queryClient.invalidateQueries({ queryKey: ['balance'] });
      }} />
    </Box>

    <TransactionTable data={transactions} loading={loading} />
  </Box>
  );
}
