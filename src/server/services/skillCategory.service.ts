import { supabase } from '../db/supabase';

export async function getAllSkillCategories() {
  const { data, error } = await supabase
    .from('skill_categories')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
}
