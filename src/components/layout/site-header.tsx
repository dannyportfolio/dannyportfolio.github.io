"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";

const links = [
  { href: "/#about", label: "About", section: "about" },
  { href: "/projects", label: "Projects", section: "projects" },
  { href: "/engineering", label: "Engineering", section: "philosophy" },
  { href: "/resume", label: "Resume", section: "resume-generator" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(links.map((link) => link.section));

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

  function checkActive(link: (typeof links)[number]) {
    if (pathname === "/") {
      return activeSection === link.section;
    }
    if (link.href === "/resume" && pathname.startsWith("/resume")) return true;
    if (
      link.section === "projects" &&
      (pathname.startsWith("/projects") || pathname.startsWith("/case-studies"))
    ) {
      return true;
    }
    if (link.section === "philosophy" && pathname.startsWith("/engineering")) {
      return true;
    }
    return false;
  }

  const getHref = (link: (typeof links)[number]) => {
    if (pathname === "/") {
      if (link.section === "projects") return "/#projects";
      if (link.section === "philosophy") return "/#philosophy";
    }
    return link.href;
  };

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="container nav">
        <Link href="/" className="brand" aria-label="DF. - Danial Fachrudin home">
          DF<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              href={getHref(link)}
              className={checkActive(link) ? "is-active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
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
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              href={getHref(link)}
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
