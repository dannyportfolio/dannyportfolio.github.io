import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Danny Fachrudin — Software Engineer", template: "%s | Danny Fachrudin" },
  description: "Backend-focused software engineering portfolio for Danny Fachrudin.",
  metadataBase: new URL("https://TODO-add-production-domain.example"),
  openGraph: { title: "Danny Fachrudin — Software Engineer", description: "Reliable backend systems, scalable APIs, and production-ready software.", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#050505" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch {}" }} /></head><body>{children}</body></html>; }
