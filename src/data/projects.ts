export type LocalizedText = {
  en: string;
  id: string;
};

export type ArchitectureStep = {
  id: string;
  label: { en: string; id: string };
  description: { en: string; id: string };
};

export type Project = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  githubUrl?: string; // Only populated when a verified public repo exists
  summary: LocalizedText;
  category: LocalizedText;
  highlights: { en: string[]; id: string[] };
  technologies: string[];
  problem: LocalizedText;
  challenge: LocalizedText;
  architecture: LocalizedText;
  contributions: { en: string[]; id: string[] };
  reliability: LocalizedText;
  implementation: { en: string[]; id: string[] };
  caseStudy: boolean;
  isNew?: boolean;
  architectureSteps: ArchitectureStep[];
};

export const projects: Project[] = [
  {
    slug: "veloura",
    name: "Veloura ERP — Fashion Manufacturing & Distribution",
    domain: "display-veloura.vercel.app",
    url: "https://display-veloura.vercel.app",
    summary: {
      en: "Modular ERP system for garment manufacturing workflow, multi-warehouse inventory tracking, procurement of raw materials, and multi-channel sales (B2B wholesale & D2C retail) for PT Veloura Yogyakarta.",
      id: "Sistem ERP modular untuk manajemen manufaktur garmen, persediaan multi-gudang, pengadaan bahan baku, dan penjualan multi-kanal (grosir B2B & ritel D2C) PT Veloura Yogyakarta.",
    },
    category: {
      en: "Fashion ERP & Supply Chain",
      id: "Fashion ERP & Rantai Pasok",
    },
    highlights: {
      en: [
        "Multi-warehouse inventory ledger",
        "Garment BOM & production SPK",
        "B2B wholesale & D2C sales FSM",
        "Atomic procurement & goods receipt",
        "Multi-role RBAC & fail-safe demo",
      ],
      id: [
        "Buku besar persediaan multi-gudang",
        "BOM garmen & SPK produksi",
        "FSM penjualan grosir B2B & ritel D2C",
        "Pengadaan atomik & penerimaan barang",
        "RBAC multi-peran & demo fail-safe",
      ],
    },
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
    problem: {
      en: "Integrating the entire garment manufacturing cycle, multi-warehouse inventory ledger, raw material supply chain, and wholesale/retail sales orders into a single secure platform.",
      id: "Mengintegrasikan seluruh siklus manufaktur konveksi, buku besar persediaan multi-gudang, rantai pasok bahan baku, dan pesanan penjualan grosir/ritel dalam satu platform terpusat yang aman.",
    },
    challenge: {
      en: "Preserving consistency in an append-only multi-warehouse inventory ledger, deterministic finite state machines for production work orders (SPK) and sales, and isolated security gates for public demo mode.",
      id: "Menjaga konsistensi buku besar persediaan multi-gudang berbasis append-only, determinisme state machine pesanan dan SPK produksi, serta isolasi keamanan mode demo portofolio tanpa mengekspos basis data internal.",
    },
    architecture: {
      en: "Modular architecture powered by Next.js App Router and PostgreSQL with atomic stored transactions, append-only inventory mutations, role-based access control (RBAC), and strict isolation between local development and public portfolio demo modes.",
      id: "Arsitektur modular berbasis Next.js App Router dan PostgreSQL dengan prosedur tersimpan atomik, mutasi persediaan append-only, kontrol akses berbasis peran (RBAC), serta pemisahan tegas antara lingkungan pengembangan lokal dan mode demo portofolio publik.",
    },
    contributions: {
      en: [
        "Architected end-to-end modular ERP services, production cycle state machines, atomic multi-warehouse inventory transactions, multi-role RBAC security, and portfolio showcase isolation.",
      ],
      id: [
        "Fokus pada arsitektur sistem ERP modular end-to-end, state machine siklus produksi dan pesanan, mutasi persediaan multi-gudang atomik, kontrol akses multi-peran (RBAC), serta isolasi keamanan mode demo publik.",
      ],
    },
    reliability: {
      en: "Reliability is enforced through database-level atomic transactions, idempotency locks against double mutations, strict Zod schema validation, and automated test coverage across critical business boundaries.",
      id: "Keandalan dipastikan melalui transaksi atomik tingkat basis data, penguncian idempotensi untuk mencegah mutasi ganda, validasi skema ketat dengan Zod, dan pengujian otomatis komprehensif (unit, integrasi, dan e2e).",
    },
    implementation: {
      en: [
        "Emphasized modular separation of concerns (Inventory, Sales, Procurement, Production, QC), strict audit trailing with Western Indonesia Time (WIB) precision, and resilient workshop/warehouse UI workflows.",
      ],
      id: [
        "Mengedepankan pemisahan tanggung jawab modular (Inventory, Sales, Procurement, Production, QC), kepatuhan audit trail waktu WIB, antarmuka responsif ramah operasional bengkel/gudang, serta determinisme simulasi persona pengguna.",
      ],
    },
    caseStudy: true,
    isNew: true,
    architectureSteps: [
      {
        id: "sales-orders",
        label: { en: "Multi-Channel Sales FSM", id: "FSM Penjualan Multi-Kanal" },
        description: {
          en: "Captures B2B wholesale and D2C retail orders into deterministic state machines with credit checks and reserved stock allocations.",
          id: "Mencatat pesanan grosir B2B dan ritel D2C ke dalam state machine deterministik dengan verifikasi kredit dan alokasi stok terpesan.",
        },
      },
      {
        id: "bom-production",
        label: { en: "BOM Explosion & SPK", id: "BOM Explosion & SPK Produksi" },
        description: {
          en: "Deconstructs garment style specs into fabric/cutting BOMs and issues production work orders (SPK) with strict workshop step tracking.",
          id: "Menguraikan spesifikasi garmen menjadi BOM kain/aksesori dan menerbitkan Surat Perintah Kerja (SPK) dengan pelacakan bertahap.",
        },
      },
      {
        id: "inventory-ledger",
        label: { en: "Append-Only Inventory Ledger", id: "Buku Besar Persediaan Append-Only" },
        description: {
          en: "Executes atomic double-entry inventory transactions across central and retail warehouses with zero in-place stock overwrites.",
          id: "Mengeksekusi mutasi persediaan atomik antar gudang pusat dan toko ritel tanpa overwrite saldo langsung.",
        },
      },
      {
        id: "procurement",
        label: { en: "Procurement & Receiving", id: "Pengadaan & Penerimaan Bahan" },
        description: {
          en: "Validates purchase orders against supplier deliveries with lot-level QC verification and automatic invoice reconciliation.",
          id: "Memvalidasi pesanan pembelian terhadap pengiriman pemasok dengan verifikasi QC per lot dan rekonsiliasi faktur.",
        },
      },
      {
        id: "rbac-audit",
        label: { en: "PostgreSQL RBAC & Audit Trail", id: "RBAC PostgreSQL & Audit Trail" },
        description: {
          en: "Guarantees row-level isolation, time-stamped operation audits (WIB), and isolated mock sandboxing for display modes.",
          id: "Menjamin isolasi berbasis peran, audit trail waktu WIB, dan isolasi sandboxing aman untuk mode display publik.",
        },
      },
    ],
  },
  {
    slug: "astraops",
    name: "AstraOps — Trukindo Logistik Prima",
    domain: "display-trukindologistikprima.vercel.app",
    url: "https://display-trukindologistikprima.vercel.app",
    summary: {
      en: "Commercial B2B overland freight platform, fleet waybill tracking, and lead qualification automation for PT Trukindo Logistik Prima.",
      id: "Platform komersial logistik darat B2B, pelacakan waybill armada FTL, dan otomasi kualifikasi prospek untuk PT Trukindo Logistik Prima.",
    },
    category: {
      en: "B2B Logistics & Fleet Platform",
      id: "Platform Logistik B2B & Armada",
    },
    highlights: {
      en: [
        "B2B FTL quote flow",
        "Waybill & fleet tracking",
        "Lead lifecycle FSM",
        "Idempotent API & rate limiting",
        "Fail-closed security gate",
      ],
      id: [
        "Alur kuotasi FTL B2B",
        "Pelacakan waybill & armada",
        "FSM siklus hidup prospek",
        "API idempoten & rate limiting",
        "Gerbang keamanan fail-closed",
      ],
    },
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    problem: {
      en: "Handling corporate B2B Full Truckload (FTL) quote inquiries, intercity fleet waybill tracking, and commercial lead qualification within a structured, resilient system.",
      id: "Menangani permintaan penawaran kargo FTL B2B, pelacakan status pengiriman antarkota, dan kualifikasi prospek korporat dalam satu sistem yang terstruktur dan aman.",
    },
    challenge: {
      en: "Isolating public self-service actions (3-step quote flow and waybill search) from internal operational tooling (lead scoring, human-in-the-loop approvals, and audit trails) with strict security barriers.",
      id: "Memisahkan jalur publik (request penawaran 3-langkah dan pelacakan waybill) dari operasional internal (scoring prospek, human-in-the-loop review, dan audit log) dengan proteksi keamanan berlapis.",
    },
    architecture: {
      en: "Dual-tier architecture combining a public commercial portal, an idempotent ingestion API with token bucket rate limiting, a PostgreSQL lead lifecycle state machine, and a fail-closed showcase gate for public presentations.",
      id: "Arsitektur dua sisi yang menggabungkan portal komersial publik, API ingestion ber-idempotency lock dan rate limiting, state machine siklus hidup prospek di PostgreSQL, serta mode showcase fail-closed untuk demonstrasi publik.",
    },
    contributions: {
      en: [
        "Engineered full-stack and backend services, multi-step FTL quote calculation engine, telematics waybill lookup endpoints, request defense gates, and fail-closed public demo sandboxing.",
      ],
      id: [
        "Fokus pada arsitektur full-stack & backend, alur kuotasi FTL multi-step, sistem pelacakan waybill telematika, proteksi endpoint (rate limit, honeypot, idempotency), serta fail-closed display gate.",
      ],
    },
    reliability: {
      en: "Guaranteed through strict Zod boundary validation, distributed idempotency keys preventing duplicate submissions, immutable append-only event logs, and complete operational separation.",
      id: "Keandalan dijaga melalui validasi skema ketat, penguncian idempotensi transaksi, audit log yang immutable, serta isolasi penuh antara mode display publik dan infrastruktur operasional.",
    },
    implementation: {
      en: [
        "Prioritized deterministic state progression, defense-in-depth middleware checks, and a responsive mobile-first experience for busy cargo logistics managers.",
      ],
      id: [
        "Mengutamakan determinisme state machine prospek, pertahanan berlapis pada middleware dan route handler, serta pengalaman responsif mobile-first untuk pengirim kargo B2B.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "quote-intake",
        label: { en: "3-Step FTL Quote Intake", id: "Inbound Kuotasi FTL 3-Langkah" },
        description: {
          en: "Collects origin, destination, vehicle type, and cargo tonnage with instant volume estimations and Honeypot anti-spam defense.",
          id: "Mengumpulkan asal, tujuan, jenis armada, dan tonase kargo dengan estimasi volume serta proteksi Honeypot.",
        },
      },
      {
        id: "idempotency-gate",
        label: { en: "Idempotency & Rate Limiting", id: "Gerbang Idempotensi & Rate Limit" },
        description: {
          en: "Protects intake route handlers against replay attacks, duplicate submissions, and automated query bursts.",
          id: "Melindungi endpoint dari serangan replay, pengiriman dobel, dan lonjakan request berlebih.",
        },
      },
      {
        id: "lead-lifecycle",
        label: { en: "Lead Lifecycle FSM", id: "FSM Siklus Hidup Prospek" },
        description: {
          en: "Transitions inquiries through New, Qualified, Quoted, and Booked states with automated sales SLA monitoring.",
          id: "Memproses prospek melalui status Baru, Kualifikasi, Penawaran, dan Booking dengan pemantauan SLA tim sales.",
        },
      },
      {
        id: "telematics-tracking",
        label: { en: "Waybill & Fleet Lookup", id: "Pelacakan Waybill & Armada" },
        description: {
          en: "Provides shippers real-time milestone checkpoints and delivery verification without revealing internal telematics hardware.",
          id: "Menyediakan checkpoint status pengiriman dan konfirmasi penerimaan kargo bagi pengirim secara real-time.",
        },
      },
      {
        id: "audit-storage",
        label: { en: "PostgreSQL Audit Trail", id: "Audit Trail PostgreSQL" },
        description: {
          en: "Maintains tamper-evident records of freight quotes, commercial decisions, and telematics event updates.",
          id: "Menyimpan rekaman transaksi penawaran kargo, keputusan komersial, dan riwayat event pengiriman.",
        },
      },
    ],
  },
  {
    slug: "gegarap",
    name: "Gegarap",
    domain: "gegarap.id",
    url: "https://gegarap.id",
    summary: {
      en: "Hyper-local home services and artisan booking marketplace connecting Indonesian homeowners with verified local repair and maintenance professionals.",
      id: "Marketplace layanan tukang dan jasa lokal yang membantu pengguna menemukan, membandingkan, dan memesan penyedia jasa terverifikasi.",
    },
    category: {
      en: "Marketplace & Service Platform",
      id: "Platform Marketplace & Layanan Jasa",
    },
    highlights: {
      en: [
        "Hyper-local service booking",
        "Provider onboarding & KYC",
        "Escrow down-payment integration",
        "Supabase & PostgreSQL data layer",
        "Location-filtered matchmaking",
      ],
      id: [
        "Pemesanan jasa hyper-local",
        "Onboarding & verifikasi mitra",
        "Integrasi pembayaran DP aman",
        "Basis data Supabase & PostgreSQL",
        "Pencocokan lokasi terdekat",
      ],
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Midtrans"],
    problem: {
      en: "Streamlining the fragmented process of finding, scheduling, and paying verified home maintenance craftsmen across local urban neighborhoods.",
      id: "Membuat proses menemukan dan memesan layanan tukang lokal terasa jelas bagi pengguna sekaligus dapat dikelola secara terstruktur oleh penyedia jasa.",
    },
    challenge: {
      en: "Harmonizing dynamic service booking schedules, artisan identity verification, and escrow-like deposit payments while maintaining low latency.",
      id: "Menjaga alur booking, onboarding penyedia, dan pembayaran tetap selaras saat produk berkembang.",
    },
    architecture: {
      en: "Engineered on Next.js App Router and Supabase PostgreSQL with real-time order state updates, Midtrans webhook handlers, and role-based permissions.",
      id: "Arsitektur dirancang untuk mendukung batasan produk, alur booking, integrasi pembayaran Midtrans, serta manajemen data Supabase yang dapat dikembangkan bertahap.",
    },
    contributions: {
      en: [
        "Built core booking state workflows, provider verification schemas, Midtrans payment webhook validation, and database access boundaries.",
      ],
      id: [
        "Fokus pada sistem backend, alur booking, onboarding penyedia, integrasi pembayaran, dan fondasi arsitektur yang scalable.",
      ],
    },
    reliability: {
      en: "System boundaries separate public customer inquiries from provider profile management and automated payment webhook confirmation with idempotency keys.",
      id: "Keandalan dipertimbangkan melalui batasan sistem yang jelas, validasi status pembayaran idempoten, dan alur operasional yang terisolasi.",
    },
    implementation: {
      en: [
        "Focused on separation of concerns between client discovery and booking states, clean transaction isolation, and maintainable partner API integrations.",
      ],
      id: [
        "Mengutamakan pemisahan concern, alur layanan yang mudah ditelusuri, dan integrasi yang dapat dipelihara.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "marketplace-discovery",
        label: { en: "Service Discovery & Catalog", id: "Katalog & Pencarian Jasa" },
        description: {
          en: "Browse verified service categories (plumbing, electrical, carpentry) with transparent pricing and location filtering.",
          id: "Jelajahi kategori jasa tukang (ledeng, listrik, bangunan) dengan transparansi perkiraan biaya dan filter lokasi.",
        },
      },
      {
        id: "booking-fsm",
        label: { en: "Booking Schedule & Matchmaking", id: "Alur Pemesanan & Penjadwalan" },
        description: {
          en: "Schedules service appointments and matches orders with available certified artisans in the specified district.",
          id: "Menjadwalkan waktu pengerjaan dan memasangkan pesanan dengan mitra tukang yang tersedia di area terkait.",
        },
      },
      {
        id: "payment-webhook",
        label: { en: "Midtrans Payment & Escrow", id: "Pembayaran & Webhook Midtrans" },
        description: {
          en: "Processes down payment (DP) deposits and verifies asynchronous webhook callbacks with signature authorization.",
          id: "Memproses deposit DP aman dan memvalidasi notifikasi webhook pembayaran dengan verifikasi signature.",
        },
      },
      {
        id: "order-state",
        label: { en: "Supabase PostgreSQL Database", id: "Database Supabase PostgreSQL" },
        description: {
          en: "Maintains synchronized order records, provider availability, and customer service reviews.",
          id: "Menyimpan rekam status pesanan real-time, ketersediaan mitra, dan ulasan pelanggan.",
        },
      },
    ],
  },
  {
    slug: "reklame-gegarap",
    name: "Reklame Gegarap",
    domain: "reklame.gegarap.id",
    url: "https://reklame.gegarap.id",
    summary: {
      en: "Digital showcase and quotation platform for out-of-home advertising, billboard installations, and commercial promotional media.",
      id: "Platform digital untuk layanan reklame, promosi, dan kebutuhan pemasangan media periklanan.",
    },
    category: {
      en: "Advertising Platform",
      id: "Platform Media Periklanan",
    },
    highlights: {
      en: [
        "Media asset discovery",
        "Dynamic quotation flow",
        "Responsive presentation",
        "Lead conversion routing",
      ],
      id: [
        "Penemuan titik reklame",
        "Alur estimasi biaya",
        "Antarmuka responsif",
        "Konversi prospek bisnis",
      ],
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    problem: {
      en: "Assisting business clients in discovering physical billboard locations, understanding installation specifications, and initiating targeted project quotes.",
      id: "Membantu calon pelanggan memahami pilihan layanan reklame dan memulai percakapan kebutuhan secara lebih terarah.",
    },
    challenge: {
      en: "Structuring advertising specifications and price discovery into a concise, mobile-friendly quotation flow without losing critical business context.",
      id: "Menyusun discovery dan quotation flow yang ringkas tanpa menghilangkan konteks kebutuhan bisnis.",
    },
    architecture: {
      en: "Responsive Next.js application structured around media catalog discovery, dimension specifications, and streamlined inquiry conversion paths.",
      id: "Struktur produk berpusat pada penemuan layanan, pengumpulan kebutuhan spesifikasi, dan jalur konversi yang responsif.",
    },
    contributions: {
      en: [
        "Structured media catalog hierarchies, quote estimation forms, responsive layouts, and business conversion routing.",
      ],
      id: [
        "Fokus pada service discovery, quotation flow, interface responsif, dan pengalaman yang mendukung konversi bisnis.",
      ],
    },
    reliability: {
      en: "Ensures media catalogs and contact triggers remain legible, fast-loading, and responsive across various screen dimensions.",
      id: "Alur didesain agar informasi layanan dan langkah berikutnya tetap jelas di berbagai ukuran layar.",
    },
    implementation: {
      en: [
        "Prioritized clear visual hierarchy, frictionless mobile navigation, and validated contact forms.",
      ],
      id: [
        "Mengutamakan hierarki informasi, responsivitas, serta jalur tindakan yang mudah dipahami.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "media-catalog",
        label: { en: "Media Catalog & Specs", id: "Katalog Lokasi & Spesifikasi" },
        description: {
          en: "Displays outdoor media formats (billboard, neon box, banner) with physical dimensions and placement context.",
          id: "Menampilkan format media luar ruang (baliho, billboard, neon box) dengan ukuran fisik dan titik lokasi.",
        },
      },
      {
        id: "spec-quote",
        label: { en: "Dynamic Quotation Flow", id: "Kalkulasi Kebutuhan & Estimasi" },
        description: {
          en: "Allows clients to specify media dimensions, lighting requirements, and duration for targeted quotes.",
          id: "Memungkinkan klien memilih ukuran, jenis penerangan, dan durasi tayang untuk estimasi terarah.",
        },
      },
      {
        id: "lead-routing",
        label: { en: "Conversion & Sales Dispatch", id: "Routing Konversi & Sales" },
        description: {
          en: "Routes validated commercial inquiries directly into the production sales pipeline for fast consultations.",
          id: "Meneruskan inquiry bisnis tervalidasi ke tim operasional dan sales untuk konsultasi cepat.",
        },
      },
    ],
  },
  {
    slug: "lelungo",
    name: "Lelungo",
    domain: "lelungo.com",
    url: "https://lelungo.com",
    summary: {
      en: "AI-assisted travel search and discovery platform helping travelers discover flights, hotel accommodations, and hidden travel bargains.",
      id: "Platform perjalanan untuk membantu pengguna menemukan dan mengakses layanan transportasi, hotel, dan kebutuhan perjalanan.",
    },
    category: {
      en: "Travel Platform",
      id: "Platform Perjalanan Wisata",
    },
    highlights: {
      en: [
        "Fast search discovery",
        "Itinerary curation",
        "Integration-ready architecture",
        "Scalable product design",
      ],
      id: [
        "Pencarian cepat",
        "Kurasi destinasi perjalanan",
        "Arsitektur siap integrasi",
        "Desain produk terukur",
      ],
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    problem: {
      en: "Empowering travel enthusiasts to explore travel deals, flights, and accommodations within a unified, seamless discovery interface.",
      id: "Mempermudah pengguna menemukan pilihan perjalanan dalam satu pengalaman yang koheren.",
    },
    challenge: {
      en: "Unifying multi-criteria search filters with external aggregator integration readiness while preserving snappy client responses.",
      id: "Menyatukan discovery dan kebutuhan integrasi sambil menjaga fondasi produk siap berkembang.",
    },
    architecture: {
      en: "Next.js App Router architecture centered on responsive search states, clean UI boundaries, and extensible supplier data contracts.",
      id: "Desain produk berorientasi pada pencarian, discovery, dan batasan integrasi yang dapat berkembang bersama kebutuhan perjalanan.",
    },
    contributions: {
      en: [
        "Designed search interface states, travel filter discovery patterns, integration data boundaries, and responsive frontend architecture.",
      ],
      id: [
        "Fokus pada search experience, travel discovery, arsitektur siap integrasi, dan product design yang scalable.",
      ],
    },
    reliability: {
      en: "Ensures resilient client rendering even under intermittent network connectivity with predictable fallbacks.",
      id: "Struktur dirancang agar pengalaman pencarian tetap mudah dipahami ketika cakupan layanan berkembang.",
    },
    implementation: {
      en: [
        "Emphasized modular filter controls, clear feedback states, and efficient client-side bundle size.",
      ],
      id: [
        "Mengutamakan jalur pencarian yang jelas, modularitas integrasi, dan keputusan produk yang terukur.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "search-filters",
        label: { en: "Multi-Criteria Search Engine", id: "Pencarian Multi-Kriteria" },
        description: {
          en: "Captures departure dates, destination hubs, and budget preferences with real-time UI query updates.",
          id: "Mengumpulkan tanggal keberangkatan, kota tujuan, dan preferensi anggaran dengan respons antarmuka cepat.",
        },
      },
      {
        id: "aggregator-gateway",
        label: { en: "Extensible Integration Boundary", id: "Batasan Integrasi & Agregator" },
        description: {
          en: "Normalizes disparate hotel and flight supplier schemas into consistent UI card representations.",
          id: "Menstandarkan skema data hotel dan penerbangan ke dalam format kartu penawaran yang konsisten.",
        },
      },
      {
        id: "deal-curation",
        label: { en: "Curated Travel Recommendations", id: "Kurasi Penawaran Perjalanan" },
        description: {
          en: "Surfaces seasonal discount opportunities and curated travel itineraries to maximize user engagement.",
          id: "Menampilkan rekomendasi destinasi hemat dan panduan rencana perjalanan terkurasi.",
        },
      },
    ],
  },
  {
    slug: "arvispro",
    name: "Arvispro",
    domain: "arvispro.id",
    url: "https://arvispro.id",
    summary: {
      en: "Corporate digital platform and client engagement portal for PT Arvispro Sinergi Indonesia, a premier management and financial consulting firm.",
      id: "Website company profile dan platform digital untuk bisnis konsultasi manajemen dan keuangan profesional.",
    },
    category: {
      en: "Corporate Website & Consulting",
      id: "Company Profile Korporat & Konsultasi",
    },
    highlights: {
      en: [
        "Executive brand presentation",
        "Redux Toolkit state management",
        "Consultation lead intake",
        "Performance-optimized frontend",
      ],
      id: [
        "Branding korporat profesional",
        "State management Redux Toolkit",
        "Alur formulir konsultasi",
        "Frontend teroptimasi performa",
      ],
    },
    technologies: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS"],
    problem: {
      en: "Representing high-level enterprise consulting services with an authoritative, trustworthy web presence that guides decision-makers toward structured consultations.",
      id: "Mewakili layanan konsultasi profesional dengan informasi yang kredibel, mudah dipindai, dan mendorong percakapan bisnis.",
    },
    challenge: {
      en: "Balancing sophisticated brand aesthetics and corporate governance standards with responsive performance and accessible lead generation forms.",
      id: "Menjaga presentasi brand profesional sekaligus membuat jalur lead generation tetap jelas.",
    },
    architecture: {
      en: "React Single Page Application built with TypeScript, Redux Toolkit for UI and authentication state, and token-based API request boundaries.",
      id: "Struktur informasi mengutamakan brand, layanan, dan titik kontak yang tetap konsisten pada seluruh perangkat dengan React dan Redux Toolkit.",
    },
    contributions: {
      en: [
        "Implemented component hierarchy, corporate portfolio showcase sections, Redux state slices, and consulting intake workflows.",
      ],
      id: [
        "Fokus pada professional branding, company profile yang responsif, state management, dan alur business lead generation.",
      ],
    },
    reliability: {
      en: "Strict validation on lead submission fields, smooth navigation transitions, and stable error boundaries across all viewport sizes.",
      id: "Konten dan CTA ditata agar mudah diakses tanpa mengganggu keterbacaan atau responsivitas halaman.",
    },
    implementation: {
      en: [
        "Emphasized clean typographic hierarchy, accessible contrast ratios, and modular section layout architecture.",
      ],
      id: ["Mengutamakan hierarki konten, desain responsif, dan jalur konversi yang jelas."],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "corporate-brand",
        label: { en: "Executive Profile & Services", id: "Profil Perusahaan & Portofolio Jasa" },
        description: {
          en: "Showcases specialized consulting practices (financial advisory, governance, strategy) with authoritative typography.",
          id: "Menampilkan pilar layanan konsultasi (keuangan, tata kelola, strategi) dengan tipografi kredibel.",
        },
      },
      {
        id: "redux-state",
        label: { en: "Redux State & UI Flow", id: "Arsitektur Redux State" },
        description: {
          en: "Manages interactive navigation states, modal dialogs, and service selection without prop drilling.",
          id: "Mengelola state interaktif navigasi, dialog konsultasi, dan seleksi layanan secara terpusat.",
        },
      },
      {
        id: "lead-intake",
        label: { en: "Consultation Request Form", id: "Formulir Permintaan Konsultasi" },
        description: {
          en: "Captures corporate client background, enterprise requirements, and contact details with validated input sanitization.",
          id: "Mengumpulkan data perusahaan, cakupan kebutuhan konsultasi, dan kontak perwakilan bisnis secara tervalidasi.",
        },
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
