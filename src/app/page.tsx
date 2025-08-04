'use client';

import React from 'react';
import { FaIdCard, FaProjectDiagram, FaCode, FaEnvelope } from 'react-icons/fa';
import { useSkillCategories } from '@/hooks/useSkillCategories';

export default function Home() {
  const { categories, loading, error } = useSkillCategories();

  return (
    <div className="bg-white text-[#322410] min-h-screen pt-24 px-4 md:px-12 space-y-24 mt-10">
      {/* Hero Intro */}
      <section
        className="bg-[#fff9f0] max-w-6xl mx-auto rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 md:py-16 gap-8 animate-fade-slide-in"
      >
        <div className="flex flex-col items-center w-full md:w-1/4 text-[#996633]">
          <FaIdCard className="text-7xl md:text-8xl mb-4 md:mb-5 drop-shadow-lg" />
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide select-none">Logo</h1>
        </div>
        <div className="w-full md:w-2/4 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4 tracking-tight leading-tight">
            Full Stack Web Developer
          </h2>
          <p className="text-[#7a6348] text-base md:text-lg max-w-prose mx-auto md:mx-0">
            Xin chào! Tôi là nhà phát triển web full stack với tâm huyết tạo ra các website hiện đại, hiệu quả và đẹp mắt.
            Tôi luôn hướng tới trải nghiệm tối ưu cho người dùng và giải pháp thông minh cho doanh nghiệp.
          </p>
        </div>
        <div className="w-full md:w-1/4 flex justify-center md:justify-end">
          <button
            type="button"
            className="border-2 border-[#996633] text-[#996633] font-semibold py-3 px-8 rounded-full hover:bg-[#996633] hover:text-white transition duration-300 shadow-md"
          >
            Work with me
          </button>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 md:px-0">
        <h3 className="text-3xl mb-8 font-semibold text-[#996633] flex items-center gap-3">
          <FaProjectDiagram /> Featured Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dự án ví dụ */}
          {['Project One', 'Project Two', 'Project Three'].map((project) => (
            <div key={project} className="border border-[#996633] rounded-lg p-6 shadow-lg hover:shadow-2xl transition">
              <h4 className="text-xl font-semibold mb-2">{project}</h4>
              <p className="text-sm text-[#7a6348] mb-4">
                Mô tả ngắn gọn dự án, công nghệ dùng, vai trò của bạn và thành quả.
              </p>
              <button className="text-[#996633] font-semibold underline hover:text-[#7a6348] transition">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-4 md:px-0">
        <h3 className="text-3xl mb-8 font-semibold text-[#996633] flex items-center gap-3">
          <FaCode /> Skills
        </h3>

        {loading && <div>Đang tải kỹ năng...</div>}
        {error && <div className="text-red-600">Lỗi: {error}</div>}

        {!loading && !error && (
          <div className="flex flex-wrap gap-5">
            {categories.length > 0 ? (
              categories.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-[#fff9f0] text-[#996633] font-semibold px-4 py-2 rounded-full shadow-inner"
                  title={skill.description || ''}
                >
                  {skill.name}
                </div>
              ))
            ) : (
              <div>Chưa có kỹ năng nào được hiển thị.</div>
            )}
          </div>
        )}
      </section>

      {/* About Me */}
      <section className="max-w-6xl mx-auto px-4 md:px-0">
        {/* Your About section here */}
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 pb-12">
        {/* Your Contact section here */}
      </section>
    </div>
  );
}
