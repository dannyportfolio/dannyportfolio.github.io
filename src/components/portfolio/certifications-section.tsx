"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { certificates, type Certificate } from "@/data/certifications";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function CertificationsSection() {
  const { locale } = useLocale();
  const t = translations.home;
  const tCert = translations.certificationsSection;
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section
      id="certifications"
      className="certifications-section"
      aria-labelledby="certifications-heading"
    >
      <div className="container">
        <div className="certifications-heading">
          <p className="eyebrow">{t.certificationsEyebrow[locale]}</p>
          <h2 id="certifications-heading">
            {t.certificationsTitle[locale]}
            <br />
            <em>{t.certificationsTitleEm[locale]}</em>
          </h2>
          <p className="certifications-intro">{t.certificationsDescription[locale]}</p>
        </div>

        {certificates.length === 0 ? (
          <p className="certifications-empty">{tCert.noCertificates[locale]}</p>
        ) : (
          <div className="certifications-showcase">
            {certificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                index={index}
                onOpenModal={() => setActiveCert(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {activeCert && <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />}
    </section>
  );
}

function CertificateCard({
  cert,
  index,
  onOpenModal,
}: {
  cert: Certificate;
  index: number;
  onOpenModal: () => void;
}) {
  const { locale } = useLocale();
  const tCert = translations.certificationsSection;

  return (
    <ScrollReveal delay={index * 90} className="cert-card-wrap">
      <article className="cert-card" aria-label={`${cert.title} by ${cert.issuer}`}>
        {/* Certificate Preview Frame */}
        <div className="cert-stage">
          <button
            type="button"
            className="cert-stage__button"
            onClick={onOpenModal}
            aria-label={`${tCert.viewCertificate[locale]}: ${cert.title}`}
          >
            <div className="cert-stage__image-wrap">
              <Image
                src={cert.thumbnailUrl}
                alt={`Certificate: ${cert.title} awarded to Danial Fachrudin by ${cert.issuer}`}
                width={800}
                height={618}
                className="cert-stage__image"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
              />
              <div className="cert-stage__overlay" aria-hidden="true">
                <span className="cert-stage__lens">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>{tCert.viewCertificate[locale]}</span>
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Certificate Details */}
        <div className="cert-content">
          <div className="cert-header">
            <div className="cert-issuer-row">
              <span className="cert-issuer-badge">
                <span className="cert-issuer-dot" aria-hidden="true" />
                {cert.issuer}
              </span>
              <span className="cert-verified-tag">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                {tCert.verifiedBadge[locale]}
              </span>
            </div>

            <h3 className="cert-title">{cert.title}</h3>
          </div>

          {/* Metadata Specs */}
          <div className="cert-meta-grid">
            {cert.issueDate && (
              <div className="cert-meta-item">
                <span className="mono cert-meta-label">{tCert.issuedOn[locale]}</span>
                <span className="cert-meta-value">{cert.issueDate}</span>
              </div>
            )}
            {cert.courseHours && (
              <div className="cert-meta-item">
                <span className="mono cert-meta-label">{tCert.courseHours[locale]}</span>
                <span className="cert-meta-value">{cert.courseHours}</span>
              </div>
            )}
            {cert.credentialId && (
              <div className="cert-meta-item">
                <span className="mono cert-meta-label">Credential ID</span>
                <span className="cert-meta-value mono">{cert.credentialId}</span>
              </div>
            )}
          </div>

          {/* Summary / verified notes */}
          {cert.summary && <p className="cert-description">{cert.summary[locale]}</p>}

          {/* Competency Tags */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="cert-skills">
              <span className="mono cert-skills-label">{tCert.skillsCovered[locale]}</span>
              <div className="cert-skills-row">
                {cert.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="cert-actions">
            <button
              type="button"
              className="button button-primary cert-action-btn"
              onClick={onOpenModal}
            >
              <span>{tCert.viewCertificate[locale]}</span>
              <span className="action-icon" aria-hidden="true">
                ↗
              </span>
            </button>

            {cert.filePath && (
              <a
                href={cert.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary cert-action-btn"
                aria-label={`${tCert.openPdf[locale]} (${cert.title})`}
              >
                <span>{tCert.openPdf[locale]}</span>
                <span className="action-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}

            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-ghost cert-action-btn"
                aria-label={`${tCert.verifyBadge[locale]} on Credly`}
              >
                <span>{tCert.verifyBadge[locale]}</span>
                <span className="action-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

function CertificateModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const { locale } = useLocale();
  const tCert = translations.certificationsSection;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus close button on mount for accessibility
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="cert-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="cert-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-modal-header">
          <div>
            <div className="cert-issuer-badge">
              <span className="cert-issuer-dot" aria-hidden="true" />
              {cert.issuer}
            </div>
            <h3 id="cert-modal-title" className="cert-modal-title">
              {cert.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="cert-modal-close"
            onClick={onClose}
            aria-label={tCert.closePreview[locale]}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cert-modal-body">
          <div className="cert-modal-viewer">
            <Image
              src={cert.thumbnailUrl}
              alt={`Full preview of ${cert.title}`}
              width={1200}
              height={925}
              className="cert-modal-image"
              priority
            />
          </div>
        </div>

        <div className="cert-modal-footer">
          <div className="cert-modal-meta">
            {cert.issueDate && (
              <span className="mono">
                {tCert.issuedOn[locale]}: {cert.issueDate}
              </span>
            )}
            {cert.courseHours && (
              <span className="mono">
                · {tCert.courseHours[locale]}: {cert.courseHours}
              </span>
            )}
          </div>

          <div className="cert-modal-actions">
            {cert.filePath && (
              <a
                href={cert.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                <span>{tCert.openPdf[locale]}</span>
                <span className="action-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <span>{tCert.verifyBadge[locale]}</span>
                <span className="action-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
            <button type="button" className="button button-ghost" onClick={onClose}>
              {tCert.closePreview[locale]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
