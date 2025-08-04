import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { BiBadge } from 'react-icons/bi';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#fff9f0] border-t border-[#996633] text-[#322410] py-8 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-8 md:px-0 gap-8">
        {/* Logo & tên */}
        <div className="flex items-center gap-2 text-[#996633] font-extrabold text-lg md:text-xl">
          <BiBadge className="text-3xl" />
          <span>Portfolio Q.Tần</span>
        </div>

        {/* Quick Links */}
        <nav className="flex gap-6 flex-wrap text-[#996633] font-semibold">
          <Link href="/" className="hover:text-[#7a6348] transition">
            Home
          </Link>
          <Link href="/projects" className="hover:text-[#7a6348] transition">
            Projects
          </Link>
          <Link href="/about" className="hover:text-[#7a6348] transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#7a6348] transition">
            Contact
          </Link>
        </nav>

        {/* Social */}
        <div className="flex gap-6 text-[#996633] text-xl">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#7a6348]">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#7a6348]">
            <FaLinkedin />
          </a>
          <a href="mailto:your.email@example.com" aria-label="Email" className="hover:text-[#7a6348]">
            <FaEnvelope />
          </a>
          <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#7a6348]">
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-0 mt-8 border-t border-[#996633] pt-4 text-[#7a6348] text-sm text-center select-text">
        © {new Date().getFullYear()} Dương Quốc Tần. All rights reserved.
      </div>
    </footer>
  );
}
