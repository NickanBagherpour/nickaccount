import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Button } from '../button/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  align?: 'left' | 'center' | 'right';
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, align = 'left' }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1) ||
      totalPages <= maxVisiblePages
    ) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...');
    }
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex items-center space-x-2 ${alignmentClasses[align]}`}>
      <Button
        size='small'
        color='secondary'
        shape='circle'
        icon={<FaChevronLeft />}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((number, index) => (
        <Button
          key={index}
          className='min-w-8 min-h-8'
          size='small'
          color={number === currentPage ? 'primary' : 'secondary'}
          variant={number === currentPage ? 'contained' : 'outlined'}
          onClick={() => typeof number === 'number' && onPageChange(number)}
          disabled={typeof number !== 'number'}
        >
          {number}
        </Button>
      ))}
      <Button
        size='small'
        color='secondary'
        shape='circle'
        icon={<FaChevronRight />}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
