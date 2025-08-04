export interface ProjectComment {
  id: number;
  project_id: number;
  author_id?: string | null;
  content: string;
  rating?: number | null;
  created_at?: string;
  is_approved?: boolean;
  author_name?: string;  // bổ sung
}
