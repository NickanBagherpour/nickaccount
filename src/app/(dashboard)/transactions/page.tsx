 "use client"

import React, { useEffect, useState } from 'react';

import { Box, Button } from '@/ui-kit';
import { mockTransactions } from '@/mocks/transactions.mock';
import TransactionTable from '@/components/transactions/transaction-table';
import TransactionDialogWrapper from '@/components/transactions/transaction-dialog/transaction-dialog-wrapper';
import { TransactionWithCategory } from '@/types/transaction.type';
import { fetchApi } from '@/utils/api-client';

export default function TransactionsPage() {
  // const transactions = mockTransactions;

  const [transactions, setTransactions] = useState<TransactionWithCategory[]>([]);

  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
    
  useEffect(() => {
    refreshData();
  }, []);

  
  const fetchTransactions = async () => {
    try {
      const data = await fetchApi({ path: '/api/transactions' });
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const data = await fetchApi<{ balance: number }>({ path: '/api/balance' });
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchTransactions(), fetchBalance()]);
    setLoading(false);
  };
  

  return (
    <Box>

      <h1 className='text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0'>Transactions</h1>


      <Box className='my-4 flex justify-between items-center'>
        <div className='text-lg font-semibold'>
          Total Balance: ${balance.toFixed(2)}
        </div>
        <TransactionDialogWrapper onTransactionAdded={refreshData} />
      </Box>


      <TransactionTable data={transactions} loading={loading} />

    </Box>
  );
}
