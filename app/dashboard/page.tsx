"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Download, Loader2, CheckCircle, XCircle, Clock, ArrowLeft, Zap } from "lucide-react";
import { createProject, getProjects, getTemplates, getDownloadUrl, type Project, type Template } from "@/lib/api";

const STATUS_ICON: Record<string, React.ReactNode> = {
  generating: <Loader2 className="w-4 h-4 text-nexus-cyan animate-spin" />,
  completed:  <CheckCircle className="w-4 h-4 text-nexus-green" />,
  failed:     <XCircle className="w-4 h-4 text-red-400" />,
};
const STATUS_COLOR: Record<string, string> = {
  generating: "text-nexus-cyan",
  completed:  "text-nexus-green",
  failed:     "text-red-400",
};

export default function Dashboard() {
  const [templates, setTemplates]     = useState<Record<string, Template>>({});
  const [projects, setProjects]       = useState<Project[]>([]);
  const [creating, setCreating]       = useState(false);
  const [showForm, setShowForm]       = useState(false);
  const [loading, setLoading]         = useState(true);
  const [form, setForm] = useState({ name: "", description: "", project_type: "" });

  const load = useCallback(async () => {
    try {
      const [t, p] = await Promise.all([getTemplates(), getProjects()]);
      setTemplates(t);
      setProjects(p);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Poll for generating projects
  useEffect(() => {
    const hasGenerating = projects.some((p) => p.status === "generating");
    if (!hasGenerating) return;
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, [projects, load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.description || !form.project_type) return;
    setCreating(true);
    try {
      await createProject(form);
      setForm({ name: "", description: "", project_type: "" });
      setShowForm(false);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
    finally { setCreating(false); }
  }

  return (
    <div className="min-h-screen bg-nexus-bg">

      {/* Header */}
      <nav className="glass border-b border-nexus-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-nexus-muted hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="font-bold text-white">NEXUS</span>
              <span className="text-nexus-muted text-sm">/ Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-nexus-green text-sm">
              <span className="w-2 h-2 bg-nexus-green rounded-full animate-pulse" />
              4 AI providers live
            </div>
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nexus-purple hover:bg-purple-600 text-white text-sm font-medium transition-all">
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Create form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
            <div className="glass rounded-2xl p-8 w-full max-w-lg animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-nexus-purple" /> New Project
              </h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-sm text-nexus-muted mb-1 block">Project name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="My Awesome App"
                    className="w-full px-4 py-3 rounded-lg bg-nexus-bg border border-nexus-border text-white placeholder-nexus-muted focus:outline-none focus:border-nexus-purple transition-colors" />
                </div>
                <div>
                  <label className="text-sm text-nexus-muted mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="A SaaS platform for managing team tasks with real-time collaboration..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-nexus-bg border border-nexus-border text-white placeholder-nexus-muted focus:outline-none focus:border-nexus-purple transition-colors resize-none" />
                </div>
                <div>
                  <label className="text-sm text-nexus-muted mb-1 block">Project type</label>
                  <select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-nexus-bg border border-nexus-border text-white focus:outline-none focus:border-nexus-purple transition-colors">
                    <option value="">Select a template...</option>
                    {Object.entries(templates).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>
                {form.project_type && templates[form.project_type] && (
                  <div className="p-3 rounded-lg bg-nexus-purple/10 border border-nexus-purple/20 text-sm">
                    <span className="text-nexus-muted">Stack: </span>
                    <span className="text-nexus-cyan">{templates[form.project_type].tech_stack.join(" · ")}</span>
                    <span className="text-nexus-muted ml-3">· {templates[form.project_type].file_count} files</span>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-3 rounded-lg border border-nexus-border text-nexus-muted hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={creating || !form.name || !form.description || !form.project_type}
                    className="flex-1 px-4 py-3 rounded-lg bg-nexus-purple hover:bg-purple-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {creating ? <><Loader2 className="w-4 h-4 animate-spin" /> Building...</> : "Build with NEXUS"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-nexus-purple animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-nexus-surface border border-nexus-border flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-nexus-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
            <p className="text-nexus-muted mb-6">Build your first project with NEXUS in seconds</p>
            <button onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-lg bg-nexus-purple hover:bg-purple-600 text-white font-medium transition-all">
              Create first project
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{projects.length} project{projects.length !== 1 ? "s" : ""}</h2>
            </div>
            {projects.map((project) => (
              <div key={project.id} className="glass rounded-xl p-5 hover:border-nexus-purple/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {STATUS_ICON[project.status]}
                      <h3 className="font-semibold text-white truncate">{project.name}</h3>
                      <span className={`text-xs ${STATUS_COLOR[project.status]} capitalize`}>{project.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-nexus-muted">
                      <span className="capitalize">{project.project_type?.replace(/_/g, " ")}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {project.status === "completed" && (
                    <a href={getDownloadUrl(project.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nexus-green/10 border border-nexus-green/20 text-nexus-green text-sm font-medium hover:bg-nexus-green/20 transition-all shrink-0">
                      <Download className="w-4 h-4" /> Download
                    </a>
                  )}
                  {project.status === "generating" && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nexus-cyan/10 border border-nexus-cyan/20 text-nexus-cyan text-sm shrink-0">
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
