'use client';

import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

export default function MyPortfolio() {
  return (
    <div className="bg-white text-[#322410] min-h-screen mt-15 py-10 px-10 w-full mx-auto rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-[#996633] flex items-center gap-3">
        <FaFilePdf /> My CV
      </h2>
      <p className="text-[#7a6348] text-lg mb-8 max-w-prose">
        Dưới đây là CV của tôi gồm 2 trang, bạn có thể xem trực tiếp hoặc tải về.
      </p>

      <iframe
        src="/DuongQuocTan.pdf"
        width="60%"
        height="900px"
        className="rounded-lg shadow-md border border-gray-200"
        title="CV Dương Quốc Tần"
      />

      <a
        href="/DuongQuocTan.pdf"
        download
        className="inline-block mt-6 px-6 py-3 bg-[#996633] text-white font-semibold rounded-lg hover:bg-[#7a5631] transition"
      >
        Tải CV về
      </a>
    </div>
  );
}
