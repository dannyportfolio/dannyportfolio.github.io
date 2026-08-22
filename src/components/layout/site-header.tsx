"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";

const links = [
  { href: "/#about", label: "About", section: "about" },
  { href: "/#projects", label: "Projects", section: "projects" },
  { href: "/#philosophy", label: "Engineering", section: "philosophy" },
  { href: "/resume", label: "Resume", section: "resume-generator" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(links.map((link) => link.section));

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDark = storedTheme ? storedTheme === "dark" : prefersDark;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    const themeFrame = window.requestAnimationFrame(() => setDark(nextDark));

    const updateScrollState = () => setScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(themeFrame);
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

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="container nav">
        <Link href="/" className="brand" aria-label="DF. - Danial Fachrudin home">
          DF<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={activeSection === link.section ? "is-active" : ""}
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
          >
            {dark ? "L" : "D"}
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
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
