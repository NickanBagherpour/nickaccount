'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { classNames } from '@/utils/class-names';

import { TableProps, ColumnType, ColumnAlign } from './table.types';
import * as S from './table.styles';
import { Pagination } from '../pagination/pagination';

export const Table: React.FC<TableProps> = ({
  dataSource = [],
  columns,
  loading = false,
  pagination = false,
  bordered = false,
  size = 'medium',
  className = '',
  onRowClick,
  sortable = false,
  filterable = false,
  mobileColumns,
  fullScreen = false,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageSize = typeof pagination === 'object' ? pagination.pageSize : 10;
  const totalPages = Math.ceil(dataSource.length / pageSize);

  const paginatedData = pagination
    ? dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : dataSource;

  const sortedData =
    sortable && sortColumn
      ? [...paginatedData].sort((a, b) => {
          if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
          if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        })
      : paginatedData;

  const handleSort = (column: string) => {
    if (sortable) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChange && onPageChange(newPage, pageSize);
  };

  const tableClasses = classNames(
    S.tableBaseStyles,
    S.tableSizeStyles[size],
    bordered && S.tableBorderedStyles,
    className,
  );

  const renderCell = (column: ColumnType, record: Record<string, any>): ReactNode => {
    if (column.render) {
      return column.render(record[column.dataIndex], record);
    }
    return record[column.dataIndex] as ReactNode;
  };

  const currentColumns = isMobile && mobileColumns ? mobileColumns : columns;

  const getColumnAlignment = (column: ColumnType): ColumnAlign => {
    return 'align' in column ? column.align : 'left';
  };
  

  return (
    <div className={classNames(fullScreen ? S.tableFullScreenStyles : '', 'relative')}>
      {loading && (
        <div className={S.tableLoadingOverlayStyles}>
          <AiOutlineLoading3Quarters className='animate-spin text-4xl text-blue-500' />
        </div>
      )}
      <div className={classNames('overflow-x-auto', loading && 'opacity-50')}>
        <table className={tableClasses}>
          <thead className={S.tableHeaderStyles}>
            <tr>
              {currentColumns.map((column) => (
                <th
                  key={column?.key ?? column.dataIndex}
                  className={classNames(S.tableCellStyles, `text-${getColumnAlignment(column)}`)}
                  onClick={() => handleSort(column.dataIndex)}
                  style={{ cursor: sortable ? 'pointer' : 'default', width: column.width }}
                >
                  {column.title}
                  {sortable && sortColumn === column.dataIndex && (
                    <span className='inline-block ml-2'>{sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((record) => (
                <tr
                  key={record.id}
                  className={S.tableRowStyles}
                  onClick={() => onRowClick && onRowClick(record)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {currentColumns.map((column) => (
                    <td
                      key={column.key}
                      className={classNames(S.tableCellStyles, `text-${getColumnAlignment(column)}`)}
                    >
                      {renderCell(column, record)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={S.tableEmptyStateStyles}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className='mt-4'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} align='left' />
        </div>
      )}
    </div>
  );
};
