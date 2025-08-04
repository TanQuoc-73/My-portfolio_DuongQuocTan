import { supabase } from '../db/supabase';
import { Project } from '@/types/project';

export async function getAllProjects(): Promise<(Project & { average_rating?: number })[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_comments (
        rating
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data?.map(project => {
    const ratings = project.project_comments?.map((c: any) => c.rating).filter(Boolean) || [];
    const average_rating = ratings.length
      ? ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
      : 0;

    return { ...project, average_rating };
  }) || [];
}
