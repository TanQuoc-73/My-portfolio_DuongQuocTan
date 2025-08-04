// File: src/server/services/projectComment.service.ts

import { supabase } from '../db/supabase';
import { ProjectComment } from '@/types/project-comment';

export async function getCommentsByProject(projectId: number): Promise<(ProjectComment & { author_name?: string })[]> {
  const { data, error } = await supabase
    .from('project_comments')
    .select(`
      *,
      users!inner(full_name,email)
    `)
    .eq('project_id', projectId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data?.map((item) => ({
    ...item,
    author_name: item.users?.full_name || item.users?.email || 'Người dùng',
  })) || [];
}

export async function addProjectComment(comment: Omit<ProjectComment, 'id' | 'created_at' | 'is_approved'>) {
  const { data, error } = await supabase
    .from('project_comments')
    .insert(comment)
    .select()
    .single();

  if (error) throw error;
  return data as ProjectComment;
}
