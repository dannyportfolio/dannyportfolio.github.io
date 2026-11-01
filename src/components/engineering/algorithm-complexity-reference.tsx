"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ComplexityGrowthExplorer } from "@/components/engineering/complexity-growth-explorer";
import {
  asymptoticBounds,
  complexityClasses,
  analysisExamples,
  engineeringTradeoffs,
} from "@/data/algorithm-complexity";
import type { Locale } from "@/data/translations";
import { translations } from "@/data/translations";

type LearningGroup = "fundamentals" | "growth-rates" | "code-analysis" | "applications";

export function AlgorithmComplexityReference({ locale }: { locale: Locale }) {
  const [activeGroup, setActiveGroup] = useState<LearningGroup>("fundamentals");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({});
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    "constant-access": true,
    "linear-traversal": true,
    "nested-loops": true,
  });
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const t = translations.engineeringPage;

  const learningGroups: {
    id: LearningGroup;
    index: number;
    label: { en: string; id: string };
    shortLabel: { en: string; id: string };
    summary: { en: string; id: string };
  }[] = [
    {
      id: "fundamentals",
      index: 1,
      label: t.groupFundamentals,
      shortLabel: t.groupFundamentalsShort,
      summary: {
        en: "Asymptotic bounds (O, Ω, Θ), mathematical simplification, and time vs space trade-offs.",
        id: "Batas asimptotik (O, Ω, Θ), penyederhanaan matematis, serta kompromi waktu vs memori.",
      },
    },
    {
      id: "growth-rates",
      index: 2,
      label: t.groupGrowthRates,
      shortLabel: t.groupGrowthRatesShort,
      summary: {
        en: "The 7 canonical complexity classes from O(1) to O(n!) and interactive growth explorer.",
        id: "7 kelas kompleksitas kanonikal dari O(1) hingga O(n!) dan penjelajah grafik pertumbuhan interaktif.",
      },
    },
    {
      id: "code-analysis",
      index: 3,
      label: t.groupCodeAnalysis,
      shortLabel: t.groupCodeAnalysisShort,
      summary: {
        en: "Systematic 10-step audit protocol with annotated TypeScript examples.",
        id: "Protokol audit 10-langkah sistematis disertai contoh kode TypeScript beranotasi.",
      },
    },
    {
      id: "applications",
      index: 4,
      label: t.groupApplications,
      shortLabel: t.groupApplicationsShort,
      summary: {
        en: "Real-world engineering trade-offs, cache locality, and quick reference lookup matrix.",
        id: "Kompromi rekayasa dunia nyata, lokalitas cache CPU, dan matriks referensi cepat.",
      },
    },
  ];

  const currentGroupIndex = learningGroups.findIndex((g) => g.id === activeGroup);
  const currentGroup = learningGroups[currentGroupIndex] ?? learningGroups[0];

  // Hash-based navigation and backward compatibility
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      if (hash === "fundamentals" || hash === "overview" || hash === "space-time") {
        setActiveGroup("fundamentals");
      } else if (hash === "growth-rates" || hash === "classes" || hash === "visualizer") {
        setActiveGroup("growth-rates");
      } else if (hash === "code-analysis" || hash === "analysis") {
        setActiveGroup("code-analysis");
      } else if (hash === "applications" || hash === "tradeoffs" || hash === "quickref") {
        setActiveGroup("applications");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Sync hash when activeGroup changes
  const switchGroup = (groupId: LearningGroup) => {
    setActiveGroup(groupId);
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${groupId}`);
    }
  };

  // Close mobile menu on outside click or escape
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleClassExpansion = (notation: string) => {
    setExpandedClasses((prev) => ({
      ...prev,
      [notation]: !prev[notation],
    }));
  };

  const toggleExampleExpansion = (id: string) => {
    setExpandedExamples((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div id="complexity-handbook" className="editorial-handbook">
      {/* Editorial Navigation: Desktop Segmented Bar */}
      <nav className="complexity-segmented-nav" aria-label="Learning Groups">
        {learningGroups.map((group) => {
          const isActive = activeGroup === group.id;
          return (
            <button
              key={group.id}
              type="button"
              className={`complexity-segment-button ${isActive ? "is-active" : ""}`}
              onClick={() => switchGroup(group.id)}
              aria-selected={isActive}
              role="tab"
            >
              <span className="complexity-segment-button__num">0{group.index}</span>
              <span className="complexity-segment-button__label">{group.label[locale]}</span>
            </button>
          );
        })}
      </nav>

      {/* Editorial Navigation: Mobile Compact 'On This Page' Control */}
      <div className="complexity-mobile-nav" ref={mobileNavRef}>
        <button
          type="button"
          className="complexity-mobile-selector"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-haspopup="listbox"
          aria-label={`${locale === "en" ? "On this page" : "Daftar topik"}: ${currentGroup.label[locale]}`}
        >
          <span className="complexity-mobile-selector__lead">
            <svg
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
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            {locale === "en" ? "On this page" : "Topik bahasan"}
          </span>
          <span className="complexity-mobile-selector__dot">·</span>
          <span className="complexity-mobile-selector__active">
            {currentGroup.shortLabel[locale]}
          </span>
          <svg
            className={`complexity-mobile-selector__chevron ${mobileMenuOpen ? "is-open" : ""}`}
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

        {mobileMenuOpen && (
          <div
            className="complexity-mobile-dropdown"
            role="listbox"
            aria-label="Engineering Learning Groups"
          >
            {learningGroups.map((group) => {
              const isActive = activeGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`complexity-mobile-option ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    switchGroup(group.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="complexity-mobile-option__num">0{group.index}</span>
                  <div className="complexity-mobile-option__content">
                    <span className="complexity-mobile-option__title">{group.label[locale]}</span>
                    <span className="complexity-mobile-option__desc">{group.summary[locale]}</span>
                  </div>
                  {isActive && (
                    <svg
                      className="complexity-mobile-option__check"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ACTIVE LEARNING GROUP VIEW */}
      <div className="editorial-group-container">
        {/* ========================================================= */}
        {/* GROUP 1: COMPLEXITY FUNDAMENTALS                          */}
        {/* ========================================================= */}
        {activeGroup === "fundamentals" && (
          <section className="editorial-panel" aria-label="Complexity Fundamentals">
            <header className="editorial-group-header">
              <span className="editorial-group-index">GROUP 01</span>
              <h2 className="editorial-group-title">{t.groupFundamentals[locale]}</h2>
              <p className="editorial-lead">
                {locale === "en"
                  ? "Algorithmic complexity quantifies the mathematical relationship between input growth and computational resource demand. It abstracts hardware variance to evaluate scaling ceilings, asymptotic limits, and runtime predictability."
                  : "Kompleksitas algoritma mengukur hubungan matematis antara pertumbuhan ukuran masukan dan kebutuhan sumber daya komputasi. Konsep ini mengabaikan spesifikasi mesin untuk menganalisis batas skalabilitas dan prediktabilitas waktu eksekusi."}
              </p>
            </header>

            {/* Asymptotic Bounds: O, Omega, Theta */}
            <div className="editorial-block">
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Asymptotic Bounds: Formal Limits"
                  : "Batas Asimptotik: Batasan Formal"}
              </h3>
              <p className="editorial-prose">
                {locale === "en"
                  ? "In production engineering, we frequently conflate Big O with worst-case runtime. Mathematically, asymptotic notation describes three distinct boundary conditions for algorithm growth:"
                  : "Dalam praktik rekayasa perangkat lunak, istilah Big O sering disamakan dengan skenario terburuk (worst-case). Secara matematis, notasi asimptotik memetakan tiga kondisi batas pertumbuhan:"}
              </p>

              <div className="bounds-editorial-strip">
                {asymptoticBounds.map((bound) => (
                  <div key={bound.symbol} className="bound-editorial-card">
                    <div className="bound-editorial-card__head">
                      <span className="bound-editorial-card__symbol">{bound.symbol}</span>
                      <h4 className="bound-editorial-card__name">{bound.name[locale]}</h4>
                    </div>
                    <code className="bound-editorial-card__formula">{bound.formal}</code>
                    <p className="bound-editorial-card__desc">{bound.intuitive[locale]}</p>
                    <div className="bound-editorial-card__analogy">
                      <span className="bound-editorial-card__tag">
                        {locale === "en" ? "Relational Equivalent:" : "Analogi:"}
                      </span>{" "}
                      {bound.analogy[locale]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Terminology Strip */}
            <div className="editorial-block">
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Core Algorithmic Terminology"
                  : "Terminologi Kunci Analisis Kompleksitas"}
              </h3>
              <div className="terms-editorial-grid">
                <div className="term-editorial-item">
                  <h4>
                    {locale === "en"
                      ? "Worst-Case Analysis (T_worst)"
                      : "Analisis Kasus Terburuk (T_worst)"}
                  </h4>
                  <p>
                    {locale === "en"
                      ? "The absolute maximum operations required across all possible input permutations of size n. Provides hard contractual runtime guarantees for SLAs."
                      : "Jumlah operasi maksimum yang dibutuhkan pada semua permutasi input berukuran n. Menjadi garansi batas atas untuk SLA sistem produksi."}
                  </p>
                </div>
                <div className="term-editorial-item">
                  <h4>
                    {locale === "en"
                      ? "Average-Case Analysis (T_avg)"
                      : "Analisis Kasus Rata-rata (T_avg)"}
                  </h4>
                  <p>
                    {locale === "en"
                      ? "The expected operations over an assumed statistical distribution of inputs. Key for estimating steady-state cloud infrastructure and capacity planning."
                      : "Ekspektasi operasi berdasarkan distribusi statistik input. Fondasi untuk estimasi kapasitas server dan biaya infrastruktur cloud jangka panjang."}
                  </p>
                </div>
                <div className="term-editorial-item">
                  <h4>
                    {locale === "en"
                      ? "Best-Case Analysis (T_best)"
                      : "Analisis Kasus Terbaik (T_best)"}
                  </h4>
                  <p>
                    {locale === "en"
                      ? "The minimum operations under ideal input conditions (e.g., target element at index 0). Useful as a sanity check, but dangerous if relied upon for sizing."
                      : "Operasi minimum pada kondisi data paling menguntungkan. Berguna sebagai sanity check, namun berisiko jika dijadikan acuan arsitektur."}
                  </p>
                </div>
                <div className="term-editorial-item">
                  <h4>
                    {locale === "en" ? "Amortized Analysis" : "Analisis Teramortisasi (Amortized)"}
                  </h4>
                  <p>
                    {locale === "en"
                      ? "The average cost per operation over an extended sequence. An occasional expensive resizing operation (e.g., array capacity doubling) is averaged across preceding cheap insertions, yielding O(1) amortized."
                      : "Biaya rata-rata per operasi dalam rentetan panjang. Operasi mahal yang terjadi sesekali (seperti penggandaan array) diserap oleh operasi murah sebelumnya sehingga menghasilkan O(1) amortized."}
                  </p>
                </div>
              </div>
            </div>

            {/* Mathematical Derivation Callout */}
            <div className="editorial-block">
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Mathematical Simplification & Dominant Terms"
                  : "Penyederhanaan Matematis & Istilah Dominan"}
              </h3>
              <p className="editorial-prose">
                {locale === "en"
                  ? "When deriving asymptotic complexity from execution step counts, two foundational rules eliminate implementation-level noise:"
                  : "Saat menurunkan kompleksitas asimptotik dari hitungan langkah eksekusi, dua kaidah fundamental mengeliminasi detail implementasi minor:"}
              </p>

              <div className="math-highlight-card">
                <div className="math-highlight-card__badge">
                  {locale === "en"
                    ? "Rule of Dominance & Constants"
                    : "Kaidah Dominasi & Konstanta"}
                </div>
                <div className="math-highlight-card__formula">
                  <span>T(n) = 3n² + 5n + 10</span>
                  <span className="math-highlight-card__arrow">⟶</span>
                  <span className="math-highlight-card__result">O(n²)</span>
                </div>
                <div className="math-highlight-card__breakdown">
                  <div className="math-step">
                    <strong>1. Drop Multiplicative Constants:</strong>
                    <span>
                      {locale === "en"
                        ? "Constant multipliers (e.g., 3 in 3n²) depend on compiler optimizations, CPU clock rates, and cache speeds. As n scales, the geometric growth curve dominates the coefficient."
                        : "Konstanta pengali (seperti 3 pada 3n²) dipengaruhi optimasi compiler dan clock CPU. Saat n membesar, kurva pertumbuhan eksponensial/kuadratik jauh melampaui koefisien tersebut."}
                    </span>
                  </div>
                  <div className="math-step">
                    <strong>2. Drop Non-Dominant Terms:</strong>
                    <span>
                      {locale === "en"
                        ? "For large n, the fastest growing term completely dwarfs smaller terms. For n = 10,000, n² = 100,000,000 while 5n is only 50,000 (0.05% of the total runtime)."
                        : "Untuk n besar, suku dengan pertumbuhan tercepat mendominasi total beban kerja. Pada n = 10.000, n² menghasilkan 100.000.000 operasi sementara 5n hanya 50.000 (0,05% dari total)."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time vs Space Complexity */}
            <div className="editorial-block">
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Time vs Space: The Dual Resource Dimensions"
                  : "Dimensi Waktu vs Memori"}
              </h3>
              <div className="space-time-editorial-grid">
                <div className="dimension-editorial-card">
                  <h4>
                    {locale === "en"
                      ? "Time Complexity (CPU Cycles)"
                      : "Kompleksitas Waktu (Siklus CPU)"}
                  </h4>
                  <p>
                    {locale === "en"
                      ? "Measures CPU instruction cycles relative to n. In serverless or containerized environments, excessive time complexity drives request timeouts, thread starvation, and higher compute billing."
                      : "Mengukur siklus instruksi CPU sebanding dengan n. Pada arsitektur cloud serverless, kompleksitas waktu tinggi memicu request timeout dan lonjakan tagihan komputasi."}
                  </p>
                </div>
                <div className="dimension-editorial-card">
                  <h4>
                    {locale === "en"
                      ? "Space Complexity (Auxiliary Heap & Stack)"
                      : "Kompleksitas Memori (Heap & Stack)"}
                  </h4>
                  <p>
                    {locale === "en"
                      ? "Measures additional memory allocated beyond input storage. Recursive algorithms incur O(d) call stack frames; auxiliary hash sets incur O(n) heap memory. Exceeding pod memory limits triggers fatal Linux OOM kills."
                      : "Mengukur alokasi memori tambahan di luar input asli. Rekursi memakan frame stack sebesar O(kedalaman); hash table memakan memori heap O(n). Melampaui limit pod akan memicu OOM Kill dari kernel Linux."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* GROUP 2: GROWTH RATES                                     */}
        {/* ========================================================= */}
        {activeGroup === "growth-rates" && (
          <section className="editorial-panel" aria-label="Growth Rates & Visualizer">
            <header className="editorial-group-header">
              <span className="editorial-group-index">GROUP 02</span>
              <h2 className="editorial-group-title">{t.groupGrowthRates[locale]}</h2>
              <p className="editorial-lead">
                {locale === "en"
                  ? "Computational curves separate scalable architectures from catastrophic bottlenecks. Explore the seven canonical complexity classes and interactively inspect how operation counts explode as input expands."
                  : "Kurva komputasi membedakan arsitektur yang tahan uji dari bottleneck sistem. Pelajari tujuh kelas kompleksitas kanonikal dan amati langsung bagaimana beban operasi meningkat pesat saat input bertambah."}
              </p>
            </header>

            {/* Canonical Complexity Classes Table */}
            <div className="editorial-block">
              <div className="classes-editorial-header">
                <div>
                  <h3 className="editorial-subheading" style={{ margin: 0 }}>
                    {locale === "en"
                      ? "The Seven Canonical Complexity Classes"
                      : "Tujuh Kelas Kompleksitas Kanonikal"}
                  </h3>
                  <p className="editorial-prose" style={{ marginTop: "6px", marginBottom: "16px" }}>
                    {locale === "en"
                      ? "From O(1) instant lookups to O(n!) combinatorial explosion. Click on any row to expand technical details, threshold limits, and TypeScript implementation."
                      : "Mulai dari lookup O(1) instan hingga ledakan permutasi O(n!). Klik baris manapun untuk membuka detail teknis, batas toleransi, dan kode TypeScript."}
                  </p>
                </div>
              </div>

              <div className="classes-editorial-table">
                <div className="classes-table-head">
                  <span className="col-notation">{locale === "en" ? "Notation" : "Notasi"}</span>
                  <span className="col-name">
                    {locale === "en" ? "Classification" : "Klasifikasi"}
                  </span>
                  <span className="col-example">
                    {locale === "en" ? "Typical Operation" : "Operasi Khas"}
                  </span>
                  <span className="col-growth">
                    {locale === "en" ? "Scalability" : "Skalabilitas"}
                  </span>
                  <span className="col-action"></span>
                </div>

                {complexityClasses.map((cls) => {
                  const isExpanded = expandedClasses[cls.notation];
                  return (
                    <div
                      key={cls.notation}
                      className={`classes-table-row-group ${isExpanded ? "is-expanded" : ""}`}
                    >
                      <button
                        type="button"
                        className="classes-table-row"
                        onClick={() => toggleClassExpansion(cls.notation)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle details for ${cls.notation} ${cls.name[locale]}`}
                      >
                        <span className="col-notation">
                          <code className="classes-table-notation">{cls.notation}</code>
                        </span>
                        <span className="col-name">
                          <strong className="classes-table-name">{cls.name[locale]}</strong>
                        </span>
                        <span className="col-example">
                          <span className="classes-table-example">{cls.example[locale]}</span>
                        </span>
                        <span className="col-growth">
                          <span className="classes-table-behavior">
                            {cls.growthBehavior[locale]}
                          </span>
                        </span>
                        <span className="col-action">
                          <span className="classes-table-toggle">
                            {isExpanded
                              ? locale === "en"
                                ? "Close −"
                                : "Tutup −"
                              : locale === "en"
                                ? "Code +"
                                : "Kode +"}
                          </span>
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="classes-table-drawer">
                          <div className="classes-drawer-grid">
                            <div className="classes-drawer-info">
                              <div className="classes-drawer-item">
                                <span className="classes-drawer-label">
                                  {locale === "en" ? "Formal Definition" : "Definisi Formal"}
                                </span>
                                <p>{cls.definition[locale]}</p>
                              </div>
                              <div className="classes-drawer-item">
                                <span className="classes-drawer-label">
                                  {locale === "en" ? "Problematic Boundary" : "Batas Bermasalah"}
                                </span>
                                <p>{cls.problematicWhen[locale]}</p>
                              </div>
                              <div className="classes-drawer-item">
                                <span className="classes-drawer-label">
                                  {locale === "en"
                                    ? "Production Use Cases"
                                    : "Penggunaan di Produksi"}
                                </span>
                                <ul className="classes-drawer-list">
                                  {cls.useCases[locale].map((uc, i) => (
                                    <li key={i}>{uc}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="classes-drawer-code">
                              <div className="classes-drawer-code-head">
                                <span>{cls.snippetCaption[locale]}</span>
                                <span className="classes-code-badge">TypeScript</span>
                              </div>
                              <pre className="classes-code-pre">
                                <code>{cls.snippet}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Growth Explorer */}
            <div className="editorial-block" style={{ marginTop: "48px" }}>
              <div className="explorer-editorial-heading">
                <Badge>{locale === "en" ? "Interactive Lab" : "Laboratorium Interaktif"}</Badge>
                <h3
                  className="editorial-subheading"
                  style={{ marginTop: "12px", marginBottom: "8px" }}
                >
                  {locale === "en" ? "Complexity Growth Explorer" : "Eksplorasi Kurva Pertumbuhan"}
                </h3>
                <p className="editorial-prose" style={{ margin: "0 0 24px 0" }}>
                  {locale === "en"
                    ? "Adjust input size n and toggle individual complexity curves. Observe the logarithmic divergence: while O(1) and O(log n) remain flat, O(2ⁿ) and O(n!) escape standard coordinates almost immediately."
                    : "Atur ukuran masukan n dan aktifkan kurva kompleksitas secara individual. Perhatikan divergensi komputasi: saat O(1) dan O(log n) tetap datar, O(2ⁿ) dan O(n!) melesat keluar koordinat dalam sekejap."}
                </p>
              </div>

              <div className="explorer-editorial-wrapper">
                <ComplexityGrowthExplorer locale={locale} />
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* GROUP 3: CODE ANALYSIS                                    */}
        {/* ========================================================= */}
        {activeGroup === "code-analysis" && (
          <section className="editorial-panel" aria-label="Code Analysis & Protocol">
            <header className="editorial-group-header">
              <span className="editorial-group-index">GROUP 03</span>
              <h2 className="editorial-group-title">{t.groupCodeAnalysis[locale]}</h2>
              <p className="editorial-lead">
                {locale === "en"
                  ? "Rigorous algorithm analysis is an indispensable engineering discipline. Apply this 10-step audit protocol to analyze time and memory scaling in production pull requests."
                  : "Menganalisis algoritma secara presisi adalah keterampilan wajib bagi software engineer. Terapkan protokol audit 10-langkah ini untuk mengevaluasi efisiensi kode pada pull request produksi."}
              </p>
            </header>

            {/* 10-Step Code Audit Protocol */}
            <div className="editorial-block">
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "The 10-Step Algorithmic Audit Protocol"
                  : "Protokol 10-Langkah Audit Algoritma"}
              </h3>
              <p className="editorial-prose">
                {locale === "en"
                  ? "Follow these sequential checks whenever reviewing loops, recursive routines, or data transformation pipelines:"
                  : "Ikuti langkah berurutan ini saat meninjau perulangan, rutinitas rekursif, atau pipeline transformasi data:"}
              </p>

              <div className="protocol-steps-grid">
                {[
                  {
                    step: "01",
                    title: {
                      en: "Identify Input Dimensions (n, m)",
                      id: "Identifikasi Dimensi Input (n, m)",
                    },
                    desc: {
                      en: "Determine exactly which parameters scale. Distinguish between single array lengths (n) and multiple inputs (n * m).",
                      id: "Tentukan parameter mana yang dapat bertambah. Bedakan antara panjang array tunggal (n) dan banyak input (n * m).",
                    },
                  },
                  {
                    step: "02",
                    title: { en: "Locate Primitive Operations", id: "Temukan Operasi Primitif" },
                    desc: {
                      en: "Identify basic CPU operations: arithmetic (+, -, *, /), assignments, array index lookups, and comparisons. Each costs O(1).",
                      id: "Identifikasi operasi dasar CPU: aritmatika, assignment variabel, akses indeks array, dan perbandingan bernilai O(1).",
                    },
                  },
                  {
                    step: "03",
                    title: { en: "Inspect Iterative Loop Bounds", id: "Periksa Batas Perulangan" },
                    desc: {
                      en: "Analyze loop start, termination condition, and step increment (i++, i += 2, or i *= 2).",
                      id: "Analisis nilai awal perulangan, kondisi terminasi, dan kenaikan variabel (i++, i += 2, atau i *= 2).",
                    },
                  },
                  {
                    step: "04",
                    title: {
                      en: "Multiply Nested Loop Levels",
                      id: "Kalikan Perulangan Bersarang",
                    },
                    desc: {
                      en: "If inner loop iterations depend on outer loops, compute the exact summation series (e.g., Σ i = n(n-1)/2 = O(n²)).",
                      id: "Jika putaran loop dalam bergantung pada loop luar, hitung deret penjumlahannya (contoh: Σ i = n(n-1)/2 = O(n²)).",
                    },
                  },
                  {
                    step: "05",
                    title: { en: "Sum Sequential Code Blocks", id: "Jumlahkan Blok Sekuensial" },
                    desc: {
                      en: "Consecutive operations add together: O(n) + O(m) = O(n + m). If n >> m, it simplifies to O(n).",
                      id: "Operasi berturutan saling menjumlahkan: O(n) + O(m) = O(n + m). Jika n >> m, sederhanakan menjadi O(n).",
                    },
                  },
                  {
                    step: "06",
                    title: { en: "Drop Multiplicative Constants", id: "Abaikan Konstanta Pengali" },
                    desc: {
                      en: "T(n) = 4n + 12 simplifies to O(n). Constants reflect micro-optimizations, not asymptotic growth ceilings.",
                      id: "T(n) = 4n + 12 disederhanakan menjadi O(n). Konstanta mencerminkan efisiensi mikro, bukan limit pertumbuhan.",
                    },
                  },
                  {
                    step: "07",
                    title: {
                      en: "Eliminate Lower-Order Terms",
                      id: "Eliminasi Suku Tingkat Rendah",
                    },
                    desc: {
                      en: "In polynomial functions such as T(n) = 2n³ + 50n² + 1000, retain only the highest-order exponent (O(n³)).",
                      id: "Pada fungsi polinomial seperti T(n) = 2n³ + 50n² + 1000, simpan hanya pangkat tertinggi (O(n³)).",
                    },
                  },
                  {
                    step: "08",
                    title: {
                      en: "Evaluate Branching Worst-Case",
                      id: "Evaluasi Skenario Percabangan Terburuk",
                    },
                    desc: {
                      en: "If if/else branches execute different complexities, characterize the worst-case path as the contractual SLA limit.",
                      id: "Jika percabangan if/else memiliki kompleksitas berbeda, tetapkan jalur terberat sebagai batas aman SLA.",
                    },
                  },
                  {
                    step: "09",
                    title: {
                      en: "Audit Auxiliary Heap Allocations",
                      id: "Audit Alokasi Memori Tambahan",
                    },
                    desc: {
                      en: "Track arrays, sets, maps, or cloned objects instantiated during execution to establish auxiliary space complexity.",
                      id: "Lacak array, hash set, map, atau cloning objek yang dibuat saat eksekusi untuk menghitung kebutuhan RAM.",
                    },
                  },
                  {
                    step: "10",
                    title: {
                      en: "Calculate Recursion Tree Depth",
                      id: "Hitung Kedalaman Pohon Rekursi",
                    },
                    desc: {
                      en: "For recursive routines, calculate call stack frame depth (O(d) space) and branch factor (O(bᵈ) time).",
                      id: "Untuk fungsi rekursif, hitung kedalaman call stack (memori O(d)) dan faktor percabangan (waktu O(bᵈ)).",
                    },
                  },
                ].map((item) => (
                  <div key={item.step} className="protocol-step-card">
                    <span className="protocol-step-num">{item.step}</span>
                    <h4 className="protocol-step-title">{item.title[locale]}</h4>
                    <p className="protocol-step-desc">{item.desc[locale]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete TypeScript Walkthroughs */}
            <div className="editorial-block" style={{ marginTop: "48px" }}>
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Annotated Code Analysis Walkthroughs"
                  : "Studi Kasus Analisis Kode Teranotasi"}
              </h3>
              <p className="editorial-prose">
                {locale === "en"
                  ? "Examine these real-world TypeScript implementations, breaking down operation counts line-by-line:"
                  : "Telusuri implementasi TypeScript nyata berikut, lengkap dengan pembuktian hitungan operasi baris demi baris:"}
              </p>

              <div className="analysis-editorial-list">
                {analysisExamples.slice(0, 3).map((example) => {
                  const isExpanded = expandedExamples[example.id] ?? true;
                  return (
                    <article key={example.id} className="analysis-editorial-card">
                      <div className="analysis-card-header">
                        <div>
                          <h4 className="analysis-card-title">{example.title[locale]}</h4>
                          <p className="analysis-card-expl">{example.explanation[locale]}</p>
                        </div>
                        <div className="analysis-card-badges">
                          <span className="badge-mono-accent">{example.complexity}</span>
                          <span className="badge-mono-muted">{example.spaceComplexity}</span>
                        </div>
                      </div>

                      <div className="analysis-card-body">
                        <div className="analysis-card-code">
                          <pre>
                            <code>{example.code}</code>
                          </pre>
                        </div>

                        <div className="analysis-card-reasoning">
                          <button
                            type="button"
                            className="analysis-reasoning-toggle"
                            onClick={() => toggleExampleExpansion(example.id)}
                            aria-expanded={isExpanded}
                          >
                            <span>
                              {locale === "en"
                                ? "Line-by-Line Complexity Proof"
                                : "Pembuktian Kompleksitas Baris"}
                            </span>
                            <span>{isExpanded ? "▲" : "▼"}</span>
                          </button>

                          {isExpanded && (
                            <ol className="analysis-reasoning-steps">
                              {example.reasoning[locale].map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* GROUP 4: ENGINEERING APPLICATIONS                         */}
        {/* ========================================================= */}
        {activeGroup === "applications" && (
          <section className="editorial-panel" aria-label="Engineering Applications & Trade-offs">
            <header className="editorial-group-header">
              <span className="editorial-group-index">GROUP 04</span>
              <h2 className="editorial-group-title">{t.groupApplications[locale]}</h2>
              <p className="editorial-lead">
                {locale === "en"
                  ? "Asymptotic theory assumes n approaches infinity. Production engineering operates within finite physical constraints: CPU caches, memory bandwidth, network latency, and garbage collection pauses."
                  : "Teori asimptotik mengasumsikan n mendekati tak terhingga. Namun rekayasa sistem produksi berjalan dalam batas fisik nyata: cache CPU, bandwidth bus memori, latensi jaringan, dan jeda garbage collection."}
              </p>
            </header>

            {/* Production Engineering Trade-offs */}
            <div className="editorial-block">
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Four Engineering Trade-Offs in Practice"
                  : "Empat Kompromi Rekayasa di Lapangan"}
              </h3>

              <div className="tradeoffs-editorial-grid">
                {engineeringTradeoffs.map((item, idx) => (
                  <article key={idx} className="tradeoff-editorial-card">
                    <span className="tradeoff-editorial-index">0{idx + 1}</span>
                    <h4 className="tradeoff-editorial-title">{item.title[locale]}</h4>
                    <p className="tradeoff-editorial-desc">{item.desc[locale]}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Quick Reference Matrix */}
            <div className="editorial-block" style={{ marginTop: "48px" }}>
              <h3 className="editorial-subheading">
                {locale === "en"
                  ? "Quick Operational Reference Matrix"
                  : "Matriks Referensi Cepat Beban Operasi"}
              </h3>
              <p className="editorial-prose">
                {locale === "en"
                  ? "A rapid engineering cheat-sheet showing estimated step counts as dataset scale n increases by orders of magnitude:"
                  : "Tabel panduan cepat yang memetakan estimasi jumlah operasi saat ukuran dataset n meningkat berlipat ganda:"}
              </p>

              <div className="quickref-editorial-wrapper">
                <table className="quickref-editorial-table">
                  <thead>
                    <tr>
                      <th>{locale === "en" ? "Complexity" : "Kompleksitas"}</th>
                      <th>n = 10</th>
                      <th>n = 100</th>
                      <th>n = 1,000</th>
                      <th>n = 1,000,000</th>
                      <th>
                        {locale === "en" ? "Production Feasibility" : "Kelayakan di Produksi"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>O(1)</code>
                      </td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        <span className="status-badge status-excellent">
                          {locale === "en" ? "Optimal (Instant)" : "Optimal (Instan)"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>O(log n)</code>
                      </td>
                      <td>~3.3</td>
                      <td>~6.6</td>
                      <td>~10</td>
                      <td>~20</td>
                      <td>
                        <span className="status-badge status-excellent">
                          {locale === "en" ? "Scales Globally" : "Skalabilitas Global"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>O(n)</code>
                      </td>
                      <td>10</td>
                      <td>100</td>
                      <td>1,000</td>
                      <td>1,000,000</td>
                      <td>
                        <span className="status-badge status-good">
                          {locale === "en" ? "Linear (Acceptable)" : "Linear (Aman)"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>O(n log n)</code>
                      </td>
                      <td>~33</td>
                      <td>~664</td>
                      <td>~9,965</td>
                      <td>~20,000,000</td>
                      <td>
                        <span className="status-badge status-good">
                          {locale === "en" ? "Standard for Sorting" : "Standar Sorting"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>O(n²)</code>
                      </td>
                      <td>100</td>
                      <td>10,000</td>
                      <td>1,000,000</td>
                      <td>10¹² (1 Trillion)</td>
                      <td>
                        <span className="status-badge status-warning">
                          {locale === "en" ? "Risky beyond n > 1,000" : "Berisiko jika n > 1.000"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>O(2ⁿ)</code>
                      </td>
                      <td>1,024</td>
                      <td>1.26 × 10³⁰</td>
                      <td>Overflow</td>
                      <td>Overflow</td>
                      <td>
                        <span className="status-badge status-danger">
                          {locale === "en" ? "Intractable (n ≤ 25)" : "Mustahil (n ≤ 25)"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>O(n!)</code>
                      </td>
                      <td>3.62 × 10⁶</td>
                      <td>Overflow</td>
                      <td>Overflow</td>
                      <td>Overflow</td>
                      <td>
                        <span className="status-badge status-danger">
                          {locale === "en" ? "Intractable (n ≤ 11)" : "Mustahil (n ≤ 11)"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quiet Editorial Companion Article Link */}
            <div className="editorial-companion-link">
              <div className="editorial-companion-content">
                <span className="editorial-companion-eyebrow">
                  {locale === "en" ? "COMPANION ESSAY" : "ARTIKEL PENDAMPING"}
                </span>
                <h4 className="editorial-companion-title">
                  {locale === "en"
                    ? "Big O Notation & Algorithm Complexity in Production Systems"
                    : "Notasi Big O & Kompleksitas Algoritma pada Sistem Produksi"}
                </h4>
                <p className="editorial-companion-desc">
                  {locale === "en"
                    ? "Read the in-depth architectural breakdown of memory hierarchies, V8 compiler internals, and database indexing strategies."
                    : "Baca ulasan mendalam mengenai hierarki memori, kerja compiler V8, dan strategi indexing database pada skala produksi."}
                </p>
              </div>
              <Link
                href="/blog/big-o-notation-algorithm-complexity"
                className="editorial-companion-cta"
              >
                <span>{locale === "en" ? "Read deep-dive article" : "Baca artikel lengkap"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* Pagination Footer: Seamless Next/Prev Flow */}
      <footer className="editorial-group-pagination">
        {currentGroupIndex > 0 ? (
          <button
            type="button"
            className="pagination-nav-button is-prev"
            onClick={() => switchGroup(learningGroups[currentGroupIndex - 1].id)}
          >
            <span className="pagination-arrow" aria-hidden="true">
              ←
            </span>
            <div className="pagination-text">
              <span className="pagination-sub">
                {locale === "en" ? "Previous Group" : "Grup Sebelumnya"}
              </span>
              <span className="pagination-target">
                {learningGroups[currentGroupIndex - 1].shortLabel[locale]}
              </span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {currentGroupIndex < learningGroups.length - 1 ? (
          <button
            type="button"
            className="pagination-nav-button is-next"
            onClick={() => switchGroup(learningGroups[currentGroupIndex + 1].id)}
          >
            <div className="pagination-text" style={{ textAlign: "right" }}>
              <span className="pagination-sub">
                {locale === "en" ? "Next Group" : "Grup Berikutnya"}
              </span>
              <span className="pagination-target">
                {learningGroups[currentGroupIndex + 1].shortLabel[locale]}
              </span>
            </div>
            <span className="pagination-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ) : (
          <div />
        )}
      </footer>
    </div>
  );
}
