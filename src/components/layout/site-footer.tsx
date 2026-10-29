"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function SiteFooter() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = translations.footer;

  return (
    <footer className="site-footer">
      <section className="footer-verse" aria-label={t.verseAriaLabel[locale]}>
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
          <figure className="footer-verse__block" lang={locale}>
            <span className="mono footer-verse__eyebrow">{t.verseEyebrow[locale]}</span>
            <blockquote className="footer-verse__quote">{t.verseQuote[locale]}</blockquote>
            <figcaption className="footer-verse__cite">{t.verseCite[locale]}</figcaption>
          </figure>
        </div>
      </section>
      <div className="footer-bar">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t.builtWithIntention[locale]}
          </p>
          <div className="footer-nav-links">
            <Link href="/projects">{t.projects[locale]}</Link>
            <Link href="/engineering">{t.engineering[locale]}</Link>
            <Link href="/blog">{t.blog[locale]}</Link>
            {pathname === "/" ? (
              <a href="#certifications">{t.certifications[locale]}</a>
            ) : (
              <Link href="/#certifications">{t.certifications[locale]}</Link>
            )}
            <Link href="/resume">{t.resume[locale]}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
