import type { Metadata, Viewport } from "next";
import { LocaleProvider } from "@/context/locale-context";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dannyportfolio.github.io").replace(
  /\/$/,
  "",
);

const THEME_INITIALIZATION_SCRIPT =
  "try { const t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = t; } catch {}";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Danial Fachrudin — Software Engineer", template: "%s | Danial Fachrudin" },
  description:
    "Portfolio of Danial Fachrudin, a Software Engineer focused on backend systems, product development, performance, and scalable software.",
  openGraph: {
    title: "Danial Fachrudin — Software Engineer",
    description: "Backend systems, product development, performance, and scalable software.",
    type: "website",
    url: `${siteUrl}/`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Danial Fachrudin — Software Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danial Fachrudin — Software Engineer",
    description: "Backend systems, product development, performance, and scalable software.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#101114" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Danial Fachrudin",
      jobTitle: "Software Engineer",
      url: `${siteUrl}/`,
      sameAs: ["https://github.com/dannyportfolio"],
      knowsAbout: [
        "Backend Architecture",
        "API Design",
        "PostgreSQL",
        "Distributed Systems",
        "Performance Optimization",
        "Next.js",
        "TypeScript",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Danial Fachrudin Portfolio",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: "Danial Fachrudin — Software Engineer Portfolio",
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
