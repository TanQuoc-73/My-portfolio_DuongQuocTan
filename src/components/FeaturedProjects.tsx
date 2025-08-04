'use client';

import React from 'react';
import Link from 'next/link';
import { FaProjectDiagram } from 'react-icons/fa';
import { useProjects } from '@/hooks/useProjects';

export default function FeaturedProjects() {
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Đang tải dự án...</div>;
  if (error) return <div className="text-red-600">Lỗi: {error}</div>;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-0">
      <h3 className="text-3xl mb-4 font-semibold text-[#996633] flex items-center gap-3">
        <FaProjectDiagram />
        <Link href="/projects" className="hover:underline">
          Featured Projects
        </Link>
      </h3>

      <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#996633]/80 scrollbar-track-[#fff9f0]/50 py-2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="min-w-[280px] flex-shrink-0 border border-[#996633] rounded-lg p-6 shadow-lg hover:shadow-2xl transition cursor-pointer"
            >
              <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
              <p className="text-sm text-[#7a6348] mb-4">
                {project.description || 'Không có mô tả.'}
              </p>
              <button className="text-[#996633] font-semibold underline hover:text-[#7a6348] transition">
                Xem chi tiết
              </button>
            </div>
          ))
        ) : (
          <div>Không có dự án nào.</div>
        )}
      </div>
    </section>
  );
}
