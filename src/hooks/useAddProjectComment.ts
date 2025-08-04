import { useState } from 'react';
import { ProjectComment } from '@/types/project-comment';

type CommentInput = Omit<ProjectComment, 'id' | 'created_at' | 'is_approved'>;

export function useAddProjectComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addComment(comment: CommentInput) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/project-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Lỗi khi gửi bình luận');
      setLoading(false);
      return json.data as ProjectComment;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }

  return { addComment, loading, error };
}
