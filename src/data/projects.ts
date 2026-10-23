export type Project = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  summary: string;
  category: string;
  highlights: string[];
  technologies: string[];
  problem: string;
  challenge: string;
  architecture: string;
  contributions: string[];
  reliability: string;
  implementation: string[];
  caseStudy: boolean;
  isNew?: boolean;
};

export const projects: Project[] = [
  {
    slug: "veloura",
    name: "Veloura ERP — Fashion Manufacturing & Distribution",
    domain: "display-veloura.vercel.app",
    url: "https://display-veloura.vercel.app",
    summary:
      "Sistem ERP modular untuk manajemen manufaktur garmen, persediaan multi-gudang, pengadaan bahan baku, dan penjualan multi-kanal (grosir B2B & ritel D2C) PT Veloura Yogyakarta.",
    category: "Fashion ERP & Supply Chain",
    highlights: [
      "Multi-warehouse inventory ledger",
      "Garment BOM & production SPK",
      "B2B wholesale & D2C sales FSM",
      "Atomic procurement & goods receipt",
      "Multi-role RBAC & fail-safe demo",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
    problem:
      "Mengintegrasikan seluruh siklus manufaktur konveksi, buku besar persediaan multi-gudang, rantai pasok bahan baku, dan pesanan penjualan grosir/ritel dalam satu platform terpusat yang aman.",
    challenge:
      "Menjaga konsistensi buku besar persediaan multi-gudang berbasis append-only, determinisme state machine pesanan dan SPK produksi, serta isolasi keamanan mode demo portofolio tanpa mengekspos basis data internal.",
    architecture:
      "Arsitektur modular berbasis Next.js App Router dan PostgreSQL dengan prosedur tersimpan atomik, mutasi persediaan append-only, kontrol akses berbasis peran (RBAC), serta pemisahan tegas antara lingkungan pengembangan lokal dan mode demo portofolio publik.",
    contributions: [
      "Fokus pada arsitektur sistem ERP modular end-to-end, state machine siklus produksi dan pesanan, mutasi persediaan multi-gudang atomik, kontrol akses multi-peran (RBAC), serta isolasi keamanan mode demo publik.",
    ],
    reliability:
      "Keandalan dipastikan melalui transaksi atomik tingkat basis data, penguncian idempotensi untuk mencegah mutasi ganda, validasi skema ketat dengan Zod, dan pengujian otomatis komprehensif (unit, integrasi, dan e2e).",
    implementation: [
      "Mengedepankan pemisahan tanggung jawab modular (Inventory, Sales, Procurement, Production, QC), kepatuhan audit trail waktu WIB, antarmuka responsif ramah operasional bengkel/gudang, serta determinisme simulasi persona pengguna.",
    ],
    caseStudy: true,
    isNew: true,
  },
  {
    slug: "astraops",
    name: "AstraOps — Trukindo Logistik Prima",
    domain: "display-trukindologistikprima.vercel.app",
    url: "https://display-trukindologistikprima.vercel.app",
    summary:
      "Platform komersial logistik darat B2B, pelacakan waybill armada FTL, dan otomasi kualifikasi prospek untuk PT Trukindo Logistik Prima.",
    category: "B2B Logistics & Fleet Platform",
    highlights: [
      "B2B FTL quote flow",
      "Waybill & fleet tracking",
      "Lead lifecycle FSM",
      "Idempotent API & rate limiting",
      "Fail-closed security gate",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    problem:
      "Menangani permintaan penawaran kargo FTL B2B, pelacakan status pengiriman antarkota, dan kualifikasi prospek korporat dalam satu sistem yang terstruktur dan aman.",
    challenge:
      "Memisahkan jalur publik (request penawaran 3-langkah dan pelacakan waybill) dari operasional internal (scoring prospek, human-in-the-loop review, dan audit log) dengan proteksi keamanan berlapis.",
    architecture:
      "Arsitektur dua sisi yang menggabungkan portal komersial publik, API ingestion ber-idempotency lock dan rate limiting, state machine siklus hidup prospek di PostgreSQL, serta mode showcase fail-closed untuk demonstrasi publik.",
    contributions: [
      "Fokus pada arsitektur full-stack & backend, alur kuotasi FTL multi-step, sistem pelacakan waybill telematika, proteksi endpoint (rate limit, honeypot, idempotency), serta fail-closed display gate.",
    ],
    reliability:
      "Keandalan dijaga melalui validasi skema ketat, penguncian idempotensi transaksi, audit log yang immutable, serta isolasi penuh antara mode display publik dan infrastruktur operasional.",
    implementation: [
      "Mengutamakan determinisme state machine prospek, pertahanan berlapis pada middleware dan route handler, serta pengalaman responsif mobile-first untuk pengirim kargo B2B.",
    ],
    caseStudy: true,
  },
  {
    slug: "gegarap",
    name: "Gegarap",
    domain: "gegarap.id",
    url: "https://gegarap.id",
    summary:
      "Marketplace layanan tukang dan jasa lokal yang membantu pengguna menemukan, membandingkan, dan memesan penyedia jasa.",
    category: "Marketplace / Service Platform",
    highlights: [
      "Backend system",
      "Booking flow",
      "Provider onboarding",
      "Payment integration",
      "Scalable architecture",
    ],
    technologies: [],
    problem:
      "Membuat proses menemukan dan memesan layanan lokal terasa jelas bagi pengguna sekaligus dapat dikelola oleh penyedia jasa.",
    challenge:
      "Menjaga alur booking, onboarding penyedia, dan pembayaran tetap selaras saat produk berkembang.",
    architecture:
      "Arsitektur dirancang untuk mendukung batasan produk, alur booking, serta integrasi layanan yang dapat dikembangkan secara bertahap.",
    contributions: [
      "Fokus pada sistem backend, alur booking, onboarding penyedia, integrasi pembayaran, dan fondasi arsitektur yang scalable.",
    ],
    reliability:
      "Keandalan dipertimbangkan melalui batasan sistem yang jelas dan alur operasional yang siap dikembangkan.",
    implementation: [
      "Mengutamakan pemisahan concern, alur layanan yang mudah ditelusuri, dan integrasi yang dapat dipelihara.",
    ],
    caseStudy: true,
  },
  {
    slug: "reklame-gegarap",
    name: "Reklame Gegarap",
    domain: "reklame.gegarap.id",
    url: "https://reklame.gegarap.id",
    summary:
      "Platform digital untuk layanan reklame, promosi, dan kebutuhan pemasangan media periklanan.",
    category: "Advertising Platform",
    highlights: [
      "Service discovery",
      "Quotation flow",
      "Responsive interface",
      "Business conversion",
    ],
    technologies: [],
    problem:
      "Membantu calon pelanggan memahami pilihan layanan reklame dan memulai percakapan kebutuhan secara lebih terarah.",
    challenge:
      "Menyusun discovery dan quotation flow yang ringkas tanpa menghilangkan konteks kebutuhan bisnis.",
    architecture:
      "Struktur produk berpusat pada penemuan layanan, pengumpulan kebutuhan, dan jalur konversi yang responsif.",
    contributions: [
      "Fokus pada service discovery, quotation flow, interface responsif, dan pengalaman yang mendukung konversi bisnis.",
    ],
    reliability:
      "Alur didesain agar informasi layanan dan langkah berikutnya tetap jelas di berbagai ukuran layar.",
    implementation: [
      "Mengutamakan hierarki informasi, responsivitas, serta jalur tindakan yang mudah dipahami.",
    ],
    caseStudy: true,
  },
  {
    slug: "lelungo",
    name: "Lelungo",
    domain: "lelungo.com",
    url: "https://lelungo.com",
    summary:
      "Platform perjalanan untuk membantu pengguna menemukan dan mengakses layanan transportasi, hotel, dan kebutuhan perjalanan.",
    category: "Travel Platform",
    highlights: [
      "Search experience",
      "Travel discovery",
      "Integration-ready architecture",
      "Scalable product design",
    ],
    technologies: [],
    problem:
      "Mempermudah pengguna menemukan pilihan perjalanan dalam satu pengalaman yang koheren.",
    challenge:
      "Menyatukan discovery dan kebutuhan integrasi sambil menjaga fondasi produk siap berkembang.",
    architecture:
      "Desain produk berorientasi pada pencarian, discovery, dan batasan integrasi yang dapat berkembang bersama kebutuhan perjalanan.",
    contributions: [
      "Fokus pada search experience, travel discovery, arsitektur siap integrasi, dan product design yang scalable.",
    ],
    reliability:
      "Struktur dirancang agar pengalaman pencarian tetap mudah dipahami ketika cakupan layanan berkembang.",
    implementation: [
      "Mengutamakan jalur pencarian yang jelas, modularitas integrasi, dan keputusan produk yang terukur.",
    ],
    caseStudy: true,
  },
  {
    slug: "arvispro",
    name: "Arvispro",
    domain: "arvispro.id",
    url: "https://arvispro.id",
    summary: "Website company profile dan platform digital untuk bisnis konsultasi profesional.",
    category: "Corporate Website / Consulting",
    highlights: ["Professional branding", "Responsive company profile", "Business lead generation"],
    technologies: [],
    problem:
      "Mewakili layanan konsultasi profesional dengan informasi yang kredibel, mudah dipindai, dan mendorong percakapan bisnis.",
    challenge:
      "Menjaga presentasi brand profesional sekaligus membuat jalur lead generation tetap jelas.",
    architecture:
      "Struktur informasi mengutamakan brand, layanan, dan titik kontak yang tetap konsisten pada seluruh perangkat.",
    contributions: [
      "Fokus pada professional branding, company profile yang responsif, dan alur business lead generation.",
    ],
    reliability:
      "Konten dan CTA ditata agar mudah diakses tanpa mengganggu keterbacaan atau responsivitas halaman.",
    implementation: [
      "Mengutamakan hierarchy konten, desain responsif, dan jalur konversi yang jelas.",
    ],
    caseStudy: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
