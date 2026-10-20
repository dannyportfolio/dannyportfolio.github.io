import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteFooter() {
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
            © {new Date().getFullYear()} {profile.name}. Built with intention.
          </p>
          <div>
            <Link href="/resume">Resume</Link>
            <Link href="/engineering">Engineering notes</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
