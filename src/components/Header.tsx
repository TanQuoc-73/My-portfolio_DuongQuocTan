'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { FaHome, FaFolderOpen, FaUserCircle } from 'react-icons/fa';
import { BiBadge } from 'react-icons/bi';

import AboutMe from '@/components/dropdowns/AboutMe';
import { useAuth } from '@/context/AuthContext';
import AccountDropdown from '@/components/dropdowns/AccountDropdown';

export default function Header() {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ngoài và khi nhấn Esc
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setShowDropdown(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <>
      <div className="absolute top-0 w-full h-[90px] bg-[#996633] flex justify-between items-center px-10 z-40">
        {/* Left */}
        <div className="LOGO flex items-center justify-center h-full">
          <Link href="/" className="text-white text-2xl flex items-center gap-2">
            <BiBadge className="inline-block text-4xl" /> Portfolio
          </Link>
        </div>
        {/* Right */}
        <div className="flex items-center justify-center h-full">
          {/* Navbar */}
          <div className="flex items-center justify-center h-full mr-10">
            <ul className="flex items-center justify-center gap-10 text-white h-full">
              <Link
                href="/"
                className="hover:text-gray-300 transition-colors flex items-center gap-2"
              >
                <FaHome />
                Home
              </Link>
              <AboutMe />
              <Link
                href="/projects"
                className="hover:text-gray-300 transition-colors flex items-center gap-2"
              >
                <FaFolderOpen />
                Projects
              </Link>
            </ul>
          </div>
          {/* Account button + dropdown */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center h-full cursor-pointer"
          >
            <FaUserCircle
              onClick={toggleDropdown}
              className="text-2xl text-white hover:text-gray-300 transition-colors"
              title={user ? `Xin chào, ${user.email}` : 'Đăng nhập'}
            />
            {showDropdown && (
              <AccountDropdown user={user} signOut={signOut} onClose={() => setShowDropdown(false)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
