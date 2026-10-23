"use client";

import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { useLocale } from "@/context/locale-context";

export function SiteFooter() {
  const { locale } = useLocale();

  return (
    <footer className="site-footer">
      <section className="footer-verse" aria-label="Guiding verse — Proverbs 16:3">
        <div className="footer-verse__backdrop" aria-hidden="true">
          <Image
            src="/footer-horizon.avif"
            alt=""
            fill
            sizes="100vw"
            className="footer-verse__image"
          />
          <div className="footer-verse__overlay" />
        </div>
        <div className="container footer-verse__inner">
          <div className="footer-verse__grid">
            <figure className="footer-verse__block" lang="en">
              <span className="mono footer-verse__lang">ENGLISH</span>
              <blockquote className="footer-verse__quote">
                “Commit to the LORD whatever you do, and he will establish your plans.”
              </blockquote>
              <figcaption className="footer-verse__cite">Proverbs 16:3 (NIV)</figcaption>
            </figure>
            <figure className="footer-verse__block" lang="id">
              <span className="mono footer-verse__lang">INDONESIA</span>
              <blockquote className="footer-verse__quote">
                “Serahkanlah perbuatanmu kepada TUHAN, maka terlaksanalah segala rencanamu.”
              </blockquote>
              <figcaption className="footer-verse__cite">Amsal 16:3 (TB)</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <div className="footer-bar">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {profile.name}.{" "}
            {locale === "en" ? "Built with intention." : "Dibangun dengan kesungguhan."}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/projects">{locale === "en" ? "Projects" : "Proyek"}</Link>
            <Link href="/engineering">{locale === "en" ? "Engineering" : "Catatan Rekayasa"}</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/resume">{locale === "en" ? "Resume & CV" : "Resume & CV"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
