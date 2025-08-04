'use client';

import React from 'react';
import { FaCode } from 'react-icons/fa';
import { useSkillCategories } from '@/hooks/useSkillCategories';

export default function Skills() {
  const { categories, loading, error } = useSkillCategories();

  if (loading) return <div>Đang tải kỹ năng...</div>;
  if (error) return <div className="text-red-600">Lỗi: {error}</div>;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-0">
      <h3 className="text-3xl mb-8 font-semibold text-[#996633] flex items-center gap-3">
        <FaCode /> Skills
      </h3>
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
    </section>
  );
}
