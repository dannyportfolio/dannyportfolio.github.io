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
    slug: "lendloop",
    name: "LendLoop — Neighborhood Tool-Lending Platform",
    domain: "github.com/dannyportfolio/lendloop",
    url: "https://github.com/dannyportfolio/lendloop",
    githubUrl: "https://github.com/dannyportfolio/lendloop",
    summary: {
      en: "A neighborhood tool-lending platform built with Next.js, Clerk, Convex, and n8n. LendLoop supports public tool discovery, authenticated borrowing workflows, server-side role-based authorization, and resilient event-driven automation for notifications and overdue reminders.",
      id: "Platform peminjaman alat berbasis komunitas yang dibangun menggunakan Next.js, Clerk, Convex, dan n8n. LendLoop mendukung penelusuran katalog alat publik, alur peminjaman terautentikasi, otorisasi berbasis peran di server, serta otomasi event-driven yang andal untuk notifikasi dan pengingat keterlambatan.",
    },
    category: {
      en: "Full-Stack Platform & Workflow Automation",
      id: "Platform Full-Stack & Otomasi Workflow",
    },
    highlights: {
      en: [
        "Zero-trust server-side RBAC in Convex mutations",
        "Transactional Outbox pattern preventing dual writes",
        "Signed HMAC SHA-256 webhooks with replay prevention",
        "Idempotent overdue reminders via compound keys",
        "Live automation delivery status for users and admins",
      ],
      id: [
        "RBAC server-side zero-trust pada mutasi Convex",
        "Pola Transactional Outbox mencegah inkonsistensi dual write",
        "Webhook bertanda tangan HMAC SHA-256 tahan replay attack",
        "Pengingat keterlambatan idempoten dengan compound key",
        "Visibilitas status pengiriman otomasi waktu nyata untuk user dan admin",
      ],
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Clerk",
      "Convex",
      "n8n",
      "Docker",
      "Vitest",
      "Playwright",
    ],
    problem: {
      en: "Homeowners and makers frequently purchase costly specialty tools that remain idle for long stretches, while neighbors lack affordable access. Existing sharing models suffer from lack of trust, unverified inventory, manual scheduling coordination, and missing accountability for loan returns.",
      id: "Pemilik rumah dan praktisi kreatif kerap membeli perkakas khusus berbiaya tinggi yang jarang digunakan, sementara tetangga sekitar sulit mengaksesnya secara terjangkau. Model peminjaman konvensional terkendala ketiadaan rasa percaya, inventaris yang belum terverifikasi, koordinasi jadwal manual, dan lemahnya akuntabilitas pengembalian barang.",
    },
    challenge: {
      en: "Enforcing strict zero-trust authorization where client-supplied user identifiers are never accepted, guaranteeing atomic outbox event dispatch without dual-write discrepancies, and securing asynchronous n8n automation pipelines against replay attacks while preserving idempotency across scheduled reminder cron jobs.",
      id: "Menegakkan otorisasi zero-trust yang tidak pernah mempercayai identifier dari sisi klien, menjamin pencatatan event outbox atomik tanpa ketidaksinkronan dual-write, serta mengamankan alur otomasi n8n dari ancaman replay attack dengan jaminan idempotensi pada penjadwalan cron reminder.",
    },
    architecture: {
      en: "Full-stack reactive architecture coupling Next.js 16 App Router with Convex ACID backend. Client interactions authenticate via Clerk JWTs, Convex server mutations enforce role and ownership checks while persisting business state and outbox events in a single transaction, and containerized n8n engines verify HMAC signatures to orchestrate notifications and idempotent write-backs.",
      id: "Arsitektur reaktif full-stack yang memadukan Next.js 16 App Router dengan backend ACID Convex. Interaksi klien diautentikasi lewat JWT Clerk, mutasi server Convex menegakkan kontrol akses dan kepemilikan sekaligus menyimpan event outbox dalam satu transaksi, dan n8n memverifikasi tanda tangan HMAC untuk mengeksekusi notifikasi serta callback idempoten.",
    },
    contributions: {
      en: [
        "Engineered zero-trust server-side RBAC guards in Convex, verifying Clerk identity tokens and enforcing role policies across listings, loans, and admin queries.",
        "Implemented the Transactional Outbox pattern and HTTP webhooks with canonical HMAC SHA-256 signatures, timestamp tolerances, and stale event recovery.",
        "Designed automated n8n workflows for borrow request notifications, daily overdue reminders with compound idempotency keys, and real-time activity status logging.",
      ],
      id: [
        "Merancang gerbang RBAC server-side zero-trust di Convex, memvalidasi token identitas Clerk, dan menegakkan aturan kepemilikan pada listing, peminjaman, dan akses admin.",
        "Mengimplementasikan pola Transactional Outbox dan webhook HTTP dengan tanda tangan kanonikal HMAC SHA-256, toleransi timestamp, dan pemulihan event tertunda.",
        "Membangun alur otomasi n8n untuk notifikasi permintaan pinjam, cron pengingat harian berbasis compound idempotency key, dan pencatatan status pengiriman real-time.",
      ],
    },
    reliability: {
      en: "System reliability is enforced through transactional database ACID boundaries, automated stale outbox recovery workers, cryptographic replay-attack mitigation, strict compound idempotency keys preventing duplicate alerts, and automated Vitest unit/integration suites along with Playwright end-to-end browser tests.",
      id: "Keandalan sistem dijamin melalui batas transaksi ACID database, worker pemulihan event outbox tertunda, mitigasi kriptografis terhadap replay attack, compound key idempoten untuk mencegah notifikasi ganda, serta pengujian otomatis Vitest unit/integrasi dan Playwright end-to-end browser.",
    },
    implementation: {
      en: [
        "Full-stack Next.js App Router and React 19 interface with public tool directory data minimization withholding private contact details.",
        "Normalized Convex reactive schema featuring secondary indexes on loan statuses, owner/borrower relations, and outbox delivery states.",
        "Multi-workflow containerized n8n orchestration including HMAC verification, daily overdue cron triggers, and secure write-back endpoints.",
      ],
      id: [
        "Antarmuka full-stack Next.js App Router dan React 19 dengan minimasi data katalog publik untuk melindungi privasi kontak pemilik perkakas.",
        "Skema reaktif Convex yang ternormalisasi dengan indeks sekunder pada status pinjaman, relasi pemilik/peminjam, dan status antrean outbox.",
        "Orkestrasi multi-workflow n8n berbasis kontainer mencakup verifikasi HMAC, pemicu cron harian pengingat, dan endpoint write-back terotentikasi.",
      ],
    },
    caseStudy: true,
    isNew: true,
    architectureSteps: [
      {
        id: "user-identity-auth",
        label: { en: "User Identity & Authentication", id: "Identitas Pengguna & Autentikasi" },
        description: {
          en: "Clerk identity verification issues cryptographic JWTs; Convex server guards validate session claims without trusting client-side parameters.",
          id: "Verifikasi identitas Clerk menerbitkan JWT kriptografis; guard Convex memvalidasi klaim sesi tanpa mempercayai parameter dari sisi klien.",
        },
      },
      {
        id: "public-discovery-catalog",
        label: { en: "Public Tool Directory", id: "Direktori Alat Publik" },
        description: {
          en: "Public catalog exposes tool name and category only, enforcing strict data minimization to protect community member privacy.",
          id: "Katalog publik hanya mengekspos nama dan kategori alat, menerapkan minimasi data ketat untuk melindungi privasi anggota komunitas.",
        },
      },
      {
        id: "convex-backend-database",
        label: { en: "Convex Application Backend", id: "Backend Aplikasi Convex" },
        description: {
          en: "ACID queries and mutations execute business logic, prevent overlapping loan reservations, and enforce server-side RBAC across entities.",
          id: "Kueri dan mutasi ACID mengeksekusi logika bisnis, mencegah konflik reservasi pinjaman, dan menegakkan RBAC di tingkat server.",
        },
      },
      {
        id: "transactional-outbox-queue",
        label: { en: "Transactional Outbox Engine", id: "Engine Transactional Outbox" },
        description: {
          en: "Records notification and reminder events in the same atomic database commit as state transitions, preventing dual-write inconsistencies.",
          id: "Mencatat event notifikasi dan pengingat dalam satu commit basis data atomik yang sama dengan perubahan status bisnis.",
        },
      },
      {
        id: "n8n-automation-worker",
        label: { en: "n8n Workflow Automation", id: "Otomasi Workflow n8n" },
        description: {
          en: "Validates signed HMAC SHA-256 payloads within a 5-minute replay window, dispatching notifications and scheduled overdue reminders.",
          id: "Memvalidasi payload bertanda tangan HMAC SHA-256 dengan jendela replay 5 menit, mengeksekusi notifikasi dan pengingat berkala.",
        },
      },
      {
        id: "idempotency-writeback-service",
        label: { en: "Idempotent Secure Write-Back", id: "Write-Back Aman & Idempoten" },
        description: {
          en: "Bearer-authenticated HTTP callback updates outbox state to SUCCEEDED and commits delivery timestamps with compound idempotency locks.",
          id: "Callback HTTP terotentikasi memperbarui status outbox menjadi SUCCEEDED dan menyimpan riwayat pengiriman dengan kunci idempotensi.",
        },
      },
    ],
  },
  {
    slug: "opspilot",
    name: "OpsPilot — Serverless Multi-Tenant Task REST API in Go",
    domain: "github.com/dannyportfolio/OpsPilot",
    url: "https://github.com/dannyportfolio/OpsPilot",
    githubUrl: "https://github.com/dannyportfolio/OpsPilot",
    summary: {
      en: "Production-ready serverless multi-tenant task REST API built in idiomatic Go with hexagonal architecture, dual-runtime execution (HTTP server & AWS Lambda ARM64 Graviton), cryptographic JWT RBAC, and automated schema migrations.",
      id: "REST API manajemen task multi-tenant serverless siap produksi dalam bahasa Go dengan arsitektur heksagonal murni, dual-runtime (HTTP server & AWS Lambda ARM64 Graviton), autentikasi JWT RBAC kriptografis, dan migrasi skema database otomatis.",
    },
    category: {
      en: "Serverless & Cloud Architecture",
      id: "Serverless & Arsitektur Cloud",
    },
    highlights: {
      en: [
        "Dual-runtime (HTTP server & AWS Lambda Graviton)",
        "Strict Hexagonal / Clean Architecture",
        "Multi-tenant isolation & granular RBAC",
        "Cryptographic JWT authentication & revocation",
        "Automated lexical SQL migration engine",
      ],
      id: [
        "Dual-runtime (HTTP server & AWS Lambda Graviton)",
        "Arsitektur heksagonal murni",
        "Isolasi multi-tenant & granular RBAC",
        "Autentikasi JWT kriptografis & revokasi instan",
        "Engine migrasi SQL leksikal otomatis",
      ],
    },
    technologies: ["Go", "AWS Lambda", "API Gateway", "PostgreSQL", "Docker", "JWT / RBAC"],
    problem: {
      en: "Engineering a high-throughput, low-latency multi-tenant task management backend capable of running seamlessly both as a long-running containerized HTTP service and as an ephemeral AWS Lambda serverless function without duplicating domain logic.",
      id: "Membangun backend manajemen task multi-tenant berlatensi rendah yang mampu berjalan mulus baik sebagai service HTTP kontainer maupun fungsi serverless AWS Lambda tanpa menduplikasi logika domain bisnis.",
    },
    challenge: {
      en: "Enforcing absolute multi-tenant boundary isolation across repository adapters, managing database connection pooling under AWS Lambda burst concurrency, and achieving sub-15ms cold start initialization on 64-bit ARM Graviton.",
      id: "Menjamin isolasi batas multi-tenant tanpa risiko kebocoran data, mengelola connection pool database saat lonjakan konkurensi AWS Lambda, dan menjaga latensi cold start di bawah 15ms pada arsitektur 64-bit ARM Graviton.",
    },
    architecture: {
      en: "Hexagonal clean architecture isolating pure domain ports from HTTP transport and persistence adapters, featuring a custom lexical SQL migration engine, token revocation cache, and zero-allocation API Gateway v2 event proxying.",
      id: "Arsitektur heksagonal bersih yang memisahkan domain inti dari adapter transport HTTP dan database PostgreSQL, dilengkapi engine migrasi SQL leksikal terintegrasi, registri pencabutan token instan, dan proxy event API Gateway v2 efisien.",
    },
    contributions: {
      en: [
        "Architected pure Go domain interfaces and application services for multi-tenant task lifecycle and authentication.",
        "Engineered dual-runtime bootstrap adapters for standalone net/http servers and AWS Lambda Graviton execution.",
        "Implemented strict cryptographic JWT verification, sliding-window rate limiting, and defensive thread-safe in-memory fallback repositories.",
      ],
      id: [
        "Merancang antarmuka domain Go murni dan application services untuk siklus hidup task dan autentikasi multi-tenant.",
        "Mengembangkan bootstrap dual-runtime untuk standalone server net/http dan eksekusi serverless AWS Lambda Graviton.",
        "Mengimplementasikan verifikasi JWT kriptografis, pembatas laju sliding-window, dan repositori in-memory thread-safe defensif.",
      ],
    },
    reliability: {
      en: "Reliability is verified through 100% test pass rate across all domain packages, table-driven race detection, transactional PostgreSQL migrations, and OpenSpec specification validation.",
      id: "Keandalan dijamin melalui 100% kelulusan test di seluruh paket domain, pengujian race condition berbasis konkurensi, migrasi database transaksional, dan validasi spesifikasi OpenSpec.",
    },
    implementation: {
      en: [
        "Pure Go standard library routing with zero external heavy web framework dependencies.",
        "Automated lexical SQL migration runner ensuring deterministic forward and backward schema evolution.",
        "AWS SAM declarative template targeting provided.al2023 on Graviton ARM64 for 20% lower cost.",
      ],
      id: [
        "Routing berbasis pustaka standar Go murni tanpa ketergantungan framework eksternal berat.",
        "Runner migrasi SQL leksikal otomatis untuk evolusi skema database yang aman dan teruji.",
        "Template deklaratif AWS SAM dengan target provided.al2023 pada Graviton ARM64 untuk efisiensi biaya 20%.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "client-ingress",
        label: { en: "Client API Ingress", id: "Ingress Klien API" },
        description: {
          en: "External HTTPS requests pass through Amazon API Gateway HTTP API v2 or standalone HTTP reverse proxy with TLS termination.",
          id: "Request HTTPS masuk melalui API Gateway HTTP API v2 atau reverse proxy HTTP dengan terminasi TLS.",
        },
      },
      {
        id: "jwt-rbac-guard",
        label: { en: "JWT & RBAC Security Gate", id: "Gerbang Keamanan JWT & RBAC" },
        description: {
          en: "Cryptographic HS256 verification, sliding-window IP rate limiting, and role-based access validation before touching domain handlers.",
          id: "Verifikasi kriptografis token HS256, pembatasan laju IP, dan otorisasi peran pengguna sebelum menyentuh handler domain.",
        },
      },
      {
        id: "hexagonal-domain",
        label: { en: "Hexagonal Business Core", id: "Inti Bisnis Heksagonal" },
        description: {
          en: "Domain task and auth services process business constraints with zero coupling to transport or storage mechanisms.",
          id: "Layanan domain task dan autentikasi mengeksekusi aturan bisnis tanpa ketergantungan pada layer transport atau database.",
        },
      },
      {
        id: "dual-persistence",
        label: { en: "Tenant-Isolated Persistence", id: "Persistensi Terisolasi Multi-Tenant" },
        description: {
          en: "Executes parameterized PostgreSQL queries scoped strictly by tenant_id, with in-memory thread-safe fallback for local development.",
          id: "Mengeksekusi kueri PostgreSQL berparameter dengan pembatasan tenant_id ketat, didukung repositori in-memory untuk dev lokal.",
        },
      },
      {
        id: "serverless-response",
        label: { en: "Standardized Response Marshalling", id: "Format Respons Terstandarisasi" },
        description: {
          en: "Returns deterministic JSON envelopes and maps internal domain errors to RFC-compliant HTTP status codes in under 15ms.",
          id: "Mengembalikan envelope respons JSON terstandarisasi dan memetakan error domain ke status HTTP dalam waktu <15ms.",
        },
      },
    ],
  },
  {
    slug: "idx-trading-assistant",
    name: "IDX LQ45 Trading Assistant — Quantitative Market Analysis Pipeline",
    domain: "github.com/dannyportfolio/masket-ai-asisstant",
    url: "https://github.com/dannyportfolio/masket-ai-asisstant",
    githubUrl: "https://github.com/dannyportfolio/masket-ai-asisstant",
    summary: {
      en: "An audit-ready, batch-oriented quantitative market analysis pipeline for the Indonesian Stock Market (IDX LQ45). Ingests daily OHLCV data through a prioritized multi-provider fallback registry, executes automated data-quality validation, evaluates benchmark IHSG macro regimes, and computes Wyckoff VPA and Chaikin Money Flow indicators to produce verifiable watchlist analytics without fabricated price signals.",
      id: "Pipeline analisis pasar kuantitatif berbasis batch dan siap audit untuk Bursa Efek Indonesia (IDX LQ45). Mengonsumsi data OHLCV harian melalui registri fallback multi-provider terprioritasi, menjalankan validasi kualitas data otomatis, mengevaluasi rezim makro indeks IHSG, serta menghitung indikator Wyckoff VPA dan Chaikin Money Flow guna menghasilkan analitik watchlist terverifikasi tanpa fabrikasi sinyal harga.",
    },
    category: {
      en: "Financial Technology & Quantitative Analysis",
      id: "Teknologi Finansial & Analisis Kuantitatif",
    },
    highlights: {
      en: [
        "Multi-provider data ingestion with fallback (IDX licensed drop → EODHD → Yahoo Finance)",
        "Automated data-quality gate detecting missing candles, zero volume, and calendar gaps",
        "IHSG benchmark market-regime circuit breaker to establish macro trade permissions",
        "Dual technical analytics engine: pinned Fincept technicals with native indicator fallback",
        "Multi-source financial news aggregation (CNBC Indonesia, IDX, Bloomberg, Yahoo Finance)",
        "Auditable artifact exports: watchlist CSV, trade plans, and structured AI market context JSON",
      ],
      id: [
        "Ingest data multi-provider dengan fallback (file drop IDX resmi → EODHD → Yahoo Finance)",
        "Validasi kualitas data otomatis mendeteksi candle hilang, volume nol, dan celah kalender",
        "Circuit breaker rezim pasar IHSG acuan untuk menentukan izin eksekusi makro",
        "Engine analitik teknikal ganda: modul Fincept terpin dengan fallback indikator native",
        "Agregasi berita finansial multi-sumber (CNBC Indonesia, IDX, Bloomberg, Yahoo Finance)",
        "Ekspor artefak siap audit: watchlist CSV, trade plan terstruktur, dan berkas JSON konteks AI",
      ],
    },
    technologies: ["Python", "pandas", "NumPy", "yfinance", "ta", "Fincept Engine", "pytest"],
    problem: {
      en: "Indonesian stock market analysis tools frequently rely on unverified retail indicators and fragile single-provider scrapers that fail silently on data anomalies like zero-volume sessions, split anomalies, or missing candles. Furthermore, retail tools often generate speculative trade signals without evaluating overarching IHSG benchmark regimes or validating multi-source news corroboration.",
      id: "Alat analisis pasar saham Indonesia kerap bergantung pada indikator ritel yang tidak terverifikasi dan scraping single-provider yang rentan terhadap anomali data seperti volume nol, lonjakan harga palsu, atau candle hilang. Selain itu, sistem ritel sering memicu sinyal spekulatif tanpa mengevaluasi rezim makro IHSG maupun konfirmasi berita finansial multi-sumber.",
    },
    challenge: {
      en: "Architecting a deterministic, offline-capable data pipeline that enforces strict data-quality thresholds before technical processing, integrates external quantitative indicator engines (Fincept) with seamless native fallbacks, and establishes an auditable macro circuit breaker using the IHSG (^JKSE) index to halt speculative setups during volatile market conditions.",
      id: "Merancang pipeline data offline yang deterministik dengan ambang batas kualitas data ketat sebelum pemrosesan teknikal, mengintegrasikan engine indikator eksternal (Fincept) dengan fallback native yang mulus, serta membangun circuit breaker makro berbasis indeks IHSG (^JKSE) guna membatasi setup spekulatif saat pasar volatil.",
    },
    architecture: {
      en: "Modular batch pipeline composed of four primary layers: (1) ProviderRegistry resolving licensed file drops, EODHD, and Yahoo Finance with exponential backoff and stale-cache fallback; (2) Data Quality Gate flagging data anomalies and enforcing bar thresholds; (3) Dual Technical Analytics Engine utilizing pinned Fincept modules alongside native CMF and Wyckoff VPA calculations; and (4) Context Compiler outputting standardized trade plans, market breadth metrics, and LLM-ready AI market contexts in CSV and JSON.",
      id: "Pipeline batch modular yang terbagi dalam empat lapisan utama: (1) ProviderRegistry yang menyelesaikan drop file berlisensi, EODHD, dan Yahoo Finance dengan exponential backoff dan fallback cache; (2) Data Quality Gate untuk menandai anomali data dan menegakkan batas minimum bar; (3) Engine Analitik Kuantitatif Ganda menggunakan modul Fincept terpin serta kalkulasi CMF dan Wyckoff VPA native; dan (4) Context Compiler yang mengekspor trade plan terstandarisasi, metrik market breadth, serta konteks AI siap-LLM dalam format CSV dan JSON.",
    },
    contributions: {
      en: [
        "Engineered ProviderRegistry abstraction supporting prioritized data fallback, exponential retry logic, and stale cache persistence across IDX tickers.",
        "Developed automated data quality evaluator detecting zero volume, invalid price candles, and missing date sequences without fabricating replacement data.",
        "Implemented IHSG market regime screener and composite trend scoring to act as a strict macro gate before individual stock evaluation.",
        "Integrated pinned Fincept technical analysis engine via Git submodule with seamless in-process fallback to native quantitative indicators.",
        "Constructed selected-universe LQ45 market breadth indicators and multi-source financial RSS sentiment scoring.",
      ],
      id: [
        "Merancang abstraksi ProviderRegistry yang mendukung fallback data terprioritasi, logika retry eksponensial, dan persistensi cache lokal untuk ticker IDX.",
        "Mengembangkan evaluator kualitas data otomatis yang mendeteksi volume nol, candle harga tidak valid, dan celah tanggal tanpa memalsukan data.",
        "Mengimplementasikan penyaring rezim pasar IHSG dan skor tren komposit sebagai gerbang makro ketat sebelum evaluasi saham individu.",
        "Mengintegrasikan engine analisis teknikal Fincept via Git submodule dengan fallback in-process ke indikator kuantitatif native.",
        "Membangun kalkulator market breadth semesta LQ45 dan pembobotan sentimen berita finansial multi-sumber berbasis RSS.",
      ],
    },
    reliability: {
      en: "Strict zero-hallucination data policy: data fetch failures produce explicit error flags (DATA_MISSING, DATA_INSUFFICIENT, DATA_ANOMALY, STALE_DATA, FETCH_ERROR) rather than synthetic price estimation. Tested via comprehensive pytest test suite covering CMF calculations, data-quality bounds, engine fallback behavior, market regime scoring, news parser resilience, and trade plan confidence formulas.",
      id: "Kebijakan data tanpa halusinasi ketat: kegagalan penarikan data menghasilkan status error eksplisit (DATA_MISSING, DATA_INSUFFICIENT, DATA_ANOMALY, STALE_DATA, FETCH_ERROR) tanpa estimasi harga sintetis. Keandalan diuji melalui rangkaian pytest komprehensif yang mencakup kalkulasi CMF, batas kualitas data, perilaku fallback engine, skor rezim pasar, ketahanan parser berita, dan formula keyakinan trade plan.",
    },
    implementation: {
      en: [
        "Pure Python batch pipeline executable via CLI with customizable tickers, universe scope, and lookback periods.",
        "Deterministic file-based artifact generation producing auditable CSV and JSON snapshots for each run.",
        "Automated test coverage across indicators, market data fallback adapters, and trade planning logic with zero network dependencies during testing.",
      ],
      id: [
        "Pipeline batch Python murni yang dapat dijalankan melalui CLI dengan konfigurasi ticker, semesta saham, dan periode data fleksibel.",
        "Penyimpanan artefak berbasis file deterministik yang menghasilkan snapshot laporan CSV dan JSON terstruktur pada setiap eksekusi.",
        "Cakupan unit test otomatis untuk indikator, adapter fallback data pasar, dan logika trade plan tanpa ketergantungan jaringan saat pengujian.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "provider-registry",
        label: { en: "Multi-Provider Ingestion", id: "Ingest Data Multi-Provider" },
        description: {
          en: "Fetches daily OHLCV from licensed vendor drops, EODHD, or Yahoo Finance with retry and stale-cache fallback.",
          id: "Mengambil data OHLCV harian dari file vendor resmi, EODHD, atau Yahoo Finance dengan retry dan fallback cache.",
        },
      },
      {
        id: "quality-gate",
        label: { en: "Data Quality & Validation Gate", id: "Gerbang Validasi & Kualitas Data" },
        description: {
          en: "Validates candle anomalies, zero-volume sessions, and date gaps, rejecting corrupted data prior to analysis.",
          id: "Memvalidasi anomali candle, sesi volume nol, dan celah kalender sebelum data diolah lebih lanjut.",
        },
      },
      {
        id: "macro-regime",
        label: { en: "IHSG Market Regime Filter", id: "Penyaring Rezim Pasar IHSG" },
        description: {
          en: "Evaluates benchmark IHSG index trend structure and Chaikin Money Flow to grant or restrict macro trading permissions.",
          id: "Mengevaluasi struktur tren indeks acuan IHSG dan Chaikin Money Flow untuk menentukan izin posisi makro.",
        },
      },
      {
        id: "analytics-engine",
        label: { en: "Dual Technical Analytics Engine", id: "Engine Analitik Teknikal Ganda" },
        description: {
          en: "Computes Fincept technicals (RSI, MACD, ADX, ATR) with automatic fallback to native CMF and Wyckoff VPA indicators.",
          id: "Menghitung indikator Fincept (RSI, MACD, ADX, ATR) dengan fallback otomatis ke CMF dan Wyckoff VPA native.",
        },
      },
      {
        id: "reporting-artifacts",
        label: { en: "Auditable Reporting & AI Context", id: "Laporan Terverifikasi & Konteks AI" },
        description: {
          en: "Generates structured watchlist CSVs, trade plans with risk-reward ratios, and standardized AI market context JSONs.",
          id: "Menghasilkan watchlist CSV terstruktur, rencana trading berimbang risiko-keuntungan, dan berkas JSON konteks AI.",
        },
      },
    ],
  },
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
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
