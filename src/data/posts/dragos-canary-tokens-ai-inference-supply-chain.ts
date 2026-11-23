import type { BlogPost } from "@/data/blog";

export const dragosCanaryAiInferencePost: BlogPost = {
  slug: "dragos-canary-tokens-ai-inference-supply-chain",
  title: {
    en: "Dragos Canary Tokens Expose Compromised AI Inference Providers: What AI Router Customers Should Do Now",
    id: "Canary Token Dragos Ungkap Penyedia Inferensi AI yang Diretas: Langkah Wajib Pengguna AI Router",
  },
  summary: {
    en: "A five-month Dragos investigation led by HD Moore seeded two million prompts with canary tokens across AI routers and marketplaces, uncovering three silently breached inference providers, reseller logging, and bypassed Zero Data Retention (ZDR) guarantees.",
    id: "Investigasi lima bulan oleh Dragos yang dipimpin HD Moore menyisipkan dua juta prompt berisi canary token ke berbagai AI router dan marketplace, mengungkap tiga penyedia inferensi yang diam-diam diretas, pencatatan oleh reseller, dan pelanggaran jaminan Zero Data Retention (ZDR).",
  },
  category: {
    en: "Cybersecurity / AI Supply Chain",
    id: "Cybersecurity / AI Supply Chain",
  },
  tags: [
    "AI Security",
    "Canary Tokens",
    "Dragos",
    "OpenRouter",
    "Zero Data Retention",
    "Supply Chain Security",
    "LLM Inference",
    "Credential Hygiene",
  ],
  publishedDate: "2026-11-23",
  author: "Danial Fachrudin",
  readingTime: {
    en: "6 min read",
    id: "6 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "Dragos Canary Tokens & Compromised AI Inference Providers | Danial Fachrudin",
    id: "Canary Token Dragos & Penyedia Inferensi AI yang Diretas | Danial Fachrudin",
  },
  seoDescription: {
    en: "Analysis of the Dragos two-million-canary study on AI inference supply chain risks, ZDR failures, OpenRouter remediation, and practical controls for engineering teams.",
    id: "Analisis riset dua juta canary token Dragos pada rantai pasok inferensi AI, kegagalan ZDR, respons OpenRouter, dan langkah mitigasi praktis bagi tim engineering.",
  },
  sections: [
    {
      id: "ringkasan-investigasi",
      title: {
        en: "1. The Two-Million-Canary Experiment",
        id: "1. Eksperimen Dua Juta Canary Token",
      },
      paragraphs: {
        en: [
          "In November 2026, Dragos Chief Research Officer HD Moore published findings from a five-month study (July to November 2026) examining what actually happens to prompts after they leave an organization's network through AI routers and inference marketplaces. As summarized by [Rescana](https://rescana.com/post/dragos-canary-tokens-compromised-ai-inference-providers-what-ai-router-customers-should-do-now) and detailed in the [Dragos Research Report](https://www.dragos.com/blog/), the team submitted roughly two million synthetic prompts embedded with unique tracking URLs and canary AWS credentials.",
          "Because each canary credential and callback URL was unique to a specific request path, any external DNS lookup, HTTP fetch, or AWS API call proved exactly where that prompt had been read or exfiltrated. The results showed that routing traffic through third-party AI gateways introduces real supply-chain exposure, even when strict privacy toggles are enabled.",
        ],
        id: [
          "Pada November 2026, Chief Research Officer Dragos HD Moore mempublikasikan hasil riset lima bulan (Juli hingga November 2026) yang menelusuri ke mana perginya prompt setelah keluar dari jaringan organisasi melalui AI router dan marketplace inferensi. Sebagaimana dirangkum oleh [Rescana](https://rescana.com/post/dragos-canary-tokens-compromised-ai-inference-providers-what-ai-router-customers-should-do-now) dan dijelaskan dalam [Laporan Riset Dragos](https://www.dragos.com/blog/), tim peneliti mengirimkan sekitar dua juta prompt sintetis yang disisipi URL pelacak unik serta kredensial AWS canary.",
          "Karena setiap kredensial canary dan URL callback bersifat unik per jalur permintaan, setiap lookup DNS, permintaan HTTP, atau panggilan API AWS dari luar membuktikan di mana prompt tersebut dibaca atau dieksfiltrasi. Hasilnya menunjukkan bahwa meneruskan trafik melalui gateway AI pihak ketiga membawa risiko rantai pasok yang nyata, bahkan saat opsi privasi ketat diaktifkan.",
        ],
      },
      callout: {
        type: "warning",
        text: {
          en: "Core Finding: At least three third-party AI inference providers were actively compromised at their network front door, intercepting customer prompts before retention policies or model execution even took place.",
          id: "Temuan Utama: Setidaknya tiga penyedia inferensi AI pihak ketiga mengalami peretasan aktif di gerbang jaringan depannya, menyadap prompt pelanggan bahkan sebelum kebijakan retensi atau eksekusi model berjalan.",
        },
      },
    },
    {
      id: "temuan-utama-dan-kegagalan-zdr",
      title: {
        en: "2. Breached Providers, Reseller Snooping, and ZDR Failures",
        id: "2. Penyedia Diretas, Pencatatan Reseller, dan Kegagalan ZDR",
      },
      paragraphs: {
        en: [
          "According to [The Hacker News](https://thehackernews.com/) coverage of the Dragos disclosure, the investigation uncovered three distinct failure modes across the inference ecosystem:",
          "1. Front-door interception at breached providers: Attackers compromised at least three hosting providers and siphoned incoming requests at the first network hop, including prompts that the provider later rejected before reaching a model. Embedded AWS canary keys were tested within hours, driving tens of thousands of automated API calls to enumerate S3 buckets, Secrets Manager, and Parameter Store, and attempting to create persistent IAM users.",
          "2. Reseller logging without exploits: On inference marketplaces, third-party resellers did not need to exploit any vulnerability to read customer data. By undercutting prices to attract router traffic and enabling standard request logging, operators gained direct visibility into prompts, including one operator observed manually replaying extracted passwords against root SSH logins.",
          "3. Zero Data Retention (ZDR) gaps: Prompts explicitly flagged for Zero Data Retention were still logged, retained, or fetched months later. In one documented case, canary URLs from U.S.-routed prompts were accessed by an unnamed AI lab in China, with links later appearing inside enterprise chat tools such as Feishu.",
        ],
        id: [
          "Berdasarkan laporan [The Hacker News](https://thehackernews.com/) atas pengungkapan Dragos, investigasi ini menemukan tiga pola kegagalan yang berbeda di ekosistem inferensi:",
          "1. Penyadapan di gerbang depan penyedia yang diretas: Penyerang meretas setidaknya tiga penyedia hosting dan menyalin permintaan masuk di hop jaringan pertama, termasuk prompt yang akhirnya ditolak sebelum diproses model. Kunci AWS canary yang disisipkan diuji dalam hitungan jam untuk melakukan puluhan ribu panggilan API otomatis guna mengenumerasi bucket S3, Secrets Manager, dan Parameter Store, serta mencoba membuat user IAM persisten.",
          "2. Pencatatan oleh reseller tanpa eksploitasi: Di marketplace inferensi, reseller pihak ketiga tidak perlu mengeksploitasi celah keamanan untuk membaca data pelanggan. Dengan menawarkan harga lebih murah untuk menarik trafik router lalu mengaktifkan pencatatan permintaan standar, operator dapat melihat isi prompt secara langsung, termasuk temuan satu operator yang mencoba ulang kata sandi hasil ekstraksi untuk login SSH root.",
          "3. Celah Zero Data Retention (ZDR): Prompt yang secara eksplisit ditandai Zero Data Retention tetap tercatat, tersimpan, atau diakses berbulan-bulan kemudian. Dalam satu kasus terdokumentasi, URL canary dari prompt yang dirutekan di AS diakses oleh laboratorium AI di Tiongkok, dan tautannya muncul di alat obrolan internal seperti Feishu.",
        ],
      },
      table: {
        headers: {
          en: ["Exposure Vector", "Mechanism Observed", "Immediate Risk"],
          id: ["Vektor Paparan", "Mekanisme yang Diamati", "Risiko Langsung"],
        },
        rows: {
          en: [
            [
              "Compromised Hosting Provider",
              "Front-door traffic interception prior to model inference or policy checks",
              "Rapid automated cloud credential abuse (S3, Secrets Manager, IAM)",
            ],
            [
              "Marketplace Reseller Logging",
              "Low-cost endpoints enabling standard request/response logging",
              "Manual inspection and replay of credentials or proprietary source code",
            ],
            [
              "ZDR Policy Bypass",
              "Upstream or downstream hops ignoring Zero Data Retention flags",
              "Cross-border data leakage and delayed URL/secret callbacks months later",
            ],
          ],
          id: [
            [
              "Penyedia Hosting Diretas",
              "Penyadapan trafik di gerbang depan sebelum inferensi model atau cek kebijakan",
              "Penyalahgunaan kredensial cloud otomatis secara cepat (S3, Secrets Manager, IAM)",
            ],
            [
              "Logging Reseller Marketplace",
              "Endpoint berbiaya rendah mengaktifkan logging request/response standar",
              "Inspeksi manual dan pemakaian ulang kata sandi atau kode sumber rahasia",
            ],
            [
              "Pelanggaran Kebijakan ZDR",
              "Hop hulu atau hilir mengabaikan flag Zero Data Retention",
              "Kebocoran data lintas batas dan akses callback URL/secret berbulan-bulan kemudian",
            ],
          ],
        },
        caption: {
          en: "Summary of inference supply-chain exposure vectors identified in the Dragos November 2026 report.",
          id: "Ringkasan vektor paparan rantai pasok inferensi dalam laporan Dragos November 2026.",
        },
      },
    },
    {
      id: "respons-ekosistem",
      title: {
        en: "3. OpenRouter & Platform Remediation",
        id: "3. Respons OpenRouter & Platform Terkait",
      },
      paragraphs: {
        en: [
          "Following the coordinated disclosure, [OpenRouter](https://openrouter.ai/) confirmed that its own core routing infrastructure had not been breached, while taking immediate containment steps against downstream providers.",
          "OpenRouter off-boarded the three compromised inference providers, stripped 125 endpoints of their Zero Data Retention eligibility as a precaution, and notified potentially affected customers so they could rotate exposed API keys and secrets. Other reseller and inference platforms, including Novita, Phala, and Together, also faced heightened scrutiny and privacy policy reviews.",
        ],
        id: [
          "Setelah pengungkapan terkoordinasi, [OpenRouter](https://openrouter.ai/) menyatakan bahwa infrastruktur routing intinya sendiri tidak diretas, namun segera mengambil langkah penanggulangan terhadap penyedia hilir.",
          "OpenRouter memutus tiga penyedia inferensi yang diretas dari platformnya, mencabut kelayakan Zero Data Retention dari 125 endpoint sebagai langkah pencegahan, serta memberi tahu pelanggan yang berpotensi terdampak agar segera merotasi kunci API dan secret. Platform reseller dan inferensi lain seperti Novita, Phala, dan Together juga menghadapi peninjauan kebijakan privasi yang lebih ketat.",
        ],
      },
    },
    {
      id: "langkah-mitigasi-pelanggan",
      title: {
        en: "4. What AI Router Customers Should Do Now",
        id: "4. Langkah yang Harus Dilakukan Pengguna AI Router Sekarang",
      },
      paragraphs: {
        en: [
          "Treat any third-party AI router or multi-tenant inference marketplace as an untrusted network boundary. Contractual ZDR flags do not protect secrets if an upstream host is already compromised at the TLS termination or load-balancer layer.",
          "Engineering and security teams should combine credential rotation, pre-egress secret scrubbing, direct first-tier provider contracts for sensitive workloads, and active canary monitoring in their own prompt pipelines.",
        ],
        id: [
          "Perlakukan setiap AI router pihak ketiga atau marketplace inferensi multi-tenant sebagai batas jaringan yang tidak sepenuhnya tepercaya. Flag ZDR secara kontraktual tidak mampu melindungi secret jika host hulu sudah diretas pada lapisan terminasi TLS atau load balancer.",
          "Tim engineering dan keamanan perlu menggabungkan rotasi kredensial, penyaringan secret sebelum keluar dari jaringan, kontrak langsung ke penyedia tingkat pertama untuk beban kerja sensitif, serta pemantauan canary aktif di pipeline prompt internal.",
        ],
      },
      code: {
        language: "bash",
        snippet: `# Example pre-egress check: block outbound prompts containing AWS or generic API key patterns
rg -n "(AKIA[0-9A-Z]{16}|sk-[a-zA-Z0-9]{20,}|-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----)" ./prompts/`,
        caption: {
          en: "Scan prompt templates and test fixtures locally before routing them to external inference APIs.",
          id: "Pindai template prompt dan data uji secara lokal sebelum mengirimkannya ke API inferensi eksternal.",
        },
      },
      checklist: {
        en: [
          "Audit AI router logs (such as OpenRouter activity logs) for requests routed through removed or ZDR-revoked providers between July and November 2026.",
          "Rotate all API keys, cloud credentials, SSH keys, and database secrets that may have appeared in developer or agent prompts.",
          "Enforce a local secret-redaction gateway (DLP/regex/entropy filter) before any prompt leaves your VPC.",
          "Pin sensitive workloads to self-hosted models or direct first-tier provider agreements rather than lowest-cost marketplace resellers.",
          "Seed synthetic canary tokens in internal evaluation prompts to detect unauthorized third-party callbacks.",
        ],
        id: [
          "Audit log AI router (seperti log aktivitas OpenRouter) untuk permintaan yang melewati penyedia yang dihapus atau dicabut status ZDR-nya antara Juli hingga November 2026.",
          "Rotasi seluruh kunci API, kredensial cloud, kunci SSH, dan secret database yang berpotensi pernah masuk ke prompt developer maupun agen AI.",
          "Terapkan gateway redaksi secret lokal (filter DLP/regex/entropi) sebelum prompt keluar dari VPC Anda.",
          "Arahkan beban kerja sensitif ke model self-hosted atau kontrak langsung penyedia tingkat pertama, bukan reseller marketplace termurah.",
          "Sisipkan canary token sintetis pada prompt evaluasi internal untuk mendeteksi akses callback pihak ketiga yang tidak sah.",
        ],
      },
    },
    {
      id: "referensi",
      title: {
        en: "5. Verified Resources & Advisories",
        id: "5. Sumber & Referensi Terverifikasi",
      },
      paragraphs: {
        en: [
          "Primary reporting and technical disclosures referenced in this analysis:",
          "• [Rescana: Dragos Canary Tokens, Compromised AI Inference Providers, and What AI Router Customers Should Do Now](https://rescana.com/post/dragos-canary-tokens-compromised-ai-inference-providers-what-ai-router-customers-should-do-now)",
          "• [Dragos Blog: Three breaches, endless leaks: Your AI supply chain needs canaries](https://www.dragos.com/blog/)",
          "• [The Hacker News: Dragos Canary Token Research & OpenRouter Response](https://thehackernews.com/)",
          "• [OpenRouter Platform Security & Provider Updates](https://openrouter.ai/)",
        ],
        id: [
          "Laporan utama dan pengungkapan teknis yang dirujuk dalam analisis ini:",
          "• [Rescana: Dragos Canary Tokens, Compromised AI Inference Providers, and What AI Router Customers Should Do Now](https://rescana.com/post/dragos-canary-tokens-compromised-ai-inference-providers-what-ai-router-customers-should-do-now)",
          "• [Dragos Blog: Three breaches, endless leaks: Your AI supply chain needs canaries](https://www.dragos.com/blog/)",
          "• [The Hacker News: Riset Canary Token Dragos & Respons OpenRouter](https://thehackernews.com/)",
          "• [OpenRouter: Pembaruan Keamanan Platform & Penyedia](https://openrouter.ai/)",
        ],
      },
    },
  ],
};
