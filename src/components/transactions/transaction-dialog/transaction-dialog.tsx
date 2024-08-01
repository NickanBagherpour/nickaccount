'use client';

import React, { useState, useEffect } from 'react';

import { Modal, Input, Button, Select } from '@/ui-kit';
import { TransactionWithCategory } from '@/types/transaction.type';
import { mockCategories } from '@/mocks/categories.mock';
import { useFormAction } from '@/hooks';
import { addTransactionAction } from '@/actions/transaction.action';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: TransactionWithCategory) => void;
};

export default function TransactionDialog({ isOpen, onClose, onSubmit }: Props) {
  const { state, formAction, pending } = useFormAction(addTransactionAction);
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (state.success && state.data) {
      console.log("Transaction added:", state.data);
      onSubmit(state.data);
      onClose();
      // Reset form fields
      setAmount('');
      setCategoryId('');
      setDescription('');
    }
  }, [state.success, state.data, onSubmit, onClose]);

  const categoryOptions = mockCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Add Transaction' closeOnOverlayClick={false}>
      <div className='space-y-4'>
        {state.error && <div className='text-red-500 text-sm'>{state.error}</div>}
        <form action={formAction} className='space-y-6'>
          <Input
            label='Amount'
            type='number'
            id='amount'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            disabled={pending}
            error={state.error && state.error.includes('amount') ? state.error : undefined}
          />
          <Select
            label='Category'
            id='categoryId'
            name='categoryId'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categoryOptions}
            required
            fullWidth
            disabled={pending}
            loading={pending}
            error={state.error && state.error.includes('category') ? state.error : undefined}
          />
          <Input
            label='Description'
            type='text'
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            disabled={pending}
          />
          <Button type='submit' fullWidth loading={pending}>
            Add Transaction
          </Button>
        </form>
      </div>
    </Modal>
  );
}
