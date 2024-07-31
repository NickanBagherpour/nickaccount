'use client';

import React from 'react';

import { Transaction, TransactionWithCategory } from '@/types/transaction.type';
import { Table } from '@/ui-kit';

type Props = {
  data?: TransactionWithCategory[];
};

export default function TransactionTable({ data }: Props) {
  const columns = [
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      align: 'left',
    },
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
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
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
      loading={false}
    />
  );
}
