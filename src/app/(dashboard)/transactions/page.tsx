'use client';

import React, { useState } from 'react';

import { Box, Button } from '@/ui-kit';
import { mockTransactions } from '@/mocks/transactions.mock';
import TransactionTable from '@/components/transactions/transaction-table';
import { TransactionWithCategory } from '@/types/transaction.type';
import TransactionDialog from '@/components/transactions/transaction-dialog';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionWithCategory[]>(mockTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTransaction = (transaction: Omit<TransactionWithCategory, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: (transactions.length + 1).toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <Box>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className='text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0'>Transactions</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Transaction</Button>
      </div>

      <TransactionTable data={transactions} />

      <TransactionDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSubmit={handleAddTransaction} />
    </Box>
  );
}
