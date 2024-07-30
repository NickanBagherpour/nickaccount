'use client';

import React from 'react';

import { Box } from '@/ui-kit';
import { mockTransactions } from '@/mocks/transactions.mock';
import TransactionTable from '@/components/transactions/transaction-table';

export default function TransactionsPage() {
  const transactions = mockTransactions;

  return (
    <Box>
      <h1 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>Transactions</h1>

      <TransactionTable data={transactions} />

    </Box>
  );
}
