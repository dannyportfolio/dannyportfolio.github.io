"use client";
import Link from "next/link";
import { useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";

const links = [
  { href: "/#about", label: "About", section: "about" }, { href: "/#projects", label: "Projects", section: "projects" }, { href: "/#philosophy", label: "Engineering", section: "philosophy" }, { href: "/resume", label: "Resume", section: "resume-generator" }, { href: "/#contact", label: "Contact", section: "contact" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark");
  const activeSection = useActiveSection(links.map((link) => link.section));
  function toggleTheme() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; localStorage.setItem("theme", next ? "dark" : "light"); }
  return <header className="site-header"><div className="container nav"><Link href="/" className="brand" aria-label="DF. — Danny Fachrudin home">DF<span>.</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href} className={activeSection === link.section ? "is-active" : ""}>{link.label}</Link>)}</nav><div className="nav-actions"><button className="icon-button" onClick={toggleTheme} aria-label="Switch color theme">{dark ? "☼" : "◐"}</button><Link href="/resume" className="resume-link">CV <span aria-hidden>↗</span></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu">{open ? "Close" : "Menu"}</button></div></div>{open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}</header>;
}
