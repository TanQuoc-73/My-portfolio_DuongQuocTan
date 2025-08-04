import { useState, useRef } from "react";
import { BiUser } from "react-icons/bi";
import Link from "next/link";

export default function AboutMe() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      timeoutRef.current = null;
    }, 100); 
  }

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-black/10 transition"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <BiUser className="text-xl" />
        <span>About</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 9l6 6 6-6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
        className="absolute z-10 mt-2 w-40 h-40 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col justify-start gap-2"
        role="menu">
            <Link href="/my-portfolio"
                className="block px-3 py-2 rounded hover:bg-[#996633]/90 hover:text-white transition text-black/60 text-sm font-medium"
                role="menuitem">
                My Portfolio
            </Link>
            <Link href="/contact"
                className="block px-3 py-2 rounded hover:bg-[#996633]/90 hover:text-white transition text-black/60 text-sm font-medium"
                role="menuitem">
                Contact
            </Link>
            <Link href="/resume"
                className="block px-3 py-2 rounded hover:bg-[#996633]/90 hover:text-white transition text-black/60 text-sm font-medium"
                role="menuitem">
                Download CV
            </Link>
        </div>
      )}
    </div>
  );
}
