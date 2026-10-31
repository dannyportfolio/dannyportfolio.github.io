"use client";

import { useState } from "react";
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

export function AlgorithmComplexityReference({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const tabs = [
    { id: "overview", label: { en: "1. Overview & Bounds", id: "1. Pengantar & Batasan" } },
    { id: "classes", label: { en: "2. Complexity Classes", id: "2. Kelas Kompleksitas" } },
    { id: "visualizer", label: { en: "3. Growth Explorer", id: "3. Grafik Pertumbuhan" } },
    { id: "space-time", label: { en: "4. Time vs Space", id: "4. Waktu vs Memori" } },
    { id: "analysis", label: { en: "5. Code Analysis", id: "5. Analisis Kode" } },
    { id: "tradeoffs", label: { en: "6. Engineering Trade-offs", id: "6. Kompromi Rekayasa" } },
    { id: "quickref", label: { en: "7. Quick Reference", id: "7. Ringkasan Cepat" } },
  ];

  return (
    <div id="complexity-reference" className="complexity-handbook-container">
      {/* Handbook Header */}
      <div className="complexity-handbook-header">
        <div className="blueprint-badge" style={{ marginBottom: "12px" }}>
          {locale === "en" ? "Engineering Handbook" : "Buku Saku Rekayasa"}
        </div>
        <h2
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.4rem)", fontWeight: 800, margin: "0 0 10px 0" }}
        >
          {locale === "en"
            ? "Understanding Algorithm Complexity"
            : "Memahami Kompleksitas Algoritma"}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--accent)",
            fontWeight: 600,
            margin: "0 0 12px 0",
          }}
        >
          {locale === "en"
            ? '"How efficiently does your code scale as input grows?"'
            : '"Seberapa efisien kode Anda berkembang saat data masukan bertambah?"'}
        </p>
        <p
          style={{
            maxWidth: "780px",
            color: "var(--muted)",
            fontSize: "0.98rem",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {locale === "en"
            ? "A structured reference guide to computational complexity, asymptotic bounds, real-world data structure mechanics, and systematic code analysis."
            : "Panduan referensi teknis terstruktur mengenai kompleksitas komputasi, batas matematis asimptotik, mekanisme struktur data riil, dan analisis kode sistematis."}
        </p>
      </div>

      {/* Navigation Pills */}
      <nav className="complexity-nav-tabs" aria-label="Algorithm Complexity Handbook Sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`complexity-nav-pill ${activeTab === tab.id ? "is-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label[locale]}
          </button>
        ))}
      </nav>

      {/* Tab Panels */}
      <div className="complexity-tab-content">
        {/* TAB 1: OVERVIEW & BOUNDS */}
        {activeTab === "overview" && (
          <div className="complexity-panel animate-fade-in">
            <div className="complexity-card-section">
              <h3 style={{ fontSize: "1.35rem", marginBottom: "12px" }}>
                {locale === "en"
                  ? "1. Introduction: Understanding Algorithm Complexity"
                  : "1. Pengantar: Memahami Kompleksitas Algoritma"}
              </h3>
              <p style={{ color: "var(--text)", lineHeight: 1.65 }}>
                {locale === "en"
                  ? "Algorithm complexity is the mathematical study of the resources (CPU operations and RAM bytes) required by an algorithm as the size of the input data (n) scales toward infinity. In production systems, software developers must differentiate between theoretical complexity and measured wall-clock execution time."
                  : "Kompleksitas algoritma adalah studi matematis mengenai sumber daya (siklus operasi CPU dan byte RAM) yang dibutuhkan algoritma saat ukuran data masukan (n) bertumbuh menuju tak terhingga. Pada sistem produksi, software developer wajib membedakan antara kompleksitas teoretis dan durasi waktu eksekusi riil."}
              </p>

              <div className="complexity-terms-grid" style={{ margin: "24px 0" }}>
                <div className="term-box">
                  <span className="mono term-label">
                    {locale === "en" ? "TERM 01" : "ISTILAH 01"}
                  </span>
                  <strong style={{ display: "block", fontSize: "1rem", margin: "4px 0" }}>
                    Time Complexity
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    {locale === "en"
                      ? "How the total count of elementary operations grows relative to input size."
                      : "Bagaimana jumlah operasi dasar bertambah terhadap ukuran masukan."}
                  </p>
                </div>
                <div className="term-box">
                  <span className="mono term-label">
                    {locale === "en" ? "TERM 02" : "ISTILAH 02"}
                  </span>
                  <strong style={{ display: "block", fontSize: "1rem", margin: "4px 0" }}>
                    Space Complexity
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    {locale === "en"
                      ? "How memory usage (both input storage and auxiliary heap/stack) expands."
                      : "Bagaimana konsumsi memori (penyimpanan input dan stack/heap tambahan) bertambah."}
                  </p>
                </div>
                <div className="term-box">
                  <span className="mono term-label">
                    {locale === "en" ? "TERM 03" : "ISTILAH 03"}
                  </span>
                  <strong style={{ display: "block", fontSize: "1rem", margin: "4px 0" }}>
                    Input Size (n)
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    {locale === "en"
                      ? "The measurable scale of problem input (array length, string characters, database records)."
                      : "Skala kuantitatif dari data masukan (panjang array, karakter teks, jumlah baris database)."}
                  </p>
                </div>
                <div className="term-box">
                  <span className="mono term-label">
                    {locale === "en" ? "TERM 04" : "ISTILAH 04"}
                  </span>
                  <strong style={{ display: "block", fontSize: "1rem", margin: "4px 0" }}>
                    Asymptotic Analysis
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    {locale === "en"
                      ? "Evaluating algorithmic behavior at the mathematical limit as n becomes arbitrarily large."
                      : "Mengevaluasi perilaku algoritma pada limit batas matematis ketika n menjadi sangat besar."}
                  </p>
                </div>
              </div>

              <h4 style={{ fontSize: "1.15rem", marginTop: "28px", marginBottom: "8px" }}>
                {locale === "en"
                  ? "Asymptotic Bounds: Big O, Big Omega, and Big Theta"
                  : "Batasan Asimptotik: Big O, Big Omega, dan Big Theta"}
              </h4>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                {locale === "en"
                  ? "Computer scientists use three distinct notations to describe growth envelopes. They are not interchangeable:"
                  : "Ilmu komputer menggunakan tiga notasi berbeda untuk memetakan ruang pertumbuhan. Ketiganya tidak boleh dipertukarkan:"}
              </p>

              <div className="bounds-cards-grid">
                {asymptoticBounds.map((b) => (
                  <div key={b.symbol} className="bound-card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <span className="mono bound-symbol">{b.symbol}</span>
                      <span className="bound-analogy mono">{b.analogy[locale]}</span>
                    </div>
                    <strong
                      style={{ display: "block", fontSize: "0.98rem", margin: "8px 0 4px 0" }}
                    >
                      {b.name[locale]}
                    </strong>
                    <div className="mono bound-formal">{b.formal}</div>
                    <p
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--muted)",
                        margin: "8px 0 0 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {b.intuitive[locale]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mathematical Reduction Example */}
              <div className="math-reduction-box" style={{ marginTop: "24px" }}>
                <h5 style={{ margin: "0 0 8px 0", fontSize: "0.96rem" }}>
                  {locale === "en"
                    ? "Mathematical Simplification Example:"
                    : "Contoh Penyederhanaan Matematis:"}
                </h5>
                <div
                  className="mono"
                  style={{ fontSize: "1.05rem", color: "var(--accent)", fontWeight: 700 }}
                >
                  T(n) = 3n² + 5n + 10 ==&gt; O(n²)
                </div>
                <ol
                  style={{
                    margin: "10px 0 0 0",
                    paddingLeft: "20px",
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  <li>
                    {locale === "en"
                      ? "Drop lower-order terms: As n approaches infinity, the n² term completely dominates 5n and 10."
                      : "Abaikan suku derajat rendah: Saat n mendekati tak terhingga, suku n² mendominasi penuh 5n dan 10."}
                  </li>
                  <li>
                    {locale === "en"
                      ? "Drop constant coefficients: The multiplier 3 scales the rate, but does not alter the quadratic shape of the curve."
                      : "Abaikan koefisien konstanta: Angka pengali 3 mengubah skala laju, namun tidak mengubah kurva kuadratiknya."}
                  </li>
                  <li>
                    {locale === "en"
                      ? "Conclusion: The asymptotic upper bound is strictly classified as O(n²)."
                      : "Kesimpulan: Batas atas asimptotik secara resmi diklasifikasikan sebagai O(n²)."}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPLEXITY CLASSES */}
        {activeTab === "classes" && (
          <div className="complexity-panel animate-fade-in">
            <h3 style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
              {locale === "en" ? "2. Common Time Complexities" : "2. Kelas Kompleksitas Waktu Umum"}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "20px" }}>
              {locale === "en"
                ? "The seven standard complexity tiers, ranked from fastest to computationally intractable."
                : "Tujuh tingkatan kompleksitas standar, diurutkan dari yang paling efisien hingga yang mustahil diproses."}
            </p>

            <div className="complexity-classes-stack">
              {complexityClasses.map((item) => (
                <div key={item.notation} className="complexity-detail-card">
                  <div className="detail-card-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className="mono detail-notation">{item.notation}</span>
                      <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.name[locale]}</h4>
                    </div>
                    <Badge>{item.growthBehavior[locale].split(".")[0]}</Badge>
                  </div>

                  <p style={{ margin: "8px 0 12px 0", fontSize: "0.92rem", color: "var(--text)" }}>
                    {item.definition[locale]}
                  </p>

                  <div className="detail-grid">
                    <div>
                      <span className="mono detail-label">
                        {locale === "en" ? "PRACTICAL ALGORITHM" : "CONTOH ALGORITMA"}
                      </span>
                      <p
                        style={{
                          margin: "2px 0 10px 0",
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                        }}
                      >
                        {item.example[locale]}
                      </p>

                      <span className="mono detail-label">
                        {locale === "en" ? "WHEN PROBLEMATIC" : "MULAI BERMASALAH SAAT"}
                      </span>
                      <p
                        style={{
                          margin: "2px 0 10px 0",
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                        }}
                      >
                        {item.problematicWhen[locale]}
                      </p>

                      <span className="mono detail-label">
                        {locale === "en" ? "TYPICAL USE CASES" : "KASUS PENGGUNAAN"}
                      </span>
                      <ul
                        style={{
                          margin: "4px 0 0 0",
                          paddingLeft: "18px",
                          fontSize: "0.83rem",
                          color: "var(--muted)",
                        }}
                      >
                        {item.useCases[locale].map((uc, idx) => (
                          <li key={idx}>{uc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-code-side">
                      <div className="code-header-mini">
                        <span className="mono">{item.snippetLanguage.toUpperCase()}</span>
                        <span className="mono" style={{ color: "var(--muted)" }}>
                          {item.snippetCaption[locale]}
                        </span>
                      </div>
                      <pre className="code-pre-mini">
                        <code>{item.snippet}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VISUAL GROWTH EXPLORER */}
        {activeTab === "visualizer" && (
          <div className="complexity-panel animate-fade-in">
            <ComplexityGrowthExplorer locale={locale} />
          </div>
        )}

        {/* TAB 4: TIME VS SPACE */}
        {activeTab === "space-time" && (
          <div className="complexity-panel animate-fade-in">
            <div className="complexity-card-section">
              <h3 style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
                {locale === "en"
                  ? "4. Time Complexity vs Space Complexity"
                  : "4. Waktu vs Memori (Time vs Space)"}
              </h3>
              <p style={{ color: "var(--text)", lineHeight: 1.65 }}>
                {locale === "en"
                  ? "High-performance software engineering requires balancing operational speed against RAM utilization. Optimizing code solely for execution speed often increases memory pressure, while aggressive memory minimization can incur severe CPU calculation penalties."
                  : "Rekayasa perangkat lunak berkinerja tinggi menuntut keseimbangan antara kecepatan operasi dan penggunaan RAM. Mengoptimasi kode semata-mata demi kecepatan sering kali meningkatkan beban memori, sementara minimisasi memori yang agresif dapat memicu penalti komputasi CPU yang berat."}
              </p>

              <div className="space-time-comparison-grid" style={{ margin: "20px 0" }}>
                <div className="dimension-card">
                  <div className="dimension-badge time-badge">
                    {locale === "en" ? "TIME DIMENSION" : "DIMENSI WAKTU"}
                  </div>
                  <h4 style={{ margin: "10px 0 6px 0", fontSize: "1.1rem" }}>Time Complexity</h4>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--muted)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {locale === "en"
                      ? "Measures the rate of growth in CPU operations as input size n expands. Governed by loop counts, recursive branching, and conditional logic."
                      : "Mengukur laju pertumbuhan operasi prosesor CPU saat ukuran masukan n bertambah. Ditentukan oleh jumlah perulangan, percabangan rekursif, dan logika kondisi."}
                  </p>
                </div>

                <div className="dimension-card">
                  <div className="dimension-badge space-badge">
                    {locale === "en" ? "SPACE DIMENSION" : "DIMENSI MEMORI"}
                  </div>
                  <h4 style={{ margin: "10px 0 6px 0", fontSize: "1.1rem" }}>Space Complexity</h4>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--muted)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {locale === "en"
                      ? "Measures additional memory allocation in RAM. Crucially distinguishes input storage from auxiliary space (heap structures, buffer arrays, call stack frames)."
                      : "Mengukur alokasi memori tambahan di RAM. Membedakan secara tegas antara input storage awal dan auxiliary space (struktur heap, array buffer, tumpukan call stack)."}
                  </p>
                </div>
              </div>

              <h4 style={{ fontSize: "1.05rem", marginTop: "24px", marginBottom: "8px" }}>
                {locale === "en"
                  ? "Concrete Memory Traps in Modern Runtimes"
                  : "Jebakan Memori Nyata pada Runtime Modern"}
              </h4>
              <ul
                style={{
                  paddingLeft: "20px",
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong style={{ color: "var(--text)" }}>Iterative In-place:</strong>{" "}
                  {locale === "en"
                    ? "Traversing or swapping an array in place takes O(n) time and strictly O(1) auxiliary space."
                    : "Menelusuri atau menukar array in-place membutuhkan waktu O(n) dan memori tambahan O(1)."}
                </li>
                <li>
                  <strong style={{ color: "var(--text)" }}>Array Cloning:</strong>{" "}
                  {locale === "en"
                    ? "Using .slice() or .map() creates a shallow copy, immediately demanding O(n) additional heap memory and increasing GC overhead."
                    : "Menggunakan .slice() atau .map() membuat salinan baru, langsung menyerap memori heap O(n) dan memperberat GC."}
                </li>
                <li>
                  <strong style={{ color: "var(--text)" }}>Call Stack Frames:</strong>{" "}
                  {locale === "en"
                    ? "Deep recursion allocates one activation stack frame per call. A recursion depth of n costs O(n) memory even if no data structures are allocated."
                    : "Rekursi mendalam mengalokasikan satu stack frame per pemanggilan. Kedalaman rekursi n menghabiskan memori O(n) meski tanpa struktur data baru."}
                </li>
                <li>
                  <strong style={{ color: "var(--text)" }}>Merge Sort Auxiliary Buffers:</strong>{" "}
                  {locale === "en"
                    ? "Array-based merge sort requires temporary array buffers, resulting in O(n) auxiliary memory overhead."
                    : "Merge sort berbasis array memerlukan buffer array sementara, menghasilkan overhead memori tambahan O(n)."}
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: CODE ANALYSIS WALKTHROUGH */}
        {activeTab === "analysis" && (
          <div className="complexity-panel animate-fade-in">
            <h3 style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
              {locale === "en"
                ? "5. How to Analyze Code Complexity"
                : "5. Cara Menganalisis Kompleksitas Kode"}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "16px" }}>
              {locale === "en"
                ? "A 10-step systematic process for dissecting algorithms, accompanied by TypeScript examples and line-by-line reasoning."
                : "Alur kerja sistematis 10 langkah untuk menganalisis algoritma, disertai contoh TypeScript dan penalaran per baris."}
            </p>

            <div className="analysis-steps-card">
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.98rem", color: "var(--accent)" }}>
                {locale === "en"
                  ? "Ten-Step Analysis Protocol:"
                  : "Protokol Analisis Sepuluh Langkah:"}
              </h4>
              <div className="steps-pill-grid">
                {[
                  {
                    n: "01",
                    t: {
                      en: "Identify Input Variables (n, m)",
                      id: "Identifikasi Variabel Input (n, m)",
                    },
                  },
                  { n: "02", t: { en: "Find Dominant Operations", id: "Temukan Operasi Dominan" } },
                  { n: "03", t: { en: "Count Scaling Ratio", id: "Hitung Rasio Penskalaan" } },
                  {
                    n: "04",
                    t: { en: "Analyze Sequential Loops", id: "Analisis Loop Sekuensial" },
                  },
                  { n: "05", t: { en: "Analyze Nested Loops", id: "Analisis Loop Bersarang" } },
                  {
                    n: "06",
                    t: { en: "Analyze Conditional Branches", id: "Analisis Cabang Kondisi" },
                  },
                  {
                    n: "07",
                    t: { en: "Analyze Logarithmic Halving", id: "Analisis Pembagian Logaritmik" },
                  },
                  {
                    n: "08",
                    t: { en: "Analyze Recursive Depth", id: "Analisis Kedalaman Rekursi" },
                  },
                  { n: "09", t: { en: "Account Auxiliary Space", id: "Hitung Memori Tambahan" } },
                  {
                    n: "10",
                    t: {
                      en: "Drop Constants and Lower Terms",
                      id: "Abaikan Konstanta & Suku Rendah",
                    },
                  },
                ].map((s) => (
                  <div key={s.n} className="step-pill-item">
                    <span className="mono step-pill-num">{s.n}</span>
                    <span style={{ fontSize: "0.82rem" }}>{s.t[locale]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="analysis-examples-stack" style={{ marginTop: "24px" }}>
              {analysisExamples.map((ex) => (
                <div key={ex.id} className="analysis-example-card">
                  <div className="example-header">
                    <h4 style={{ margin: 0, fontSize: "1.05rem" }}>{ex.title[locale]}</h4>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span className="blueprint-badge">{ex.complexity}</span>
                      <Badge>{ex.spaceComplexity}</Badge>
                    </div>
                  </div>

                  <div className="example-body-grid">
                    <pre className="example-code-pre">
                      <code>{ex.code}</code>
                    </pre>

                    <div className="example-reasoning-side">
                      <span
                        className="mono"
                        style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700 }}
                      >
                        {locale === "en"
                          ? "STEP-BY-STEP REASONING:"
                          : "PENALARAN LANGKAH DEMI LANGKAH:"}
                      </span>
                      <ul
                        style={{
                          margin: "6px 0 10px 0",
                          paddingLeft: "18px",
                          fontSize: "0.84rem",
                          color: "var(--muted)",
                        }}
                      >
                        {ex.reasoning[locale].map((r, rIdx) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.82rem",
                          color: "var(--text)",
                          fontStyle: "italic",
                        }}
                      >
                        {ex.explanation[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ENGINEERING TRADEOFFS */}
        {activeTab === "tradeoffs" && (
          <div className="complexity-panel animate-fade-in">
            <div className="complexity-card-section">
              <h3 style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
                {locale === "en"
                  ? "6. Engineering Trade-offs: Why Big O Is Not the Whole Story"
                  : "6. Kompromi Rekayasa: Mengapa Big O Bukan Segalanya"}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                {locale === "en"
                  ? "Lower asymptotic complexity does not automatically guarantee faster execution in production. Real-world performance depends heavily on constant factors, hardware memory hierarchies, and data layout."
                  : "Kompleksitas asimptotik yang lebih rendah tidak otomatis menjamin eksekusi yang lebih cepat di server produksi. Kinerja nyata sangat dipengaruhi oleh faktor konstanta, hierarki memori hardware, dan struktur tata letak data."}
              </p>

              <div className="tradeoffs-grid">
                {engineeringTradeoffs.map((item, idx) => (
                  <div key={idx} className="tradeoff-card">
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "1.05rem", color: "var(--text)" }}>
                      {item.title[locale]}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.88rem",
                        color: "var(--muted)",
                        lineHeight: 1.55,
                      }}
                    >
                      {item.desc[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: QUICK REFERENCE */}
        {activeTab === "quickref" && (
          <div className="complexity-panel animate-fade-in">
            <div className="complexity-card-section">
              <h3 style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
                {locale === "en"
                  ? "7. Quick Reference Lookup Matrix"
                  : "7. Matriks Referensi Cepat"}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "16px" }}>
                {locale === "en"
                  ? "Compact comparison guide for common algorithm complexity classes."
                  : "Panduan pembanding ringkas untuk kelas kompleksitas algoritma umum."}
              </p>

              <div className="article-table-wrapper">
                <div className="article-table-container">
                  <table className="article-table">
                    <thead>
                      <tr>
                        <th>{locale === "en" ? "Complexity" : "Kompleksitas"}</th>
                        <th>{locale === "en" ? "Classification" : "Nama"}</th>
                        <th>{locale === "en" ? "Growth for n = 1,000" : "Laju untuk n = 1.000"}</th>
                        <th>{locale === "en" ? "Typical Example" : "Contoh Khas"}</th>
                        <th>{locale === "en" ? "Warning Sign" : "Tanda Bahaya"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#10b981" }}>
                            O(1)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Constant" : "Konstan"}</td>
                        <td className="mono">1</td>
                        <td>{locale === "en" ? "Array index lookup" : "Akses indeks array"}</td>
                        <td>
                          {locale === "en"
                            ? "Expensive hidden synchronous I/O"
                            : "I/O sinkron tersembunyi yang berat"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#0284c7" }}>
                            O(log n)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Logarithmic" : "Logaritmik"}</td>
                        <td className="mono">~10</td>
                        <td>
                          {locale === "en"
                            ? "Binary search (sorted data)"
                            : "Binary search (data terurut)"}
                        </td>
                        <td>
                          {locale === "en"
                            ? "Requires sorted array + random access"
                            : "Wajib array terurut + random access"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#d97706" }}>
                            O(n)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Linear" : "Linear"}</td>
                        <td className="mono">1,000</td>
                        <td>
                          {locale === "en"
                            ? "Single loop traversal"
                            : "Satu putaran loop traversal"}
                        </td>
                        <td>
                          {locale === "en"
                            ? "Avoid per-request full table scans"
                            : "Hindari scan tabel penuh per-request"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#8b5cf6" }}>
                            O(n log n)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Linearithmic" : "Linearitmik"}</td>
                        <td className="mono">~10,000</td>
                        <td>{locale === "en" ? "Merge Sort, TimSort" : "Merge Sort, TimSort"}</td>
                        <td>
                          {locale === "en"
                            ? "Merge sort allocates O(n) memory"
                            : "Merge sort mengalokasikan O(n) memori"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#ea580c" }}>
                            O(n²)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Quadratic" : "Kuadratik"}</td>
                        <td className="mono">1,000,000</td>
                        <td>
                          {locale === "en"
                            ? "Nested loops, pairwise check"
                            : "Loop bersarang, cek pasangan"}
                        </td>
                        <td>
                          {locale === "en"
                            ? "Severe latency when n > 5,000"
                            : "Lag parah ketika n > 5.000"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#e11d48" }}>
                            O(2ⁿ)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Exponential" : "Eksponensial"}</td>
                        <td className="mono">1.07 x 10³⁰¹</td>
                        <td>
                          {locale === "en"
                            ? "Naive recursive Fibonacci"
                            : "Fibonacci rekursif naif"}
                        </td>
                        <td>
                          {locale === "en" ? "Explodes beyond n = 40" : "Meledak ketika n > 40"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="mono" style={{ color: "#b91c1c" }}>
                            O(n!)
                          </strong>
                        </td>
                        <td>{locale === "en" ? "Factorial" : "Faktorial"}</td>
                        <td className="mono">Astronomical</td>
                        <td>
                          {locale === "en" ? "Permutation generation" : "Generator permutasi"}
                        </td>
                        <td>
                          {locale === "en"
                            ? "Intractable beyond n = 12"
                            : "Mustahil diproses melebihi n = 12"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Further Learning: Cross link to Blog */}
      <div className="complexity-further-learning">
        <div>
          <span
            className="mono"
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 700,
            }}
          >
            {locale === "en" ? "DEEP-DIVE COMPANION ARTICLE" : "ARTIKEL PENDAMPING MENDALAM"}
          </span>
          <h3 style={{ margin: "4px 0 6px 0", fontSize: "1.15rem" }}>
            {locale === "en"
              ? "Big O Notation Explained: A Practical Guide to Algorithm Complexity"
              : "Memahami Big O Notation: Panduan Praktis Analisis Kompleksitas Algoritma"}
          </h3>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--muted)" }}>
            {locale === "en"
              ? "Explore the full long-form article on our engineering blog: production scenarios, database query plans, and in-depth optimization workflows."
              : "Pelajari artikel lengkap di blog kami: skenario produksi nyata, rencana kueri database, dan alur kerja optimasi mendalam."}
          </p>
        </div>
        <Link
          href="/blog/big-o-notation-algorithm-complexity"
          className="button button-primary"
          style={{ whiteSpace: "nowrap" }}
        >
          {locale === "en" ? "Read Deep-Dive Article →" : "Baca Artikel Mendalam →"}
        </Link>
      </div>
    </div>
  );
}
