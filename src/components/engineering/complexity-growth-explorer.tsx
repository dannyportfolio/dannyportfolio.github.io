"use client";

import { useState, useId, useMemo } from "react";
import type { Locale } from "@/data/translations";

export type ComplexityCurve = {
  id: string;
  notation: string;
  name: { en: string; id: string };
  rating: { en: string; id: string };
  color: string;
  compute: (n: number) => number;
  formatValue: (n: number) => string;
  description: { en: string; id: string };
};

const curves: ComplexityCurve[] = [
  {
    id: "constant",
    notation: "O(1)",
    name: { en: "Constant", id: "Konstan" },
    rating: { en: "Excellent", id: "Sempurna" },
    color: "#10b981",
    compute: () => 1,
    formatValue: () => "1",
    description: {
      en: "Operation count stays at 1 step regardless of input size.",
      id: "Jumlah operasi tetap 1 langkah berapapun ukuran data.",
    },
  },
  {
    id: "logarithmic",
    notation: "O(log n)",
    name: { en: "Logarithmic", id: "Logaritmik" },
    rating: { en: "Good", id: "Sangat Baik" },
    color: "#0284c7",
    compute: (n) => Math.max(1, Math.round(Math.log2(n))),
    formatValue: (n) => String(Math.max(1, Math.round(Math.log2(n)))),
    description: {
      en: "Divides problem size in half each step: binary search.",
      id: "Membagi dua ukuran masalah di setiap langkah: binary search.",
    },
  },
  {
    id: "linear",
    notation: "O(n)",
    name: { en: "Linear", id: "Linear" },
    rating: { en: "Fair", id: "Cukup" },
    color: "#d97706",
    compute: (n) => n,
    formatValue: (n) => String(n),
    description: {
      en: "Operations grow in direct 1:1 proportion with input size.",
      id: "Operasi bertumbuh secara proporsional 1:1 dengan ukuran masukan.",
    },
  },
  {
    id: "linearithmic",
    notation: "O(n log n)",
    name: { en: "Linearithmic", id: "Linearitmik" },
    rating: { en: "Moderate", id: "Sedang" },
    color: "#8b5cf6",
    compute: (n) => Math.round(n * Math.max(1, Math.log2(n))),
    formatValue: (n) => String(Math.round(n * Math.max(1, Math.log2(n)))),
    description: {
      en: "Divide-and-conquer sorting algorithms like Merge Sort.",
      id: "Algoritma sorting divide-and-conquer seperti Merge Sort.",
    },
  },
  {
    id: "quadratic",
    notation: "O(n²)",
    name: { en: "Quadratic", id: "Kuadratik" },
    rating: { en: "Horrible", id: "Buruk" },
    color: "#ea580c",
    compute: (n) => n * n,
    formatValue: (n) => (n * n).toLocaleString(),
    description: {
      en: "Nested loops comparing all pairs: steep upward acceleration.",
      id: "Perulangan bersarang membandingkan semua pasangan: akselerasi curam.",
    },
  },
  {
    id: "exponential",
    notation: "O(2ⁿ)",
    name: { en: "Exponential", id: "Eksponensial" },
    rating: { en: "Intractable", id: "Mustahil" },
    color: "#e11d48",
    compute: (n) => (n > 30 ? 1e9 : Math.pow(2, n)),
    formatValue: (n) => {
      if (n > 20) return `2^${n} (~${Math.pow(2, n).toExponential(2)})`;
      return Math.pow(2, n).toLocaleString();
    },
    description: {
      en: "Work doubles with each +1 to n: naive recursive Fibonacci.",
      id: "Pekerjaan berlipat ganda setiap penambahan +1 pada n: Fibonacci rekursif naif.",
    },
  },
];

export function ComplexityGrowthExplorer({ locale }: { locale: Locale }) {
  const [inputSize, setInputSize] = useState<number>(16);
  const [visibleCurves, setVisibleCurves] = useState<Record<string, boolean>>({
    constant: true,
    logarithmic: true,
    linear: true,
    linearithmic: true,
    quadratic: true,
    exponential: true,
  });
  const [scaleMode, setScaleMode] = useState<"standard" | "log">("standard");
  const uniqueId = useId();

  const toggleCurve = (id: string) => {
    setVisibleCurves((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // Ensure at least one curve remains active
      const anyActive = Object.values(next).some(Boolean);
      return anyActive ? next : prev;
    });
  };

  const selectAllCurves = () => {
    setVisibleCurves({
      constant: true,
      logarithmic: true,
      linear: true,
      linearithmic: true,
      quadratic: true,
      exponential: true,
    });
  };

  // SVG Chart Geometry
  const width = 640;
  const height = 340;
  const padding = { top: 30, right: 30, bottom: 45, left: 55 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Domain: n from 1 to 32 for smooth SVG path rendering
  const maxN = 32;
  const standardYMax = 320; // Capped Y to visually showcase explosive take-off

  // Generate SVG path for a curve
  const curvePaths = useMemo(() => {
    const pointsCount = 40;
    const step = (maxN - 1) / (pointsCount - 1);

    return curves.map((curve) => {
      const coords: [number, number][] = [];

      for (let i = 0; i < pointsCount; i++) {
        const nVal = 1 + i * step;
        const ops = curve.compute(nVal);

        // Calculate X coordinate
        const x = padding.left + ((nVal - 1) / (maxN - 1)) * plotWidth;

        // Calculate Y coordinate based on scale mode
        let y = padding.top + plotHeight;
        if (scaleMode === "standard") {
          const clampedOps = Math.min(ops, standardYMax);
          y = padding.top + plotHeight - (clampedOps / standardYMax) * plotHeight;
        } else {
          // Logarithmic scale: log10(ops + 1)
          const logMax = Math.log10(100000); // 5 decades
          const logVal = Math.log10(Math.max(1, ops));
          const normalized = Math.min(1, logVal / logMax);
          y = padding.top + plotHeight - normalized * plotHeight;
        }

        coords.push([x, y]);
      }

      const d = coords.reduce(
        (acc, [x, y], idx) =>
          idx === 0
            ? `M ${x.toFixed(1)} ${y.toFixed(1)}`
            : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`,
        "",
      );

      return {
        ...curve,
        path: d,
      };
    });
  }, [scaleMode, plotWidth, plotHeight, padding.left, padding.top]);

  // Current marker X position for inputSize slider
  const markerX = padding.left + ((Math.min(inputSize, maxN) - 1) / (maxN - 1)) * plotWidth;

  return (
    <div
      className="complexity-explorer-wrapper"
      role="region"
      aria-label={
        locale === "en"
          ? "Interactive Algorithm Complexity Growth Explorer"
          : "Penjelajah Interaktif Pertumbuhan Kompleksitas Algoritma"
      }
    >
      <div className="complexity-explorer-header">
        <div>
          <span
            className="mono"
            style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
          >
            {locale === "en" ? "Interactive Visualization" : "Visualisasi Interaktif"}
          </span>
          <h3 style={{ margin: "4px 0 6px 0", fontSize: "1.2rem", fontWeight: 700 }}>
            {locale === "en" ? "Complexity Growth Explorer" : "Eksplorasi Pertumbuhan Kompleksitas"}
          </h3>
          <p style={{ margin: 0, fontSize: "0.86rem", color: "var(--muted)" }}>
            {locale === "en"
              ? "Observe how operational workload accelerates as input size (n) increases across complexity classes."
              : "Amati bagaimana beban kerja operasi meningkat pesat saat ukuran masukan (n) bertambah."}
          </p>
        </div>

        {/* View mode toggle */}
        <div className="complexity-scale-toggle" role="group" aria-label="Scale mode">
          <button
            type="button"
            className={`scale-btn ${scaleMode === "standard" ? "is-active" : ""}`}
            onClick={() => setScaleMode("standard")}
            aria-pressed={scaleMode === "standard"}
          >
            {locale === "en" ? "Standard View" : "Tampilan Standar"}
          </button>
          <button
            type="button"
            className={`scale-btn ${scaleMode === "log" ? "is-active" : ""}`}
            onClick={() => setScaleMode("log")}
            aria-pressed={scaleMode === "log"}
          >
            {locale === "en" ? "Logarithmic View" : "Tampilan Logaritmik"}
          </button>
        </div>
      </div>

      {/* Curve Toggles */}
      <div className="complexity-curve-toggles" aria-label="Toggle complexity curves">
        {curves.map((curve) => {
          const isActive = visibleCurves[curve.id];
          return (
            <button
              key={curve.id}
              type="button"
              onClick={() => toggleCurve(curve.id)}
              className={`curve-chip ${isActive ? "is-active" : "is-inactive"}`}
              style={{
                borderColor: isActive ? curve.color : "var(--line)",
                color: isActive ? "var(--text)" : "var(--muted)",
              }}
              aria-pressed={isActive}
            >
              <span
                className="curve-dot"
                style={{
                  backgroundColor: curve.color,
                  opacity: isActive ? 1 : 0.35,
                }}
              />
              <strong className="mono" style={{ fontSize: "0.82rem" }}>
                {curve.notation}
              </strong>
              <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>{curve.name[locale]}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={selectAllCurves}
          className="curve-chip reset-chip"
          style={{ fontSize: "0.75rem", color: "var(--accent)" }}
        >
          {locale === "en" ? "Show All" : "Tampilkan Semua"}
        </button>
      </div>

      {/* SVG Chart Container */}
      <div className="complexity-chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="complexity-svg" aria-hidden="true">
          <defs>
            <linearGradient id={`${uniqueId}-grid-fade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--line)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--line)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + plotHeight * (1 - ratio);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke="var(--line)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                  opacity={0.6}
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="mono"
                  style={{ fontSize: "10px", fill: "var(--muted)" }}
                >
                  {scaleMode === "standard"
                    ? Math.round(ratio * standardYMax)
                    : ratio === 0
                      ? "1"
                      : `10^${Math.round(ratio * 5)}`}
                </text>
              </g>
            );
          })}

          {/* X Axis Grid Lines */}
          {[1, 8, 16, 24, 32].map((nVal) => {
            const x = padding.left + ((nVal - 1) / (maxN - 1)) * plotWidth;
            return (
              <g key={nVal}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + plotHeight}
                  stroke="var(--line)"
                  strokeDasharray="2 3"
                  strokeWidth="1"
                  opacity={0.4}
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  className="mono"
                  style={{ fontSize: "11px", fill: "var(--muted)" }}
                >
                  n={nVal}
                </text>
              </g>
            );
          })}

          {/* Axes Base Lines */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="var(--line)"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="var(--line)"
            strokeWidth="1.5"
          />

          {/* Axis Labels */}
          <text
            x={padding.left + plotWidth / 2}
            y={height - 8}
            textAnchor="middle"
            className="mono"
            style={{ fontSize: "11px", fill: "var(--text)", fontWeight: 600 }}
          >
            {locale === "en" ? "Input Size (n) →" : "Ukuran Masukan (n) →"}
          </text>

          <text
            x={-height / 2 + 10}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            className="mono"
            style={{ fontSize: "11px", fill: "var(--text)", fontWeight: 600 }}
          >
            {locale === "en" ? "Operations Count ↑" : "Jumlah Operasi ↑"}
          </text>

          {/* Curves Plot */}
          {curvePaths.map((curve) => {
            if (!visibleCurves[curve.id]) return null;
            return (
              <path
                key={curve.id}
                d={curve.path}
                fill="none"
                stroke={curve.color}
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.92}
              />
            );
          })}

          {/* Vertical Inspector Guide at inputSize */}
          {inputSize <= maxN && (
            <g>
              <line
                x1={markerX}
                y1={padding.top}
                x2={markerX}
                y2={padding.top + plotHeight}
                stroke="var(--accent)"
                strokeWidth="1.75"
                strokeDasharray="4 3"
              />
              <circle cx={markerX} cy={padding.top + plotHeight} r="4" fill="var(--accent)" />
            </g>
          )}
        </svg>
      </div>

      {/* Input Slider Controls */}
      <div className="complexity-slider-control">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <label htmlFor={`${uniqueId}-slider`} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
            {locale === "en" ? "Simulate Input Size (n):" : "Simulasi Ukuran Masukan (n):"}{" "}
            <span
              className="mono"
              style={{ color: "var(--accent)", fontSize: "1rem", fontWeight: 700 }}
            >
              {inputSize}
            </span>
          </label>
          <div className="preset-buttons" style={{ display: "flex", gap: "6px" }}>
            {[4, 8, 16, 32, 64].map((preset) => (
              <button
                key={preset}
                type="button"
                className={`preset-btn ${inputSize === preset ? "is-active" : ""}`}
                onClick={() => setInputSize(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <input
          id={`${uniqueId}-slider`}
          type="range"
          min="1"
          max="64"
          step="1"
          value={inputSize}
          onChange={(e) => setInputSize(Number(e.target.value))}
          className="complexity-range-slider"
          aria-label={locale === "en" ? "Input size slider" : "Slider ukuran masukan"}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.74rem",
            color: "var(--muted)",
            marginTop: "4px",
          }}
          className="mono"
        >
          <span>n = 1</span>
          <span>n = 16</span>
          <span>n = 32</span>
          <span>n = 48</span>
          <span>n = 64</span>
        </div>
      </div>

      {/* Live Operations Breakdown Matrix */}
      <div className="complexity-data-table-wrapper">
        <h4 style={{ fontSize: "0.95rem", margin: "16px 0 10px 0" }}>
          {locale === "en"
            ? `Estimated Operations at n = ${inputSize}:`
            : `Estimasi Operasi pada n = ${inputSize}:`}
        </h4>

        <div className="complexity-metrics-grid">
          {curves.map((curve) => {
            const isVisible = visibleCurves[curve.id];
            return (
              <div
                key={curve.id}
                className="complexity-metric-card"
                style={{
                  borderTop: `3px solid ${curve.color}`,
                  opacity: isVisible ? 1 : 0.45,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <strong className="mono" style={{ fontSize: "1.05rem", color: curve.color }}>
                    {curve.notation}
                  </strong>
                  <span className="mono" style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                    {curve.rating[locale]}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    margin: "4px 0",
                  }}
                >
                  {curve.name[locale]}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: "6px 0 2px 0",
                    wordBreak: "break-all",
                  }}
                >
                  {curve.formatValue(inputSize)}
                </div>
                <p
                  style={{ margin: 0, fontSize: "0.74rem", color: "var(--muted)", lineHeight: 1.4 }}
                >
                  {curve.description[locale]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Note */}
      <div className="complexity-disclaimer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>
          {locale === "en"
            ? "Important Engineering Note: The values above represent illustrative algorithmic operation counts to visualize asymptotic growth curves. They are not measured execution times in milliseconds, which depend on hardware architectures, CPU cache locality, and runtime optimizations."
            : "Catatan Rekayasa Penting: Angka di atas mewakili estimasi jumlah operasi algoritmik untuk memvisualisasikan kurva pertumbuhan asimptotik. Angka tersebut bukan waktu eksekusi riil dalam milidetik, yang sangat dipengaruhi oleh arsitektur hardware, cache CPU, dan optimasi runtime."}
        </span>
      </div>
    </div>
  );
}
