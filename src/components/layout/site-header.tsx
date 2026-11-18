"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";
import {
  isTheme,
  readStorageItem,
  THEME_STORAGE_KEY,
  writeStorageItem,
} from "@/lib/browser/storage";

type NavItem = {
  href: string;
  label: string;
  key: string;
};

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, toggleLocale } = useLocale();
  const t = translations.nav;

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const desktopLinks: NavItem[] = [
    { href: "/projects", label: t.projects[locale], key: "projects" },
    { href: "/engineering", label: t.engineering[locale], key: "engineering" },
    { href: "/blog", label: t.blog[locale], key: "blog" },
    { href: "/journey", label: t.journey[locale], key: "journey" },
    { href: "/#contact", label: t.contact[locale], key: "contact" },
  ];

  const mobilePrimaryLinks: NavItem[] = [
    { href: "/projects", label: t.projects[locale], key: "projects" },
    { href: "/engineering", label: t.engineering[locale], key: "engineering" },
    { href: "/blog", label: t.blog[locale], key: "blog" },
    { href: "/journey", label: t.journey[locale], key: "journey" },
    { href: "/resume", label: t.resume[locale], key: "resume" },
  ];

  const mobileSecondaryLinks: NavItem[] = [
    { href: "/#certifications", label: t.certifications[locale], key: "certifications" },
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
    const storedTheme = readStorageItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = isTheme(storedTheme) ? storedTheme : prefersDark ? "dark" : "light";
    document.documentElement.dataset.theme = currentTheme;

    const frame = window.requestAnimationFrame(() => {
      setDark(currentTheme === "dark");
    });

    const updateScrollState = () => setScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const mediaQuery = window.matchMedia("(min-width: 901px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => {
          menuButtonRef.current?.focus();
        });
      }
    };

    mediaQuery.addEventListener("change", handleViewportChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      mediaQuery.removeEventListener("change", handleViewportChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function toggleTheme() {
    const next = !dark;
    const nextTheme = next ? "dark" : "light";
    setDark(next);
    document.documentElement.dataset.theme = nextTheme;
    writeStorageItem(THEME_STORAGE_KEY, nextTheme);
  }

  function checkActive(href: string) {
    if (href === "/#contact") {
      return pathname === "/" && activeSection === "contact";
    }
    if (href === "/#certifications") {
      return pathname === "/" && activeSection === "certifications";
    }
    if (href === "/projects") {
      return pathname.startsWith("/projects") || pathname.startsWith("/case-studies");
    }
    if (href === "/engineering") {
      return pathname.startsWith("/engineering");
    }
    if (href === "/blog") {
      return pathname.startsWith("/blog");
    }
    if (href === "/journey") {
      return pathname.startsWith("/journey");
    }
    if (href === "/resume") {
      return pathname.startsWith("/resume");
    }
    return false;
  }

  function renderNavLink(item: NavItem, onNavigate?: () => void, showArrow = false) {
    const active = checkActive(item.href);
    const className = active ? "is-active" : undefined;
    const isHashLink = item.href.startsWith("/#");
    const ariaCurrent = active ? (isHashLink ? "location" : "page") : undefined;

    const inner = showArrow ? (
      <>
        <span>{item.label}</span>
        <span className="mobile-nav-arrow" aria-hidden="true">
          →
        </span>
      </>
    ) : (
      item.label
    );

    if (pathname === "/" && isHashLink) {
      return (
        <a
          key={item.key}
          href={item.href.slice(1)}
          onClick={onNavigate}
          className={className}
          aria-current={ariaCurrent}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        key={item.key}
        href={item.href}
        onClick={onNavigate}
        className={className}
        aria-current={ariaCurrent}
      >
        {inner}
      </Link>
    );
  }

  const isResumeActive = checkActive("/resume");

  return (
    <>
      <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
        <div className="container nav">
          <Link
            href="/"
            className="brand"
            aria-label="Danial Fachrudin portfolio home"
            draggable={false}
            onClick={() => open && setOpen(false)}
          >
            DF<span>.</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {desktopLinks.map((link) => renderNavLink(link))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="lang-button"
              onClick={toggleLocale}
              aria-label={`Current language: ${locale.toUpperCase()}. Switch to ${locale === "en" ? "Indonesian" : "English"}`}
              title={locale === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
            >
              <span className={locale === "en" ? "is-active" : ""}>EN</span>
              <span className="lang-sep" aria-hidden="true">
                /
              </span>
              <span className={locale === "id" ? "is-active" : ""}>ID</span>
            </button>

            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${dark ? "light" : "dark"} color theme`}
              title={`Switch to ${dark ? "light" : "dark"} theme`}
              suppressHydrationWarning
            >
              <svg
                className="theme-icon theme-icon-moon"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16.2 12.6A6.5 6.5 0 0 1 7.4 3.8a6.8 6.8 0 1 0 8.8 8.8Z" />
              </svg>
              <svg
                className="theme-icon theme-icon-sun"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="3.4" />
                <path d="M10 2.5v1.6M10 15.9v1.6M4.7 4.7l1.1 1.1M14.2 14.2l1.1 1.1M2.5 10h1.6M15.9 10h1.6M4.7 15.3l1.1-1.1M14.2 5.8l1.1-1.1" />
              </svg>
            </button>

            <span className="nav-divider" aria-hidden="true" />

            <Link
              href="/resume"
              className={`resume-link ${isResumeActive ? "is-active" : ""}`}
              aria-current={isResumeActive ? "page" : undefined}
            >
              {t.resume[locale]}
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className={`menu-button ${open ? "is-open" : ""}`}
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.closeMenu[locale] : t.openMenu[locale]}
            >
              <span className="menu-icon" aria-hidden="true">
                <span className="menu-icon-line" />
                <span className="menu-icon-line" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-nav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {open && (
        <div id="mobile-menu" className="mobile-nav-panel">
          <nav className="container mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-group">
              {mobilePrimaryLinks.map((link) => renderNavLink(link, () => setOpen(false), true))}
            </div>

            <div className="mobile-nav-secondary">
              <span className="mono mobile-nav-label">{t.onHomepage[locale]}</span>
              <div className="mobile-nav-group">
                {mobileSecondaryLinks.map((link) =>
                  renderNavLink(link, () => setOpen(false), true),
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
