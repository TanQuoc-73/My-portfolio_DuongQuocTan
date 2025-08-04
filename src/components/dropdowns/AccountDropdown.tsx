'use client';

import React, { useRef, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import SupabaseAuth from '../SupabaseAuth';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

interface AccountDropdownProps {
  user: User | null;
  signOut: () => Promise<void>;
  onClose: () => void;
}

export default function AccountDropdown({ user, signOut, onClose }: AccountDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 bg-white border border-[#996633] rounded-2xl shadow-2xl p-8 w-80 z-50 flex flex-col gap-6 min-h-[180px] animate-fade-in"
      style={{
        color: '#322410',
        fontFamily: 'inherit',
      }}
      role="dialog"
      aria-label="Account dropdown"
    >
      {user ? (
        <>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#996633] w-12 h-12 flex items-center justify-center text-2xl text-white shadow-md">
              {user.email?.charAt(0).toUpperCase() ?? <FaUserCircle />}
            </div>
            <div className="flex flex-col max-w-[150px]">
              <span className="font-semibold text-base truncate" title={user.email ?? ''}>
                {user.email}
              </span>
              <span className="text-xs text-[#996633] font-medium mt-1">Đang đăng nhập</span>
            </div>
          </div>
          <button
            onClick={async () => {
              await signOut();
              onClose();
            }}
            className="mt-2 flex items-center justify-center gap-2 border-2 border-[#996633] rounded-xl px-4 py-2 text-[#996633] font-semibold bg-white hover:bg-[#996633] hover:text-white transition-all duration-200 shadow-sm"
          >
            <FaSignOutAlt className="text-lg" />
            Đăng xuất
          </button>
        </>
      ) : (
        <div>
          <div className="text-center text-sm text-[#996633] font-medium mb-4">
            Bạn chưa đăng nhập
          </div>
          <SupabaseAuth />
        </div>
      )}
    </div>
  );
}
