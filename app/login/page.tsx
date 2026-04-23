"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [code, setCode]       = useState("");
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: code }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(true);
        setCode("");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#08090f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-5">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">PFECT</h1>
          <p className="text-white/30 text-sm mt-1">Private access · Enter your code</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Access code"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white
              placeholder-white/20 focus:outline-none transition-colors text-sm ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-violet-500/60"
            }`}
          />

          {error && (
            <p className="text-red-400/80 text-xs text-center">
              Incorrect access code. Try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white
              font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Enter"}
          </button>
        </form>

        <p className="text-center text-white/15 text-xs mt-8">
          PFECT · Private Beta
        </p>
      </div>
    </div>
  );
}
