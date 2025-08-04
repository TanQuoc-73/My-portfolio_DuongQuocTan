import { useState, useEffect } from 'react';
import { Project } from '@/types/project';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setProjects(result.data);
        } else {
          setError(result.message || 'Lỗi khi tải dự án');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi mạng');
        setLoading(false);
      });
  }, []);

  return { projects, loading, error };
}
