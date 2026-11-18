import type { Metadata, Viewport } from "next";
import { LocaleProvider } from "@/context/locale-context";
import { SiteChrome } from "@/components/layout/site-chrome";
import { NavigationTransitionProvider } from "@/components/motion/page-transition";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "@/lib/config/site";
import { serializeJsonLd } from "@/lib/utils";
import "./globals.css";

const THEME_INITIALIZATION_SCRIPT =
  "(() => { let stored = null; try { stored = localStorage.getItem('theme'); } catch { stored = null; } const resolved = stored === 'dark' || stored === 'light' ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = resolved; })();";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Danial Fachrudin — Software Engineer", template: "%s | Danial Fachrudin" },
  description:
    "Portfolio of Danial Fachrudin, a Software Engineer focused on backend systems, product development, performance, and scalable software.",
  openGraph: {
    title: "Danial Fachrudin — Software Engineer",
    description: "Backend systems, product development, performance, and scalable software.",
    type: "website",
    url: `${SITE_URL}/`,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
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
    images: [`${SITE_URL}/og-image.png`],
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
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      jobTitle: "Software Engineer",
      url: `${SITE_URL}/`,
      sameAs: [
        "https://github.com/dannyportfolio",
        "https://www.linkedin.com/in/danialfachrudin23/",
      ],
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
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Danial Fachrudin — Software Engineer Portfolio",
      mainEntity: { "@id": `${SITE_URL}/#person` },
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
            __html: serializeJsonLd(jsonLd),
          }}
        />
      </head>
      <body>
        <LocaleProvider>
          <NavigationTransitionProvider>
            <SiteChrome>{children}</SiteChrome>
          </NavigationTransitionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
