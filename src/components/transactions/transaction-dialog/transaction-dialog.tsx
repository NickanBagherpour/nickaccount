'use client';

import React, { useState, useEffect } from 'react';

import { Modal, Input, Button, Select } from '@/ui-kit';

import { mockCategories } from '@/mocks/categories.mock';
import { useAddTransaction } from '@/_api/transactions';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export default function TransactionDialog({ isOpen, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  const { mutate: submit, isPending: isLoading } = useAddTransaction({
    onSuccess: () => {
      resetForm();
      onSubmit();
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setAmount('');
    setCategoryId('');
    setDescription('');
  };

  const categoryOptions = mockCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({
      amount: parseFloat(amount),
      categoryId,
      description,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Add Transaction' closeOnOverlayClick={false}>
      <div className='space-y-4'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            label='Amount'
            type='number'
            id='amount'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            disabled={isLoading}
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
            disabled={isLoading}
            // loading={isLoading}
          />
          <Input
            label='Description'
            type='text'
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            disabled={isLoading}
          />
          <Button type='submit' fullWidth loading={isLoading}>
            Add Transaction
          </Button>
        </form>
      </div>
    </Modal>
  );
}
