// table.types.ts

import { ReactNode } from 'react';

export interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any, record: Record<string, any>) => ReactNode;
  width?: string | number;
}

export interface TableProps {
  dataSource?: Record<string, any>[];
  columns: ColumnType[];
  loading?: boolean;
  pagination?: boolean | { pageSize: number };
  bordered?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onRowClick?: (record: Record<string, any>) => void;
  sortable?: boolean;
  filterable?: boolean;
  mobileColumns?: ColumnType[];
  fullScreen?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}
