import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export default function EngineeringNotFound() {
  return (
    <SiteShell>
      <section
        className="section"
        style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p className="eyebrow">404 — Not Found</p>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>Engineering Note Not Found</h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", margin: "0 auto 28px" }}>
            The requested engineering article does not exist or has been moved.
          </p>
          <Link href="/engineering" className="button button-primary">
            ← Back to Engineering Notes
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
