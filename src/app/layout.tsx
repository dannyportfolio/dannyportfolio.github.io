import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dannyportfolio.github.io"),
  title: { default: "Danial Fachrudin — Software Engineer", template: "%s | Danial Fachrudin" },
  description: "Portfolio of Danial Fachrudin, a Software Engineer focused on backend systems, product development, performance, and scalable software.",
  openGraph: { title: "Danial Fachrudin — Software Engineer", description: "Backend systems, product development, performance, and scalable software.", type: "website" },
  twitter: { card: "summary", title: "Danial Fachrudin — Software Engineer", description: "Backend systems, product development, performance, and scalable software." },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#050505" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch {}" }} /></head><body>{children}</body></html>; }
