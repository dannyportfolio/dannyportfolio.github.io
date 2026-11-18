import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export default function JourneyChapterNotFound() {
  return (
    <SiteShell>
      <section
        className="section"
        style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p className="eyebrow">404 — Chapter Not Found</p>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>Chapter Not Found</h1>
          <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "0 auto 28px" }}>
            This chapter has not been documented yet or the requested URL does not exist.
          </p>
          <Link href="/journey" className="button button-primary">
            ← Back to My Journey
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
