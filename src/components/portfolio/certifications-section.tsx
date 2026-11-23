"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { certificates, type Certificate, type CertificateCategory } from "@/data/certifications";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

type FilterCategory = "all" | CertificateCategory;
type SortMode = "featured" | "newest" | "hours";

const CATEGORY_ORDER: FilterCategory[] = ["all", "cloud", "engineering", "data", "management"];
const SORT_ORDER: SortMode[] = ["featured", "newest", "hours"];

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(", ");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy selection copy fallback
    }
  }

  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  document.body.removeChild(textarea);
  return copied;
}

export function CertificationsSection() {
  const { locale } = useLocale();
  const t = translations.home;
  const tCert = translations.certificationsSection;

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [activeCertId, setActiveCertId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const openerRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: certificates.length,
      cloud: 0,
      engineering: 0,
      data: 0,
      management: 0,
    };
    for (const cert of certificates) {
      counts[cert.category] += 1;
    }
    return counts;
  }, []);

  const stats = useMemo(() => {
    const issuers = new Set(certificates.map((cert) => cert.issuer));
    const totalHours = certificates.reduce((sum, cert) => sum + (cert.courseHoursNumeric ?? 0), 0);
    return {
      total: certificates.length,
      issuers: issuers.size,
      totalHours: Number.isInteger(totalHours) ? String(totalHours) : totalHours.toFixed(1),
    };
  }, []);

  const visibleCertificates = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? [...certificates]
        : certificates.filter((cert) => cert.category === selectedCategory);

    filtered.sort((a, b) => {
      if (sortMode === "featured") {
        const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
        if (featuredDiff !== 0) return featuredDiff;
      }
      if (sortMode === "hours") {
        const hoursDiff = (b.courseHoursNumeric ?? 0) - (a.courseHoursNumeric ?? 0);
        if (hoursDiff !== 0) return hoursDiff;
      }
      return (b.issuedIso ?? "").localeCompare(a.issuedIso ?? "");
    });

    return filtered;
  }, [selectedCategory, sortMode]);

  const activeIndex = useMemo(
    () => (activeCertId ? visibleCertificates.findIndex((cert) => cert.id === activeCertId) : -1),
    [activeCertId, visibleCertificates],
  );
  const activeCert = activeIndex >= 0 ? visibleCertificates[activeIndex] : null;

  const handleOpenModal = useCallback((cert: Certificate, triggerEl?: HTMLElement | null) => {
    openerRef.current =
      triggerEl ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setActiveCertId(cert.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveCertId(null);
    const target = openerRef.current;
    if (target) {
      window.requestAnimationFrame(() => {
        target.focus();
      });
    }
  }, []);

  const handleStepModal = useCallback(
    (direction: -1 | 1) => {
      if (visibleCertificates.length <= 1 || activeIndex < 0) return;
      const nextIndex =
        (activeIndex + direction + visibleCertificates.length) % visibleCertificates.length;
      setActiveCertId(visibleCertificates[nextIndex].id);
    },
    [activeIndex, visibleCertificates],
  );

  const handleCopyId = useCallback(async (credentialId: string) => {
    const ok = await copyTextToClipboard(credentialId);
    if (!ok) return;
    setCopiedId(credentialId);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedId((current) => (current === credentialId ? null : current));
    }, 2000);
  }, []);

  const showFeaturedSpotlight =
    selectedCategory === "all" &&
    sortMode === "featured" &&
    visibleCertificates.length > 1 &&
    Boolean(visibleCertificates[0]?.featured);

  const featuredCert = showFeaturedSpotlight ? visibleCertificates[0] : null;
  const gridCertificates = showFeaturedSpotlight
    ? visibleCertificates.slice(1)
    : visibleCertificates;

  return (
    <section
      id="certifications"
      className="certifications-section"
      aria-labelledby="certifications-heading"
    >
      <div className="container">
        <div className="certifications-header-row">
          <div className="certifications-heading">
            <p className="eyebrow">{t.certificationsEyebrow[locale]}</p>
            <h2 id="certifications-heading">
              {t.certificationsTitle[locale]}
              <br />
              <em>{t.certificationsTitleEm[locale]}</em>
            </h2>
            <p className="certifications-intro">{t.certificationsDescription[locale]}</p>
          </div>

          {certificates.length > 0 && (
            <dl className="cert-summary-strip" aria-label="Verified credential totals">
              <div className="cert-summary-stat">
                <dt className="mono">{tCert.summaryLabels.credentials[locale]}</dt>
                <dd>{String(stats.total).padStart(2, "0")}</dd>
              </div>
              <div className="cert-summary-stat">
                <dt className="mono">{tCert.summaryLabels.issuers[locale]}</dt>
                <dd>{String(stats.issuers).padStart(2, "0")}</dd>
              </div>
              <div className="cert-summary-stat">
                <dt className="mono">{tCert.summaryLabels.hours[locale]}</dt>
                <dd>{stats.totalHours}h</dd>
              </div>
            </dl>
          )}
        </div>

        {certificates.length === 0 ? (
          <p className="certifications-empty">{tCert.noCertificates[locale]}</p>
        ) : (
          <>
            <div className="cert-controls-bar">
              <div
                className="cert-filter-group"
                role="group"
                aria-label={tCert.filterAriaLabel[locale]}
              >
                {CATEGORY_ORDER.filter(
                  (category) => category === "all" || categoryCounts[category] > 0,
                ).map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      className={`cert-filter-pill ${isActive ? "is-active" : ""}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <span>{tCert.categories[category][locale]}</span>
                      <span className="cert-filter-count mono">{categoryCounts[category]}</span>
                    </button>
                  );
                })}
              </div>

              <div
                className="cert-sort-group"
                role="group"
                aria-label={tCert.sortAriaLabel[locale]}
              >
                {SORT_ORDER.map((mode) => {
                  const isActive = sortMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      aria-pressed={isActive}
                      className={`cert-sort-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => setSortMode(mode)}
                    >
                      {tCert.sortOptions[mode][locale]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sr-only" aria-live="polite">
              {copiedId ? tCert.copiedAnnouncement[locale] : ""}
            </div>

            {visibleCertificates.length === 0 ? (
              <div className="cert-empty-filter">
                <p>{tCert.noMatchingFilter[locale]}</p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setSelectedCategory("all")}
                >
                  {tCert.resetFilter[locale]}
                </button>
              </div>
            ) : (
              <div className="certifications-showcase">
                {featuredCert && (
                  <CertificateCard
                    cert={featuredCert}
                    index={0}
                    variant="featured"
                    copiedId={copiedId}
                    onCopyId={handleCopyId}
                    onOpenModal={handleOpenModal}
                  />
                )}

                {gridCertificates.length > 0 && (
                  <div
                    className={`certifications-grid ${
                      gridCertificates.length === 1 ? "certifications-grid--single" : ""
                    }`}
                  >
                    {gridCertificates.map((cert, index) => (
                      <CertificateCard
                        key={cert.id}
                        cert={cert}
                        index={index + (featuredCert ? 1 : 0)}
                        variant="grid"
                        copiedId={copiedId}
                        onCopyId={handleCopyId}
                        onOpenModal={handleOpenModal}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {activeCert && (
        <CertificateModal
          cert={activeCert}
          currentIndex={activeIndex}
          totalCount={visibleCertificates.length}
          copiedId={copiedId}
          onCopyId={handleCopyId}
          onStep={handleStepModal}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

function CertificateCard({
  cert,
  index,
  variant,
  copiedId,
  onCopyId,
  onOpenModal,
}: {
  cert: Certificate;
  index: number;
  variant: "featured" | "grid";
  copiedId: string | null;
  onCopyId: (credentialId: string) => void;
  onOpenModal: (cert: Certificate, triggerEl?: HTMLElement | null) => void;
}) {
  const { locale } = useLocale();
  const tCert = translations.certificationsSection;
  const isCopied = cert.credentialId ? copiedId === cert.credentialId : false;

  return (
    <ScrollReveal delay={Math.min(index, 4) * 65} className="cert-card-wrap">
      <article
        className={`cert-card cert-card--${variant} cert-card--theme-${cert.previewTheme}`}
        aria-label={`${cert.title} by ${cert.issuer}`}
      >
        <div className="cert-stage">
          <button
            type="button"
            className="cert-stage__button"
            onClick={(event) => onOpenModal(cert, event.currentTarget)}
            aria-label={`${tCert.viewCertificate[locale]}: ${cert.title}`}
          >
            <div className="cert-stage__image-wrap">
              {cert.thumbnailUrl ? (
                <Image
                  src={cert.thumbnailUrl}
                  alt={`Certificate: ${cert.title} awarded to Danial Fachrudin by ${cert.issuer}`}
                  width={800}
                  height={618}
                  className="cert-stage__image"
                  loading="lazy"
                  sizes={
                    variant === "featured"
                      ? "(max-width: 900px) 100vw, 480px"
                      : "(max-width: 768px) 100vw, 520px"
                  }
                />
              ) : (
                <CertificateSheetPreview cert={cert} variant="card" />
              )}

              <div className="cert-stage__overlay" aria-hidden="true">
                <span className="cert-stage__lens">
                  <svg
                    width="16"
                    height="16"
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

        <div className="cert-content">
          <div className="cert-header">
            <div className="cert-issuer-row">
              <span className={`cert-issuer-badge cert-issuer-badge--${cert.previewTheme}`}>
                <span className="cert-issuer-mark" aria-hidden="true" />
                <span>{cert.issuer}</span>
              </span>

              <div className="cert-tag-group">
                {cert.featured && variant === "featured" && (
                  <span className="cert-featured-tag mono">{tCert.featuredBadge[locale]}</span>
                )}
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
                  <span>{tCert.verifiedBadge[locale]}</span>
                </span>
              </div>
            </div>

            <h3 className="cert-title">{cert.title}</h3>
          </div>

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
            {cert.instructor && (
              <div className="cert-meta-item">
                <span className="mono cert-meta-label">{tCert.instructorLabel[locale]}</span>
                <span className="cert-meta-value">{cert.instructor}</span>
              </div>
            )}
            {cert.credentialId && (
              <div className="cert-meta-item cert-meta-item--id">
                <span className="mono cert-meta-label">{tCert.credentialIdLabel[locale]}</span>
                <div className="cert-id-row">
                  <span className="cert-meta-value mono cert-id-value" title={cert.credentialId}>
                    {cert.credentialId}
                  </span>
                  <button
                    type="button"
                    className={`cert-copy-btn ${isCopied ? "is-copied" : ""}`}
                    onClick={() => onCopyId(cert.credentialId!)}
                    aria-label={`${tCert.copyId[locale]}: ${cert.credentialId}`}
                  >
                    {isCopied ? tCert.copiedId[locale] : tCert.copyId[locale]}
                  </button>
                </div>
              </div>
            )}
          </div>

          {cert.summary && <p className="cert-description">{cert.summary[locale]}</p>}

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

          <div className="cert-actions">
            <button
              type="button"
              className="button button-primary cert-action-btn"
              onClick={(event) => onOpenModal(cert, event.currentTarget)}
            >
              <span>{tCert.viewCertificate[locale]}</span>
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
                className="button button-secondary cert-action-btn"
                aria-label={`${tCert.verifyBadge[locale]} (${cert.issuer})`}
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

function CertificateSheetPreview({
  cert,
  variant,
}: {
  cert: Certificate;
  variant: "card" | "modal";
}) {
  if (cert.previewTheme === "hackerrank") {
    return (
      <div
        className={`cert-sheet cert-sheet--hackerrank cert-sheet--${variant}`}
        aria-hidden={variant === "card" ? "true" : undefined}
      >
        <div className="cert-sheet-hr__frame">
          <div className="cert-sheet-hr__emblem">
            <span className="cert-sheet-hr__h">H</span>
            <span className="cert-sheet-hr__square" />
          </div>
          <p className="cert-sheet-hr__heading">Certificate of Accomplishment</p>
          <div className="cert-sheet-hr__ribbon">
            <span>{cert.title}</span>
          </div>
          <span className="cert-sheet-hr__label">PRESENTED TO</span>
          <p className="cert-sheet-hr__recipient">DANIAL FACHRUDIN</p>
          <p className="cert-sheet-hr__sub">
            The bearer of this certificate has passed the HackerRank skill certification test
          </p>
          <div className="cert-sheet-hr__footer">
            <div>
              <span className="cert-sheet-hr__meta">
                Earned on: <strong>{cert.issueDate}</strong>
              </span>
              {cert.credentialId && (
                <span className="cert-sheet-hr__id">ID: {cert.credentialId}</span>
              )}
            </div>
            <div className="cert-sheet-hr__sig">
              <strong>Harishankaran K</strong>
              <span>CTO, HackerRank</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayUrl = cert.verificationUrl
    ? cert.verificationUrl.replace(/^https?:\/\//, "")
    : undefined;

  return (
    <div
      className={`cert-sheet cert-sheet--udemy cert-sheet--${variant}`}
      aria-hidden={variant === "card" ? "true" : undefined}
    >
      <div className="cert-sheet-ud__top">
        <span className="cert-sheet-ud__brand">
          <span className="cert-sheet-ud__caret" />
          udemy
        </span>
        <div className="cert-sheet-ud__ref">
          {cert.credentialId && <span>Certificate no: {cert.credentialId}</span>}
          {displayUrl && <span>Certificate url: {displayUrl}</span>}
        </div>
      </div>

      <div className="cert-sheet-ud__center">
        <span className="cert-sheet-ud__type">CERTIFICATE OF COMPLETION</span>
        <p className="cert-sheet-ud__title">{cert.title}</p>
        {cert.instructor && (
          <p className="cert-sheet-ud__instructor">
            Instructors <strong>{cert.instructor}</strong>
          </p>
        )}
      </div>

      <div className="cert-sheet-ud__bottom">
        <p className="cert-sheet-ud__recipient">Danial Fachrudin</p>
        <div className="cert-sheet-ud__meta">
          {cert.issueDate && (
            <span>
              Date <strong>{cert.issueDate}</strong>
            </span>
          )}
          {cert.courseHours && (
            <span>
              Length <strong>{cert.courseHours}</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CertificateModal({
  cert,
  currentIndex,
  totalCount,
  copiedId,
  onCopyId,
  onStep,
  onClose,
}: {
  cert: Certificate;
  currentIndex: number;
  totalCount: number;
  copiedId: string | null;
  onCopyId: (credentialId: string) => void;
  onStep: (direction: -1 | 1) => void;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const tCert = translations.certificationsSection;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isCopied = cert.credentialId ? copiedId === cert.credentialId : false;

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && totalCount > 1) {
        event.preventDefault();
        onStep(-1);
        return;
      }

      if (event.key === "ArrowRight" && totalCount > 1) {
        event.preventDefault();
        onStep(1);
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current);
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onStep, totalCount]);

  return (
    <div className="cert-modal-backdrop" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="cert-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cert-modal-header">
          <div className="cert-modal-heading-group">
            <div className="cert-modal-eyebrow-row">
              <div className={`cert-issuer-badge cert-issuer-badge--${cert.previewTheme}`}>
                <span className="cert-issuer-mark" aria-hidden="true" />
                <span>{cert.issuer}</span>
              </div>
              {totalCount > 1 && (
                <span className="cert-modal-counter mono">
                  {currentIndex + 1} / {totalCount}
                </span>
              )}
            </div>
            <h3 id="cert-modal-title" className="cert-modal-title">
              {cert.title}
            </h3>
          </div>

          <div className="cert-modal-header-controls">
            {totalCount > 1 && (
              <div className="cert-modal-nav">
                <button
                  type="button"
                  className="cert-modal-nav-btn"
                  onClick={() => onStep(-1)}
                  aria-label={tCert.previousCert[locale]}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="cert-modal-nav-btn"
                  onClick={() => onStep(1)}
                  aria-label={tCert.nextCert[locale]}
                >
                  →
                </button>
              </div>
            )}

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
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="cert-modal-body">
          <div className="cert-modal-viewer">
            {cert.thumbnailUrl ? (
              <Image
                src={cert.thumbnailUrl}
                alt={`Full preview of ${cert.title}`}
                width={1200}
                height={925}
                className="cert-modal-image"
                priority
              />
            ) : (
              <CertificateSheetPreview cert={cert} variant="modal" />
            )}
          </div>

          <div className="cert-modal-details">
            {cert.summary && <p className="cert-modal-summary">{cert.summary[locale]}</p>}

            <div className="cert-modal-specs">
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
              {cert.instructor && (
                <div className="cert-meta-item">
                  <span className="mono cert-meta-label">{tCert.instructorLabel[locale]}</span>
                  <span className="cert-meta-value">{cert.instructor}</span>
                </div>
              )}
              {cert.credentialId && (
                <div className="cert-meta-item cert-meta-item--id">
                  <span className="mono cert-meta-label">{tCert.credentialIdLabel[locale]}</span>
                  <div className="cert-id-row">
                    <span className="cert-meta-value mono cert-id-value">{cert.credentialId}</span>
                    <button
                      type="button"
                      className={`cert-copy-btn ${isCopied ? "is-copied" : ""}`}
                      onClick={() => onCopyId(cert.credentialId!)}
                      aria-label={`${tCert.copyId[locale]}: ${cert.credentialId}`}
                    >
                      {isCopied ? tCert.copiedId[locale] : tCert.copyId[locale]}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cert-modal-footer">
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
                className={`button ${cert.filePath ? "button-secondary" : "button-primary"}`}
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
