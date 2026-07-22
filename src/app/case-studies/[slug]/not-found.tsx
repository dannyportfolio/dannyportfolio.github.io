import Link from "next/link";
export default function NotFound() { return <main className="not-found"><p className="eyebrow">404</p><h1>Case study not found.</h1><Link href="/projects" className="text-link">Back to projects →</Link></main>; }
