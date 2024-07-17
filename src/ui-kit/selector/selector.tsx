'use client';

import React, { useState, useRef, useEffect } from 'react';

import { FiChevronDown } from 'react-icons/fi';

import { classNames } from '@/utils/class-names';

import { SelectorProps } from './selector.types';
import { selectorStyles } from './selector.styles';

export const Selector: React.FC<SelectorProps> = ({
  options,
  value,
  onChange,
  icon,
  placeholder,
  className,
  disabled = false,
  size = 'medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value) || { value: '', label: placeholder || '' };

  return (
    <div ref={containerRef} className={classNames(selectorStyles.container, className)}>
      <div
        className={classNames(
          selectorStyles.select,
          selectorStyles.size[size],
          selectorStyles.padding[size],
          disabled && selectorStyles.disabled,
          'cursor-pointer'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {icon && (
          <span className={classNames(selectorStyles.icon, selectorStyles.iconSize[size])}>
            {icon}
          </span>
        )}
        <span className={selectorStyles.label}>{selectedOption.label}</span>
        <FiChevronDown className={classNames(selectorStyles.arrow, selectorStyles.iconSize[size])} />
      </div>
      {isOpen && !disabled && (
        <div className={selectorStyles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames(
                selectorStyles.option.base,
                selectorStyles.option.size[size],
                option.value === value && 'bg-blue-100 dark:bg-blue-900'
              )}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
