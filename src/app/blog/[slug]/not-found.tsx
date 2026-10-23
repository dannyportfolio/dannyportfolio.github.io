import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export default function BlogNotFound() {
  return (
    <SiteShell>
      <section
        className="section"
        style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p className="eyebrow">404 — Article Not Found</p>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>Article Not Found</h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", margin: "0 auto 28px" }}>
            The requested blog article does not exist or has been removed.
          </p>
          <Link href="/blog" className="button button-primary">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
