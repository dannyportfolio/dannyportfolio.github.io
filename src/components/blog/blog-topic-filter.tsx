"use client";

import { useState, useEffect, useRef, useId, useTransition } from "react";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export type TopicItem = {
  id: string; // canonical category id / english name
  label: string; // localized category label
  count: number;
};

type BlogTopicFilterProps = {
  topics: TopicItem[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  totalPosts: number;
};

export function BlogTopicFilter({
  topics,
  selectedTopicId,
  onSelectTopic,
  totalPosts,
}: BlogTopicFilterProps) {
  const { locale } = useLocale();
  const t = translations.blogPage;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [draftTopicId, setDraftTopicId] = useState(selectedTopicId);
  const [isMobile, setIsMobile] = useState(false);
  const [, startTransition] = useTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // Detect mobile viewport (<= 640px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setDraftTopicId(selectedTopicId);
        setSearchQuery("");
      }
      return !prev;
    });
  };

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll on mobile when sheet is open
  useEffect(() => {
    if (isOpen && isMobile) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, isMobile]);

  // Handle Escape key and outside click for dismissal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!isMobile && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen, isMobile]);

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleApplyMobile = () => {
    startTransition(() => {
      onSelectTopic(draftTopicId);
    });
    handleClose();
  };

  const handleClearMobile = () => {
    setDraftTopicId("all");
    startTransition(() => {
      onSelectTopic("all");
    });
    handleClose();
  };

  const handleSelectDesktop = (topicId: string) => {
    startTransition(() => {
      onSelectTopic(topicId);
    });
    handleClose();
  };

  const handleQuickClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(() => {
      onSelectTopic("all");
    });
  };

  // Filter topics case-insensitively
  const filteredTopics = topics.filter((tItem) =>
    tItem.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const isFiltered = selectedTopicId !== "all";
  const selectedTopicItem = topics.find((tItem) => tItem.id === selectedTopicId);
  const activeLabel = isFiltered
    ? selectedTopicItem?.label || selectedTopicId
    : t.allCategories[locale];

  return (
    <div className="blog-topic-filter-wrapper" ref={containerRef}>
      <div className="blog-topic-filter-trigger-group">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          className={`blog-topic-trigger ${isFiltered ? "blog-topic-trigger--active" : ""}`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="blog-topic-dialog"
          aria-label={`${t.topicsButton[locale]}: ${activeLabel}. ${topics.length} ${t.topicsButton[locale].toLowerCase()} available`}
        >
          {/* Sliders / Filter icon */}
          <svg
            className="blog-topic-trigger__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>

          <span className="blog-topic-trigger__label">{t.topicsButton[locale]}</span>

          <span className="blog-topic-trigger__count" aria-hidden="true">
            {topics.length}
          </span>

          {isFiltered && <span className="blog-topic-trigger__dot" aria-hidden="true" />}

          {/* Chevron */}
          <svg
            className={`blog-topic-trigger__chevron ${isOpen ? "blog-topic-trigger__chevron--open" : ""}`}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Clear pill if a specific topic is selected */}
        {isFiltered && (
          <button
            type="button"
            onClick={handleQuickClear}
            className="blog-topic-active-chip"
            aria-label={`${t.clearFilter[locale]}: ${activeLabel}`}
            title={`${t.clearFilter[locale]}: ${activeLabel}`}
          >
            <span className="blog-topic-active-chip__label">{activeLabel}</span>
            <svg
              className="blog-topic-active-chip__icon"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Popover (Desktop) / Bottom Sheet (Mobile) */}
      {isOpen && (
        <>
          {/* Backdrop (rendered always when open for mobile dismissal & visual dimming) */}
          <div className="blog-topic-backdrop" onClick={handleClose} aria-hidden="true" />

          <div
            id="blog-topic-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`blog-topic-dialog ${isMobile ? "blog-topic-dialog--sheet" : "blog-topic-dialog--popover"}`}
          >
            {/* Sheet Handle (mobile only) */}
            {isMobile && <div className="blog-topic-sheet__handle" aria-hidden="true" />}

            {/* Header */}
            <div className="blog-topic-dialog__header">
              <h2 id={titleId} className="blog-topic-dialog__title">
                {t.filterByTopic[locale]}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="blog-topic-dialog__close"
                aria-label={t.closeFilter[locale]}
              >
                <svg
                  width="18"
                  height="18"
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

            {/* Topic Search Input */}
            <div className="blog-topic-dialog__search-box">
              <svg
                className="blog-topic-dialog__search-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchTopicsPlaceholder[locale]}
                aria-label={t.searchTopicsPlaceholder[locale]}
                className="blog-topic-dialog__search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="blog-topic-dialog__search-clear"
                  aria-label={t.clearFilter[locale]}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Topic Options List */}
            <div
              className="blog-topic-dialog__list"
              role="listbox"
              aria-label={t.filterByTopic[locale]}
            >
              {/* "All topics" Option */}
              {(!searchQuery ||
                t.allCategories[locale]
                  .toLowerCase()
                  .includes(searchQuery.trim().toLowerCase())) && (
                <button
                  type="button"
                  role="option"
                  aria-selected={isMobile ? draftTopicId === "all" : selectedTopicId === "all"}
                  onClick={() => {
                    if (isMobile) {
                      setDraftTopicId("all");
                    } else {
                      handleSelectDesktop("all");
                    }
                  }}
                  className={`blog-topic-option ${
                    (isMobile ? draftTopicId === "all" : selectedTopicId === "all")
                      ? "blog-topic-option--selected"
                      : ""
                  }`}
                >
                  <div className="blog-topic-option__indicator" aria-hidden="true">
                    {(isMobile ? draftTopicId === "all" : selectedTopicId === "all") && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="blog-topic-option__label">{t.allCategories[locale]}</span>
                  <span className="blog-topic-option__count">{totalPosts}</span>
                </button>
              )}

              {/* Filtered Category Options */}
              {filteredTopics.map((tItem) => {
                const isSelected = isMobile
                  ? draftTopicId === tItem.id
                  : selectedTopicId === tItem.id;

                return (
                  <button
                    key={tItem.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      if (isMobile) {
                        setDraftTopicId(tItem.id);
                      } else {
                        handleSelectDesktop(tItem.id);
                      }
                    }}
                    className={`blog-topic-option ${isSelected ? "blog-topic-option--selected" : ""}`}
                  >
                    <div className="blog-topic-option__indicator" aria-hidden="true">
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="blog-topic-option__label">{tItem.label}</span>
                    <span className="blog-topic-option__count">{tItem.count}</span>
                  </button>
                );
              })}

              {filteredTopics.length === 0 &&
                searchQuery &&
                !t.allCategories[locale]
                  .toLowerCase()
                  .includes(searchQuery.trim().toLowerCase()) && (
                  <div className="blog-topic-dialog__empty">
                    <p>{t.noTopicsFound[locale]}</p>
                  </div>
                )}
            </div>

            {/* Footer Actions */}
            {isMobile ? (
              <div className="blog-topic-dialog__footer">
                <button
                  type="button"
                  onClick={handleClearMobile}
                  className="button button-secondary blog-topic-dialog__btn-clear"
                >
                  {t.clearFilter[locale]}
                </button>
                <button
                  type="button"
                  onClick={handleApplyMobile}
                  className="button button-primary blog-topic-dialog__btn-apply"
                >
                  {t.applyFilter[locale]}
                </button>
              </div>
            ) : (
              selectedTopicId !== "all" && (
                <div className="blog-topic-dialog__desktop-footer">
                  <button
                    type="button"
                    onClick={() => handleSelectDesktop("all")}
                    className="blog-topic-dialog__desktop-clear-link"
                  >
                    {t.clearFilter[locale]}
                  </button>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
