
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { classNames } from '@/utils/class-names';

import { ModalProps } from './modal.types';
import { modalStyles } from './modal.styles';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  fullscreen = false, // Add this line
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isMounted) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className={classNames(
        modalStyles.overlay,
        fullscreen ? 'items-start' : 'items-center', // Adjust alignment for fullscreen
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={classNames(
          modalStyles.container,
          fullscreen ? modalStyles.fullscreen : modalStyles.size[size],
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          'transition-all duration-300 ease-in-out',
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className={modalStyles.header}>
            {title && <h2 className={modalStyles.title}>{title}</h2>}
            {showCloseButton && (
              <button
                className={modalStyles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                &times;
              </button>
            )}
          </div>
        )}
        <div className={classNames(modalStyles.content, fullscreen && 'h-[calc(100vh-64px)] overflow-auto')}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
