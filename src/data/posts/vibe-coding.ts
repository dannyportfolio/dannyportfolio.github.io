import type { BlogPost } from "@/data/blog";

export const vibeCodingPost: BlogPost = {
  slug: "vibe-coding-practical-guide",
  title: {
    en: "Vibe Coding: A Practical Guide to Building Software with AI",
    id: "Vibe Coding: Panduan Praktis Membangun Software dengan AI",
  },
  summary: {
    en: "A balanced, educational, and technically grounded guide to AI-assisted software development: clear prompting, context engineering, code reviews, security boundaries, and realistic workflows.",
    id: "Panduan edukatif, seimbang, dan berlandaskan rekayasa perangkat lunak seputar pengembangan software berbantuan AI: perumusan prompt, context engineering, review kode, keamanan, dan alur kerja nyata.",
  },
  category: {
    en: "AI Engineering & Workflows",
    id: "Rekayasa AI & Alur Kerja",
  },
  tags: [
    "Vibe Coding",
    "AI-Assisted Development",
    "Software Architecture",
    "Security",
    "Best Practices",
  ],
  publishedDate: "2026-10-23",
  author: "Danial Fachrudin",
  readingTime: {
    en: "12 min read",
    id: "12 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "Vibe Coding: A Practical Guide to Building Software with AI — Danial Fachrudin",
    id: "Vibe Coding: Panduan Praktis Membangun Software dengan AI — Danial Fachrudin",
  },
  seoDescription: {
    en: "Learn how to build real applications with AI coding assistants responsibly. Covers prompting, repo context, code verification, security risks, and a complete task manager walkthrough.",
    id: "Pelajari cara membangun aplikasi nyata menggunakan asisten AI secara bertanggung jawab. Membahas prompt, konteks repo, verifikasi kode, risiko keamanan, dan contoh kasus task manager.",
  },
  sections: [
    {
      id: "what-is-vibe-coding",
      title: {
        en: "1. What is Vibe Coding and Where Did it Originate?",
        id: "1. Apa Itu Vibe Coding dan Dari Mana Istilah Ini Berasal?",
      },
      paragraphs: {
        en: [
          "The term 'Vibe Coding' gained widespread currency in tech discourse following observations by prominent AI researchers and practitioners (notably popularized by Andrej Karpathy in early 2025). It describes a workflow where a human developer collaborates with powerful Large Language Model (LLM) coding agents primarily by communicating high-level intent, architecture goals, and iterative feedback in natural language, while the AI generates and modifies the underlying code.",
          "Instead of manually typing every syntax token, boilerplate structure, and import statement, the developer operates at an editorial and architectural level — steering the codebase through natural-language prompts, reviewing diffs, and evaluating the resulting system behavior.",
        ],
        id: [
          "Istilah 'Vibe Coding' mencuat dan populer dalam diskusi teknologi global setelah dipopulerkan oleh peneliti AI terkemuka (khususnya Andrej Karpathy pada awal tahun 2025). Istilah ini menggambarkan alur kerja di mana pengembang berkolaborasi dengan asisten koding AI melalui instruksi bahasa alami (natural language), menyampaikan tujuan arsitektur dan umpan balik iteratif, sementara AI menggenerasi kode dasarnya.",
          "Alih-alih mengetik setiap baris sintaks, struktur boilerplate, dan import secara manual, developer berperan sebagai editor dan arsitek sistem — mengarahkan kode melalui prompt, meninjau git diff, serta mengevaluasi fungsionalitas aplikasi yang dihasilkan.",
        ],
      },
    },
    {
      id: "how-it-differs",
      title: {
        en: "2. How Vibe Coding Differs from Conventional Engineering & Traditional Autocomplete",
        id: "2. Perbedaan Vibe Coding dengan Rekayasa Konvensional & Autocomplete Tradisional",
      },
      paragraphs: {
        en: [
          "To understand Vibe Coding, it is critical to distinguish it from two adjacent paradigms:",
          "1. Conventional Software Development: The engineer designs algorithms mentally or on paper, manually writes code in an editor, navigates API documentation, and compiles/runs test suites. The cognitive load centers on syntax, idioms, and implementation mechanics.",
          "2. Traditional Inline Autocomplete (Tab-completion): Tools like standard IntelliSense or first-generation Copilot predict the next token or line based on localized cursor position. The human remains the sole author of the structural flow.",
          "3. Agentic Vibe Coding: Modern AI coding assistants can read multi-file repository contexts, execute shell commands, run tests, diagnose compiler errors, and create multi-file feature implementations autonomously. The developer's primary role shifts from typist to reviewer, systems thinker, and quality gatekeeper.",
        ],
        id: [
          "Untuk memahami Vibe Coding secara tepat, kita perlu membedakannya dari dua paradigma lainnya:",
          "1. Rekayasa Perangkat Lunak Konvensional: Developer merancang algoritma secara mandiri, menulis sintaks baris demi baris, membaca dokumentasi resmi, dan menyusun kode secara manual. Beban kognitif terpusat pada hafalan sintaks, idiom bahasa, dan mekanika implementasi.",
          "2. Autocomplete Tradisional (Tab-completion): Fitur seperti IntelliSense atau Copilot generasi awal hanya memprediksi kata atau baris berikutnya berdasarkan posisi kursor. Developer manusia tetap menjadi penulis tunggal struktur aplikasi.",
          "3. Agentic Vibe Coding: Asisten koding AI modern kini mampu membaca konteks multi-berkas repositori, mengeksekusi perintah terminal, menjalankan pengujian, menganalisis pesan kesalahan kompilasi, dan mengimplementasikan fitur lengkap. Peran developer beralih dari pengetik menjadi kurator arsitektur, reviewer kualitas, dan penguji keandalan sistem.",
        ],
      },
      callout: {
        type: "note",
        text: {
          en: "Vibe Coding does not eliminate the need for software engineering fundamentals. Rather, it raises the abstraction ceiling, making foundational knowledge of data modeling, security, and systems architecture more valuable than ever.",
          id: "Vibe Coding tidak menghapuskan kebutuhan akan fondasi rekayasa perangkat lunak. Sebaliknya, pendekatan ini menaikkan tingkat abstraksi, sehingga pemahaman arsitektur data, keamanan, dan sistem justru menjadi jauh lebih krusial.",
        },
      },
    },
    {
      id: "natural-language-translation",
      title: {
        en: "3. How Natural Language Translates into Working Code",
        id: "3. Bagaimana Bahasa Alami Diterjemahkan Menjadi Kode yang Berfungsi",
      },
      paragraphs: {
        en: [
          "AI models do not possess conscious reasoning; they are predictive statistical models trained on vast corpora of open-source software, documentation, and technical discussions. When given a prompt, the model tokenizes the instructions and repository context, predicting the most probable sequences of code that fulfill the specified constraints.",
          "Modern coding tools enhance this process through 'Agentic Loops': rather than generating code in a vacuum, the agent formulates a plan, reads existing files to discover conventions, writes code modifications, runs linters or compilers, and inspects stderr output to iteratively self-correct before reporting back to the user.",
        ],
        id: [
          "Model AI tidak memiliki kesadaran manusia; AI adalah model prediktif berbasis probabilitas yang dilatih pada jutaan repositori open-source, dokumentasi teknis, dan forum rekayasa. Ketika menerima instruksi, model memetakan konteks dan menghasilkan token kode yang paling relevan dengan batasan yang ditentukan.",
          "Alat koding modern memperkuat proses ini dengan 'Agentic Loop': alih-alih menghasilkan kode secara buta, agen merumuskan rencana tindakan, membaca berkas repositori untuk memahami konvensi yang ada, menulis perubahan berkas, menjalankan compiler atau linter, dan menganalisis keluaran error untuk memperbaiki kodenya secara mandiri sebelum melapor kepada developer.",
        ],
      },
    },
    {
      id: "practical-workflow",
      title: {
        en: "4. The Professional Vibe Coding Workflow",
        id: "4. Alur Kerja Profesional dalam Vibe Coding",
      },
      paragraphs: {
        en: [
          "Successful developers do not throw vague single-sentence prompts at an AI and deploy the result blindly. A disciplined, professional workflow consists of six distinct phases:",
          "Phase 1 — Discovery & Scope: Inspect the existing project dependencies, styles, and data models before drafting any feature request.",
          "Phase 2 — Prompt Formulation: Define clear functional boundaries, inputs, outputs, UI states, and non-functional requirements (accessibility, performance, error handling).",
          "Phase 3 — Incremental Generation: Instruct the agent to implement one cohesive piece at a time (e.g. data schema first, then business logic, then UI components).",
          "Phase 4 — Static Verification: Run TypeScript type checks, ESLint, and existing test suites immediately following generation.",
          "Phase 5 — Human Review: Perform a line-by-line git diff inspection to check for edge cases, hallucinated methods, unneeded dependencies, or security oversights.",
          "Phase 6 — Checkpointing: Commit working increments with clean Git commit messages so you can roll back instantly if an exploration derails.",
        ],
        id: [
          "Developer profesional tidak sekadar melempar satu kalimat instruksi ambigu lalu merilis hasilnya begitu saja. Alur kerja yang disiplin terdiri dari enam fase terstruktur:",
          "Fase 1 — Analisis & Ruang Lingkup: Periksa dependensi proyek, styling system, dan model data yang ada sebelum meminta pembuatan fitur.",
          "Fase 2 — Perumusan Prompt: Tentukan batasan fungsional yang jelas, input, output, state antarmuka, dan persyaratan non-fungsional (aksesibilitas, performa, penanganan error).",
          "Fase 3 — Implementasi Bertahap: Instruksikan AI untuk membangun satu modul terisolasi dalam satu waktu (misal: skema data dahulu, lalu logika bisnis, baru komponen UI).",
          "Fase 4 — Verifikasi Statis: Jalankan pengecekan TypeScript (tsc), ESLint, dan unit test otomatis segera setelah kode selesai dibuat.",
          "Fase 5 — Human Code Review: Lakukan peninjauan git diff baris demi baris untuk mendeteksi kelemahan logika, fungsi fiktif, dependensi berlebih, atau celah keamanan.",
          "Fase 6 — Checkpoint Git: Lakukan commit pada setiap tahapan yang sudah teruji agar Anda dapat melakukan rollback dengan aman sewaktu-waktu.",
        ],
      },
    },
    {
      id: "prompting-and-criteria",
      title: {
        en: "5. Writing Effective Prompts & Acceptance Criteria",
        id: "5. Menyusun Prompt Efektif & Kriteria Penerimaan (Acceptance Criteria)",
      },
      paragraphs: {
        en: [
          "The single greatest determinant of AI code quality is the specificity of the prompt. Vague prompts ('build me a task manager') produce generic, fragile code filled with assumptions.",
          "High-impact prompts adhere to the C-O-R-E framework: Context (existing framework and file locations), Objective (exact functional requirement), Requirements & Constraints (libraries to use, styling patterns, error states), and Evaluation (acceptance criteria and tests to run).",
        ],
        id: [
          "Faktor penentu terbesar kualitas kode yang dihasilkan AI adalah kejelasan dan ketepatan prompt. Instruksi yang ambigu ('buatkan saya aplikasi to-do list') akan menghasilkan kode generik, rapuh, dan penuh asumsi sepihak.",
          "Prompt berkualitas tinggi menerapkan kerangka C-O-R-E: Context (framework dan struktur direktori yang digunakan), Objective (sasaran fitur yang jelas), Requirements & Constraints (batasan pustaka, aturan styling, penanganan error), dan Evaluation (kriteria penerimaan dan uji coba yang harus dipenuhi).",
        ],
      },
      code: {
        language: "markdown",
        snippet: `### Feature Specification: Priority Task Filter
Context: Next.js 16 App Router, React 19, Tailwind CSS.
Existing model: Task { id: string; title: string; priority: 'low' | 'med' | 'high'; completed: boolean }
Objective: Add a multi-select priority filter chip group above the task list.
Constraints:
- Reuse existing Badge component from @/components/ui/badge
- Preserve query parameters in URL (e.g. ?priority=high,med)
- Must be keyboard accessible (Arrow keys / Enter / Space)
- Zero new npm dependencies
Acceptance Criteria:
- Clicking a chip toggles that priority in the filtered list
- Empty filter displays all tasks
- Must pass 'npm run typecheck' and 'npm run lint'`,
        caption: {
          en: "Example of a structured prompt with explicit constraints and criteria",
          id: "Contoh prompt terstruktur dengan batasan dan kriteria penerimaan yang jelas",
        },
      },
    },
    {
      id: "providing-context",
      title: {
        en: "6. Providing Relevant Repository Context",
        id: "6. Memberikan Konteks Repositori yang Tepat",
      },
      paragraphs: {
        en: [
          "LLMs have finite context windows and can easily become confused by irrelevant information. Providing too little context causes the AI to hallucinate APIs and duplicate utilities that already exist in your repo; providing too much irrelevant context leads to degraded reasoning.",
          "Provide targeted context: share the specific package.json dependencies, relevant TypeScript interface definitions, the design system tokens, and existing similar components. When working with modern coding agents, guide the agent to read existing files before editing.",
        ],
        id: [
          "Model bahasa memiliki batas context window dan dapat mengalami penurunan akurasi jika dibanjiri informasi yang tidak relevan. Memberikan terlalu sedikit konteks membuat AI menciptakan fungsi fiktif atau menduplikasi fungsi utilitas yang sebenarnya sudah ada di repositori; memberikan terlalu banyak berkas yang tidak terkait dapat mengaburkan fokus AI.",
          "Berikan konteks terarah: sertakan versi package.json, definisi interface TypeScript yang relevan, variabel CSS/Tailwind, dan komponen serupa yang sudah ada. Arahkan asisten AI untuk membaca berkas yang ada sebelum mulai melakukan perubahan.",
        ],
      },
    },
    {
      id: "reviewing-code",
      title: {
        en: "7. How to Review Generated Code Line by Line",
        id: "7. Cara Me-review Kode Hasil AI Baris Demi Baris",
      },
      paragraphs: {
        en: [
          "Treat generated code as code authored by an eager junior engineer who has memorized documentation but lacks production operational context. Never accept a diff without inspecting every line.",
          "Look specifically for: unnecessary dependencies added to package.json, hardcoded magic numbers or credentials, unhandled edge cases (e.g. empty arrays, null values, network timeouts), silent catch blocks that swallow errors, and violations of your project's established conventions.",
        ],
        id: [
          "Perlakukan kode yang dihasilkan AI layaknya kode yang ditulis oleh developer junior yang rajin menghafal dokumentasi namun belum memiliki pengalaman operasional produksi. Jangan pernah menerima perubahan berkas tanpa membaca setiap baris perubahannya.",
          "Waspadai hal-hal berikut: dependensi npm baru yang tidak diperlukan, nilai konstanta rahasia yang di-hardcode, penanganan kasus batas (seperti array kosong, nilai null, atau koneksi putus), blok catch kosong yang menelan pesan kesalahan, serta pelanggaran konvensi desain yang sudah ada di proyek Anda.",
        ],
      },
    },
    {
      id: "testing-and-accessibility",
      title: {
        en: "8. Testing Functionality, Accessibility, and Responsiveness",
        id: "8. Menguji Fungsionalitas, Aksesibilitas, dan Responsivitas",
      },
      paragraphs: {
        en: [
          "A feature is not done when the code compiles; it is done when it is verified. AI assistants frequently generate visually appealing components that are functionally broken for keyboard users or screen readers.",
          "Test keyboard navigation (can every interactive control be reached via Tab, activated via Enter/Space, and dismissed via Escape?). Test across viewport widths (375px mobile, 768px tablet, 1280px desktop) to check for text overflow and layout shifts. Verify color contrast ratios to ensure legibility.",
        ],
        id: [
          "Suatu fitur belum selesai hanya karena kodenya berhasil di-compile; fitur baru selesai saat telah diverifikasi secara nyata. Asisten AI sering kali menghasilkan antarmuka yang tampak rapi di layar namun tidak dapat dioperasikan menggunakan keyboard atau pembaca layar (screen reader).",
          "Uji navigasi keyboard (apakah seluruh tombol dapat diakses dengan Tab, diaktifkan dengan Enter/Spasi, dan ditutup dengan Escape?). Uji pada berbagai ukuran layar (mobile 375px, tablet 768px, desktop 1280px) untuk memastikan tidak terjadi horizontal scroll atau tata letak berantakan. Periksa kontras warna agar teks nyaman dibaca oleh semua orang.",
        ],
      },
    },
    {
      id: "investigating-errors",
      title: {
        en: "9. Investigating Errors & Iterating Safely",
        id: "9. Menyelidiki Error & Melakukan Iterasi dengan Aman",
      },
      paragraphs: {
        en: [
          "When generated code produces an error, resist the urge to post a generic 'it doesn't work, fix it' prompt. That invites random guessing and compounding regressions.",
          "Provide the exact stack trace, compiler error code, the expected versus actual behavior, and relevant runtime logs. If an AI agent attempts multiple unsuccessful fixes in a row, roll back to the last known working git commit and reformulate the prompt with narrower scope.",
        ],
        id: [
          "Ketika kode mengalami error, hindari memberikan instruksi generik seperti 'kodenya rusak, tolong perbaiki'. Prompt yang tidak jelas akan memicu AI menebak-nebak dan berpotensi merusak bagian lain yang sebelumnya sudah berjalan.",
          "Berikan pesan error yang lengkap, kode status compiler, penjelasan perilaku yang diharapkan versus perilaku yang terjadi, serta log terminal yang relevan. Jika AI berulang kali gagal memperbaiki masalah, kembalikan kode ke checkpoint git terakhir yang berfungsi, lalu perjelas kembali instruksi Anda.",
        ],
      },
    },
    {
      id: "git-checkpoints",
      title: {
        en: "10. Using Git Checkpoints to Protect Working States",
        id: "10. Memanfaatkan Checkpoint Git untuk Melindungi Kondisi Kode",
      },
      paragraphs: {
        en: [
          "Git is the essential safety harness of AI-assisted engineering. Because coding agents can rewrite multiple files in seconds, maintaining a clean git working tree is non-negotiable.",
          "Follow the 'One Feature, One Commit' rule. Before asking an AI to perform an architectural refactoring or add a new subsystem, ensure git status is clean. If the agent's changes prove counterproductive, you can execute 'git reset --hard' with zero loss of valuable work.",
        ],
        id: [
          "Git adalah sabuk pengaman paling krusial dalam koding berbantuan AI. Karena agen AI dapat mengubah banyak berkas dalam hitungan detik, menjaga working tree git tetap bersih adalah keharusan mutlak.",
          "Terapkan aturan 'Satu Fitur Terverifikasi, Satu Commit'. Sebelum meminta AI melakukan refaktorisasi arsitektur atau menambahkan fitur baru, pastikan status git bersih. Jika hasil kerja AI tidak sesuai harapan, Anda dapat mengeksekusi 'git reset --hard' secara instan tanpa kehilangan progres kerja sebelumnya.",
        ],
      },
    },
    {
      id: "security-considerations",
      title: {
        en: "11. Security Considerations: Secrets, Auth, & Dependencies",
        id: "11. Pertimbangan Keamanan: Kredensial, Autentikasi, & Dependensi",
      },
      paragraphs: {
        en: [
          "AI models have zero awareness of your production security boundaries unless you explicitly enforce them. Critical security pitfalls include:",
          "• Leaked Secrets: Never paste database connection strings, JWT secret keys, or private API keys into prompts. Use local .env files that are strictly excluded in .gitignore.",
          "• Package Hallucination: Attackers exploit AI models by registering malicious npm packages that match common model hallucinations (typosquatting). Always verify package download counts and legitimacy before approving new dependencies.",
          "• Authorization vs. Authentication: AI assistants frequently implement login checks but forget row-level or tenant-level authorization checks, allowing authenticated users to read other tenants' data (BOLA / IDOR vulnerabilities).",
          "• Injection & Sanitization: Ensure all SQL parameters use parameterized queries, and all user-supplied rich text is sanitized against Cross-Site Scripting (XSS).",
        ],
        id: [
          "Model AI tidak memiliki kesadaran otomatis mengenai batas keamanan infrastruktur produksi Anda kecuali Anda menetapkannya secara eksplisit. Celah keamanan krusial yang wajib diperhatikan:",
          "• Kebocoran Kunci Rahasia: Jangan pernah menyalin database connection string, JWT private key, atau API token ke dalam prompt. Simpan kredensial pada berkas .env lokal yang terdaftar di .gitignore.",
          "• Halusinasi Paket (Package Hallucination): Peretas kerap mendaftarkan paket berbahaya di npm yang namanya mirip dengan nama paket fiktif yang sering dihalusinasikan oleh AI (typosquatting). Selalu periksa reputasi dan repositori paket sebelum menambahkan dependensi baru.",
          "• Autentikasi vs Otorisasi: AI kerap berhasil membuat sistem login, namun lupa membatasi hak akses per baris data (row-level authorization), sehingga pengguna terdaftar bisa mengakses data milik pengguna lain (kerentanan IDOR).",
          "• Injeksi & Sanitasi Input: Pastikan seluruh kueri basis data menggunakan parameterized query dan seluruh input teks disanitasi dari risiko Cross-Site Scripting (XSS).",
        ],
      },
    },
    {
      id: "common-failure-modes",
      title: {
        en: "12. Common Failure Modes to Watch Out For",
        id: "12. Pola Kegagalan Umum yang Sering Muncul",
      },
      paragraphs: {
        en: [
          "Recognizing failure patterns early saves hours of debugging frustration:",
          "1. Deprecated or Hallucinated APIs: The model references methods that do not exist or were removed in recent library major versions (e.g. Next.js 16 breaking changes vs Next.js 12).",
          "2. Fragile Implementations: Code that handles the happy path perfectly but crashes on null values or unexpected network drops.",
          "3. State Drift: Modifying local component state without keeping parent stores, URL params, or database records in sync.",
          "4. Dependency Creep: Installing heavy third-party packages to solve trivial mathematical or string-formatting tasks that native JavaScript handles easily.",
        ],
        id: [
          "Mengenali pola kegagalan sejak awal akan menghemat waktu investigasi Anda:",
          "1. API Usang atau Fiktif: Model memanggil method yang tidak pernah ada atau sudah dihapus pada versi terbaru pustaka terkait (misal: perubahan breaking API Next.js 16 vs versi lawas).",
          "2. Kode yang Rapuh: Fitur yang berjalan mulus pada skenario ideal (happy path), namun langsung crash saat menerima input kosong atau jaringan terputus.",
          "3. Sinkronisasi State yang Kacau: Memodifikasi state lokal tanpa menyinkronkan URL parameter atau basis data di backend.",
          "4. Penumpukan Dependensi Berlebih: Menambahkan library npm berukuran besar hanya untuk menyelesaikan fungsi sederhana yang sebenarnya dapat ditangani dengan beberapa baris JavaScript murni.",
        ],
      },
    },
    {
      id: "when-useful-vs-judgment",
      title: {
        en: "13. When Vibe Coding Excels vs. When Deep Engineering Judgment is Essential",
        id: "13. Kapan Vibe Coding Sangat Efektif vs Kapan Keahlian Rekayasa Mendalam Dibutuhkan",
      },
      paragraphs: {
        en: [
          "Vibe Coding is exceptionally potent for: rapid prototyping, building responsive UI components, generating test suites, writing boilerplate CRUD APIs, translating data formats, and exploring unfamiliar design patterns.",
          "Conversely, seasoned human engineering judgment is irreplaceable for: designing distributed data consistency guarantees, choosing transactional isolation levels, defining security architecture, optimizing database indexing strategies, capacity planning, and deciding what software not to build.",
        ],
        id: [
          "Vibe Coding sangat unggul untuk: pembuatan prototipe cepat, perakitan antarmuka responsif, pembuatan unit test otomatis, penulisan endpoint CRUD standar, konversi format data, dan eksplorasi ide baru.",
          "Sebaliknya, keahlian dan intuisi rekayasa manusia tidak tergantikan untuk: merancang konsistensi data terdistribusi, memilih tingkat isolasi transaksi basis data, merancang batas perimeter keamanan, optimasi kueri dan index berbeban tinggi, serta menentukan batasan produk yang tidak boleh dibangun.",
        ],
      },
    },
    {
      id: "practical-example",
      title: {
        en: "14. Practical Example: Building an Accessible Personal Task Manager",
        id: "14. Contoh Praktis: Membangun Aplikasi Manajemen Tugas yang Aksesibel",
      },
      paragraphs: {
        en: [
          "To illustrate these principles in practice, let's walk through an educational example: building a responsive, accessible Personal Task Manager with filtering and offline persistence.",
          "Step 1 — Define the Scope: Functional goals are creating tasks, toggling completion, filtering by category (Work, Personal, Urgent), and persisting in localStorage. Non-functional goals are strict TypeScript typing, zero new dependencies, full keyboard navigation, and WCAG AA contrast.",
          "Step 2 — Prompt the Data Model: Ask the AI to write a self-contained TypeScript module defining Task types and immutable state reducers.",
          "Step 3 — Review the State Logic: Verify that task toggling uses pure functions that return new object references rather than mutating array items in-place.",
          "Step 4 — Implement the UI Increment: Ask the AI to build the TaskCard and FilterBar components, explicitly instructing it to use semantic <button> elements with aria-pressed attributes rather than clickable <div> tags.",
          "Step 5 — Run Verification: Execute 'npm run typecheck' and test Tab/Shift-Tab focus rings in the browser.",
          "Step 6 — Commit the Checkpoint: 'feat: add accessible task manager components with local persistence'.",
        ],
        id: [
          "Untuk melihat penerapan prinsip ini secara nyata, mari telaah contoh edukatif: membangun aplikasi Manajemen Tugas Pribadi yang responsif, aksesibel, dan memiliki penyimpanan lokal.",
          "Langkah 1 — Tentukan Ruang Lingkup: Sasaran fungsional mencakup pembuatan tugas, penandaan selesai, filter kategori (Kerja, Pribadi, Mendesak), dan penyimpanan di localStorage. Sasaran non-fungsional adalah TypeScript ketat, tanpa dependensi tambahan, navigasi keyboard penuh, dan kontras WCAG AA.",
          "Langkah 2 — Buat Model Data: Minta AI menulis modul TypeScript yang mendefinisikan tipe data Task dan fungsi reducer state yang immutable.",
          "Langkah 3 — Review Logika State: Pastikan fungsi toggle tugas mengembalikan array baru (pure function) dan tidak memutasi state secara langsung.",
          "Langkah 4 — Bangun Komponen Antarmuka: Instruksikan AI membuat TaskCard dan FilterBar, dengan instruksi eksplisit menggunakan elemen semantik <button> dan atribut aria-pressed alih-alih elemen <div> yang diberi event onClick.",
          "Langkah 5 — Verifikasi: Jalankan 'npm run typecheck' dan uji navigasi keyboard di browser.",
          "Langkah 6 — Checkpoint Git: Lakukan commit dengan pesan terstruktur.",
        ],
      },
      code: {
        language: "typescript",
        snippet: `// Clean, immutable task reducer logic
export type Task = {
  id: string;
  title: string;
  category: 'work' | 'personal' | 'urgent';
  completed: boolean;
  createdAt: number;
};

export function taskReducer(state: Task[], action: 
  | { type: 'ADD'; payload: { title: string; category: Task['category'] } }
  | { type: 'TOGGLE'; payload: { id: string } }
  | { type: 'DELETE'; payload: { id: string } }
): Task[] {
  switch (action.type) {
    case 'ADD':
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.title.trim(),
          category: action.payload.category,
          completed: false,
          createdAt: Date.now(),
        },
        ...state,
      ];
    case 'TOGGLE':
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload.id);
    default:
      return state;
  }
}`,
        caption: {
          en: "Deterministic state transitions without side effects",
          id: "Transisi state deterministik tanpa efek samping",
        },
      },
    },
    {
      id: "starter-prompt",
      title: {
        en: "15. Reusable Starter Prompt for AI Coding Agents",
        id: "15. Template Starter Prompt Siap Pakai untuk Asisten Koding AI",
      },
      paragraphs: {
        en: [
          "Here is a battle-tested prompt template you can customize and paste into your AI assistant at the start of any feature implementation:",
        ],
        id: [
          "Berikut adalah template prompt teruji yang dapat Anda adaptasi dan gunakan pada asisten koding AI Anda di awal pengerjaan fitur apa pun:",
        ],
      },
      code: {
        language: "markdown",
        snippet: `Act as a Senior Software Engineer and UI Architect.

PROJECT CONTEXT:
- Stack: Next.js (App Router), TypeScript, Tailwind CSS
- Conventions: Strict typing, semantic HTML, mobile-first responsive design
- Design tokens: Use CSS variables (--bg, --surface, --text, --line, --accent)

TASK OBJECTIVE:
[Describe the feature you want to build in 2-3 clear sentences]

CONSTRAINTS & NON-NEGOTIABLES:
1. Inspect existing files and conventions before generating new code.
2. Reuse existing UI components and utilities wherever possible.
3. Do not install any new npm dependencies without explicit justification.
4. Ensure all interactive elements are semantic (<button>, <a>, <input>) with visible focus rings and ARIA labels.
5. Handle all edge cases: loading states, empty collections, and error boundaries.
6. Do not fabricate hypothetical benchmarks, fake credentials, or placeholder comments.

DELIVERABLE:
- Provide the complete, working code for the target files.
- List the verification commands to test the implementation.`,
        caption: {
          en: "Comprehensive prompt template enforcing quality, accessibility, and zero-fabrication rules",
          id: "Template prompt komprehensif yang menegakkan aturan kualitas, aksesibilitas, dan larangan fabrikasi",
        },
      },
    },
    {
      id: "final-checklist",
      title: {
        en: "16. The Final Pre-Commit Vibe Coding Checklist",
        id: "16. Checklist Terakhir Sebelum Melakukan Commit",
      },
      paragraphs: {
        en: [
          "Before you merge or commit any AI-generated feature into your main codebase, run through this verification checklist:",
        ],
        id: [
          "Sebelum Anda melakukan commit atau menggabungkan kode hasil AI ke cabang utama, selalu jalankan checklist verifikasi berikut:",
        ],
      },
      checklist: {
        en: [
          "Static Analysis: Run 'npm run lint' and 'npm run typecheck' — zero errors allowed.",
          "Git Diff Inspection: Review git diff line-by-line. Confirm no unintended file edits or deleted comments.",
          "Dependency Check: Inspect package.json to verify no unnecessary external packages were added.",
          "Security Scan: Confirm no secrets, tokens, or unescaped user inputs are present.",
          "Keyboard Navigation: Verify full keyboard usability (Tab, Shift+Tab, Enter, Escape).",
          "Responsive Verification: Check layouts at 375px mobile and 1280px desktop viewports.",
          "Error & Empty States: Confirm graceful UI behavior when data is missing or network fails.",
          "Clean Commit: Create an atomic commit with a descriptive, conventional message.",
        ],
        id: [
          "Analisis Statis: Jalankan 'npm run lint' dan 'npm run typecheck' — pastikan nol error.",
          "Pemeriksaan Git Diff: Tinjau git diff baris demi baris. Pastikan tidak ada berkas yang tak sengaja berubah atau komentar penting yang terhapus.",
          "Pemeriksaan Dependensi: Cek package.json untuk memastikan tidak ada penambahan paket pihak ketiga yang tidak perlu.",
          "Pindai Keamanan: Pastikan tidak ada token, kunci rahasia, atau input pengguna tanpa sanitasi.",
          "Aksesibilitas Keyboard: Pastikan seluruh tombol dapat dioperasikan penuh dengan keyboard.",
          "Responsivitas Layar: Uji tampilan pada resolusi mobile 375px dan desktop 1280px.",
          "Penanganan Error: Pastikan aplikasi menampilkan pesan ramah saat data kosong atau jaringan bermasalah.",
          "Commit yang Bersih: Buat commit atomik dengan pesan yang jelas dan terstruktur.",
        ],
      },
    },
  ],
};
