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
    slug: "chainflow",
    name: "ChainFlow: Distributed EVM Transaction Orchestration Engine",
    domain: "github.com/dannyportfolio/Chainflow-Blockchain-Engine",
    url: "https://github.com/dannyportfolio/Chainflow-Blockchain-Engine",
    githubUrl: "https://github.com/dannyportfolio/Chainflow-Blockchain-Engine",
    summary: {
      en: "A fault-tolerant, event-driven Go 1.27 orchestration engine for accepting, scheduling, signing, broadcasting, retrying, and reconciling EVM blockchain transactions with durable PostgreSQL 17 state, NATS JetStream work queues, and multi-provider RPC failover.",
      id: "Engine orkestrasi transaksi blockchain EVM berbasis Go 1.27 yang fault-tolerant dan event-driven untuk menerima, menjadwalkan, menandatangani, menyiarkan, mencoba ulang, serta merekonsiliasi transaksi dengan persistensi PostgreSQL 17, antrean NATS JetStream, dan failover RPC multi-provider.",
    },
    category: {
      en: "Distributed Systems & Blockchain Infrastructure",
      id: "Sistem Terdistribusi & Infrastruktur Blockchain",
    },
    highlights: {
      en: [
        "Two-level IntentStatus & ExecutionStatus state machines with fencing leases",
        "Transactional Outbox in PostgreSQL 17 relayed to NATS JetStream work queues",
        "DB-coordinated nonce allocation preventing gaps and duplicate broadcasts",
        "EIP-1559 isolated signing, 15% RBF fee bumping, and timeout reconciliation",
        "Multi-provider RPC circuit-breaker failover and chain reorg verification",
      ],
      id: [
        "State machine dua tingkat IntentStatus & ExecutionStatus dengan fencing lease",
        "Transactional Outbox di PostgreSQL 17 menuju work queue NATS JetStream",
        "Alokasi nonce terkoordinasi DB untuk mencegah celah nonce dan siaran ganda",
        "Isolasi penandatanganan EIP-1559, RBF fee bump 15%, dan rekonsiliasi timeout",
        "Failover RPC multi-provider dengan circuit breaker serta verifikasi chain reorg",
      ],
    },
    technologies: [
      "Go 1.27",
      "go-ethereum",
      "PostgreSQL 17",
      "NATS JetStream",
      "EIP-1559",
      "Prometheus",
      "OpenTelemetry",
      "Docker",
    ],
    problem: {
      en: "Broadcasting EVM blockchain transactions at production scale fails when services rely on in-memory nonce mutexes, fire-and-forget RPC calls, or flat status enums. Worker crashes mid-broadcast, ambiguous RPC timeouts, underpriced mempool stalls, and chain reorganizations easily cause stuck nonces, duplicate transactions, or lost auditability.",
      id: "Penyiaran transaksi blockchain EVM pada skala produksi rentan bermasalah jika hanya mengandalkan mutex nonce di memori, pemanggilan RPC tanpa rekonsiliasi, atau enum status tunggal. Crash worker saat broadcast, timeout RPC yang ambigu, transaksi macet di mempool, dan chain reorganization dapat memicu celah nonce, transaksi ganda, atau hilangnya jejak audit.",
    },
    challenge: {
      en: "Coordinating strict per-wallet sequential nonces across distributed worker replicas without holding database locks during network RPC calls, recovering safely from ambiguous broadcast timeouts without allocating duplicate nonces, and detecting chain reorgs or external nonce consumption before declaring finality.",
      id: "Mengorkestrasi nonce sekuensial per wallet di banyak replika worker tanpa menahan kunci database selama panggilan RPC jaringan, memulihkan timeout broadcast ambigu tanpa mengalokasikan nonce baru, serta mendeteksi chain reorg atau pemakaian nonce eksternal sebelum menetapkan finalitas.",
    },
    architecture: {
      en: "Clean-boundary Go workspace split into four role binaries (api, orchestrator, tx-worker, confirmation-worker) with zero infrastructure imports inside internal/domain. The HTTP ingress persists transaction_intents and outbox_events atomically in PostgreSQL 17; the Outbox Relay publishes to NATS JetStream; bounded worker pools acquire 30-second fencing leases, reserve nonces, sign EIP-1559 payloads via an isolated Signer, persist raw signed transactions in PREPARED state before broadcast, and rely on a stateless DB-driven Confirmation Monitor for finality and reorg checks.",
      id: "Workspace Go berbatas arsitektur bersih yang terbagi menjadi empat biner peran (api, orchestrator, tx-worker, confirmation-worker) tanpa dependensi infrastruktur di dalam internal/domain. Ingress HTTP menyimpan transaction_intents dan outbox_events secara atomik di PostgreSQL 17; Outbox Relay menerbitkan pesan ke NATS JetStream; worker pool berbatas mengambil fencing lease 30 detik, mereservasi nonce, menandatangani payload EIP-1559 lewat Signer terisolasi, menyimpan transaksi bertanda tangan pada status PREPARED sebelum broadcast, serta mengandalkan Confirmation Monitor berbasis DB untuk finalitas dan deteksi reorg.",
    },
    contributions: {
      en: [
        "Engineered two-level IntentStatus and ExecutionStatus state machines with optimistic version fencing, immutable transaction_state_events logs, and numeric(78,0) uint256 PostgreSQL storage.",
        "Built the Transactional Outbox relay, NATS JetStream pull-based worker pool, expired-lease sweeper, and TxProcessor supporting 15% Replace-By-Fee (RBF) bumping on the original nonce.",
        "Implemented a priority-ordered EVM RPC Router with per-provider ProviderGuard circuit breakers, cross-provider block hash verification against reorgs, and an isolated DevSigner enforcing fee caps and mainnet chain-ID guards.",
      ],
      id: [
        "Merancang state machine dua tingkat IntentStatus dan ExecutionStatus dengan optimistic version fencing, log audit transaction_state_events yang immutable, dan penyimpanan uint256 numeric(78,0) di PostgreSQL.",
        "Membangun relay Transactional Outbox, worker pool berbasis pull NATS JetStream, lease sweeper, dan TxProcessor yang mendukung Replace-By-Fee (RBF) 15% pada nonce yang sama.",
        "Mengimplementasikan EVM RPC Router terprioritas dengan circuit breaker ProviderGuard per provider, verifikasi silang block hash terhadap reorg, serta DevSigner terisolasi dengan batas biaya gas dan proteksi mainnet.",
      ],
    },
    reliability: {
      en: "Verified through unit and race-tested integration suites across domain state transitions, PostgreSQL repositories, JetStream messaging, RPC failover, and isolated signing, alongside simulated EVM (go-ethereum/ethclient/simulated) confirmation E2E tests, chaos fault-injection tests, and burst load tests with Prometheus, Loki, and Grafana observability.",
      id: "Terverifikasi melalui unit test dan uji integrasi dengan race detector pada transisi state domain, repositori PostgreSQL, messaging JetStream, failover RPC, dan signer terisolasi, dilengkapi uji E2E konfirmasi pada EVM tersimulasi (go-ethereum/ethclient/simulated), uji chaos fault-injection, dan uji beban burst dengan observabilitas Prometheus, Loki, serta Grafana.",
    },
    implementation: {
      en: [
        "HTTP API with strict JSON decoding (64 KB cap), mandatory Idempotency-Key headers, per-tenant API key and sender-address authorization, and token-bucket rate limiting.",
        "PostgreSQL 17 schema using partial indexes for unpublished outbox rows, active leases, retries, and active confirmation scans.",
        "Pre-broadcast PREPARED checkpoint persisting tx_hash and raw_signed_tx so crash recovery reconciles on-chain status before re-broadcasting.",
      ],
      id: [
        "HTTP API dengan decoding JSON ketat (batas 64 KB), header wajib Idempotency-Key, otorisasi API key serta alamat pengirim per tenant, dan rate limiting.",
        "Skema PostgreSQL 17 dengan partial index untuk baris outbox yang belum terbit, lease aktif, antrean retry, dan pemindaian konfirmasi aktif.",
        "Checkpoint PREPARED sebelum broadcast yang menyimpan tx_hash dan raw_signed_tx agar pemulihan crash merekonsiliasi status on-chain sebelum mengirim ulang.",
      ],
    },
    caseStudy: true,
    isNew: true,
    architectureSteps: [
      {
        id: "api-idempotency-ingress",
        label: {
          en: "Idempotent API Ingress",
          id: "Ingress API Idempoten",
        },
        description: {
          en: "Validates API keys, sender permissions, rate limits, and Idempotency-Key headers, then commits intent and outbox_event atomically in PostgreSQL 17.",
          id: "Memvalidasi API key, izin pengirim, rate limit, dan header Idempotency-Key, lalu menyimpan intent dan outbox_event secara atomik di PostgreSQL 17.",
        },
      },
      {
        id: "outbox-jetstream-relay",
        label: {
          en: "Transactional Outbox & JetStream",
          id: "Transactional Outbox & JetStream",
        },
        description: {
          en: "Polls unpublished outbox rows and dispatches deduplicated tx.dispatch events into NATS JetStream work queues while a sweeper reclaims expired leases.",
          id: "Mengambil baris outbox yang belum terbit dan mengirim event tx.dispatch terdeduplikasi ke NATS JetStream sementara sweeper memulihkan lease kedaluwarsa.",
        },
      },
      {
        id: "nonce-isolated-signer",
        label: {
          en: "Nonce Reservation & Isolated Signer",
          id: "Reservasi Nonce & Signer Terisolasi",
        },
        description: {
          en: "TxProcessor acquires a fencing lease, reserves sequential wallet nonces in PostgreSQL, signs EIP-1559 payloads within fee caps, and persists PREPARED raw_signed_tx.",
          id: "TxProcessor mengambil fencing lease, mereservasi nonce wallet sekuensial di PostgreSQL, menandatangani payload EIP-1559 sesuai batas biaya, dan menyimpan raw_signed_tx pada status PREPARED.",
        },
      },
      {
        id: "rpc-failover-router",
        label: {
          en: "Multi-Provider RPC Router",
          id: "Router RPC Multi-Provider",
        },
        description: {
          en: "Broadcasts signed transactions through ProviderGuard circuit breakers and reconciles ambiguous timeouts via TransactionByHash before any retry.",
          id: "Menyiarkan transaksi bertanda tangan melalui circuit breaker ProviderGuard dan merekonsiliasi timeout ambigu lewat TransactionByHash sebelum mencoba ulang.",
        },
      },
      {
        id: "confirmation-reorg-monitor",
        label: {
          en: "Confirmation & Reorg Monitor",
          id: "Monitor Konfirmasi & Reorg",
        },
        description: {
          en: "Polls BROADCASTED and CONFIRMING executions, cross-checks block hashes against reorgs, triggers 15% RBF retries when stale, and finalizes settled intents.",
          id: "Memantau eksekusi BROADCASTED dan CONFIRMING, memeriksa silang block hash terhadap reorg, memicu retry RBF 15% saat macet, dan memfinalisasi intent.",
        },
      },
    ],
  },
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
  {
    slug: "griya-properti",
    name: "Griya Properti v3.0: Real Estate Microservices Platform",
    domain: "github.com/dannyportfolio/property-apps",
    url: "https://github.com/dannyportfolio/property-apps",
    githubUrl: "https://github.com/dannyportfolio/property-apps",
    summary: {
      en: "A real estate platform built on NestJS 12 microservices over Redis transport with Clean Architecture, shared Zod v4 contracts, and a React 19 + Tailwind CSS v4 frontend.",
      id: "Platform properti berbasis arsitektur NestJS 12 Microservices dengan transport Redis, Clean Architecture, kontrak Zod v4 bersama, serta frontend React 19 + Tailwind CSS v4.",
    },
    category: {
      en: "Microservices & Full-Stack Architecture",
      id: "Arsitektur Microservices & Full-Stack",
    },
    highlights: {
      en: [
        "API Gateway with Helmet, Throttler rate-limiting, and cookie-based JWT auth",
        "Identity Service with refresh token rotation, reuse detection, and Google OAuth",
        "Listing Service with ReDoS-safe paginated search and IDOR ownership checks",
        "Shared Zod v4 DTO contracts and DomainError RPC interceptors across services",
        "React 19 + Vite 6 client with TanStack Query v5, Redux Toolkit, and Leaflet maps",
      ],
      id: [
        "API Gateway dengan Helmet, rate-limiting Throttler, dan autentikasi JWT berbasis cookie",
        "Identity Service dengan rotasi refresh token, deteksi reuse, dan Google OAuth",
        "Listing Service dengan pencarian terpaginasi tahan ReDoS dan pengecekan kepemilikan IDOR",
        "Kontrak DTO Zod v4 bersama serta DomainError RPC interceptor lintas layanan",
        "Klien React 19 + Vite 6 dengan TanStack Query v5, Redux Toolkit, dan peta Leaflet",
      ],
    },
    technologies: [
      "NestJS 12",
      "TypeScript",
      "Redis",
      "MongoDB",
      "Zod",
      "React 19",
      "Tailwind CSS v4",
      "TanStack Query",
      "Docker",
    ],
    problem: {
      en: "Monolithic property portals often tightly couple user authentication, listing search, and buyer lead capture, making independent scaling, strict security boundaries, and shared validation across backend and frontend difficult to maintain.",
      id: "Portal properti monolitik kerap mencampuradukkan autentikasi pengguna, pencarian listing, dan pengelolaan prospek pembeli sehingga menyulitkan skalabilitas independen, isolasi keamanan, dan konsistensi validasi antara backend dan frontend.",
    },
    challenge: {
      en: "Coordinating four decoupled NestJS services over Redis RPC while preserving end-to-end type safety, preventing refresh token replay, defending regex-based search against ReDoS, and enforcing strict IDOR ownership checks on property mutations.",
      id: "Mengorkestrasi empat layanan NestJS terpisah melalui Redis RPC dengan tetap menjaga type safety ujung-ke-ujung, mencegah replay refresh token, melindungi pencarian regex dari ReDoS, dan menegakkan kontrol kepemilikan IDOR pada mutasi properti.",
    },
    architecture: {
      en: "Monorepo workspace separating an HTTP API Gateway from three Redis-backed microservices (Identity, Listing, and Inquiry), each structured in Clean Architecture layers (domain, application, infrastructure, presentation) and backed by MongoDB 7 and shared Zod contracts.",
      id: "Monorepo workspace yang memisahkan HTTP API Gateway dari tiga microservice berbasis Redis (Identity, Listing, dan Inquiry), masing-masing disusun dengan lapisan Clean Architecture (domain, application, infrastructure, presentation) di atas MongoDB 7 dan kontrak Zod bersama.",
    },
    contributions: {
      en: [
        "Built the NestJS 12 API Gateway with Swagger (/api/docs), ZodValidationPipe, ParseObjectIdPipe, Helmet, CORS, and Throttler rate-limiting.",
        "Implemented Identity, Listing, and Inquiry microservices with refresh token reuse detection, Firebase Admin OAuth verification, lifecycle states (draft, active, under_offer, sold), and SMTP seller notifications.",
        "Developed the React 19 + Vite 6 frontend with TanStack Query v5, Redux Toolkit, React Router v7, Leaflet maps, and Vitest/Playwright test coverage.",
      ],
      id: [
        "Membangun API Gateway NestJS 12 dengan Swagger (/api/docs), ZodValidationPipe, ParseObjectIdPipe, Helmet, CORS, dan rate-limiting Throttler.",
        "Mengimplementasikan microservice Identity, Listing, dan Inquiry dengan deteksi reuse refresh token, verifikasi OAuth Firebase Admin, status siklus hidup listing (draft, active, under_offer, sold), dan notifikasi SMTP.",
        "Mengembangkan frontend React 19 + Vite 6 menggunakan TanStack Query v5, Redux Toolkit, React Router v7, peta Leaflet, serta cakupan uji Vitest dan Playwright.",
      ],
    },
    reliability: {
      en: "Enforced via shared Zod v4 boundary validation, DomainRpcInterceptor error mapping, ReDoS-safe regex escaping, Vitest unit/integration suites, Supertest gateway E2E tests, and Playwright browser verification.",
      id: "Dijamin melalui validasi batas Zod v4 bersama, pemetaan error DomainRpcInterceptor, escaping regex tahan ReDoS, rangkaian uji Vitest, uji E2E gateway dengan Supertest, dan verifikasi browser Playwright.",
    },
    implementation: {
      en: [
        "NPM workspaces monorepo (apps/* and packages/*) with shared tsconfig.base.json and Docker Compose for local MongoDB 7 and Redis 7.",
        "packages/shared and packages/nest-common centralizing DTO schemas, ObjectId validation, and Redis transport helpers.",
        "Frontend state split cleanly between server cache (TanStack Query v5) and persisted session state (Redux Toolkit + Redux Persist).",
      ],
      id: [
        "Monorepo NPM workspaces (apps/* dan packages/*) dengan tsconfig.base.json bersama serta Docker Compose untuk MongoDB 7 dan Redis 7 lokal.",
        "packages/shared dan packages/nest-common memusatkan skema DTO, validasi ObjectId, dan helper transport Redis.",
        "Pemisahan state frontend yang tegas antara cache server (TanStack Query v5) dan state sesi persisten (Redux Toolkit + Redux Persist).",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "client-spa",
        label: { en: "React 19 + Vite Client", id: "Klien React 19 + Vite" },
        description: {
          en: "Handles property discovery on Leaflet maps, authenticated user dashboards, and optimistic UI queries via TanStack Query v5.",
          id: "Menangani eksplorasi properti pada peta Leaflet, dashboard pengguna terautentikasi, dan kueri UI melalui TanStack Query v5.",
        },
      },
      {
        id: "api-gateway",
        label: { en: "NestJS API Gateway", id: "NestJS API Gateway" },
        description: {
          en: "Exposes /api/v1/* REST endpoints with Helmet, Throttler rate limits, cookie JWT extraction, and ZodValidationPipe.",
          id: "Menyediakan endpoint REST /api/v1/* dengan Helmet, rate limit Throttler, ekstraksi JWT cookie, dan ZodValidationPipe.",
        },
      },
      {
        id: "redis-rpc-bus",
        label: {
          en: "Redis Transport & Shared Contracts",
          id: "Transport Redis & Kontrak Bersama",
        },
        description: {
          en: "Routes typed microservice commands and maps DomainError exceptions uniformly via @griya/nest-common.",
          id: "Merutekan perintah microservice bertipe aman dan memetakan eksepsi DomainError secara seragam lewat @griya/nest-common.",
        },
      },
      {
        id: "domain-services",
        label: {
          en: "Identity, Listing & Inquiry Services",
          id: "Layanan Identity, Listing & Inquiry",
        },
        description: {
          en: "Execute isolated business rules for token rotation, ReDoS-safe listing search, IDOR checks, and SMTP lead notifications.",
          id: "Menjalankan aturan bisnis terisolasi untuk rotasi token, pencarian listing tahan ReDoS, cek IDOR, dan notifikasi prospek SMTP.",
        },
      },
      {
        id: "mongodb-persistence",
        label: { en: "MongoDB 7 Persistence", id: "Persistensi MongoDB 7" },
        description: {
          en: "Stores User, RefreshToken, Listing, and Inquiry collections with Mongoose schemas and indexed query paths.",
          id: "Menyimpan koleksi User, RefreshToken, Listing, dan Inquiry dengan skema Mongoose dan jalur kueri terindeks.",
        },
      },
    ],
  },
  {
    slug: "tragapos",
    name: "TragaPOS: Headless Multi-Industry POS & Commerce Engine",
    domain: "github.com/dannyportfolio/TragaPOS",
    url: "https://github.com/dannyportfolio/TragaPOS",
    githubUrl: "https://github.com/dannyportfolio/TragaPOS",
    summary: {
      en: "A distributed, offline-first commerce engine written in Go 1.24 that compiles from one codebase into CLOUD (Kubernetes + PostgreSQL) and EDGE (SQLite WAL, CGO_ENABLED=0) runtime targets.",
      id: "Mesin commerce terdistribusi offline-first berbasis Go 1.24 yang dikompilasi dari satu codebase menjadi target runtime CLOUD (Kubernetes + PostgreSQL) dan EDGE (SQLite WAL, CGO_ENABLED=0).",
    },
    category: {
      en: "Distributed Systems & Edge Commerce",
      id: "Sistem Terdistribusi & Edge Commerce",
    },
    highlights: {
      en: [
        "Dual-mode Go binary (CLOUD and EDGE) switched via APP_MODE",
        "100% offline Ed25519 cryptographic QR ticket verification with double-scan prevention",
        "Polymorphic FulfillmentStrategy across F&B, Retail, Tourism, and Hospitality",
        "Transactional Outbox pattern with UUIDv7 identity and Physical Reality Wins sync",
        "Real-time WebSocket Hub for Kitchen Display Systems (KDS) and gate turnstiles",
      ],
      id: [
        "Biner Go dual-mode (CLOUD dan EDGE) yang dikendalikan melalui APP_MODE",
        "Verifikasi tiket QR kriptografis Ed25519 100% offline dengan pencegahan double-scan",
        "FulfillmentStrategy polimorfik untuk sektor F&B, Ritel, Wisata, dan Perhotelan",
        "Pola Transactional Outbox dengan identitas UUIDv7 dan kebijakan sinkronisasi Physical Reality Wins",
        "WebSocket Hub real-time untuk Kitchen Display System (KDS) dan gerbang turnstile",
      ],
    },
    technologies: [
      "Go 1.24",
      "Gin",
      "PostgreSQL",
      "SQLite WAL",
      "Ed25519",
      "WebSocket",
      "Kubernetes",
      "K3s",
      "Docker",
    ],
    problem: {
      en: "Multi-outlet retail, F&B, tourism parks, and hospitality venues suffer revenue loss when cloud-tethered POS terminals stall during ISP outages, while isolated desktop POS apps create fragmented inventory and ticket fraud.",
      id: "Gerai ritel, F&B, taman wisata, dan perhotelan kerap mengalami gangguan transaksi saat POS yang bergantung penuh pada cloud terputus dari internet, sementara aplikasi desktop terisolasi memicu fragmentasi stok dan celah duplikasi tiket.",
    },
    challenge: {
      en: "Running a single Clean Architecture Go codebase seamlessly across Cloud PostgreSQL and Edge SQLite WAL without CGO, guaranteeing atomic outbox sync without rejecting paid offline sales, and verifying QR tickets offline without double-redemption.",
      id: "Menjalankan satu codebase Go Clean Architecture secara mulus di atas PostgreSQL Cloud maupun SQLite WAL Edge tanpa CGO, menjamin sinkronisasi outbox atomik tanpa menolak transaksi offline yang sudah dibayar, serta memvalidasi tiket QR secara offline tanpa penukaran ganda.",
    },
    architecture: {
      en: "Clean Architecture and DDD in Go: Gin HTTP delivery with X-Idempotency-Key middleware and gorilla/websocket Hub, application usecases with strategy hooks, pure Go domain entities, and a unified SQL repository supporting PostgreSQL ($1) and SQLite (?) inside atomic transactions.",
      id: "Clean Architecture dan DDD di Go: lapisan delivery Gin HTTP dengan middleware X-Idempotency-Key dan gorilla/websocket Hub, usecase aplikasi dengan strategy hook, entitas domain Go murni, serta repositori SQL terpadu yang mendukung PostgreSQL ($1) dan SQLite (?) dalam transaksi atomik.",
    },
    contributions: {
      en: [
        "Engineered unified checkout, order/folio management, and background sync workers using time-ordered UUIDv7 and the Transactional Outbox pattern.",
        "Built polymorphic FulfillmentStrategy implementations for F&B BOM recipe deduction, Retail multi-UOM/batch tracking, Tourism Ed25519 QR verification, and Hospitality Open Folio room charges.",
        "Configured multi-stage Distroless Docker builds (CGO_ENABLED=0) alongside Cloud Kubernetes HPA and Edge K3s PVC deployment manifests.",
      ],
      id: [
        "Merancang unified checkout, manajemen order/folio, dan background sync worker menggunakan UUIDv7 berurutan waktu serta pola Transactional Outbox.",
        "Membangun implementasi FulfillmentStrategy polimorfik untuk pemotongan resep BOM F&B, multi-UOM/batch Ritel, verifikasi QR Ed25519 Wisata, dan Open Folio tagihan kamar Perhotelan.",
        "Menyiapkan build Docker Distroless multi-stage (CGO_ENABLED=0) beserta manifes deployment Cloud Kubernetes HPA dan Edge K3s PVC.",
      ],
    },
    reliability: {
      en: "Ensured through atomic transaction boundaries (WithTransaction), idempotency middleware, atomic redeemed_tickets insertion for offline gate scans, and Physical Reality Wins reconciliation alerting via STOCK_DISCREPANCY_ALERT.",
      id: "Dijamin melalui batas transaksi atomik (WithTransaction), middleware idempotensi, penyisipan atomik redeemed_tickets untuk pemindaian gerbang offline, serta rekonsiliasi Physical Reality Wins melalui STOCK_DISCREPANCY_ALERT.",
    },
    implementation: {
      en: [
        "Pure Go static binary using modernc.org/sqlite in WAL mode for Edge Mini PCs and lib/pq PostgreSQL for Central Cloud.",
        "Ed25519 asymmetric cryptography signing ticket payloads on Cloud and verifying signatures mathematically on offline Edge gates.",
        "Append-only outbox event pushing (/v1/sync/push) and delta catalog pulling (/v1/sync/pull) with graceful shutdown support.",
      ],
      id: [
        "Biner statis Go murni dengan modernc.org/sqlite mode WAL untuk Mini PC Edge dan lib/pq PostgreSQL untuk Cloud Pusat.",
        "Kriptografi asimetris Ed25519 untuk penandatanganan payload tiket di Cloud dan verifikasi matematis secara offline di gerbang Edge.",
        "Push event outbox append-only (/v1/sync/push) dan pull katalog delta (/v1/sync/pull) dengan dukungan graceful shutdown.",
      ],
    },
    caseStudy: true,
    architectureSteps: [
      {
        id: "cloud-hub",
        label: {
          en: "Cloud Central Hub (K8s + PostgreSQL)",
          id: "Hub Pusat Cloud (K8s + PostgreSQL)",
        },
        description: {
          en: "Manages master catalog, multi-tenant coordination, Ed25519 ticket signing, and idempotent sync ingestion.",
          id: "Mengelola master katalog, koordinasi multi-tenant, penandatanganan tiket Ed25519, dan ingesti sinkronisasi idempoten.",
        },
      },
      {
        id: "delta-outbox-sync",
        label: { en: "Delta & Outbox Sync Engine", id: "Mesin Sinkronisasi Delta & Outbox" },
        description: {
          en: "Pulls catalog updates (/v1/sync/pull) and pushes append-only outbox events (/v1/sync/push) asynchronously.",
          id: "Menarik pembaruan katalog (/v1/sync/pull) dan mengirim event outbox append-only (/v1/sync/push) secara asinkron.",
        },
      },
      {
        id: "edge-checkout",
        label: { en: "Edge Checkout & Strategy Hooks", id: "Checkout Edge & Strategy Hooks" },
        description: {
          en: "Executes F&B, Retail, Tourism, and Hospitality fulfillment strategies inside atomic SQLite WAL transactions.",
          id: "Mengeksekusi strategi pemenuhan F&B, Ritel, Wisata, dan Perhotelan di dalam transaksi atomik SQLite WAL.",
        },
      },
      {
        id: "offline-ed25519",
        label: { en: "Offline Ed25519 Gate Verifier", id: "Verifikator Gerbang Ed25519 Offline" },
        description: {
          en: "Validates QR signatures and expiry locally without WAN, recording redemptions atomically to block double-scans.",
          id: "Memvalidasi tanda tangan QR dan masa berlaku secara lokal tanpa WAN serta mencatat penukaran secara atomik untuk mencegah scan ganda.",
        },
      },
      {
        id: "ws-kds-hub",
        label: { en: "WebSocket KDS & Turnstile Hub", id: "Hub WebSocket KDS & Turnstile" },
        description: {
          en: "Broadcasts real-time kitchen tickets and gate unlock events over local outlet LAN.",
          id: "Menyiarkan tiket dapur dan sinyal pembukaan gerbang secara real-time melalui jaringan LAN outlet lokal.",
        },
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
