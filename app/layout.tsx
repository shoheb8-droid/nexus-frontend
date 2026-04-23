import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS — AI Software Factory",
  description: "The world's first governed, per-user autonomous AI software factory. Describe your idea — NEXUS builds the complete production app.",
  keywords: ["AI", "software factory", "code generation", "autonomous", "NEXUS"],
  openGraph: {
    title: "NEXUS — AI Software Factory",
    description: "Describe your idea. NEXUS builds the complete production app.",
    url: "https://pfect.app",
    siteName: "NEXUS",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
