'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Button } from '@/ui-kit';
import { TransactionWithCategory } from '@/types/transaction.type';

import TransactionDialog from './transaction-dialog';

type Props = {
  onTransactionAdded: () => void;
};

export default function TransactionDialogWrapper({ onTransactionAdded }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleTransactionAdded = (data: TransactionWithCategory) => {
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['balance'] });
    onTransactionAdded();
  };

  return (
    <>
      <Box className={'my-4 flex justify-end'}>
        <Button onClick={() => setIsDialogOpen(true)}>Add Transaction</Button>
      </Box>

      {isDialogOpen && (
        <TransactionDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleTransactionAdded}
        />
      )}
    </>
  );
}
