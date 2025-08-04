export interface Project {
  id: number;
  owner_id: string;
  name: string;
  description?: string;
  tech_stack?: string;
  github_url?: string;
  demo_url?: string;
  cover_url?: string;
  created_at?: string;
}
