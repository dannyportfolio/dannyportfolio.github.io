"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, toggleLocale } = useLocale();
  const t = translations.nav;

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/projects", label: t.projects[locale], key: "projects" },
    { href: "/engineering", label: t.engineering[locale], key: "engineering" },
    { href: "/blog", label: t.blog[locale], key: "blog" },
    { href: "/resume", label: t.resume[locale], key: "resume" },
    { href: "/#contact", label: t.contact[locale], key: "contact" },
  ];

  const activeSection = useActiveSection([
    "about",
    "philosophy",
    "expertise",
    "projects",
    "case-studies",
    "experience",
    "certifications",
    "principles",
    "contact",
  ]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    const isDark = currentTheme === "dark";
    document.documentElement.dataset.theme = currentTheme;
    const frame = window.requestAnimationFrame(() => {
      setDark(isDark);
      setMounted(true);
    });

    const updateScrollState = () => setScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  function checkActive(item: (typeof navLinks)[number]) {
    if (item.href === "/#contact") {
      return pathname === "/" && activeSection === "contact";
    }
    if (item.href === "/projects") {
      return pathname.startsWith("/projects") || pathname.startsWith("/case-studies");
    }
    if (item.href === "/engineering") {
      return pathname.startsWith("/engineering");
    }
    if (item.href === "/blog") {
      return pathname.startsWith("/blog");
    }
    if (item.href === "/resume") {
      return pathname.startsWith("/resume");
    }
    return false;
  }

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Danial Fachrudin portfolio home">
          DF<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.key} href={link.href} className={checkActive(link) ? "is-active" : ""}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="lang-button"
            onClick={toggleLocale}
            aria-label={`Current language: ${locale.toUpperCase()}. Click to switch to ${locale === "en" ? "Indonesian" : "English"}`}
            title={locale === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
          >
            <span className={locale === "en" ? "is-active" : ""}>EN</span>
            <span className="lang-sep">/</span>
            <span className={locale === "id" ? "is-active" : ""}>ID</span>
          </button>
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} color theme`}
            title={`Switch to ${dark ? "light" : "dark"} theme`}
            suppressHydrationWarning
          >
            {mounted ? (dark ? "☀" : "☾") : "☾"}
          </button>
          <Link href="/resume" className="resume-link">
            CV
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={`${open ? "Close" : "Open"} navigation menu`}
          >
            {open ? t.close[locale] : t.menu[locale]}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className={checkActive(link) ? "is-active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
