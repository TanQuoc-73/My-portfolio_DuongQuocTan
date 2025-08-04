'use client';

import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // disable scroll khi modal mở
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop nền mờ đen, click ra ngoài đóng modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Nội dung modal chính giữa màn hình */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6 relative shadow-lg"
          onClick={(e) => e.stopPropagation()} // tránh click lan ra ngoài đóng modal
        >
          {/* Nút đóng modal góc trên phải */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
          {/* Nội dung modal */}
          {children}
        </div>
      </div>
    </>
  );
}
