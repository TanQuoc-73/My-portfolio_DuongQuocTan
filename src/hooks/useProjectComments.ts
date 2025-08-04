import { useState, useEffect } from 'react';
import { ProjectComment } from '@/types/project-comment';

export function useProjectComments(projectId: number) {
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/project-comments/${projectId}`)
      .then(res => res.json())
      .then((result) => {
        if (result.success) {
          setComments(result.data);
        } else {
          setError(result.message || 'Lỗi khi tải bình luận');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi mạng');
        setLoading(false);
      });
  }, [projectId]);

  return { comments, loading, error, setComments };
}
