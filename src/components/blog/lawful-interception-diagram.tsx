"use client";

import { useState } from "react";

type Stage = {
  id: string;
  step: string;
  title: { en: string; id: string };
  role: { en: string; id: string };
  description: { en: string; id: string };
  securityGate: { en: string; id: string };
};

const stages: Stage[] = [
  {
    id: "stage-1",
    step: "01",
    title: {
      en: "Authorized Request",
      id: "Pengajuan Resmi",
    },
    role: {
      en: "Investigating Agency",
      id: "Penyidik Berwenang",
    },
    description: {
      en: "Formal, documented submission specifying statutory grounds, investigation scope, target identifier, and temporal bounds.",
      id: "Pengajuan terdokumentasi formal yang memuat dasar hukum, ruang lingkup penyelidikan, nomor target, dan batas waktu.",
    },
    securityGate: {
      en: "Statutory warrant or formal mandate required before submission.",
      id: "Wajib menyertakan surat perintah atau mandat perundangan sebelum diajukan.",
    },
  },
  {
    id: "stage-2",
    step: "02",
    title: {
      en: "Legal Verification",
      id: "Verifikasi Legalitas",
    },
    role: {
      en: "Independent Compliance / Legal Unit",
      id: "Unit Kepatuhan Hukum Independen",
    },
    description: {
      en: "Rigorous vetting of evidentiary thresholds, statutory alignment, and target identity to prevent arbitrary or unauthorized interception.",
      id: "Pemeriksaan ketat terhadap kecukupan bukti, kesesuaian yurisdiksi, dan keabsahan identitas target demi mencegah penyadapan sepihak.",
    },
    securityGate: {
      en: "Strict rejection gate: invalid or ambiguous warrants terminate the request.",
      id: "Gerbang penolakan tegas: berkas tanpa dasar hukum gugur seketika.",
    },
  },
  {
    id: "stage-3",
    step: "03",
    title: {
      en: "Dual-Party Approval",
      id: "Persetujuan Multi-Pihak",
    },
    role: {
      en: "Judicial Authority / Multi-Key Signoff",
      id: "Otoritas Yudisial / Multi-Kunci Kriptografis",
    },
    description: {
      en: "Cryptographic M-of-N multi-party authorization. No single administrator or executive officer possesses unilateral activation power.",
      id: "Otorisasi kriptografis multi-pihak (skema M-of-N). Tidak ada satu administrator atau pejabat yang memiliki wewenang aktivasi sepihak.",
    },
    securityGate: {
      en: "Two-man rule enforced cryptographically via hardware security modules.",
      id: "Aturan dua pihak diverifikasi secara kriptografis menggunakan HSM.",
    },
  },
  {
    id: "stage-4",
    step: "04",
    title: {
      en: "Target Registration",
      id: "Registrasi Target Terikat",
    },
    role: {
      en: "LIMS Gateway Core",
      id: "Gerbang Inti LIMS",
    },
    description: {
      en: "Target identifier registered in the system with automated expiration timer, bounded protocol filters, and immutable digital certificate.",
      id: "Nomor target didaftarkan ke dalam sistem dengan masa kedaluwarsa otomatis, filter protokol ketat, dan sertifikat digital permanen.",
    },
    securityGate: {
      en: "Auto-expiring lease; target cannot be registered indefinitely or silently.",
      id: "Penyewaan berbasis waktu: target tidak dapat didaftarkan permanen tanpa audit.",
    },
  },
  {
    id: "stage-5",
    step: "05",
    title: {
      en: "Controlled Interception",
      id: "Penyadapan Terkendali",
    },
    role: {
      en: "Telecom Carrier Interface",
      id: "Antarmuka Operator Telekomunikasi",
    },
    description: {
      en: "Encrypted mediation delivery channel mirroring only specified communication flows under strict carrier-level protocol adherence.",
      id: "Saluran mediasi terenkripsi yang menyalin aliran komunikasi sesuai izin tanpa membuka akses ke aliran data di luar surat perintah.",
    },
    securityGate: {
      en: "Signed transport channel: metadata and payload captured with zero-knowledge keys.",
      id: "Kanal transport bertanda tangan: metadata dan konten dilindungi kunci aman.",
    },
  },
  {
    id: "stage-6",
    step: "06",
    title: {
      en: "Secure Evidence Storage",
      id: "Penyimpanan Barang Bukti",
    },
    role: {
      en: "Encrypted Evidence Vault",
      id: "Bilik Bukti Digital Terenkripsi",
    },
    description: {
      en: "AES-256 encryption at rest with segmented key custodianship. Captured voice, packets, and transcripts segregated by case identifiers.",
      id: "Enkripsi AES-256 saat istirahat dengan segmentasi kunci terpisah. Rekaman suara dan paket data dipisahkan ketat berdasarkan nomor perkara.",
    },
    securityGate: {
      en: "Strict digital chain of custody: zero plaintext downloads or exports without warrant.",
      id: "Rantai kustodi digital: ekspor bukti membutuhkan tanda tangan otorisasi ganda.",
    },
  },
  {
    id: "stage-7",
    step: "07",
    title: {
      en: "Immutable Audit Trail",
      id: "Log Audit Kriptografis",
    },
    role: {
      en: "WORM / Append-Only Ledger",
      id: "Ledger Append-Only Terdistribusi",
    },
    description: {
      en: "Write-Once-Read-Many (WORM) storage. Every access, target entry, query, and modification generates a SHA-256 hash anchored externally.",
      id: "Media penyimpanan Write-Once-Read-Many. Setiap penambahan target, pembacaan, dan aksi admin menghasilkan hash SHA-256 yang tersinkronisasi.",
    },
    securityGate: {
      en: "Deletion-proof architecture: administrators cannot erase or alter historical entries.",
      id: "Arsitektur anti-hapus: bahkan akun root tidak dapat menghapus catatan sejarah log.",
    },
  },
  {
    id: "stage-8",
    step: "08",
    title: {
      en: "Independent Oversight",
      id: "Pengawasan Eksternal",
    },
    role: {
      en: "Judicial / Parliamentary Inspectorate",
      id: "Inspektorat Yudisial / Parlemen",
    },
    description: {
      en: "Regular external audits reconcile active warrants against carrier stream logs, cryptographic hash chains, and physical case dossiers.",
      id: "Audit eksternal berkala mencocokkan izin pengadilan dengan log aliran telekomunikasi, hash audit, dan berkas fisik perkara.",
    },
    securityGate: {
      en: "Transparency reports and anomaly alerts sent directly to oversight bodies.",
      id: "Laporan transparansi dan peringatan anomali dikirim langsung ke badan pengawas.",
    },
  },
];

export function LawfulInterceptionDiagram({ locale }: { locale: "en" | "id" }) {
  const [activeStage, setActiveStage] = useState<string>("stage-3");
  const selected = stages.find((s) => s.id === activeStage) ?? stages[2];

  const labels = {
    title: {
      en: "Conceptual Architecture: 8-Stage Lawful Interception Lifecycle",
      id: "Arsitektur Konseptual: Siklus Hidup Penyadapan Sah 8-Tahap",
    },
    disclaimer: {
      en: "Conceptual reference architecture illustrating industry security standards: not a representation of any proprietary state system.",
      id: "Arsitektur referensi konseptual standar keamanan industri: bukan representasi sistem internal spesifik instansi mana pun.",
    },
    roleLabel: {
      en: "Responsible Entity",
      id: "Entitas Bertanggung Jawab",
    },
    gateLabel: {
      en: "Enforced Security Gate",
      id: "Gerbang Keamanan Wajib",
    },
    instruction: {
      en: "Select a stage below to examine its procedural safeguards and technical enforcement checkpoints.",
      id: "Pilih tahapan di bawah untuk melihat batas pengamanan prosedural dan gerbang penegakan teknisnya.",
    },
  };

  return (
    <div className="article-diagram-wrapper" role="region" aria-label={labels.title[locale]}>
      <div className="article-diagram-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="arch-dot is-live" aria-hidden="true" />
          <span className="mono" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
            {locale === "en"
              ? "CONCEPTUAL REFERENCE ARCHITECTURE"
              : "ARSITEKTUR REFERENSI KONSEPTUAL"}
          </span>
        </div>
        <span
          className="mono"
          style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.04em" }}
        >
          {locale === "en" ? "8 LIFECYCLE GATES" : "8 GERBANG SIKLUS HIDUP"}
        </span>
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--muted)",
          margin: "0 0 16px",
          lineHeight: 1.5,
        }}
      >
        {labels.instruction[locale]}
      </p>

      {/* Grid of 8 interactive stages */}
      <div className="diagram-stages-grid" role="tablist" aria-label="Lifecycle Stages">
        {stages.map((stage) => {
          const isActive = stage.id === activeStage;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${stage.id}`}
              onClick={() => setActiveStage(stage.id)}
              className={`diagram-stage-node ${isActive ? "is-selected" : ""}`}
            >
              <div className="stage-node-header">
                <span className="mono stage-node-step">{stage.step}</span>
                <span className="stage-node-status" aria-hidden="true">
                  {isActive ? "●" : "○"}
                </span>
              </div>
              <h4 className="stage-node-title">{stage.title[locale]}</h4>
              <p className="stage-node-role">{stage.role[locale]}</p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <div
        id={`panel-${selected.id}`}
        role="tabpanel"
        className="diagram-stage-detail"
        aria-label={selected.title[locale]}
      >
        <div className="stage-detail-header">
          <div className="stage-detail-tag">
            <span className="mono">STAGE {selected.step}</span>
          </div>
          <h4 className="stage-detail-title">{selected.title[locale]}</h4>
        </div>

        <p className="stage-detail-description">{selected.description[locale]}</p>

        <div className="stage-detail-meta-grid">
          <div className="stage-detail-meta-item">
            <span className="meta-item-label">{labels.roleLabel[locale]}</span>
            <span className="meta-item-value">{selected.role[locale]}</span>
          </div>
          <div className="stage-detail-meta-item is-gate">
            <span className="meta-item-label">{labels.gateLabel[locale]}</span>
            <span className="meta-item-value highlight-gate">{selected.securityGate[locale]}</span>
          </div>
        </div>
      </div>

      <div className="diagram-disclaimer">
        <span className="mono">NOTICE:</span> {labels.disclaimer[locale]}
      </div>
    </div>
  );
}
