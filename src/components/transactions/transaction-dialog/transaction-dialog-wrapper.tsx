'use client';

import { useState } from 'react';
import { Box, Button } from '@/ui-kit';
import TransactionDialog from './transaction-dialog';

type Props = {
  onTransactionAdded: () => void;
};

export default function TransactionDialogWrapper({ onTransactionAdded }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Box className={'my-4 flex justify-end'}>
        <Button onClick={() => setIsDialogOpen(true)}>Add Transaction</Button>
      </Box>

      <TransactionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(data) => {
          // You can add any client-side logic here if needed
          setIsDialogOpen(false);
          onTransactionAdded();
        }}
      />
    </>
  );
}
