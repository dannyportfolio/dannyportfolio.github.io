import type { BlogPost } from "@/data/blog";

export const vibeCodingPost: BlogPost = {
  slug: "vibe-coding-practical-guide",
  title: {
    en: "Vibe Coding: A Practical Step-by-Step Guide to Software Engineering with AI",
    id: "Vibe Coding: Panduan Praktis Langkah demi Langkah Rekayasa Perangkat Lunak dengan AI",
  },
  summary: {
    en: "A comprehensive, engineering-first guide to Vibe Coding. Learn how to combine modern AI coding agents with rigorous software architecture, incremental implementation, automated testing, security reviews, and professional standards.",
    id: "Panduan komprehensif berlandaskan rekayasa perangkat lunak seputar Vibe Coding. Pelajari cara menggabungkan agen koding AI modern dengan arsitektur software yang terencana, implementasi bertahap, pengujian otomatis, audit keamanan, dan standar profesional.",
  },
  category: {
    en: "AI Engineering & Workflows",
    id: "Rekayasa AI & Alur Kerja",
  },
  tags: [
    "Vibe Coding",
    "AI Coding Agents",
    "Software Architecture",
    "Prompt Engineering",
    "Application Security",
    "Testing & Quality",
  ],
  publishedDate: "2026-10-23",
  updatedDate: "2026-11-09",
  author: "Danial Fachrudin",
  readingTime: {
    en: "18 min read",
    id: "18 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "Vibe Coding: Practical Step-by-Step Guide to Engineering with AI",
    id: "Vibe Coding: Panduan Praktis Langkah demi Langkah Rekayasa Software dengan AI",
  },
  seoDescription: {
    en: "Master Vibe Coding with an engineering-first mindset. Covers the 10-step development workflow, tool comparison, prompt anatomy, security reviews, and a hands-on learning project.",
    id: "Kuasai Vibe Coding dengan pola pikir rekayasa perangkat lunak. Membahas alur kerja 10 langkah, komparasi tools, anatomi prompt, audit keamanan, dan panduan proyek edukatif.",
  },
  sections: [
    {
      id: "introduction-to-vibe-coding",
      title: {
        en: "1. Introduction to Vibe Coding: Origins and Definition",
        id: "1. Pengenalan Vibe Coding: Asal-Usul dan Definisi",
      },
      paragraphs: {
        en: [
          "The term 'Vibe Coding' entered mainstream software development discourse in early 2025 following an insightful observation by AI researcher Andrej Karpathy. Karpathy described an emergent style of programming where a developer communicates high-level intent in natural language, lets an AI model generate and modify the code, and guides the application by 'vibing' with the results rather than manually writing every syntax token.",
          "In its colloquial, viral form, Vibe Coding sounded almost casual: write a loose description, run the generated script, and accept whatever output appears. However, experienced software engineers immediately recognized both the immense promise and the severe pitfalls of this description. While casual experimentation can produce impressive prototypes, real-world software demands reliability, security, maintainability, and architectural cohesion.",
          "In this guide, we demystify Vibe Coding from an engineering-first perspective. We define Vibe Coding not as reckless surrender to an AI model, but as **intent-driven, AI-assisted software development**. The human developer operates as the Chief Architect and Quality Auditor, while the AI functions as a tireless, high-speed execution assistant.",
          "For developers seeking a structured learning trajectory, this guide aligns with the practical milestones detailed in the community reference at [roadmap.sh/vibe-coding](https://roadmap.sh/vibe-coding), expanding each milestone into verifiable software engineering practices.",
        ],
        id: [
          "Istilah 'Vibe Coding' memasuki arus utama diskusi pengembangan perangkat lunak pada awal tahun 2025 setelah dipopulerkan oleh peneliti AI terkemuka, Andrej Karpathy. Karpathy menggambarkan gaya pemrograman baru di mana developer menyampaikan maksud secara garis besar menggunakan bahasa alami, membiarkan model AI menulis dan mengubah kode, serta mengarahkan jalannya aplikasi dengan mengevaluasi hasilnya daripada mengetik sintaks secara manual.",
          "Dalam pemahaman kasual yang viral di media sosial, Vibe Coding terdengar santai: tulis instruksi singkat, jalankan aplikasi, dan terima hasil apa pun yang muncul. Namun, para software engineer berpengalaman langsung melihat potensi besar sekaligus risiko fatal dari pendekatan tanpa kendali tersebut. Eksperimen santai memang dapat melahirkan prototipe cepat, tetapi perangkat lunak dunia nyata menuntut keandalan, keamanan, kemudahan pemeliharaan, dan arsitektur yang kokoh.",
          "Dalam panduan ini, kita membedah Vibe Coding dari perspektif rekayasa perangkat lunak yang berdisiplin. Kita mendefinisikan Vibe Coding bukan sebagai penyerahan kendali secara membabi buta kepada AI, melainkan sebagai **pengembangan software berbasis intensi yang dibantu oleh AI (intent-driven, AI-assisted software development)**. Developer manusia berperan sebagai Kepala Arsitek dan Auditor Kualitas, sementara AI bertindak sebagai asisten pelaksana berkecepatan tinggi.",
          "Bagi developer yang mencari panduan belajar terstruktur, artikel ini selaras dengan peta jalan komunitas di [roadmap.sh/vibe-coding](https://roadmap.sh/vibe-coding), memperluas setiap tahapannya menjadi praktik rekayasa yang dapat diverifikasi secara nyata.",
        ],
      },
      callout: {
        type: "note",
        text: {
          en: "Key Definition: Vibe Coding is the practice of directing software creation through natural language prompts, repository context, and iterative feedback loops, backed by human architectural oversight and automated verification.",
          id: "Definisi Kunci: Vibe Coding adalah praktik memandu pembuatan perangkat lunak melalui prompt bahasa alami, konteks repositori, dan siklus evaluasi bertahap, yang didukung oleh pengawasan arsitektur manusia serta verifikasi otomatis.",
        },
      },
    },
    {
      id: "evolution-and-mental-model",
      title: {
        en: "2. The Evolution of AI Coding and the Core Mental Model",
        id: "2. Evolusi Koding Berbantuan AI dan Model Mental Inti",
      },
      paragraphs: {
        en: [
          "To use AI effectively, it helps to understand how developer tooling arrived at this point. The evolution spans three distinct eras:",
          "1. Single-Line Autocomplete (2021 to 2023): First-generation tools like GitHub Copilot and Tabnine operated on local cursor context, suggesting the next token or line of code. The human remained the primary syntax typist.",
          "2. Chat and Code Refactoring (2023 to 2024): Developers could paste snippets into chat windows (ChatGPT, Claude) to ask questions, explain stack traces, or generate functions. However, the developer still had to manually copy, paste, and wire files together.",
          "3. Agentic Development (2024 to Present): Modern tools like [Cursor](https://www.cursor.com), Windsurf, [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), and Aider operate directly across entire repositories. They read multiple files, execute shell commands, run test suites, analyze compiler outputs, and create multi-file commits autonomously.",
          "This third era requires a fundamental mental model shift: **The Software Architect vs The Execution Assistant**.",
          "The human developer must act as the **Architect and Product Owner**: defining business requirements, choosing data boundaries, enforcing security parameters, and verifying correctness. The AI model acts as the **Junior Implementer**: capable of typing boilerplate, generating unit tests, and wiring interfaces at superhuman speed, but possessing zero intrinsic understanding of your production operational context or business consequences.",
        ],
        id: [
          "Agar dapat memanfaatkan AI secara optimal, kita perlu memahami bagaimana perkakas developer berkembang hingga tahap saat ini. Evolusi ini terbagi menjadi tiga era utama:",
          "1. Autocomplete Sebaris (2021 hingga 2023): Alat generasi awal seperti GitHub Copilot dan Tabnine membaca posisi kursor lokal untuk menyarankan kata atau baris kode berikutnya. Developer manusia tetap menjadi pengetik sintaks utama.",
          "2. Chat dan Refaktorisasi Kode (2023 hingga 2024): Developer menyalin potongan kode ke jendela percakapan (ChatGPT, Claude) untuk menanyakan pesan error atau meminta pembuatan fungsi. Namun, developer tetap harus menyalin, menempel, dan menghubungkan berkas secara manual.",
          "3. Pengembangan Berbasis Agen / Agentic (2024 hingga Sekarang): Perkakas modern seperti [Cursor](https://www.cursor.com), Windsurf, [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), dan Aider bekerja langsung di seluruh repositori proyek. Alat-alat ini membaca banyak berkas, menjalankan perintah terminal, mengeksekusi test suite, menganalisis pesan compiler, dan melakukan perubahan multi-berkas secara otonom.",
          "Era ketiga ini menuntut pergeseran model mental yang mendasar: **Arsitek Perangkat Lunak vs Asisten Pelaksana**.",
          "Developer manusia wajib bertindak sebagai **Arsitek dan Pemilik Produk**: menentukan kebutuhan bisnis, menetapkan batasan data, menegakkan parameter keamanan, dan memvalidasi kebenaran logika. Model AI bertindak sebagai **Junior Implementer**: mampu mengetik boilerplate, menyusun unit test, dan merangkai antarmuka dalam hitungan detik, tetapi tidak memiliki pemahaman intrinsik tentang konteks operasional produksi maupun dampak bisnis dari kode yang dihasilkannya.",
        ],
      },
    },
    {
      id: "when-to-use-and-avoid",
      title: {
        en: "3. When Vibe Coding Excels and When to Avoid It",
        id: "3. Kapan Vibe Coding Sangat Efektif dan Kapan Harus Dihindari",
      },
      paragraphs: {
        en: [
          "Vibe Coding is not a universal hammer. Knowing when to rely on AI code generation and when to insist on strict manual engineering is the hallmark of a mature software engineer.",
          "When Vibe Coding Shines:",
          "• Rapid Prototyping: Validating product ideas, building hackathon demos, and exploring user interfaces in hours rather than weeks.",
          "• Repetitive Boilerplate: Writing standard CRUD endpoints, form validations, data transformation functions, and schema definitions.",
          "• Test Generation: Drafting unit and integration test fixtures against well-defined input/output contracts using frameworks like [Vitest](https://vitest.dev) or [Playwright](https://playwright.dev).",
          "• Modernizing and Refactoring: Translating legacy JavaScript to strict TypeScript, updating deprecated syntax, or splitting large components into modular files.",
          "• Exploring New Frameworks: Learning syntax idioms for unfamiliar libraries by examining generated working examples.",
          "When to Avoid Pure Vibe Coding:",
          "• Mission-Critical Security: Authentication flows, cryptography implementations, payment gateways, and token management require manual scrutiny and verified libraries.",
          "• Distributed Systems & Concurrency: Multi-tenant data isolation, database transactions, race condition prevention, and distributed locks fail silently under naive AI generation.",
          "• Performance-Sensitive Hot Paths: Micro-optimizations, memory allocation tuning, and custom database indexing require deep human profiling and algorithmic analysis.",
        ],
        id: [
          "Vibe Coding bukanlah palu godam untuk segala jenis masalah. Memahami kapan harus memanfaatkan generasi kode AI dan kapan harus mempertahankan penulisan manual yang ketat adalah tanda kedewasaan seorang software engineer.",
          "Kapan Vibe Coding Sangat Efektif:",
          "• Pembuatan Prototipe Cepat: Memvalidasi ide produk, membangun demo hackathon, dan mengeksplorasi antarmuka dalam hitungan jam, bukan minggu.",
          "• Boilerplate Berulang: Menulis endpoint CRUD standar, validasi formulir, fungsi transformasi data, dan definisi skema basis data.",
          "• Pembuatan Rangkaian Pengujian: Menyusun unit test dan integration test untuk kontrak input/output yang telah terdefinisi menggunakan framework seperti [Vitest](https://vitest.dev) atau [Playwright](https://playwright.dev).",
          "• Modernisasi dan Refaktorisasi: Mengonversi kode JavaScript warisan menjadi TypeScript ketat, memperbarui sintaks usang, atau memecah komponen besar menjadi berkas modular.",
          "• Eksplorasi Framework Baru: Mempelajari idiom sintaks untuk pustaka baru dengan memeriksa contoh kode kerja yang dihasilkan.",
          "Kapan Harus Menghindari Vibe Coding Murni:",
          "• Keamanan Kritis: Alur autentikasi, implementasi kriptografi, integrasi gateway pembayaran, dan manajemen token membutuhkan audit manual serta pustaka terverifikasi.",
          "• Sistem Terdistribusi & Konkurensi: Isolasi data multi-tenant, transaksi basis data, pencegahan race condition, dan distributed locking kerap gagal secara tersembunyi jika diserahkan pada AI.",
          "• Jalur Kritis Performa Tinggi: Optimasi mikro, pengelolaan alokasi memori, dan strategi indexing basis data berbeban tinggi memerlukan profiling manusia dan analisis algoritma mendalam.",
        ],
      },
    },
    {
      id: "tools-of-the-trade",
      title: {
        en: "4. Tools of the Trade: IDEs, CLI Agents, and Models",
        id: "4. Perkakas Pilihan: IDE, Agen CLI, dan Model Fondasi",
      },
      paragraphs: {
        en: [
          "Building software with AI requires an integrated developer toolchain. Rather than viewing tools in isolation, assemble an ecosystem spanning code editing, terminal execution, foundation models, and verification engines.",
          "1. AI-Native Code Editors: Modern editors like [Cursor](https://www.cursor.com) (a fork of VS Code with deep repository indexing and Composer multi-file editing) and Windsurf (Codeium's agentic IDE featuring Cascade) provide native UI for accepting and rejecting diffs.",
          "2. Agentic CLI Tools: Tools like [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) and Aider run directly in your terminal. They excel at multi-step tasks because they can execute bash commands, run test runners, read compiler stderr messages, and autonomously self-correct.",
          "3. State-of-the-Art Foundation Models: The reasoning engine matters. Frontier models like Claude 3.7 Sonnet (with hybrid thinking modes) and Claude 3.5 Sonnet lead in agentic software engineering and tool use. OpenAI GPT-4o and o3-mini offer powerful logical decomposition. Gemini 2.0 Flash provides million-token context windows capable of ingesting entire multi-repository architectures.",
          "4. Verification and Version Control: No AI toolchain is complete without Git, strict TypeScript compiler flags (`tsc --noEmit`), and automated test runners ([Playwright](https://playwright.dev) for end-to-end browser flows, Vitest for unit tests). Tools like [OpenSpec](https://openspec.dev) provide specification-driven guardrails.",
        ],
        id: [
          "Membangun perangkat lunak dengan AI memerlukan ekosistem perkakas yang terintegrasi. Alih-alih memandang setiap alat secara terpisah, susunlah alur kerja yang mencakup editor kode, eksekusi terminal, model fondasi, dan mesin verifikasi.",
          "1. Editor Kode Berbasis AI: Editor modern seperti [Cursor](https://www.cursor.com) (fork VS Code dengan pengindeksan repositori mendalam dan Composer multi-berkas) serta Windsurf (IDE agentic dari Codeium dengan alur Cascade) menyediakan antarmuka visual untuk meninjau diff kode.",
          "2. Perkakas CLI Berbasis Agen: Alat seperti [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) dan Aider berjalan langsung di terminal Anda. Perkakas ini sangat unggul dalam tugas multi-langkah karena dapat menjalankan perintah bash, mengeksekusi test runner, membaca pesan error compiler, dan memperbaiki kode secara mandiri.",
          "3. Model Fondasi Terdepan: Kualitas penalaran model menentukan hasil kerja. Model seperti Claude 3.7 Sonnet (dengan mode penalaran adaptif) dan Claude 3.5 Sonnet memimpin dalam rekayasa software agentic. OpenAI GPT-4o dan o3-mini menawarkan dekomposisi logika yang cepat. Gemini 2.0 Flash menawarkan context window jutaan token yang mampu membaca seluruh repositori sekaligus.",
          "4. Verifikasi dan Version Control: Ekosistem AI belum lengkap tanpa Git, compiler TypeScript ketat (`tsc --noEmit`), dan test runner otomatis ([Playwright](https://playwright.dev) untuk pengujian browser end-to-end, Vitest untuk pengujian unit). Perkakas seperti [OpenSpec](https://openspec.dev) memberikan panduan spesifikasi yang terstruktur.",
        ],
      },
      table: {
        headers: {
          en: [
            "Tool Category",
            "Representative Tools",
            "Primary Strengths",
            "Trade-Offs & Limitations",
          ],
          id: ["Kategori Alat", "Contoh Perkakas", "Kekuatan Utama", "Batasan & Pertimbangan"],
        },
        rows: {
          en: [
            [
              "AI-Native IDEs",
              "Cursor, Windsurf",
              "Multi-file codebase indexing, interactive visual diff review, inline chat",
              "Tied to specific editor environments; can consume substantial API credits",
            ],
            [
              "Agentic CLI Tools",
              "Claude Code, Aider",
              "Direct terminal execution, automated test execution, Git checkpoint awareness",
              "Requires comfort with terminal workflows; can execute unintended shell commands if unmonitored",
            ],
            [
              "Foundation Models",
              "Claude 3.7 / 3.5 Sonnet, GPT-4o, Gemini 2.0 Flash",
              "High reasoning depth, instruction adherence, multi-modal context comprehension",
              "Non-deterministic outputs; potential for hallucinated package names or APIs",
            ],
            [
              "Verification Engines",
              "TypeScript, Vitest, Playwright, ESLint",
              "Deterministic proof of correctness, regression defense, contract validation",
              "Requires upfront effort to configure test suites and typing strictness",
            ],
          ],
          id: [
            [
              "IDE Berbasis AI",
              "Cursor, Windsurf",
              "Pengindeksan multi-berkas, tinjauan visual git diff, percakapan inline interaktif",
              "Terikat pada editor tertentu; konsumsi kredit API dapat meningkat pesat",
            ],
            [
              "Perkakas CLI Agen",
              "Claude Code, Aider",
              "Eksekusi terminal langsung, pengujian otomatis, integrasi alur kerja Git",
              "Memerlukan kenyamanan di terminal; dapat menjalankan perintah shell jika tidak diawasi",
            ],
            [
              "Model Fondasi",
              "Claude 3.7 / 3.5 Sonnet, GPT-4o, Gemini 2.0 Flash",
              "Tingkat penalaran tinggi, kepatuhan instruksi, pemahaman konteks multimodal",
              "Output non-deterministik; potensi halusinasi nama paket atau method API",
            ],
            [
              "Mesin Verifikasi",
              "TypeScript, Vitest, Playwright, ESLint",
              "Bukti kebenaran kode yang deterministik, pencegahan regresi, validasi kontrak data",
              "Membutuhkan waktu awal untuk menyiapkan konfigurasi tes dan pengetikan ketat",
            ],
          ],
        },
        caption: {
          en: "Overview of modern AI development tool categories and their engineering trade-offs",
          id: "Ringkasan kategori perkakas pengembangan AI modern beserta pertimbangan teknisnya",
        },
      },
    },
    {
      id: "the-10-step-workflow-planning",
      title: {
        en: "5. The 10-Step Vibe Coding Workflow: Phase 1 (Planning & Context)",
        id: "5. Alur Kerja Vibe Coding 10 Langkah: Fase 1 (Perencanaan & Konteks)",
      },
      paragraphs: {
        en: [
          "Professional software engineering with AI follows a disciplined ten-step progression. The first four steps happen before you write or generate any application code.",
          "Step 1: Idea and Problem Definition",
          "Begin with absolute clarity on the problem you are solving. Identify the target audience, the core pain point, and the single measurable value proposition. If you cannot explain the goal in two clear sentences, asking an AI to build it will produce a scattered, unfocused application.",
          "Step 2: Define Requirements and Scope (Mini PRD)",
          "Draft a concise Product Requirements Document (PRD). Separate features into Functional Requirements (what the user can do), Non-Functional Requirements (latency under 200ms, WCAG AA accessibility, mobile responsiveness), and Out-of-Scope Items (features explicitly forbidden in the current milestone). Clearly defined non-functional constraints prevent the AI from defaulting to bloated architectures.",
          "Step 3: Plan the Architecture",
          "Never ask an AI to 'choose the architecture for me'. As the Chief Architect, select the technology stack based on operational realities (e.g. Next.js App Router for server-rendered web, PostgreSQL for relational ACID guarantees). Define the boundaries: What lives in the client? What runs on the server? What are the data models and API endpoint contracts? Establishing clean module boundaries prevents the AI from creating tangled spaghetti code.",
          "Step 4: Prepare the AI Agent (Context Engineering)",
          "Configure project instruction files such as `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`. These files provide persistent system instructions that every AI request consumes. Outline your tech stack, language version, naming conventions, design tokens, and strictly forbidden libraries.",
        ],
        id: [
          "Pengembangan perangkat lunak profesional dengan AI mengikuti alur sepuluh langkah terstruktur. Empat langkah pertama dilakukan sebelum Anda menulis atau menggenerasi kode aplikasi apa pun.",
          "Langkah 1: Perumusan Ide dan Definisi Masalah",
          "Mulailah dengan kejelasan mutlak mengenai masalah yang ingin Anda selesaikan. Tentukan siapa target penggunanya, apa kendala utamanya, dan apa nilai tambah yang ingin dicapai. Jika Anda belum dapat menjelaskan sasaran produk dalam dua kalimat lugas, meminta AI untuk membangunnya hanya akan menghasilkan aplikasi yang membingungkan dan tidak terarah.",
          "Langkah 2: Menentukan Persyaratan dan Batasan Ruang Lingkup (Mini PRD)",
          "Susun Product Requirements Document (PRD) yang ringkas. Pisahkan fitur menjadi Persyaratan Fungsional (aksi pengguna), Persyaratan Non-Fungsional (latensi di bawah 200ms, kepatuhan aksesibilitas WCAG AA, responsivitas mobile), serta Batasan di Luar Cakupan (fitur yang dilarang dibuat pada tahap ini). Batasan non-fungsional yang jelas mencegah AI menambahkan kode yang berlebihan.",
          "Langkah 3: Merencanakan Arsitektur Sistem",
          "Jangan pernah meminta AI untuk 'memilihkan arsitektur secara bebas'. Sebagai Arsitek Sistem, pilih stack teknologi berdasarkan kebutuhan operasional (misalnya Next.js App Router untuk rendering server, PostgreSQL untuk integritas relasional ACID). Tentukan batasannya: Bagian mana yang berjalan di client? Bagian mana yang berjalan di server? Bagaimana skema data dan kontrak API? Arsitektur modular mencegah kode menjadi kusut.",
          "Langkah 4: Menyiapkan Asisten AI (Context Engineering)",
          "Siapkan berkas panduan repositori seperti `AGENTS.md`, `CLAUDE.md`, atau `.cursorrules`. Berkas ini menyediakan instruksi sistem persisten yang dibaca oleh AI pada setiap percakapan. Tuliskan versi bahasa pemrograman, konvensi penamaan berkas, variabel token desain, dan pustaka yang dilarang digunakan.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `# Repository AI Guidelines (AGENTS.md / CLAUDE.md)
Stack: Next.js 15 (App Router), TypeScript 5.8 (Strict), Tailwind CSS v4.
Rules & Boundaries:
1. Always run 'npm run typecheck' and 'npm run lint' after modifications.
2. Do not install new dependencies without explicit written authorization.
3. Keep server mutations and database queries isolated in src/server/.
4. Reuse UI primitives from src/components/ui/. Do not duplicate buttons or inputs.
5. Every interactive element must be keyboard accessible with visible focus rings.
6. Zero console.log statements or unhandled promise rejections in production code.`,
        caption: {
          en: "Example of a concise, high-impact repository instruction file for AI agents",
          id: "Contoh berkas panduan instruksi repositori yang ringkas dan terarah untuk asisten AI",
        },
      },
    },
    {
      id: "the-10-step-workflow-implementation",
      title: {
        en: "6. The 10-Step Vibe Coding Workflow: Phase 2 (Implementation & Verification)",
        id: "6. Alur Kerja Vibe Coding 10 Langkah: Fase 2 (Implementasi & Verifikasi)",
      },
      paragraphs: {
        en: [
          "Once planning and agent context are established, move into active engineering. These three steps protect your project from accumulating unmanageable code sprawl.",
          "Step 5: Build Incrementally (Bite-Sized Milestones)",
          "Avoid the classic amateur mistake: asking an AI to 'build the whole application in one go'. Break your PRD into bite-sized, sequential tasks: data models first, then server mutations, then UI components, and finally page composition. Generate and test one unit before moving to the next. Inspect the git diff after every generation to confirm the AI touched only the intended files.",
          "Step 6: Test and Debug Systematically",
          "Never assume generated code works simply because there are no red squiggly lines. Run your application frequently in local development. When bugs occur, do not issue vague complaints like 'it broke, fix it'. Instead, reproduce the issue, collect the stack trace or browser console log, formulate a test case that reproduces the failure, and instruct the AI to resolve the root cause.",
          "Step 7: Code Review and Refactoring",
          "Apply professional Software Engineering standards to every AI-generated commit:",
          "• Clean Code & Meaningful Naming: Are variables and functions descriptive? Are magic numbers eliminated?",
          "• SOLID Principles: Does each component have a single responsibility? Are interfaces segregated?",
          "• DRY & KISS: Has the AI duplicated an existing utility function? Is there unnecessary abstraction or speculative generalization?",
          "• Error Handling: Are API calls wrapped in try/catch blocks with user-friendly error states, or are promises failing silently?",
        ],
        id: [
          "Setelah tahap perencanaan dan konteks selesai, mulailah proses koding aktif. Tiga langkah berikut menjaga proyek Anda dari penumpukan kode yang tidak terkendali.",
          "Langkah 5: Membangun Secara Bertahap (Bite-Sized Milestones)",
          "Hindari kesalahan umum: meminta AI untuk 'membangun seluruh sistem dalam satu prompt panjang'. Pecah PRD Anda menjadi tugas-tugas kecil dan berurutan: buat model data dan tipe TypeScript terlebih dahulu, lalu mutasi server, kemudian komponen antarmuka, dan terakhir integrasi halaman. Bangun dan uji satu komponen sebelum berpindah ke komponen berikutnya. Tinjau git diff setiap kali AI menyelesaikan tugas untuk memastikan tidak ada perubahan berkas yang tidak diinginkan.",
          "Langkah 6: Menguji dan Debugging secara Sistematis",
          "Jangan pernah berasumsi bahwa kode hasil AI pasti berjalan hanya karena tidak ada garis bawah merah di editor. Jalankan aplikasi Anda secara berkala di lingkungan lokal. Saat terjadi error, hindari memberikan keluhan ambigu seperti 'fiturnya rusak, tolong perbaiki'. Reproduksi masalah tersebut, catat pesan error lengkap atau log console browser, buat skenario pengujian, dan arahkan AI untuk memperbaiki akar masalahnya (root cause).",
          "Langkah 7: Code Review dan Refaktorisasi",
          "Terapkan standar software engineering profesional pada setiap perubahan kode dari AI:",
          "• Clean Code & Penamaan Bermakna: Apakah nama fungsi dan variabel deskriptif? Apakah nilai konstanta telah dirapikan?",
          "• Prinsip SOLID: Apakah setiap komponen hanya memiliki satu tanggung jawab? Apakah interface modular?",
          "• DRY & KISS: Apakah AI menduplikasi fungsi yang sebenarnya sudah ada di repositori? Apakah ada overengineering atau abstraksi berlebihan yang tidak diperlukan?",
          "• Penanganan Error: Apakah pemanggilan API memiliki penanganan error yang jelas bagi pengguna, ataukah promise gagal secara diam-diam?",
        ],
      },
      callout: {
        type: "tip",
        text: {
          en: "Senior Engineering Rule: Generated code is not automatically clean code. Code generation is free; code maintenance is expensive. Review every generated line before you commit it.",
          id: "Prinsip Senior Engineer: Kode yang dihasilkan AI tidak serta merta menjadi kode yang berkualitas. Menghasilkan kode itu murah; merawat dan memperbaiki kode itu mahal. Tinjau setiap baris sebelum Anda melakukan commit.",
        },
      },
    },
    {
      id: "the-10-step-workflow-production",
      title: {
        en: "7. The 10-Step Vibe Coding Workflow: Phase 3 (Security & Operations)",
        id: "7. Alur Kerja Vibe Coding 10 Langkah: Fase 3 (Keamanan & Operasional)",
      },
      paragraphs: {
        en: [
          "The final three steps transition your working software into a resilient, production-ready system.",
          "Step 8: Security Audit (Zero-Trust Review)",
          "AI models optimize for immediate functional output, not security boundaries. Before deploying, execute a dedicated security review:",
          "• Secret Isolation: Verify that no API keys, private certificates, or database connection strings are committed in source files. Ensure `.env` is listed in `.gitignore`.",
          "• Authorization & Tenant Isolation: Check that server endpoints verify user identity and enforce row-level access control. A common AI mistake is checking authentication (is the user logged in?) while forgetting authorization (does this user own this record?).",
          "• Injection Prevention: Verify all database queries use parameterized statements. Check that user inputs in web views are sanitized against Cross-Site Scripting (XSS).",
          "• Dependency Integrity: Run vulnerability scanners (`npm audit`) to ensure packages are secure and free of known vulnerabilities.",
          "Step 9: Production Deployment and Monitoring",
          "Run a fresh production build (`npm run build`) locally to catch bundler errors, static generation failures, or missing environment variables before pushing to production hosting (e.g. Vercel, AWS, or GitHub Pages). Once deployed, establish basic error logging and telemetry to monitor runtime stability.",
          "Step 10: Continuous Improvement and Documentation",
          "Collect user feedback, document key architectural decisions in `docs/architecture.md`, and log any remaining technical debt. As your project evolves, refine your `AGENTS.md` instructions so future AI interactions become even more accurate.",
        ],
        id: [
          "Tiga langkah terakhir mengubah kode yang sudah berjalan menjadi sistem produksi yang tangguh dan aman.",
          "Langkah 8: Audit Keamanan (Zero-Trust Review)",
          "Model AI mengutamakan fungsionalitas visual, bukan perimeter keamanan. Sebelum rilis, jalankan tinjauan keamanan khusus:",
          "• Isolasi Kredensial Rahasia: Pastikan tidak ada API key, sertifikat privat, atau connection string basis data yang tertulis langsung di dalam kode. Pastikan `.env` terdaftar di `.gitignore`.",
          "• Otorisasi & Isolasi Multi-Tenant: Pastikan setiap endpoint server memverifikasi identitas pengguna dan menerapkan kontrol akses baris data. Kesalahan umum AI adalah memeriksa autentikasi (apakah user sudah login?) tetapi melupakan otorisasi (apakah user ini pemilik sah dari data tersebut?).",
          "• Pencegahan Injeksi: Pastikan seluruh kueri database menggunakan parameterized query. Pastikan input pengguna disanitasi dari risiko Cross-Site Scripting (XSS).",
          "• Integritas Dependensi: Jalankan pemindaian kerentanan (`npm audit`) untuk memastikan paket pihak ketiga bebas dari celah keamanan (CVE).",
          "Langkah 9: Deployment Produksi dan Pemantauan",
          "Jalankan build produksi lokal (`npm run build`) untuk mendeteksi error kompilasi, kegagalan static generation, atau variabel lingkungan yang belum diisi sebelum push ke platform hosting (seperti Vercel, AWS, atau GitHub Pages). Setelah rilis, siapkan logging error dan telemetri dasar untuk memantau performa aplikasi.",
          "Langkah 10: Peningkatan Berkelanjutan dan Dokumentasi",
          "Kumpulkan umpan balik pengguna, dokumentasikan keputusan arsitektur penting di `docs/architecture.md`, dan catat utang teknis yang tersisa. Seiring perkembangan proyek, perbarui berkas panduan `AGENTS.md` agar kolaborasi dengan asisten AI berikutnya semakin presisi.",
        ],
      },
    },
    {
      id: "writing-effective-prompts",
      title: {
        en: "8. The Anatomy of a High-Impact Prompt",
        id: "8. Anatomi Prompt Rekayasa Berkualitas Tinggi",
      },
      paragraphs: {
        en: [
          "The single greatest variable separating high-quality AI code from generic AI slop is prompt specificity. An amateur prompt describes what they want to see; an engineering prompt establishes context, boundaries, technical contracts, and verification procedures.",
          "The Anatomy of an Effective Software Engineering Prompt consists of eight essential components:",
          "1. Role and Expertise: Set the technical persona (e.g. 'Senior Full-Stack Engineer and Security Auditor').",
          "2. Project Context: State the existing frameworks, runtimes, and file locations.",
          "3. Clear Objective: Provide a concise statement of what feature or refactoring must be accomplished.",
          "4. Technical Requirements: List data structures, prop interfaces, and exact state management patterns.",
          "5. Explicit Constraints: Specify what not to touch, what libraries not to install, and coding style rules.",
          "6. Expected Deliverables: Define exactly which files should be created or edited.",
          "7. Acceptance Criteria: Outline measurable criteria for success (e.g. 'Empty filter displays all tasks').",
          "8. Verification Instructions: Define commands to run to prove the code works (e.g. 'Must pass typecheck and lint').",
        ],
        id: [
          "Variabel pembeda terbesar antara kode AI yang berkualitas tinggi dan kode AI yang berantakan adalah spesifisitas prompt. Prompt amatir hanya mendeskripsikan apa yang ingin dilihat di layar; prompt rekayasa menetapkan konteks, batasan teknis, kontrak data, dan prosedur verifikasi.",
          "Anatomi Prompt Software Engineering yang Efektif terdiri dari delapan komponen utama:",
          "1. Peran dan Keahlian: Tentukan persona teknis (misal: 'Senior Full-Stack Engineer dan Security Auditor').",
          "2. Konteks Proyek: Sebutkan framework, runtime, dan lokasi berkas yang terkait.",
          "3. Sasaran Jelas: Berikan satu pernyataan lugas mengenai fitur atau refaktorisasi yang ingin dicapai.",
          "4. Persyaratan Teknis: Cantumkan struktur data, interface props, dan alur manajemen state.",
          "5. Batasan Eksplisit: Sebutkan bagian yang tidak boleh diubah, pustaka yang dilarang dipasang, dan aturan gaya kode.",
          "6. Deliverable yang Diharapkan: Tentukan secara spesifik berkas mana saja yang harus dibuat atau dimodifikasi.",
          "7. Kriteria Penerimaan (Acceptance Criteria): Tentukan tolok ukur keberhasilan yang terukur (misal: 'Filter kosong menampilkan semua data').",
          "8. Instruksi Verifikasi: Tuliskan perintah terminal yang harus dijalankan untuk membuktikan kebenaran kode (misal: 'Wajib lulus typecheck dan lint').",
        ],
      },
      code: {
        language: "markdown",
        snippet: `Act as a Senior Backend Engineer.

PROJECT CONTEXT:
- Next.js 15 App Router, TypeScript (strict), PostgreSQL with Drizzle ORM.
- Existing user session helper: 'getCurrentUser()' in src/server/auth.ts.

OBJECTIVE:
Implement a secure Server Action to delete a project by ID at src/server/actions/delete-project.ts.

TECHNICAL REQUIREMENTS:
1. Accept input: '{ projectId: string }' validated via Zod.
2. Verify authentication using 'getCurrentUser()'; throw 401 if unauthenticated.
3. Enforce tenant ownership: only delete if project.userId === user.id; return 403 if unauthorized.
4. Return standardized response envelope: '{ success: boolean; error?: string }'.

CONSTRAINTS:
- Do not install new npm packages.
- Zero in-place mutations or unhandled database exceptions.
- Wrap execution in a database transaction.

ACCEPTANCE CRITERIA & VERIFICATION:
- Must pass 'npm run typecheck' with zero errors.
- Run 'npm run test:actions' to verify authorization test cases.`,
        caption: {
          en: "Production-grade prompt embodying all eight components of prompt anatomy",
          id: "Contoh prompt kelas produksi yang menerapkan seluruh delapan komponen anatomi prompt",
        },
      },
    },
    {
      id: "prompt-comparison-examples",
      title: {
        en: "9. Weak Prompts vs. Strong Prompts: Practical Comparisons",
        id: "9. Komparasi Prompt Lemah vs Prompt Kuat dalam Praktik Nyata",
      },
      paragraphs: {
        en: [
          "To appreciate the difference in engineering outcomes, examine how subtle prompt differences affect the generated code. Below are three real-world scenarios contrasting weak, ambiguous requests with structured, production-grade instructions.",
          "Scenario 1: Feature Implementation (Task Filtering)",
          "• Weak Prompt: 'Make a filter for my task list so I can filter by status.'",
          "Why it fails: The AI will guess whether to use client state or URL query parameters, invent its own CSS classes, forget keyboard accessibility, and potentially rewrite your entire task list component from scratch.",
          "• Strong Prompt (Rewritten): See the prompt block below. It defines the exact props interface, demands URL search params synchronization, requires semantic buttons with `aria-pressed`, and enforces zero new dependencies.",
        ],
        id: [
          "Untuk melihat perbedaan hasil rekayasa secara nyata, mari kita amati bagaimana perbedaan prompt memengaruhi kode yang dihasilkan. Berikut adalah contoh kasus yang membandingkan instruksi ambigu dengan instruksi terstruktur kelas produksi.",
          "Skenario 1: Implementasi Fitur (Filter Status Tugas)",
          "• Prompt Lemah: 'Buatkan fitur filter untuk daftar tugas saya agar bisa difilter berdasarkan status.'",
          "Mengapa gagal: AI akan menebak sendiri apakah harus memakai state lokal atau URL query parameter, mengarang kelas CSS baru, melupakan navigasi keyboard, dan berpotensi merombak seluruh komponen daftar tugas Anda dari awal.",
          "• Prompt Kuat (Hasil Perbaikan): Lihat blok kode di bawah. Prompt ini menentukan interface props secara presisi, mewajibkan sinkronisasi URL search params, menggunakan tombol semantik dengan atribut `aria-pressed`, dan melarang penambahan dependensi baru.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `### Strong Feature Prompt: Task Status Filter
Act as a Senior Frontend Specialist.

CONTEXT:
- Framework: Next.js 15 (App Router), React 19, Tailwind CSS.
- Component to update: src/components/tasks/task-filter-bar.tsx.
- Available statuses: 'all' | 'pending' | 'in_progress' | 'completed'.

OBJECTIVE:
Build a horizontal filter tab group that synchronizes the selected status with URL search params ('?status=...').

CONSTRAINTS & QUALITY GATES:
1. Use semantic '<button>' elements inside a '<div role="group" aria-label="Task status filter">'.
2. Reflect active status with 'aria-pressed="true"' and visible focus rings ('focus-visible:ring-2').
3. Preserve existing query parameters when changing the status parameter.
4. Support keyboard navigation: Left/Right arrows cycle through tabs.
5. Zero new npm packages. Reuse existing 'cn' utility from src/lib/utils.ts.

DELIVERABLE:
- Provide updated task-filter-bar.tsx.
- Verification command: 'npm run typecheck && npm run lint'.`,
        caption: {
          en: "Strong, constrained prompt eliminating ambiguity and enforcing accessibility",
          id: "Prompt kuat dan terarah yang mengeliminasi ambiguitas serta menegakkan aksesibilitas",
        },
      },
    },
    {
      id: "prompt-debugging-example",
      title: {
        en: "10. Prompting for Systematic Debugging and Code Review",
        id: "10. Menyusun Prompt untuk Debugging Sistematis dan Code Review",
      },
      paragraphs: {
        en: [
          "Scenario 2: Systematic Debugging",
          "When code fails, junior developers often write: 'It gives an error when I click submit, fix it'. This causes the AI to randomly guess, frequently introducing regressions into working code.",
          "A professional debugging prompt isolates the failure: it provides the exact error message, stack trace, user input that triggered the bug, expected behavior, and actual runtime behavior.",
          "Scenario 3: Architectural Code Review",
          "AI models are exceptionally good code reviewers when instructed to act as adversarial software auditors. Rather than asking 'is this good?', ask the model to audit the code against specific failure modes: race conditions, unhandled exceptions, memory leaks, and authorization oversights.",
        ],
        id: [
          "Skenario 2: Debugging Sistematis",
          "Saat kode mengalami error, developer pemula kerap menulis: 'Aplikasi error pas diklik submit, tolong perbaiki'. Prompt ini memicu AI menebak-nebak dan sering kali merusak bagian kode lain yang sebelumnya sudah benar.",
          "Prompt debugging profesional mengisolasi masalah: menyertakan pesan error lengkap, stack trace, input pengguna yang memicu bug, perilaku yang diharapkan, dan perilaku aktual saat runtime.",
          "Skenario 3: Code Review Arsitektur",
          "Model AI sangat andal sebagai reviewer kode jika diinstruksikan sebagai auditor software independen. Alih-alih bertanya 'apakah kode ini bagus?', instruksikan model untuk mengaudit kode terhadap pola kegagalan spesifik: race condition, unhandled exception, kebocoran memori, dan celah otorisasi.",
        ],
      },
      code: {
        language: "markdown",
        snippet: `### Strong Code Review Prompt: Security & Concurrency Audit
Act as a Principal Software Engineer and Application Security Auditor.

TASK:
Review the following Next.js Server Action in 'src/server/actions/transfer-funds.ts':
[Paste Code Here]

AUDIT CHECKLIST:
1. Concurrency: Is there potential for race conditions or double-spending during balance deductions?
2. Transactional Boundaries: Are all database mutations wrapped in an ACID transaction with rollback?
3. Authorization: Is the sender ID validated against the authenticated session token, or is it trusted from client input?
4. Idempotency: Does the endpoint support an idempotency key to prevent accidental duplicate submissions?
5. Error Handling: Are database error details obscured from the client to prevent information disclosure?

DELIVERABLE:
- Bulleted findings prioritized by severity (Critical, High, Medium).
- Refactored code addressing all identified vulnerabilities.`,
        caption: {
          en: "Adversarial code review prompt targeting concurrency, authorization, and data integrity",
          id: "Prompt audit kode berstandar tinggi yang menargetkan konkurensi, otorisasi, dan integritas data",
        },
      },
    },
    {
      id: "common-vibe-coding-mistakes",
      title: {
        en: "11. Nine Common Vibe Coding Mistakes and How to Prevent Them",
        id: "11. Sembilan Kesalahan Umum Vibe Coding dan Cara Mencegahnya",
      },
      paragraphs: {
        en: [
          "Working with AI coding agents introduces a new category of failure modes. Being aware of these traps allows you to catch them before they reach production.",
          "1. Blindly Trusting Generated Code: Assuming code works because the AI claimed 'I have fixed all issues'. Always verify through terminal execution and manual inspection.",
          "2. Building Without Requirements: Starting a session without defining scope leads to rambling conversations, contradictory code changes, and lost context.",
          "3. Ignoring Architecture: Asking the AI to implement features without establishing module boundaries results in tight coupling and monolithic files.",
          "4. Massive Mega-Prompts: Asking the AI to build authentication, billing, database models, and dashboard UI in a single prompt guarantees shallow, buggy code.",
          "5. Skipping Automated Testing: Relying solely on manual clicks. Without automated tests, an AI modifying one file will silently break another file without your knowledge.",
          "6. Security Blindspots: Overlooking SQL injection, unescaped HTML, or missing role checks because 'the AI wrote it'.",
          "7. Unchecked Technical Debt: Allowing the AI to install dozens of heavy npm packages for trivial utilities, bloating the bundle size.",
          "8. Not Understanding the Generated Code: Accepting complex algorithms you cannot explain. If you do not understand the code today, you cannot debug it when it breaks at 2:00 AM.",
          "9. Confusing a Demo with Production Readiness: A UI prototype running on localhost is only 20% of the engineering work. Error boundaries, edge cases, logging, and security represent the remaining 80%.",
        ],
        id: [
          "Bekerja dengan asisten koding AI menghadirkan kategori pola kegagalan baru. Mengenali jebakan ini memungkinkan Anda mencegahnya sebelum masuk ke lingkungan produksi.",
          "1. Percaya Buta pada Kode Hasil AI: Menganggap kode pasti benar hanya karena AI mengatakan 'saya sudah memperbaiki semua masalah'. Selalu verifikasi melalui eksekusi terminal dan inspeksi manual.",
          "2. Membangun Tanpa Persyaratan Jelas: Memulai sesi tanpa batasan ruang lingkup memicu percakapan berbelit, perubahan kode yang saling bertentangan, dan hilangnya konteks.",
          "3. Mengabaikan Arsitektur: Meminta AI membuat fitur tanpa menetapkan batasan modul menghasilkan kode monolitik yang saling terikat erat (tight coupling).",
          "4. Mega-Prompt Raksasa: Meminta AI membuat autentikasi, pembayaran, skema database, dan dashboard sekaligus dalam satu prompt menjamin lahirnya kode yang rapuh dan dangkal.",
          "5. Melewatkan Pengujian Otomatis: Hanya mengandalkan klik manual di browser. Tanpa tes otomatis, AI yang mengubah satu berkas dapat merusak berkas lain secara tersembunyi tanpa Anda sadari.",
          "6. Celah Keamanan Terabaikan: Mengabaikan risiko SQL injection, XSS, atau ketiadaan otorisasi hanya karena 'kodenya ditulis oleh AI'.",
          "7. Penumpukan Utang Teknis: Membiarkan AI memasang puluhan dependensi npm berat untuk fungsi sederhana, membuat ukuran bundle membengkak.",
          "8. Tidak Memahami Kode yang Diterima: Menerima kode kompleks yang tidak dapat Anda jelaskan. Jika Anda tidak memahaminya hari ini, Anda tidak akan bisa memperbaikinya saat sistem bermasalah di tengah malam.",
          "9. Menyamakan Demo Prototipe dengan Kesiapan Produksi: Prototipe yang berjalan di localhost baru menyelesaikan 20% pekerjaan rekayasa. Penanganan error, kasus batas, logging, dan keamanan mencakup 80% sisanya.",
        ],
      },
      table: {
        headers: {
          en: ["Common Mistake", "Root Cause", "Engineering Prevention Strategy"],
          id: ["Kesalahan Umum", "Akar Penyebab", "Strategi Pencegahan Rekayasa"],
        },
        rows: {
          en: [
            [
              "Mega-Prompts",
              "Impatience; treating AI as an oracle rather than an assistant",
              "Break work into 15-minute incremental milestones. Verify each before proceeding.",
            ],
            [
              "Package Hallucination",
              "AI predicting non-existent or deprecated npm packages",
              "Enforce 'zero new dependencies' rule in project instructions without explicit approval.",
            ],
            [
              "Silent Regressions",
              "AI modifying shared files without regression testing",
              "Maintain unit tests with Vitest/Jest; run test suites after every file edit.",
            ],
            [
              "Missing Authorization",
              "AI checking login session but omitting record ownership check",
              "Enforce server-side row-level security or explicit tenant ID checks on all queries.",
            ],
            [
              "Unreviewable Git Diffs",
              "Allowing AI to rewrite hundreds of lines across dozens of files",
              "Commit small, verified changes frequently. Use 'git diff' before every commit.",
            ],
          ],
          id: [
            [
              "Mega-Prompt Raksasa",
              "Ketidaksabaran; menganggap AI sebagai peramal serba bisa, bukan asisten",
              "Pecah tugas menjadi tahapan 15 menit. Verifikasi setiap tahapan sebelum lanjut.",
            ],
            [
              "Halusinasi Paket",
              "AI menebak nama paket npm yang fiktif atau sudah usang",
              "Terapkan aturan 'dilarang menambah dependensi' dalam berkas panduan repositori.",
            ],
            [
              "Regresi Tersembunyi",
              "AI mengubah berkas bersama tanpa pengujian regresi",
              "Miliki unit test dengan Vitest/Jest; jalankan rangkaian tes setiap selesai mengedit.",
            ],
            [
              "Ketiadaan Otorisasi",
              "AI mengecek login tetapi lupa memvalidasi kepemilikan data",
              "Terapkan keamanan row-level atau validasi tenant ID eksplisit di setiap kueri server.",
            ],
            [
              "Git Diff yang Tak Terbaca",
              "Membiarkan AI merombak ratusan baris di banyak berkas sekaligus",
              "Lakukan commit kecil secara berkala. Periksa 'git diff' sebelum setiap commit.",
            ],
          ],
        },
        caption: {
          en: "Summary of common AI development failure modes and preventative engineering practices",
          id: "Ringkasan pola kegagalan pengembangan AI dan strategi pencegahan rekayasanya",
        },
      },
    },
    {
      id: "best-practices-checklist",
      title: {
        en: "12. Professional Engineering Standards Checklist",
        id: "12. Checklist Standar Rekayasa Perangkat Lunak Profesional",
      },
      paragraphs: {
        en: [
          "Before merging or deploying any AI-assisted code change, run through this comprehensive engineering checklist to guarantee craftsmanship and maintainability:",
        ],
        id: [
          "Sebelum melakukan merge atau rilis pada kode yang dibangun bersama AI, jalankan checklist rekayasa komprehensif berikut untuk menjamin kualitas dan kemudahan pemeliharaan:",
        ],
      },
      checklist: {
        en: [
          "Architecture First: Plan stack boundaries, API contracts, and data models before drafting code.",
          "Small Iterations: Break features into atomic, testable increments (one component or endpoint per prompt).",
          "Clean Git History: Maintain atomic commits with Conventional Commit messages; inspect git diff line-by-line.",
          "Deterministic Typechecking: Run 'tsc --noEmit' with zero errors or suppressions.",
          "Automated Testing: Ensure unit and integration tests pass before accepting generated solutions.",
          "Security Zero-Trust: Confirm no credentials in source code, parameterized SQL queries, and sanitized user inputs.",
          "Accessibility & Semantics: Verify keyboard navigation (Tab/Shift-Tab/Enter), visible focus rings, and WCAG AA contrast.",
          "Error & Empty States: Verify that loading skeletons, empty collection states, and error boundaries are handled.",
          "Dependency Hygiene: Verify package.json contains zero unnecessary external packages.",
          "Human Comprehension: Ensure you understand and can explain every line of code committed to the repository.",
        ],
        id: [
          "Arsitektur Utama: Rencanakan batasan stack, kontrak API, dan model data sebelum menulis kode.",
          "Iterasi Bertahap: Pecah fitur menjadi unit kecil yang dapat diuji (satu komponen atau endpoint per prompt).",
          "Riwayat Git Bersih: Buat commit atomik dengan pesan Conventional Commits; tinjau git diff baris demi baris.",
          "Pengecekan Tipe Deterministik: Jalankan 'tsc --noEmit' dengan nol error tanpa mengabaikan tipe data.",
          "Pengujian Otomatis: Pastikan unit test dan integration test lulus sebelum menerima solusi kode dari AI.",
          "Keamanan Zero-Trust: Pastikan tidak ada kredensial di kode, kueri SQL berparameter, dan input disanitasi.",
          "Aksesibilitas & Semantik: Uji navigasi keyboard (Tab/Shift-Tab/Enter), focus ring terlihat, dan kontras WCAG AA.",
          "Penanganan State Kosong & Error: Pastikan loading state, empty state, dan error boundary ditampilkan dengan baik.",
          "Kebersihan Dependensi: Pastikan package.json tidak ketambahan paket pihak ketiga yang tidak perlu.",
          "Pemahaman Manusia: Pastikan Anda memahami dan mampu menjelaskan setiap baris kode yang masuk ke repositori.",
        ],
      },
    },
    {
      id: "practical-learning-project",
      title: {
        en: "13. Practical Learning Project: Building a Resilient Task Manager",
        id: "13. Proyek Pembelajaran Praktis: Membangun Aplikasi Manajemen Tugas",
      },
      paragraphs: {
        en: [
          "To internalize the 10-step workflow, follow this hands-on educational exercise. This project is designed for you to build independently in your own local environment.",
          "Project Objective: Build a resilient, accessible Task Management Application featuring category tagging, priority filtering, and offline persistence.",
          "Suggested Tech Stack: Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS, Vitest for unit tests, and Playwright for browser tests.",
          "Milestone 1 (Data Model): Prompt the AI to create a typed Task interface and a pure, immutable state reducer with action creators for creating, toggling, and deleting tasks.",
          "Milestone 2 (Persistence): Prompt the AI to build a custom React hook (`useTaskStore`) that initializes state from browser localStorage and persists updates with defensive JSON parsing.",
          "Milestone 3 (Accessible UI): Build the TaskList, TaskCard, and PriorityFilter components. Demand semantic HTML (`<button>`, `<input type='checkbox'>`), explicit ARIA attributes, and visible focus rings.",
          "Milestone 4 (Automated Testing): Ask the AI to write unit tests in Vitest verifying that reducer actions produce expected state transitions without in-place mutations.",
          "Milestone 5 (Production Verification): Execute `npm run typecheck`, `npm run lint`, and `npm run build` to confirm static export readiness.",
        ],
        id: [
          "Untuk menerapkan alur kerja 10 langkah ini secara nyata, ikuti latihan edukatif berikut. Proyek ini dirancang untuk Anda bangun secara mandiri di komputer lokal Anda.",
          "Sasaran Proyek: Membangun aplikasi Manajemen Tugas yang tangguh dan aksesibel dengan penandaan kategori, filter prioritas, dan penyimpanan lokal offline.",
          "Pilihan Stack: Next.js 15 (App Router), React 19, TypeScript (ketat), Tailwind CSS, Vitest untuk pengujian unit, dan Playwright untuk pengujian browser.",
          "Milestone 1 (Model Data): Arahkan AI untuk membuat interface Task bertipe kuat serta fungsi reducer state yang immutable dengan action untuk membuat, menandai selesai, dan menghapus tugas.",
          "Milestone 2 (Penyimpanan Data): Arahkan AI membuat custom hook React (`useTaskStore`) yang membaca data dari browser localStorage dan menyimpan pembaruan dengan parsing JSON yang aman.",
          "Milestone 3 (Antarmuka Aksesibel): Bangun komponen TaskList, TaskCard, dan PriorityFilter. Tuntut penggunaan elemen semantik (`<button>`, `<input type='checkbox'>`), atribut ARIA eksplisit, dan focus ring yang jelas.",
          "Milestone 4 (Pengujian Otomatis): Minta AI menulis unit test di Vitest untuk memverifikasi bahwa reducer menghasilkan perubahan state yang benar tanpa memutasi objek secara langsung.",
          "Milestone 5 (Verifikasi Produksi): Jalankan `npm run typecheck`, `npm run lint`, dan `npm run build` untuk mengonfirmasi kesiapan ekspor statis.",
        ],
      },
      code: {
        language: "typescript",
        snippet: `// Educational Example: Immutable Task State Reducer
export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
};

export type TaskAction =
  | { type: 'ADD'; payload: { title: string; priority: Priority } }
  | { type: 'TOGGLE'; payload: { id: string } }
  | { type: 'DELETE'; payload: { id: string } };

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD':
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.title.trim(),
          priority: action.payload.priority,
          completed: false,
          createdAt: Date.now(),
        },
        ...state,
      ];
    case 'TOGGLE':
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE':
      return state.filter((task) => task.id !== action.payload.id);
    default:
      return state;
  }
}`,
        caption: {
          en: "Pure, testable state reducer logic free of side-effects",
          id: "Logika reducer murni yang dapat diuji tanpa efek samping",
        },
      },
    },
    {
      id: "conclusion-and-roadmap",
      title: {
        en: "14. Conclusion: Keeping Human Judgment at the Center",
        id: "14. Kesimpulan: Menjaga Pertimbangan Rekayasa Manusia sebagai Pusat Kendali",
      },
      paragraphs: {
        en: [
          "Vibe Coding represents a genuine inflection point in software development. By delegating boilerplate, syntax recall, and routine wiring to AI coding assistants, engineers can build products at speeds unimaginable just a few years ago.",
          "However, speed without direction is simply faster failure. Software engineering has never been merely about typing code: it is about understanding human problems, designing resilient architectures, navigating trade-offs, defending against security threats, and maintaining systems over years of operational change.",
          "When you adopt an engineering-first Vibe Coding workflow, AI becomes an extraordinary cognitive exoskeleton. You remain the Architect; the AI remains the Builder. Embrace the speed, but never compromise on engineering discipline.",
          "Post-Article Learning Roadmap:",
          "1. Explore the interactive visual milestones on [roadmap.sh/vibe-coding](https://roadmap.sh/vibe-coding).",
          "2. Dive deeper into backend architecture with our guide on [Production-Ready REST APIs](/engineering/production-ready-apis).",
          "3. Understand algorithmic scaling principles in [Understanding Algorithm Complexity](/blog/big-o-notation-algorithm-complexity).",
          "4. Master containerization and deployment boundaries in [Docker vs Kubernetes Guide](/blog/docker-kubernetes-cloud).",
          "5. Study serverless event architectures in our [Serverless Architecture Guide](/blog/serverless-architecture).",
        ],
        id: [
          "Vibe Coding merepresentasikan titik balik nyata dalam sejarah pengembangan perangkat lunak. Dengan mendelegasikan boilerplate, hafalan sintaks, dan perakitan rutin kepada asisten koding AI, developer dapat membangun produk dengan kecepatan yang tidak terbayangkan beberapa tahun lalu.",
          "Namun, kecepatan tanpa arah hanyalah cara lebih cepat menuju kegagalan. Rekayasa perangkat lunak tidak pernah sebatas mengetik baris kode: esensinya adalah memahami masalah manusia, merancang arsitektur yang tahan banting, menimbang trade-off teknis, mengamankan data, dan merawat sistem di tengah dinamika operasional jangka panjang.",
          "Ketika Anda menerapkan alur kerja Vibe Coding berlandaskan disiplin rekayasa, AI berubah menjadi alat pengungkit produktivitas yang luar biasa. Anda tetap menjadi Arsitek; AI tetap menjadi Pembangun. Manfaatkan kecepatannya, tetapi jangan pernah menurunkan standar keandalan rekayasa Anda.",
          "Peta Jalan Pembelajaran Selanjutnya:",
          "1. Telusuri tahapan visual interaktif di [roadmap.sh/vibe-coding](https://roadmap.sh/vibe-coding).",
          "2. Pelajari arsitektur backend lebih mendalam melalui panduan [Production-Ready REST APIs](/engineering/production-ready-apis).",
          "3. Pahami prinsip penskalaan algoritma dalam [Understanding Algorithm Complexity](/blog/big-o-notation-algorithm-complexity).",
          "4. Kuasai batasan kontainer dan deployment di [Panduan Docker vs Kubernetes](/blog/docker-kubernetes-cloud).",
          "5. Pelajari arsitektur event serverless dalam [Panduan Serverless Architecture](/blog/serverless-architecture).",
        ],
      },
    },
  ],
};
