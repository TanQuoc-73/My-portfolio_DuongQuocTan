'use client';

import React, { useState } from 'react';
import { FaProjectDiagram, FaExternalLinkAlt, FaGithub, FaStar } from 'react-icons/fa';
import { useProjects } from '@/hooks/useProjects';
import ProjectDetailsModal from '@/components/modals/ProjectDetailsModal';

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  if (loading) return <div>Đang tải dự án...</div>;
  if (error) return <div className="text-red-600">Lỗi: {error}</div>;

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <section className="px-6 py-14 bg-[#fff9f0] rounded-2xl max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-12 text-[#996633] flex items-center gap-4">
        <FaProjectDiagram size={38} /> Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition duration-300"
            onClick={() => setSelectedProjectId(project.id)}
          >
            {project.cover_url && (
              <img
                src={project.cover_url}
                alt={`Cover image of ${project.name}`}
                className="rounded-xl mb-5 object-cover h-48 w-full"
                loading="lazy"
              />
            )}

            {/* Hiển thị rating trung bình */}
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar key={num} className={num <= Math.round(project.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
              <span className="font-semibold text-[#996633] ml-2">
                {(project.average_rating || 0).toFixed(1)}
              </span>
            </div>

            <h4 className="text-2xl font-semibold mb-3 text-[#7a5e29]">{project.name}</h4>
            <p className="text-[#7a6348] flex-grow mb-5">{project.description}</p>
            {project.tech_stack && (
              <div className="flex flex-wrap gap-3 mb-6 text-[#996633] text-xs font-semibold">
                {project.tech_stack.split(',').map((tech) => (
                  <span key={tech.trim()} className="bg-[#fff9f0] rounded-full px-3 py-1 shadow-inner">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-6">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#996633] hover:text-[#7a5e31] flex items-center gap-2 font-semibold transition"
                  onClick={e => e.stopPropagation()}
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
                  onClick={e => e.stopPropagation()}
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={selectedProjectId !== null}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </section>
  );
}
