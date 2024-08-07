'use client';

import React from 'react';

import { Transaction, TransactionWithCategory } from '@/types/transaction.type';
import { Table } from '@/ui-kit';

type Props = {
  data?: TransactionWithCategory[];
  loading: boolean;
};

export default function TransactionTable({ data, loading }: Props) {
  
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const mobileColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      mobileColumns={mobileColumns}
      pagination={{ pageSize: 10 }}
      bordered
      sortable
      fullScreen
      loading={loading}
    />
  );
}
