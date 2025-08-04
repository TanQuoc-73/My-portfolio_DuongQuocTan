'use client';

import React from 'react';
import { FaProjectDiagram, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useProjects } from '@/hooks/useProjects';

export default function FeaturedProjects() {
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Đang tải dự án...</div>;
  if (error) return <div className="text-red-600">Lỗi: {error}</div>;

  return (
    <section className="px-6 py-14 bg-[#fff9f0] rounded-2xl">
      <h3 className="text-4xl font-extrabold mb-10 text-[#996633] flex items-center gap-4">
        <FaProjectDiagram size={36} /> Featured Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition duration-300"
          >
            {project.cover_url && (
              <img
                src={project.cover_url}
                alt={`Cover image of ${project.name}`}
                className="rounded-xl mb-5 object-cover h-48 w-full"
                loading="lazy"
              />
            )}
            <h4 className="text-2xl font-semibold mb-3 text-[#7a5e29]">{project.name}</h4>
            <p className="text-[#7a6348] flex-grow mb-5">{project.description}</p>
            {project.tech_stack && (
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tech_stack.split(',').map((tech) => (
                  <span
                    key={tech.trim()}
                    className="bg-[#fff9f0] text-[#996633] rounded-full px-3 py-1 text-xs font-semibold shadow-inner"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-6 mt-auto">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#996633] hover:text-[#7a5e31] flex items-center gap-2 font-semibold transition"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#996633] hover:text-[#7a5e31] flex items-center gap-2 font-semibold transition"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
