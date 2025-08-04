import { supabase } from '../db/supabase';
import { Project } from '@/types/project';

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Project[];
}
