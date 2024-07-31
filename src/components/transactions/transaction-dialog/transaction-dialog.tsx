'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Modal, Input, Button, Select } from '@/ui-kit';
import { TransactionWithCategory } from '@/types/transaction.type';
import { mockCategories } from '@/mocks/categories.mock';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<TransactionWithCategory, 'id' | 'userId'>) => void;
};

export default function TransactionDialog({ isOpen, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  

  const categoryOptions = mockCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSubmit = () => {
    const selectedCategory = categoryOptions.find((cat) => cat.value === categoryId);
    onSubmit({
      amount,
      categoryId,
      category: selectedCategory ? selectedCategory.label : '',
      description,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Add Transaction' closeOnOverlayClick={false}>
      <div className='space-y-4'>
        <Input label='Amount' type='number' value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <Select
          label='Category'
          value={categoryId}
          onChange={(value) => setCategoryId(value)}
          options={categoryOptions}
        />
        <Input label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
}
