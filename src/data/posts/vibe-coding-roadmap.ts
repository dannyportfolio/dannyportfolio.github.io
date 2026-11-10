import type { BlogPost } from "@/data/blog";

export const vibeCodingRoadmapPost: BlogPost = {
  slug: "vibe-coding-roadmap",
  title: {
    en: "The Vibe Coding Roadmap: Engineering Discipline in the Age of AI Agents",
    id: "Peta Jalan Vibe Coding: Panduan Lengkap Rekayasa Perangkat Lunak Berbasis AI dari Konsep hingga Produksi",
  },
  summary: {
    en: "A comprehensive, engineering-first roadmap for mastering Vibe Coding. Explore the AI toolchain (CLI agents, IDEs, rapid generators), blueprint planning, modular architectures, negative prompting, compounding error defense, scheduled refactoring, zero-trust security audits, and Git rigor.",
    id: "Peta jalan komprehensif berlandaskan disiplin rekayasa software untuk menguasai Vibe Coding. Membahas ekosistem perkakas AI (agen CLI, IDE cerdas, generator cepat), perencanaan blueprint & PRD, arsitektur modular ramah LLM, strategi negative prompting, pertahanan compounding error, sesi refaktorisasi berkala, audit keamanan zero-trust, hingga disiplin Git.",
  },
  category: {
    en: "AI Engineering & Workflows",
    id: "Rekayasa AI & Alur Kerja",
  },
  tags: [
    "Vibe Coding",
    "AI Coding Agents",
    "Software Architecture",
    "Claude Code",
    "Cursor",
    "Prompt Engineering",
    "Application Security",
    "Clean Code",
  ],
  publishedDate: "2026-11-10",
  author: "Danial Fachrudin",
  readingTime: {
    en: "20 min read",
    id: "20 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "The Vibe Coding Roadmap: Intent-Driven Software Engineering with AI",
    id: "Peta Jalan Vibe Coding: Panduan Lengkap Rekayasa Software dengan AI",
  },
  seoDescription: {
    en: "Master modern Vibe Coding with architectural rigor. Learn the tooling ecosystem, blueprint planning, LLM-friendly stacks, negative prompting, forced refactoring, and zero-trust security.",
    id: "Kuasai Vibe Coding modern dengan disiplin arsitektur. Pelajari ekosistem tools AI, perencanaan blueprint, stack ramah LLM, negative prompting, refaktorisasi berkala, dan keamanan zero-trust.",
  },
  sections: [
    {
      id: "the-vibe-coding-paradigm",
      title: {
        en: "1. The Vibe Coding Paradigm: The Shift to Intent-Driven Development",
        id: "1. Paradigma Vibe Coding: Pergeseran Menuju Pengembangan Berbasis Intensi",
      },
      paragraphs: {
        en: [
          "In early 2025, former Tesla AI director and OpenAI co-founder Andrej Karpathy coined the term 'Vibe Coding' to describe an emerging phenomenon: software development where human engineers express high-level architectural intent in plain language, while autonomous AI models handle the low-level syntax typing, wiring, and code execution. Rather than micromanaging every token, developers steer the system by evaluating outputs and steering the 'vibe' of the application.",
          "In casual developer circles, the phrase quickly took on a misleading connotation: typing reckless instructions into a chat box, hoping for the best, and deploying whatever code runs without understanding how it works. Experienced software engineers recognize that casual vibe coding is a recipe for catastrophic technical debt, security breaches, and unmaintainable monolithic spaghettis.",
          "True, production-grade Vibe Coding is not passive surrender to a machine; it is **intent-driven, architecturally supervised software development**. The human developer transitions from a manual syntax typist into a **Chief Systems Architect and Product Director**, while the AI operates as a tireless, high-speed junior execution engineer.",
          "The core development loop operates as a tight five-stage closed feedback cycle: **Intent Specification** (defining business logic and technical boundaries) → **Autonomous Generation** (AI writes the implementation) → **Deterministic Verification** (typechecks, linter passes, and unit tests) → **Forced Refactoring** (cleaning abstractions and eliminating dead code) → **Atomic Commit** (verifying diffs and saving checkpoints).",
        ],
        id: [
          "Pada awal tahun 2025, mantan Direktur AI Tesla dan salah satu pendiri OpenAI, Andrej Karpathy, mempopulerkan istilah 'Vibe Coding' untuk mendeskripsikan fenomena baru: pengembangan perangkat lunak di mana engineer menyampaikan intensi arsitektur tingkat tinggi menggunakan bahasa alami, sementara model AI otonom menangani pengetikan sintaks, perakitan fungsi, dan eksekusi kode tingkat rendah. Alih-alih mengetik setiap baris secara manual, developer mengarahkan jalannya sistem dengan mengevaluasi hasil kerja AI.",
          "Namun, dalam perbincangan kasual, istilah ini sering disalahartikan: mengetik instruksi asal-asalan ke kotak chat, berharap keajaiban terjadi, lalu merilis kode apa pun yang berjalan tanpa memahami cara kerjanya. Bagi software engineer berpengalaman, pendekatan serampangan tersebut adalah jalur kilat menuju penumpukan utang teknis yang destruktif, celah keamanan fatal, dan kode monolitik yang mustahil dirawat.",
          "Vibe Coding kelas produksi sejati bukanlah penyerahan kendali secara pasif kepada mesin; ini adalah **pengembangan software berbasis intensi dengan pengawasan arsitektur ketat (intent-driven, architecturally supervised software development)**. Peran developer manusia berevolusi dari pengetik sintaks menjadi **Kepala Arsitek Sistem dan Direktur Kualitas Produk**, sedangkan AI bertindak sebagai asisten pelaksana berkecepatan tinggi.",
          "Siklus kerja inti berputar dalam lima tahap tertutup: **Perumusan Intensi** (menentukan logika bisnis dan batasan teknis) → **Generasi Otonom** (AI menyusun kode) → **Verifikasi Deterministik** (pengecekan tipe, linter, dan uji otomatis) → **Refaktorisasi Terjadwal** (memotong kode mati dan merapikan modul) → **Commit Atomik** (meninjau git diff dan mengunci perubahan aman).",
        ],
      },
      callout: {
        type: "note",
        text: {
          en: "Architectural Principle: AI code generation is practically free, but software maintenance remains extraordinarily expensive. The goal of a disciplined vibe coder is not generating the maximum volume of code, but crafting the minimum necessary surface area to solve the problem securely.",
          id: "Prinsip Arsitektur: Menghasilkan kode dengan AI itu murah, namun merawat dan memperbaiki perangkat lunak tetap sangat mahal. Sasaran utama seorang vibe coder berdisiplin bukanlah memproduksi kode sebanyak mungkin, melainkan membangun permukaan kode seminimal mungkin yang menyelesaikan masalah secara tangguh dan aman.",
        },
      },
    },
    {
      id: "modern-ai-tooling-ecosystem",
      title: {
        en: "2. The Modern AI Tooling Ecosystem: IDEs, CLI Agents, and Rapid Generators",
        id: "2. Ekosistem Perkakas AI Modern: IDE, Agen CLI, dan Generator Cepat",
      },
      paragraphs: {
        en: [
          "Navigating the AI developer toolchain requires understanding tool specializations. Rather than treating all AI assistants alike, mature teams divide them into three distinct architectural tiers based on their autonomy and workflow integration.",
          "Tier 1: AI-Native Integrated Development Environments (IDEs). Tools like [Cursor](https://www.cursor.com) (built as a specialized VS Code fork) and Windsurf leverage local semantic codebase indexing. With features like Cursor Composer, the editor can synthesize multi-file edits simultaneously and present visual inline diffs that human reviewers can accept or reject line by line.",
          "Tier 2: Autonomous Agentic CLI Tools. Represented by [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), Devin, and Aider, these tools run inside your terminal and operate with significant agency. They can execute bash commands, inspect Git status, run test suites, interpret compiler stderr traces, and autonomously iterate until all automated checks pass.",
          "Tier 3: Rapid Prototypers & Component Generators. Platforms like [v0](https://v0.dev) by Vercel, Lovable, Bolt.new, and GitHub Copilot excel at converting screenshots, design tokens, and user stories into clean React/Tailwind frontend interfaces or functional full-stack proofs-of-concept in seconds.",
        ],
        id: [
          "Memahami ekosistem perkakas AI membutuhkan pemahaman atas spesialisasi masing-masing alat. Alih-alih memperlakukan semua asisten AI secara seragam, tim rekayasa modern membaginya ke dalam tiga tingkatan arsitektur berdasarkan tingkat otonomi dan integrasi alur kerjanya.",
          "Tingkat 1: Integrated Development Environment (IDE) Berbasis AI Asli. Perkakas seperti [Cursor](https://www.cursor.com) (fork VS Code yang dioptimalkan untuk AI) dan Windsurf memanfaatkan pengindeksan repositori semantik lokal. Melalui fitur seperti Cursor Composer, editor mampu mengedit banyak berkas sekaligus dan menampilkan visual diff baris demi baris yang dapat diterima atau ditolak oleh developer manusia.",
          "Tingkat 2: Agen CLI Berbasis Terminal Otonom. Dipelopori oleh perkakas seperti [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), Devin, dan Aider, alat ini beroperasi langsung di dalam terminal sistem Anda dengan tingkat otonomi tinggi. Mereka dapat mengeksekusi perintah shell, membaca status Git, menjalankan unit test, membaca pesan error compiler, dan memperbaiki kode secara mandiri hingga seluruh tes berhasil.",
          "Tingkat 3: Generator Komponen & Prototipe Cepat. Platform seperti [v0](https://v0.dev) dari Vercel, Lovable, Bolt.new, dan GitHub Copilot sangat unggul dalam mengubah mockup gambar, desain antarmuka, dan instruksi UI menjadi komponen React/Tailwind siap pakai atau prototipe aplikasi fungsional dalam hitungan detik.",
        ],
      },
      table: {
        headers: {
          en: [
            "Tool Tier",
            "Representative Tools",
            "Core Strengths",
            "Architectural Limitations",
            "Optimal Use Case",
          ],
          id: [
            "Tingkatan Tool",
            "Contoh Perkakas",
            "Kekuatan Utama",
            "Batasan Arsitektur",
            "Skenario Penggunaan Optimal",
          ],
        },
        rows: {
          en: [
            [
              "AI-Native IDEs",
              "Cursor, Windsurf",
              "Deep codebase indexing, interactive visual diff review, seamless developer ergonomics",
              "Bound to specific editor builds; heavy token consumption on large monorepos",
              "Active day-to-day coding, multi-file refactoring, visual component engineering",
            ],
            [
              "Agentic CLI Tools",
              "Claude Code, Devin, Aider",
              "Direct shell execution, automated test runners, git checkpoint awareness, self-healing loops",
              "Requires comfort with terminal environments; demands strict boundary permissions",
              "Complex multi-step engineering, bug reproduction, automated regression fixes",
            ],
            [
              "Rapid UI Generators",
              "v0 by Vercel, Lovable, Bolt.new",
              "Instant visual scaffolding, accessible component libraries, rapid design exploration",
              "Prone to shallow state management; generates isolated components without deep backend wiring",
              "Design mockups, landing page composition, client-side UI iteration",
            ],
          ],
          id: [
            [
              "IDE Berbasis AI",
              "Cursor, Windsurf",
              "Pengindeksan repositori mendalam, peninjauan visual diff, integrasi editor yang mulus",
              "Terikat pada editor tertentu; konsumsi token tinggi pada monorepo berskala besar",
              "Koding harian, refaktorisasi multi-berkas, perancangan antarmuka komponen visual",
            ],
            [
              "Agen CLI Otonom",
              "Claude Code, Devin, Aider",
              "Eksekusi terminal langsung, pengujian otomatis mandiri, penanganan pesan compiler",
              "Memerlukan kenyamanan dengan CLI; membutuhkan pembatasan izin eksekusi perintah",
              "Perbaikan bug multi-langkah, pengujian regresi otomatis, refaktorisasi backend",
            ],
            [
              "Generator UI Cepat",
              "v0 (Vercel), Lovable, Bolt.new",
              "Pembuatan komponen visual instan, integrasi library Tailwind/Shadcn, eksplorasi desain kilat",
              "Cenderung dangkal pada logika state; tidak terhubung otomatis dengan arsitektur database kompleks",
              "Validasi mockup antarmuka, pembuatan halaman landing page, prototipe demo",
            ],
          ],
        },
        caption: {
          en: "Comparison of modern AI coding tiers across autonomy, tooling constraints, and engineering roles",
          id: "Perbandingan tingkatan perkakas AI modern berdasarkan otonomi, batasan teknis, dan perannya",
        },
      },
    },
    {
      id: "plan-before-you-code-blueprint",
      title: {
        en: "3. Plan Before You Code: The Anti-Mega-Prompt Blueprint and AI-Assisted PRDs",
        id: "3. Rencana Sebelum Koding: Blueprint Anti-Mega-Prompt dan PRD Berbantuan AI",
      },
      paragraphs: {
        en: [
          "The most destructive habit in amateur AI development is the 'Mega-Prompt': asking an AI assistant to 'build a complete e-commerce platform with Stripe billing, user authentication, inventory tracking, and an admin dashboard' in a single prompt. This approach is guaranteed to collapse. LLM reasoning degrages rapidly when context windows are flooded with competing concerns, producing shallow, fragile code riddled with hallucinated dependencies.",
          "Disciplined engineers follow the **Anti-Mega-Prompt Blueprint**: plan first, decompose into verifiable milestones, and build incrementally. Before generating a single line of production code, define your Minimum Viable Product (MVP) and break the project into discrete phases: Data Models & Contracts → Business Logic & Mutations → UI Primitives → Integrated User Journeys.",
          "Furthermore, modern engineers leverage AI tools during the *planning phase itself*. Using interactive conversational agents (such as Claude Code or ChatGPT), you can bounce ideas back and forth, stress-test edge cases, evaluate trade-offs between relational vs document databases, and generate a concise Product Requirements Document (PRD) and data schema.",
          "Always illustrate requirements with concrete examples. Feed the AI mockups, JSON payloads, or existing interface contracts. An AI provided with an explicit data contract will implement matching components with surgical precision.",
        ],
        id: [
          "Kebiasaan paling merusak dalam pengembangan perangkat lunak bersama AI adalah 'Mega-Prompt': meminta asisten AI untuk 'membangun sistem e-commerce lengkap dengan pembayaran Stripe, autentikasi user, manajemen inventaris, dan dashboard admin' dalam satu instruksi panjang. Pendekatan ini dijamin akan gagal. Daya nalar model LLM menurun drastis ketika context window dipenuhi oleh terlalu banyak tanggung jawab yang berbeda, menghasilkan kode rapuh dan dependensi fiktif.",
          "Software engineer berdisiplin menerapkan **Blueprint Anti-Mega-Prompt**: rencanakan arsitektur terlebih dahulu, dekomposisi menjadi tahapan kecil, dan bangun secara bertahap. Sebelum menulis satu baris kode produksi pun, tentukan batasan Minimum Viable Product (MVP) Anda dan pecah proyek menjadi fase berurutan: Model Data & Kontrak Tipe → Logika Bisnis & Mutasi Server → Komponen UI Primitif → Integrasi Alur Pengguna.",
          "Bahkan, engineer modern memanfaatkan asisten AI *pada tahap perencanaan itu sendiri*. Melalui agen interaktif (seperti Claude Code atau ChatGPT), Anda dapat berdiskusi untuk menguji kelemahan ide, menimbang trade-off pemilihan basis data, serta menyusun Product Requirements Document (PRD) mini dan kontrak data terstruktur sebelum berkas kode dibuat.",
          "Selalu lengkapi instruksi dengan contoh konkret. Berikan contoh payload JSON, sketsa wireframe, atau format respons yang diharapkan. Model AI yang dibekali kontrak data eksplisit akan menghasilkan kode yang jauh lebih presisi dan minim salah tafsir.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `### AI-Assisted PRD & Architecture Blueprint Prompt
Act as a Principal Software Architect.

CONTEXT:
I am building a high-volume notification dispatcher microservice.
Tech Stack: Node.js 22 (LTS), TypeScript (strict), PostgreSQL, Redis, BullMQ.

OBJECTIVE:
Help me brainstorm and establish a Mini PRD and Technical Specification BEFORE writing any code.

DO NOT write application code yet. Provide:
1. Core Domain Models (User, NotificationPayload, DeliveryStatus).
2. API Contract Specification (REST endpoints or tRPC procedures with exact input/output types).
3. Non-Functional Constraints (idempotency via unique message keys, max retry thresholds, rate limiting).
4. Edge Case Matrix (handling Redis connection drops, third-party webhook timeouts).
5. 4-Phase Step-by-Step Implementation Roadmap.`,
        caption: {
          en: "Production blueprint prompt instructing the AI to plan and specify before generating code",
          id: "Prompt perencanaan arsitektur yang mengarahkan AI menyusun spesifikasi sebelum menyentuh kode",
        },
      },
    },
    {
      id: "llm-friendly-tech-stacks-and-modularity",
      title: {
        en: "4. Architectural Strategy: LLM-Friendly Stacks and Modular Decoupling",
        id: "4. Strategi Arsitektur: Stack Ramah LLM dan Modularitas Terisolasi",
      },
      paragraphs: {
        en: [
          "Your choice of technology stack fundamentally shapes your AI collaboration experience. AI models generate code through statistical token prediction grounded in their pre-training corpora. Consequently, stacks that enjoy massive open-source presence, battle-tested documentation, and rigid static typing yield vastly superior AI output compared to obscure, niche, or newly released frameworks.",
          "Choosing an **LLM-Friendly Tech Stack** means prioritizing technologies like TypeScript (where strict compiler flags instantly expose syntax and interface hallucinations), Next.js App Router, Tailwind CSS (where design tokens are declared directly in classes rather than hidden in fragmented CSS files), PostgreSQL with modern ORMs like Drizzle or Prisma, and standardized test frameworks like Vitest and Playwright.",
          "Beyond stack selection, the golden rule of AI engineering is **Aggressive Modularity**. LLMs perform exceptionally well when modifying files containing fewer than 150 lines of code with single responsibilities. Conversely, when asked to edit a 1,200-line monolithic component, models suffer from context compression, frequently deleting existing logic, corrupting brackets, or introducing silent regressions.",
          "To enforce architectural standards across every session, maintain dedicated repository instruction files such as `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`. These files serve as persistent context guardrails that every AI prompt automatically inherits.",
        ],
        id: [
          "Pemilihan stack teknologi menentukan kualitas pengalaman kolaborasi Anda bersama AI. Model AI menghasilkan kode melalui prediksi probabilitas token berdasarkan data pre-training yang telah dipelajarinya. Akibatnya, teknologi yang memiliki jutaan contoh open-source berkualitas, dokumentasi matang, dan sistem pengetikan statis ketat akan menghasilkan output AI yang jauh lebih stabil dibandingkan framework baru atau eksperimental.",
          "Memilih **Stack Teknologi Ramah LLM (LLM-Friendly Stack)** berarti memprioritaskan teknologi seperti TypeScript (di mana compiler ketat langsung mendeteksi halusinasi tipe data), Next.js App Router, Tailwind CSS (di mana token desain dideklarasikan secara eksplisit dalam kelas HTML), PostgreSQL dengan ORM modern seperti Drizzle atau Prisma, serta runner tes standar seperti Vitest dan Playwright.",
          "Selain pemilihan stack, aturan emas dalam rekayasa perangkat lunak berbantuan AI adalah **Modularitas Agresif**. Model LLM bekerja dengan presisi tinggi saat memodifikasi berkas kecil di bawah 150 baris dengan satu tanggung jawab spesifik (single responsibility). Sebaliknya, jika diminta mengedit berkas monolitik berisi 1.200 baris kode, AI sering mengalami penurunan penalaran, menghapus fungsi penting secara tidak sengaja, atau memicu regresi tersembunyi.",
          "Agar standar arsitektur ini konsisten di setiap percakapan, siapkan berkas instruksi repositori permanen seperti `AGENTS.md`, `CLAUDE.md`, atau `.cursorrules`. Berkas ini bertindak sebagai memori sistem yang dibaca otomatis oleh AI sebelum mulai bekerja.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `# Repository AI Guidelines (AGENTS.md / CLAUDE.md)
Stack: Next.js (App Router), TypeScript (Strict), Tailwind CSS v4, Vitest.

ARCHITECTURE BOUNDARIES:
1. Max file length: 200 lines. Split complex components into sub-components in 'components/'.
2. Zero 'any' types. All server responses and mutation inputs must validate via Zod schemas.
3. Database mutations must live inside 'src/server/actions/' and execute within ACID transactions.
4. UI components must use semantic HTML and support keyboard accessibility (focus rings, ARIA).
5. Never introduce new external npm dependencies without explicit user confirmation.
6. Verification rule: Run 'npm run typecheck' and 'npm run lint' after any file modification.`,
        caption: {
          en: "Standard AGENTS.md blueprint enforcing modularity, typing, and verification rules",
          id: "Standar berkas AGENTS.md yang menegakkan aturan modularitas, pengetikan ketat, dan verifikasi",
        },
      },
    },
    {
      id: "compounding-errors-early-standards",
      title: {
        en: "5. Early Standards and the Compounding Error Snowball",
        id: "5. Standar Awal dan Bahaya Kesalahan Berantai (Compounding Error Snowball)",
      },
      paragraphs: {
        en: [
          "Understanding LLM behavior requires recognizing a core cognitive reality: AI models naturally take the path of least resistance. When presented with existing code, the model will imitate the patterns, naming conventions, and structural shortcuts already present in the codebase—whether good or bad.",
          "This dynamic gives rise to **The Compounding Error Snowball**. If you allow the AI to cut corners on Day 1—by skipping TypeScript types, hardcoding API endpoints, pasting styles inline, or omitting error boundaries—subsequent AI iterations will perceive those bad practices as approved project standards. With each subsequent prompt, the AI mimics and amplifies the initial flaws, rapidly turning a fledgling project into an unmanageable ball of mud.",
          'To prevent this snowball effect, senior vibe coders enforce **Day-Zero Engineering Standards**. On the very first prompt of a new repository, configure strict compiler settings (`"strict": true` in `tsconfig.json`), configure ESLint and Prettier rules, and enforce atomic directory separation.',
          "Scrutinize the AI's foundational commits with maximum vigilance. Correcting an architectural misstep on commit #2 takes thirty seconds; correcting that same misstep after commit #50 requires a grueling, high-risk refactoring marathon.",
        ],
        id: [
          "Memahami perilaku model LLM membutuhkan kesadaran atas sifat alaminya: model AI selalu mengambil jalur termudah (the path of least resistance). Ketika membaca kode yang sudah ada, AI akan meniru pola, gaya penamaan, dan jalan pintas yang ada di repositori tersebut—baik pola yang benar maupun pola yang buruk.",
          "Karakteristik ini memicu fenomena **Compounding Error Snowball (Bola Salju Kesalahan Berantai)**. Jika Anda membiarkan AI mengambil jalan pintas pada hari pertama—seperti mengabaikan tipe data TypeScript, melakukan hardcode URL API, atau melupakan penanganan error—iterasi AI berikutnya akan menganggap jalan pintas tersebut sebagai standar resmi proyek. Pada setiap prompt lanjutan, AI akan mereplikasi dan memperbanyak kesalahan awal tersebut hingga kode menjadi kusut tak tertolong.",
          'Untuk mencegah efek bola salju ini, engineer berpengalaman menegakkan **Standar Hari Pertama (Day-Zero Standards)**. Pada prompt pertama repositori baru, aktifkan konfigurasi compiler ketat (`"strict": true` di `tsconfig.json`), pasang aturan ESLint dan pemformat kode, serta tentukan struktur folder yang rapi.',
          "Periksa commit-commit awal dari AI dengan tingkat ketelitian tertinggi. Memperbaiki kekeliruan arsitektur pada commit kedua hanya membutuhkan waktu tiga puluh detik; memperbaiki kesalahan yang sama setelah commit kelima puluh membutuhkan proses refaktorisasi berisiko tinggi yang melelahkan.",
        ],
      },
      callout: {
        type: "warning",
        text: {
          en: "Critical Warning: Bad architecture compounds exponentially in AI workflows. If an agent produces sloppy boilerplate, do not continue prompting forward. Stop immediately, revert the bad commit, refine your prompt instructions, and regenerate cleanly.",
          id: "Peringatan Kritis: Arsitektur yang buruk melipatgandakan masalah secara eksponensial dalam alur kerja AI. Jika agen menghasilkan kode yang berantakan, jangan lanjutkan ke prompt berikutnya. Segera berhenti, revert commit yang buruk, perjelas batasan prompt, dan minta AI membuat ulang secara bersih.",
        },
      },
    },
    {
      id: "scheduled-hygiene-forced-refactoring",
      title: {
        en: "6. Scheduled Hygiene: Forced AI Refactoring Sessions",
        id: "6. Higienitas Terjadwal: Sesi Refaktorisasi AI Berkala (Forced Refactoring)",
      },
      paragraphs: {
        en: [
          "Standard AI prompts are feature-centric: 'Add a search bar', 'Connect to OAuth', 'Display user badges'. Because LLMs focus on satisfying the immediate functional request, their natural tendency is to append new functions, duplicate existing helper logic, and inflate existing files rather than thoughtfully restructuring the architecture.",
          "To counter this progressive entropy, professional vibe coders institute **Scheduled Forced Refactoring Sessions**. After every two or three feature iterations, initiate a dedicated session where zero new features are built. The sole objective of this session is pruning technical debt, removing dead code, and simplifying system abstractions.",
          "During a forced refactoring session, instruct the AI to conduct an adversarial audit: inspect files for duplicate logic (DRY compliance), consolidate scattered helper functions, extract bloated JSX into clean reusable primitives, and verify that interfaces remain segregated.",
          "Because autonomous CLI agents can run regression test suites immediately after refactoring, they excel at restructuring internals while guaranteeing that observable behaviors remain completely unchanged.",
        ],
        id: [
          "Sebagian besar prompt AI berfokus pada penambahan fitur: 'Tambahkan search bar', 'Hubungkan ke OAuth', 'Tampilkan status badge'. Karena model LLM memprioritaskan pemenuhan kebutuhan fungsional secara instan, kecenderungan alaminya adalah menambahkan baris baru di bawah berkas, menduplikasi logika utilitas yang sudah ada, dan memperbesar ukuran berkas daripada merapikan struktur arsitekturnya.",
          "Untuk mengatasi pembusukan kode ini, engineer profesional menerapkan **Sesi Refaktorisasi AI Terjadwal (Forced Refactoring Sessions)**. Setiap kali menyelesaikan dua atau tiga fitur, jadwalkan satu sesi khusus di mana Anda tidak menambahkan fitur baru sama sekali. Satu-satunya tujuan sesi ini adalah memangkas utang teknis, menghapus kode mati, dan menyederhanakan abstraksi sistem.",
          "Dalam sesi refaktorisasi ini, instruksikan AI untuk bertindak sebagai auditor independen: memeriksa duplikasi logika (prinsip DRY), menyatukan fungsi utilitas yang tersebar, memecah komponen antarmuka yang terlalu besar menjadi komponen modular, dan merapikan penamaan variabel.",
          "Karena perkakas CLI otonom dapat langsung mengeksekusi test suite setelah refaktorisasi, mereka sangat handal dalam merombak struktur internal kode sembari menjamin bahwa fungsionalitas aplikasi tetap berjalan tanpa regresi.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `### Forced Code Cleanup & Refactoring Prompt
Act as a Senior Software Craftsman and Code Auditor.

MISSION:
Refactor the checkout module in 'src/features/checkout/' for maintainability and performance.
DO NOT introduce any new user-facing features or alter external API contracts.

REFACTORING TARGETS:
1. Split 'checkout-form.tsx' (currently 380 lines) into modular components:
   - ShippingAddressSection.tsx
   - PaymentMethodSelector.tsx
   - OrderSummaryCard.tsx
2. Eliminate duplicate currency formatting helpers; consolidate into 'src/lib/formatters.ts'.
3. Convert all raw promises into clean async/await blocks with explicit error boundaries.
4. Remove any unused imports, commented-out dead code, or temporary console logs.

VERIFICATION:
Execute 'npm run test:checkout' and 'npm run typecheck' to prove zero functional regressions.`,
        caption: {
          en: "Dedicated forced refactoring prompt focusing exclusively on architecture hygiene and zero regressions",
          id: "Prompt refaktorisasi terjadwal yang berfokus penuh pada higienitas kode tanpa merusak fitur yang ada",
        },
      },
    },
    {
      id: "prompting-mastery-granularity-negative",
      title: {
        en: "7. Prompting Mastery: Granularity, Negative Prompting, and Context Hygiene",
        id: "7. Penguasaan Prompting: Granularitas, Negative Prompting, dan Higienitas Konteks",
      },
      paragraphs: {
        en: [
          "Prompt engineering in software development is not creative writing; it is formal technical specification. The difference between an amateur developer struggling with AI hallucinations and a senior engineer orchestrating an autonomous build lies in three core techniques: **Granularity**, **Negative Prompting**, and **Context Hygiene**.",
          "1. Granular, Atomic Tasks: Never combine multiple domain responsibilities into one prompt. Instead of asking for 'auth, database models, and login UI', isolate tasks: first create the database migration, next write the unit test, then generate the server action, and finally compose the UI. Atomic prompts preserve the LLM's logical reasoning depth.",
          "2. Negative Prompting: Explicitly instructing the model what **NOT** to do is often more powerful than telling it what to do. LLMs frequently hallucinate unnecessary packages (e.g. installing `lodash` for a simple array filter) or rewrite working utility files. Negative constraints establish defensive walls around your codebase.",
          "3. Context Hygiene: Avoid dumping hundreds of irrelevant files into the agent's context window. Excess tokens cause attention dilution, leading the model to miss subtle constraints. Provide only the target file, its direct dependency interfaces, and the relevant documentation snippet.",
        ],
        id: [
          "Prompt engineering dalam rekayasa perangkat lunak bukanlah seni menulis kreatif; ini adalah penyusunan spesifikasi teknis formal. Perbedaan antara developer pemula yang kesulitan menghadapi halusinasi AI dan senior engineer yang sukses mengorkestrasi sistem otonom terletak pada tiga teknik inti: **Granularitas**, **Negative Prompting**, dan **Higienitas Konteks**.",
          "1. Tugas Granular dan Atomik: Jangan pernah menggabungkan beberapa domain tanggung jawab dalam satu prompt. Alih-alih meminta 'autentikasi, model data, dan antarmuka login sekaligus', pisahkan menjadi langkah atomik: pertama buat skema migrasi database, lalu buat unit test, kemudian tulis server action, dan terakhir bangun komponen visual. Prompt atomik menjaga konsentrasi penalaran model LLM.",
          "2. Negative Prompting: Memberitahu model mengenai apa yang **TIDAK BOLEH** dilakukan sering kali jauh lebih berdampak daripada hanya memberi tahu apa yang diinginkan. Model AI kerap tergoda memasang paket npm yang tidak perlu (misal memasang `lodash` hanya untuk memfilter array sederhana) atau merombak berkas konfigurasi yang sudah benar. Batasan negatif menjadi pagar pelindung bagi repositori Anda.",
          "3. Higienitas Konteks (Context Hygiene): Hindari memasukkan puluhan berkas yang tidak relevan ke dalam percakapan AI. Token yang berlebihan memicu penurunan atensi (*attention dilution*), menyebabkan model melewatkan instruksi penting. Sertakan hanya berkas yang akan diedit, interface dependensi terkait, dan pesan error jika ada.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `### Precision Prompt with Explicit Negative Constraints
Act as a Senior TypeScript Engineer.

CONTEXT:
Component: 'src/components/navigation/site-navbar.tsx'
Target Feature: Add an animated Mobile Drawer menu with keyboard focus trapping.

POSITIVE REQUIREMENTS:
1. Use semantic HTML5 ('<nav>', '<button role=\"button\">', '<ul role=\"list\">').
2. Manage open/closed state with 'useState' and sync with 'aria-expanded'.
3. Trap keyboard focus inside the drawer when open (Tab cycles through drawer links; Escape closes).
4. Reuse existing transitions via Tailwind CSS classes already declared in globals.css.

NEGATIVE CONSTRAINTS (CRITICAL):
- DO NOT install any external UI or icon libraries (no headless-ui, no radix, no lucide-react).
- DO NOT edit or rename existing desktop navigation links or IDs.
- DO NOT modify 'tailwind.config.ts' or 'globals.css'.
- DO NOT use inline style attributes ('style={{ ... }}').

VERIFICATION COMMAND:
Run 'npm run lint && npm run typecheck'.`,
        caption: {
          en: "High-precision prompt combining atomic scoping with robust negative constraints",
          id: "Prompt presisi tinggi yang menggabungkan batasan atomik dengan instruksi larangan negatif yang tegas",
        },
      },
    },
    {
      id: "zero-trust-security-git-production",
      title: {
        en: "8. Zero-Trust Security, Git Discipline, and Production Shipping",
        id: "8. Keamanan Zero-Trust, Disiplin Git, dan Rilis ke Produksi",
      },
      paragraphs: {
        en: [
          "AI models are trained to optimize for visible functional completion, not defensive security posture. If you ask an AI to create a data endpoint, it will routinely generate code that queries the database and returns data, completely forgetting to check whether the requesting user actually owns that data. In modern engineering, every piece of AI-generated code must be evaluated through a **Zero-Trust Security Filter**.",
          "Key security checkpoints for AI-generated code include:",
          "• Secret Leakage Prevention: Ensure credentials, private keys, and API tokens never appear in source code or client bundles. Confirm `.env*` files are strictly excluded via `.gitignore`.",
          "• Authentication vs Authorization (BOLA Defense): Always verify that server endpoints check both who the user is (authentication) and whether they have legal permission to access or mutate the specific resource record (authorization).",
          "• Injection and Sanitization: Ensure all database queries utilize parameterized statements or typed ORM builders. Sanitize all dynamic string outputs to neutralize Cross-Site Scripting (XSS).",
          "Pair security audits with **Uncompromising Git Discipline**. Never run blind `git add . && git commit -m 'AI updates'`. Inspect every modified file line by line using `git diff`. Ensure commits are atomic, self-contained, and accompanied by informative Conventional Commit messages. This guarantees that if an AI introduces an unexpected side-effect, you can roll back the exact commit in seconds without collateral damage.",
        ],
        id: [
          "Model AI dilatih untuk memprioritaskan keberhasilan fungsional yang terlihat di layar, bukan pertahanan keamanan berlapis. Jika Anda meminta AI membuat endpoint data, AI akan dengan senang hati menulis kueri database dan mengembalikan hasilnya, namun kerap lupa memeriksa apakah pengguna yang meminta data tersebut memiliki hak akses sah atas data itu. Dalam rekayasa modern, seluruh kode dari AI wajib melalui **Penyaring Keamanan Zero-Trust**.",
          "Titik pemeriksaan keamanan utama pada kode hasil AI meliputi:",
          "• Pencegahan Kebocoran Kredensial: Pastikan API key, private key, dan token rahasia tidak pernah tertulis langsung di berkas kode atau bundle client. Pastikan berkas `.env*` terdaftar secara ketat di `.gitignore`.",
          "• Autentikasi vs Otorisasi (Pencegahan BOLA): Selalu pastikan endpoint server memvalidasi identitas pengguna (autentikasi) sekaligus memvalidasi apakah pengguna tersebut adalah pemilik sah dari data yang diminta (otorisasi).",
          "• Pencegahan Injeksi & Sanitasi Data: Pastikan seluruh kueri database memakai parameterized query atau ORM bertipe aman. Lakukan sanitasi pada teks dinamis untuk mencegah risiko Cross-Site Scripting (XSS).",
          "Padukan audit keamanan dengan **Disiplin Git yang Ketat**. Jangan pernah menjalankan commit membabi buta seperti `git add . && git commit -m 'update'`. Periksa setiap berkas baris demi baris menggunakan `git diff`. Buat commit yang atomik, fokus pada satu perubahan, dan gunakan pesan Conventional Commits. Dengan demikian, jika AI menimbulkan efek samping yang tak terduga, Anda dapat melakukan rollback pada commit tersebut dalam hitungan detik tanpa merusak bagian lain.",
        ],
      },
      callout: {
        type: "tip",
        text: {
          en: "Production Readiness Rule: Never ship directly from a chat window to production. Run the complete local verification pipeline ('npm run format:check', 'npm run lint', 'npm run typecheck', 'npm run test', and 'npm run build') before any git push.",
          id: "Aturan Rilis Produksi: Jangan pernah merilis kode langsung dari jendela chat ke server produksi. Jalankan seluruh pipeline verifikasi lokal ('npm run format:check', 'npm run lint', 'npm run typecheck', 'npm run test', dan 'npm run build') sebelum melakukan git push.",
        },
      },
    },
    {
      id: "paradigm-comparative-analysis",
      title: {
        en: "9. Comparative Analysis: Traditional vs. Casual vs. Engineering-First Vibe Coding",
        id: "9. Analisis Komparasi: Koding Tradisional vs Vibe Coding Kasual vs Vibe Coding Berstandar Rekayasa",
      },
      paragraphs: {
        en: [
          "To clearly understand the operational trade-offs of these development approaches, examine how they compare across velocity, cognitive load, long-term maintenance costs, and system security.",
          "While traditional manual coding guarantees intimate developer understanding of every character, it suffers from slow initial velocity on boilerplate tasks. Conversely, casual vibe coding delivers euphoric speed in the first two hours, only to collapse into an unmaintainable swamp as bugs and hallucinations multiply.",
          "Engineering-first Vibe Coding achieves the optimal equilibrium: it harnesses the superhuman drafting speed of AI models while preserving the unyielding architectural discipline, verification rigor, and long-term sustainability of professional software engineering.",
        ],
        id: [
          "Untuk memahami trade-off operasional dari berbagai pendekatan pengembangan ini, mari kita bandingkan dari segi kecepatan, beban kognitif, biaya pemeliharaan jangka panjang, dan keamanan sistem.",
          "Koding manual tradisional memang menjamin pemahaman menyeluruh atas setiap karakter kode, namun memiliki kecepatan awal yang lambat untuk pekerjaan boilerplate. Sebaliknya, vibe coding kasual memberikan ilusi kecepatan fantastis dalam dua jam pertama, namun segera runtuh menjadi mimpi buruk saat bug dan kode kusut mulai menumpuk.",
          "Vibe Coding berstandar rekayasa menghadirkan keseimbangan ideal: memanfaatkan kecepatan luar biasa model AI untuk pengetikan awal sembari mempertahankan disiplin arsitektur, verifikasi otomatis yang ketat, dan keberlanjutan sistem jangka panjang.",
        ],
      },
      table: {
        headers: {
          en: [
            "Dimension",
            "Traditional Coding",
            "Casual Vibe Coding",
            "Engineering-First Vibe Coding",
          ],
          id: [
            "Dimensi",
            "Koding Tradisional",
            "Vibe Coding Kasual",
            "Vibe Coding Berstandar Rekayasa",
          ],
        },
        rows: {
          en: [
            [
              "Development Velocity",
              "Moderate; developer manually types syntax, boilerplate, and schema configurations",
              "Extremely fast initially, but grinds to a halt as architectural technical debt piles up",
              "Sustained high velocity; rapid AI generation anchored by automated verification gates",
            ],
            [
              "Code Comprehension",
              "100% human ownership; developer wrote every line and understands internal edge cases",
              "Extremely low; developer pastes prompts and accepts diffs without reading internals",
              "High; developer designs architectural contracts and audits every diff line by line",
            ],
            [
              "Testing & Quality",
              "Manual or authored unit tests; high cognitive investment to maintain coverage",
              "Virtually nonexistent; relies on clicking around the UI until something visibly breaks",
              "Deterministic & automated; AI generates test suites against strict contracts and runs them continuously",
            ],
            [
              "Security Posture",
              "Dependent on developer experience and formal security code reviews",
              "Dangerous; frequently leaks secrets, omits authorization checks, and introduces vulnerabilities",
              "Zero-Trust; explicit prompts targeting BOLA defense, input sanitization, and credential isolation",
            ],
            [
              "Maintenance at Scale",
              "Predictable; codebase adheres to established team design patterns and conventions",
              "Catastrophic; monolithic files, duplicate helpers, and brittle tangled dependencies",
              "Resilient; enforced modular file boundaries (<200 lines) and scheduled refactoring sessions",
            ],
          ],
          id: [
            [
              "Kecepatan Pengembangan",
              "Moderat; developer mengetik sintaks, boilerplate, dan konfigurasi skema secara manual",
              "Sangat cepat di awal, namun macet total saat utang teknis dan bug mulai menumpuk",
              "Kecepatan tinggi yang stabil; generasi cepat AI ditopang oleh gerbang verifikasi otomatis",
            ],
            [
              "Pemahaman Kode",
              "100% dipahami manusia; developer menulis setiap baris dan memahami kasus batasnya",
              "Sangat rendah; developer menempelkan prompt dan menerima kode tanpa membacanya",
              "Tinggi; developer merancang kontrak arsitektur dan mengaudit setiap diff baris demi baris",
            ],
            [
              "Pengujian & Kualitas",
              "Unit test ditulis manual; membutuhkan waktu dan energi besar untuk menjaga coverage",
              "Hampir tidak ada; hanya mengandalkan klik-klik di browser sampai ada yang error",
              "Deterministik & otomatis; AI menyusun rangkaian tes berdasarkan kontrak dan menjalankannya secara rutin",
            ],
            [
              "Postur Keamanan",
              "Bergantung pada jam terbang developer dan review keamanan formal",
              "Berbahaya; rawan membocorkan kredensial, melupakan otorisasi data, dan memicu celah injeksi",
              "Zero-Trust; instruksi prompt eksplisit untuk menangani BOLA, sanitasi input, dan isolasi secret",
            ],
            [
              "Perawatan Jangka Panjang",
              "Dapat diprediksi; struktur kode konsisten mengikuti konvensi tim",
              "Bencana; berkas monolitik, logika duplikat, dan keterikatan modul yang kusut",
              "Tangguh & modular; batasan berkas kecil (<200 baris) dan sesi refaktorisasi berkala",
            ],
          ],
        },
        caption: {
          en: "Multi-dimensional comparison across software engineering paradigms",
          id: "Komparasi multi-dimensi antara paradigma rekayasa perangkat lunak tradisional dan modern",
        },
      },
    },
    {
      id: "hands-on-educational-studio",
      title: {
        en: "10. Step-by-Step Educational Studio: Building an AI-Assisted Feature from Scratch",
        id: "10. Studio Edukatif Langkah demi Langkah: Membangun Fitur Berbantuan AI dari Awal",
      },
      paragraphs: {
        en: [
          "To experience how an engineering-first Vibe Coding workflow operates in practice, examine this realistic educational scenario: engineering a resilient, cryptographically verified Webhook Ingestion Service for an API platform.",
          "Phase 1: Defining the Blueprint and Data Contract. Rather than asking the AI to 'write the webhook receiver', we formulate a precise Zod schema and interface contract. We demand HMAC SHA-256 signature verification, a strict timestamp drift window of 300 seconds to eliminate replay attacks, and an immutable event dispatcher envelope.",
          "Phase 2: Generating the Modular Implementation. We instruct an agentic tool (such as Claude Code or Cursor) to implement the handler in a dedicated file (`src/server/webhooks/ingestion.ts`). We provide negative constraints forbidding external libraries and demanding native `node:crypto` primitives.",
          "Phase 3: Automated Verification Suite. We immediately command the AI to author unit test suites covering the happy path, expired replay attacks, invalid cryptographic signatures, and malformed JSON payloads. We execute the tests locally via Vitest to confirm 100% green status before committing.",
        ],
        id: [
          "Untuk melihat bagaimana alur kerja Vibe Coding berstandar rekayasa beroperasi dalam praktik nyata, mari kita pelajari skenario edukatif ini: membangun Layanan Ingesti Webhook yang tangguh dan terverifikasi secara kriptografis untuk platform API.",
          "Fase 1: Menentukan Blueprint dan Kontrak Data. Alih-alih meminta AI 'buatkan webhook receiver', kita menyusun skema Zod dan kontrak interface yang presisi. Kita mewajibkan verifikasi tanda tangan HMAC SHA-256, batas toleransi waktu (timestamp drift) maksimal 300 detik untuk mencegah serangan replay, serta amplop data event yang immutable.",
          "Fase 2: Implementasi Modular dan Terisolasi. Kita mengarahkan perkakas agen (seperti Claude Code atau Cursor) untuk mengimplementasikan handler dalam berkas terisolasi (`src/server/webhooks/ingestion.ts`). Kita berikan batasan negatif yang melarang pemakaian pustaka pihak ketiga dan mewajibkan modul bawaan `node:crypto`.",
          "Fase 3: Rangkaian Pengujian Otomatis. Kita langsung menginstruksikan AI menyusun unit test lengkap yang menguji alur sukses, penolakan replay attack yang kedaluwarsa, tanda tangan kriptografis palsu, dan payload JSON yang rusak. Kita eksekusi pengujian ini di lingkungan lokal dengan Vitest hingga seluruh tes hijau sebelum melakukan commit.",
        ],
      },
      code: {
        language: "typescript",
        snippet: `// src/server/webhooks/ingestion.ts
import { createHmac, timingSafeEqual } from "node:crypto";

export type WebhookValidationResult =
  | { success: true; payload: Record<string, unknown> }
  | { success: false; error: string; statusCode: number };

export function verifyAndParseWebhook(
  rawBody: string,
  signatureHeader: string | null,
  timestampHeader: string | null,
  secretKey: string,
  toleranceSeconds = 300
): WebhookValidationResult {
  if (!signatureHeader || !timestampHeader) {
    return { success: false, error: "Missing required authentication headers", statusCode: 401 };
  }

  const timestamp = Number.parseInt(timestampHeader, 10);
  const now = Math.floor(Date.now() / 1000);

  // Defense against Replay Attacks
  if (Number.isNaN(timestamp) || Math.abs(now - timestamp) > toleranceSeconds) {
    return { success: false, error: "Webhook timestamp expired or outside drift tolerance", statusCode: 400 };
  }

  // Constant-time signature verification prevents timing attacks
  const expectedSignature = createHmac("sha256", secretKey)
    .update(\`\${timestamp}.\${rawBody}\`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf-8");
  const providedBuffer = Buffer.from(signatureHeader, "utf-8");

  if (expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) {
    return { success: false, error: "Cryptographic signature mismatch", statusCode: 403 };
  }

  try {
    const payload = JSON.parse(rawBody) as Record<string, unknown>;
    return { success: true, payload };
  } catch {
    return { success: false, error: "Malformed JSON payload", statusCode: 400 };
  }
}`,
        caption: {
          en: "Production-ready, defensive webhook verification module engineered through structured AI guidance",
          id: "Modul verifikasi webhook kelas produksi yang dirancang dengan panduan AI berstandar keamanan tinggi",
        },
      },
    },
    {
      id: "production-readiness-checklist-conclusion",
      title: {
        en: "11. Production Readiness Checklist and Architectural Conclusion",
        id: "11. Checklist Kesiapan Produksi dan Kesimpulan Arsitektur",
      },
      paragraphs: {
        en: [
          "The advent of Vibe Coding marks a genuine inflection point in the history of software engineering. AI coding assistants allow human developers to iterate, experiment, and deliver functional software at speeds that were unimaginable just a few years ago.",
          "However, speed without architectural direction is merely faster failure. A prototype assembled casually in an afternoon may look appealing on localhost, but real software must withstand malicious network traffic, scale under concurrency, protect user privacy, and be maintained over years of organizational change.",
          "When you adopt an engineering-first Vibe Coding mindset, AI ceases to be a gimmick and becomes an extraordinary cognitive exoskeleton. You remain the Chief Architect; the AI remains the high-speed Builder. Embrace the acceleration, but never compromise on software craftsmanship.",
          "Before merging or deploying any AI-assisted code change to production, verify every checkpoint on this comprehensive quality gate:",
        ],
        id: [
          "Kehadiran Vibe Coding menandai titik balik bersejarah dalam dunia rekayasa perangkat lunak. Asisten koding AI memungkinkan developer manusia untuk bereksperimen, beriterasi, dan menghasilkan perangkat lunak fungsional dengan kecepatan yang tidak terbayangkan beberapa tahun lalu.",
          "Namun, kecepatan tanpa arah arsitektur hanyalah cara lebih kilat menuju kegagalan. Prototipe yang dirakit asal-asalan dalam beberapa jam memang terlihat memukau di localhost, tetapi perangkat lunak dunia nyata harus tahan terhadap serangan siber, andal menangani beban konkurensi, melindungi privasi data pengguna, dan mudah dirawat selama bertahun-tahun.",
          "Ketika Anda menerapkan pola pikir Vibe Coding berstandar rekayasa, AI bertransformasi dari sekadar alat coba-coba menjadi kerangka penguat produktivitas (*cognitive exoskeleton*) yang luar biasa. Anda tetap menjadi Kepala Arsitek; AI tetap menjadi Pembangun berkecepatan tinggi. Nikmati kecepatannya, namun jangan pernah menurunkan standar kualitas rekayasa Anda.",
          "Sebelum melakukan merge atau deployment kode hasil bantuan AI ke lingkungan produksi, pastikan setiap poin dalam checklist gerbang kualitas berikut telah terpenuhi:",
        ],
      },
      checklist: {
        en: [
          "Architectural Blueprint First: Scope, domain models, and API contracts defined before generating implementation code.",
          "LLM-Friendly Tech Stack: Popular, battle-tested technologies with strict static typing to eliminate hallucinations.",
          "Aggressive Modularity: Source files kept under 200 lines with single responsibilities and clean decoupled interfaces.",
          "Zero-Tolerance Day-Zero Standards: Strict compiler flags ('strict: true'), ESLint, and Prettier active from commit #1.",
          "Forced Refactoring Hygiene: Dedicated refactoring sessions scheduled every 2-3 iterations to prune dead code and technical debt.",
          "Negative Prompting Enforced: Explicit constraints provided to prevent unapproved dependencies and file rewrites.",
          "Context Hygiene Maintained: Prompts kept granular and atomic, feeding only relevant dependency files to the agent.",
          "Zero-Trust Security Audit: Zero hardcoded secrets, verified authorization ownership (BOLA defense), and sanitized inputs.",
          "Line-by-Line Git Diff Review: Every modified file inspected manually; atomic commits using Conventional Commits.",
          "Deterministic Local Verification: 'npm run typecheck', 'npm run lint', unit tests, and production build pass with 0 errors.",
        ],
        id: [
          "Blueprint Arsitektur Utama: Ruang lingkup, model data, dan kontrak API telah terdefinisi sebelum membuat kode aplikasi.",
          "Stack Teknologi Ramah LLM: Menggunakan teknologi populer dan teruji dengan pengetikan statis ketat untuk mencegah halusinasi.",
          "Modularitas Agresif: Berkas kode dijaga di bawah 200 baris dengan satu tanggung jawab spesifik dan interface terisolasi.",
          "Standar Tanpa Kompromi sejak Hari Pertama: Pengaturan compiler ketat ('strict: true'), linter, dan formatter aktif sejak commit pertama.",
          "Refaktorisasi Terjadwal: Sesi refaktorisasi khusus diadakan setiap 2-3 fitur untuk memangkas kode mati dan utang teknis.",
          "Penerapan Negative Prompting: Instruksi larangan eksplisit diberikan agar AI tidak memasang dependensi sembarangan.",
          "Higienitas Konteks Terjaga: Prompt dibuat atomik dan granular, hanya menyertakan berkas dependensi yang relevan.",
          "Audit Keamanan Zero-Trust: Bebas kredensial di kode sumber, validasi kepemilikan data (anti BOLA), dan sanitasi input.",
          "Tinjauan Git Diff Baris demi Baris: Setiap berkas diperiksa manual; commit bersifat atomik dengan format Conventional Commits.",
          "Verifikasi Lokal Deterministik: 'npm run typecheck', 'npm run lint', unit test, dan build produksi berhasil dengan nol error.",
        ],
      },
    },
  ],
};
