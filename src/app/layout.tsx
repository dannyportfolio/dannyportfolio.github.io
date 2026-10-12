import type { Metadata, Viewport } from "next";
import "./globals.css";

const THEME_INITIALIZATION_SCRIPT =
  "try { const t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = t; } catch {}";

export const metadata: Metadata = {
  metadataBase: new URL("https://dannyportfolio.github.io"),
  title: { default: "Danial Fachrudin — Software Engineer", template: "%s | Danial Fachrudin" },
  description:
    "Portfolio of Danial Fachrudin, a Software Engineer focused on backend systems, product development, performance, and scalable software.",
  openGraph: {
    title: "Danial Fachrudin — Software Engineer",
    description: "Backend systems, product development, performance, and scalable software.",
    type: "website",
    url: "https://dannyportfolio.github.io/",
    images: [
      {
        url: "/danny-fachrudin-profile.avif",
        width: 800,
        height: 800,
        alt: "Danial Fachrudin — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danial Fachrudin — Software Engineer",
    description: "Backend systems, product development, performance, and scalable software.",
    images: ["/danny-fachrudin-profile.avif"],
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_INITIALIZATION_SCRIPT,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
