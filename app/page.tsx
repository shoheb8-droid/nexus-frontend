"use client";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe, Code2, Layers, GitBranch } from "lucide-react";

const FEATURES = [
  { icon: Zap,       title: "4 AI Providers",      desc: "Cerebras → Groq → Gemini → Cohere cascade. Always fastest, always free-first." },
  { icon: Code2,     title: "15 Project Types",    desc: "Web apps, APIs, ML pipelines, SaaS, mobile, blockchain, bots and more." },
  { icon: Layers,    title: "Full Stack Output",   desc: "Complete production code — backend, frontend, Docker, tests, README." },
  { icon: Globe,     title: "Instant Download",    desc: "Every project zipped and ready. Deploy anywhere in under a minute." },
  { icon: Shield,    title: "CTCA Governed",       desc: "Creator → Tester → Checker → Approver. Every output verified." },
  { icon: GitBranch, title: "LangGraph Agents",    desc: "Multi-agent state machines. Self-correcting, self-improving builds." },
];

const TEMPLATES = [
  "Web App", "API Microservice", "SaaS Platform", "ML Pipeline",
  "Mobile App", "Discord Bot", "Chrome Extension", "E-Commerce",
  "GraphQL API", "WebSocket App", "Data Dashboard", "CLI Tool",
  "Blockchain DApp", "Desktop App", "AI Chatbot",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-nexus-bg">

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-nexus-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-xl text-white">NEXUS</span>
            <span className="text-nexus-muted text-sm hidden sm:block">by PFECT</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard"
              className="px-5 py-2 rounded-lg bg-nexus-purple hover:bg-purple-600 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25">
              Launch App →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexus-purple opacity-5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-nexus-cyan opacity-5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-surface border border-nexus-border text-nexus-cyan text-sm mb-8">
            <span className="w-2 h-2 bg-nexus-green rounded-full animate-pulse" />
            Live · 4 AI providers · pfect.app
          </div>

          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Describe your idea.</span>
            <br />
            <span className="bg-gradient-to-r from-nexus-purple via-nexus-cyan to-nexus-green bg-clip-text text-transparent">
              NEXUS builds it.
            </span>
          </h1>

          <p className="text-xl text-nexus-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            The world&apos;s first governed, per-user autonomous AI software factory.
            Production-ready code in minutes — not hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-nexus-purple hover:bg-purple-600 text-white font-semibold text-lg transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105">
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://pfect.app/docs" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-nexus-border hover:border-nexus-purple text-nexus-text font-semibold text-lg transition-all hover:bg-nexus-surface">
              View API Docs
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-nexus-border">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "15",     label: "Project Types" },
            { value: "4",      label: "AI Providers" },
            { value: "2,000",  label: "Tokens/sec" },
            { value: "100%",   label: "Free to Start" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black bg-gradient-to-r from-nexus-purple to-nexus-cyan bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-nexus-muted text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Everything included</h2>
          <p className="text-nexus-muted text-center mb-12">No setup. No config. Just describe and build.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-xl p-6 hover:border-nexus-purple transition-all group">
                <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center mb-4 group-hover:bg-nexus-purple/20 transition-all">
                  <Icon className="w-5 h-5 text-nexus-purple" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-nexus-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20 px-6 bg-nexus-surface/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">15 production templates</h2>
          <p className="text-nexus-muted mb-10">Every stack. Every use case. Instantly.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {TEMPLATES.map((t) => (
              <span key={t} className="px-4 py-2 rounded-full glass border border-nexus-border text-nexus-text text-sm hover:border-nexus-cyan hover:text-nexus-cyan transition-all cursor-default">
                {t}
              </span>
            ))}
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-xl bg-nexus-purple hover:bg-purple-600 text-white font-semibold transition-all hover:shadow-xl hover:shadow-purple-500/30">
            Build your first project free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nexus-border py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
            <span className="text-white font-bold text-xs">N</span>
          </div>
          <span className="text-nexus-muted text-sm">NEXUS by PFECT · pfect.app · Built on Railway Pro</span>
        </div>
        <div className="flex gap-6 justify-center text-nexus-muted text-sm">
          <a href="https://pfect.app/docs" className="hover:text-nexus-cyan transition-colors">API Docs</a>
          <a href="https://pfect.app/health" className="hover:text-nexus-green transition-colors">Status</a>
          <a href="https://pfect.app/metrics" className="hover:text-nexus-purple transition-colors">Metrics</a>
        </div>
      </footer>

    </div>
  );
}
