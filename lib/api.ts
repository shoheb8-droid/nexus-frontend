const API = process.env.NEXT_PUBLIC_API_URL || "https://pfect.app";

export interface Template {
  name: string;
  tech_stack: string[];
  file_count: number;
}

export interface Project {
  id: string;
  name: string;
  status: "generating" | "completed" | "failed";
  project_type: string;
  output_path: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface HealthStatus {
  status: string;
  product: string;
  version: string;
  workers: number;
  services: { redis: string; database: string };
  ai_providers: string[];
  timestamp: string;
}

export async function getHealth(): Promise<HealthStatus> {
  const r = await fetch(`${API}/health`, { cache: "no-store" });
  return r.json();
}

export async function getTemplates(): Promise<Record<string, Template>> {
  const r = await fetch(`${API}/api/templates`, { next: { revalidate: 3600 } });
  const data = await r.json();
  return data.templates;
}

export async function getProjects(): Promise<Project[]> {
  const r = await fetch(`${API}/api/projects`, { cache: "no-store" });
  const data = await r.json();
  return data.projects;
}

export async function getProject(id: string): Promise<Project> {
  const r = await fetch(`${API}/api/projects/${id}`, { cache: "no-store" });
  return r.json();
}

export async function createProject(payload: {
  name: string;
  description: string;
  project_type: string;
}): Promise<Project> {
  const r = await fetch(`${API}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export function getDownloadUrl(id: string) {
  return `${API}/api/projects/${id}/download`;
}
