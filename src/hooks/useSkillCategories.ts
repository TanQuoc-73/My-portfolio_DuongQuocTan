import { useEffect, useState } from 'react';
import { SkillCategory } from '@/types/skill-category';

export function useSkillCategories() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/skill-categories')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setCategories(result.data);
        } else {
          setError(result.message || 'Lỗi khi tải kỹ năng');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi mạng');
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}
