"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PLATFORMS = [
  "Web App", "Mobile App", "Android", "iOS", "REST API",
  "SaaS Platform", "Dashboard", "CLI Tool", "Discord Bot",
  "Chrome Extension", "E-Commerce", "GraphQL API", "WebSocket App",
  "ML Pipeline", "AI Chatbot", "Blockchain DApp", "Desktop App",
  "Data Pipeline", "Browser Extension", "Telegram Bot",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08090f] text-white">

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#08090f]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">PFECT</span>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all"
          >
            Open App <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40 text-xs mb-12">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Private Beta · 4 AI providers active
          </div>

          {/* Headline */}
          <h1 className="text-[2.8rem] sm:text-6xl font-bold leading-[1.08] tracking-[-0.02em] mb-5">
            Describe what<br />
            you want to build.
          </h1>

          {/* Sub */}
          <p className="text-white/35 text-lg leading-relaxed mb-3 max-w-lg mx-auto">
            Web app, mobile app, Android, iOS, API, SaaS —<br className="hidden sm:block" />
            any platform, any stack. Production-ready code in minutes.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-base transition-all hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start building free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform tags */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.15em] mb-5">
            Builds for any platform
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {PLATFORMS.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full text-xs text-white/35 border border-white/[0.07] bg-white/[0.02] hover:border-violet-500/30 hover:text-white/55 transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/[0.06] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
            {[
              {
                step: "01",
                title: "Describe",
                desc: "Write what you want to build in plain English. Any idea, any complexity.",
              },
              {
                step: "02",
                title: "Generate",
                desc: "4 AI providers work in cascade. Full codebase — backend, frontend, tests, Docker.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Get production-ready code. Deploy anywhere in under a minute.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <div className="text-[11px] text-violet-400/50 font-mono mb-3 tracking-widest">{step}</div>
                <h3 className="text-white font-semibold mb-2 text-[15px]">{title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-5 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-[9px]">P</span>
            </div>
            <span className="text-white/25 text-xs">PFECT · Private Beta</span>
          </div>
          <a
            href="https://pfect.app/health"
            className="text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            Status
          </a>
        </div>
      </footer>

    </div>
  );
}
