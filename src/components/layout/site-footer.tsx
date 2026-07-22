import Link from "next/link";
import { profile } from "@/data/profile";
export function SiteFooter() { return <footer className="site-footer"><div className="container footer-inner"><p>© {new Date().getFullYear()} {profile.name}. Built with intention.</p><div><Link href="/resume">Resume</Link><Link href="/engineering">Engineering notes</Link></div></div></footer>; }
