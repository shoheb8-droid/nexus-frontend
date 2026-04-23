import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PFECT — Build anything with AI",
  description: "Describe what you want to build. Web app, mobile app, Android, iOS, API — PFECT generates production-ready code in minutes.",
  keywords: ["AI", "code generation", "web app", "mobile app", "software factory", "PFECT"],
  openGraph: {
    title: "PFECT — Build anything with AI",
    description: "Describe what you want to build. Production-ready code in minutes.",
    url: "https://pfect.app",
    siteName: "PFECT",
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
