import type { LocalizedText } from "./projects";

export type ChapterStatus = "documented" | "future";

export type JourneyPillar = {
  id: string;
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  commitment: LocalizedText;
};

export type TransformationRow = {
  from: LocalizedText;
  toward: LocalizedText;
};

export type ChapterProjectReference = {
  slug: string;
  title: string;
  roleContext: LocalizedText;
  description: LocalizedText;
  href: string;
};

export type ChapterSection = {
  id: string;
  number: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  paragraphs: {
    en: string[];
    id: string[];
  };
  pullQuote?: LocalizedText;
  projectNotes?: ChapterProjectReference[];
  transformation?: {
    fromHeading: LocalizedText;
    towardHeading: LocalizedText;
    rows: TransformationRow[];
  };
  includePillars?: boolean;
  closingReflection?: {
    eyebrow: LocalizedText;
    headline: LocalizedText;
    paragraphs: {
      en: string[];
      id: string[];
    };
    closingStatement: LocalizedText;
  };
};

export type JourneyChapter = {
  slug: string;
  number: string;
  period: string;
  status: ChapterStatus;
  title: LocalizedText;
  subtitle: LocalizedText;
  theme: LocalizedText;
  summary: LocalizedText;
  author: string;
  publishedYear?: string;
  readingTime?: LocalizedText;
  epigraph?: LocalizedText;
  statusNote: LocalizedText;
  sections?: ChapterSection[];
};

export const journeyPillars: JourneyPillar[] = [
  {
    id: "experience",
    number: "01",
    title: {
      en: "Experience",
      id: "Pengalaman",
    },
    summary: {
      en: "Seeking harder engineering challenges, building systems that hold up in production, and turning real responsibility into sharp judgment.",
      id: "Mengambil tantangan rekayasa yang lebih berbobot, membangun sistem yang tangguh di produksi, dan menempa ketajaman teknis lewat tanggung jawab nyata.",
    },
    commitment: {
      en: "Real competence is built in the arena, one solved problem at a time.",
      id: "Kompetensi sejati ditempa di lapangan, satu persoalan nyata demi satu persoalan berikutnya.",
    },
  },
  {
    id: "trust-reputation",
    number: "02",
    title: {
      en: "Trust & Reputation",
      id: "Kepercayaan & Reputasi",
    },
    summary: {
      en: "Becoming the person clients and teams count on when stakes are high. Direct communication, clean execution, and kept promises.",
      id: "Menjadi sosok yang diandalkan klien dan tim saat taruhannya nyata. Komunikasi tegas, eksekusi bersih, dan janji yang ditepati.",
    },
    commitment: {
      en: "Your name carries weight only when your work backs it up every time.",
      id: "Nama baik hanya punya bobot ketika kualitas kerja selalu membuktikannya.",
    },
  },
  {
    id: "wealth",
    number: "03",
    title: {
      en: "Wealth",
      id: "Kemandirian Finansial",
    },
    summary: {
      en: "Building sustainable income, long-term assets, and financial freedom through high-value work and disciplined choices.",
      id: "Membangun arus penghasilan yang kuat, aset jangka panjang, dan kebebasan finansial lewat karya bernilai tinggi serta disiplin keputusan.",
    },
    commitment: {
      en: "Financial strength creates the freedom to build bigger and give more.",
      id: "Kekuatan finansial memberi ruang lebih luas untuk berkarya besar dan memberi dampak nyata.",
    },
  },
  {
    id: "intellectual-growth",
    number: "04",
    title: {
      en: "Intellectual Growth",
      id: "Pertumbuhan Intelektual",
    },
    summary: {
      en: "Studying far beyond today's sprint. Going deep into software architecture, business, finance, psychology, and decision-making.",
      id: "Belajar melampaui kebutuhan proyek hari ini. Mendalami arsitektur sistem, bisnis, keuangan, psikologi, dan cara mengambil keputusan.",
    },
    commitment: {
      en: "Your ability to learn faster than circumstances change is an unfair advantage.",
      id: "Kemampuan belajar lebih cepat daripada perubahan keadaan adalah keunggulan yang tak tergantikan.",
    },
  },
  {
    id: "personal-character",
    number: "05",
    title: {
      en: "Personal Character",
      id: "Karakter Pribadi",
    },
    summary: {
      en: "Building daily discipline, mental resilience, physical energy, spiritual grounding, and genuine integrity in how I lead and treat others.",
      id: "Membangun disiplin harian, ketahanan mental, kebugaran fisik, pijakan spiritual, dan integritas dalam memimpin diri maupun memperlakukan sesama.",
    },
    commitment: {
      en: "The goal isn't just to achieve more. It's to become more.",
      id: "Tujuannya bukan sekadar mencapai lebih banyak, melainkan bertumbuh menjadi pribadi yang lebih utuh.",
    },
  },
];

export const journeyArchive = {
  eyebrow: {
    en: "Personal Leadership · Five-Year Chapters",
    id: "Kepemimpinan Diri · Bab Lima Tahunan",
  },
  titlePrefix: {
    en: "My Journey",
    id: "Perjalanan Saya",
  },
  titleEm: {
    en: "Built by Action.",
    id: "Dibangun Lewat Aksi.",
  },
  heroLead: {
    en: "In 2021, I started building a career in software engineering through action, ownership, and real-world work. Five years later, I have sharper skills, a stronger foundation, and an even bigger vision for what comes next.",
    id: "Pada 2021, saya mulai membangun karier software engineering lewat aksi nyata, tanggung jawab penuh, dan kerja langsung. Lima tahun berjalan, kemampuan makin tajam, pijakan makin kuat, dan visi ke depan jauh lebih besar.",
  },
  thesisStatement: {
    en: "Your life is not defined by where you started. It is shaped by what you choose to do with where you are.",
    id: "Hidup tidak ditentukan oleh di mana kita memulai, melainkan oleh apa yang kita pilih lakukan dari posisi kita sekarang.",
  },
  philosophyEyebrow: {
    en: "Core Conviction",
    id: "Keyakinan Inti",
  },
  philosophyQuote: {
    en: "Your life is not defined by where you started. It is shaped by what you choose to do with where you are.",
    id: "Hidup tidak ditentukan oleh di mana kita memulai, melainkan oleh apa yang kita pilih lakukan dari posisi kita sekarang.",
  },
  philosophySubnote: {
    en: "Nobody can build your future for you. Take ownership of your craft, raise your standards, and put your potential to work.",
    id: "Tidak ada orang lain yang bisa membangun masa depanmu selain dirimu sendiri. Pegang kendali atas keahlianmu, naikkan standarmu, dan gerakkan potensimu.",
  },
  guidingPrinciples: [
    {
      en: "Take Ownership: Control your decisions, your standards, and your direction.",
      id: "Ambil Tanggung Jawab: Kendalikan keputusan, standar, dan arah langkahmu.",
    },
    {
      en: "Keep Growing: Your capacity to learn is one of your strongest assets.",
      id: "Terus Bertumbuh: Kapasitas untuk terus belajar adalah aset terbesar.",
    },
    {
      en: "Build, Don't Just Dream: Turn ideas into execution and experience into value.",
      id: "Bangun, Jangan Hanya Bermimpi: Ubah gagasan menjadi eksekusi dan nilai nyata.",
    },
    {
      en: "Stop Comparing: Someone else's pace has nothing to do with your potential.",
      id: "Berhenti Membandingkan: Laju orang lain tidak membatasi potensi dirimu.",
    },
    {
      en: "Become Valuable: Develop skills, judgment, and character that solve real problems.",
      id: "Jadilah Bernilai: Asah keahlian, pertimbangan, dan karakter yang menyelesaikan masalah nyata.",
    },
    {
      en: "Stay Hungry, Stay Humble: Celebrate progress without ever stopping at it.",
      id: "Tetap Lapar, Tetap Rendah Hati: Rayakan progres tanpa pernah berhenti belajar.",
    },
    {
      en: "Think Long-Term: Never trade a meaningful future for temporary applause.",
      id: "Berpikir Jangka Panjang: Jangan tukar masa depan yang kokoh demi tepuk tangan sesaat.",
    },
  ] as LocalizedText[],
  closingMessage: {
    eyebrow: {
      en: "Keep Moving Forward",
      id: "Terus Melangkah Maju",
    },
    title: {
      en: "Your Best Chapters Are Still Ahead.",
      id: "Bab Terbaikmu Masih di Depan.",
    },
    paragraphs: {
      en: [
        "You have a life to build. Skills to sharpen. Problems worth solving. People to learn from, horizons to explore, and strength inside you that you haven't even tapped into yet.",
        "Stop waiting for perfect conditions, permission from the room, or proof that your path looks like everyone else's. Nobody can build your future for you, and that is the best advantage you could ask for, because it puts the steering wheel squarely in your hands.",
        "Take what you have. Start where you stand. Turn every challenge into sharper judgment, keep raising your standards, and show up with consistency when nobody is clapping. Appreciate how far you've come, celebrate every milestone earned, and then look ahead and ask: how much further can I go?",
      ],
      id: [
        "Ada hidup yang layak kamu bangun. Ada keahlian yang menunggu diasah, persoalan nyata untuk dipecahkan, orang-orang hebat untuk dipelajari, dan potensi dalam dirimu yang bahkan belum sepenuhnya kamu uji.",
        "Berhenti menunggu kondisi sempurna, izin dari orang lain, atau pengakuan bahwa jalanmu sama dengan jalan kebanyakan orang. Tidak ada orang lain yang bisa membangun masa depanmu, dan justru itu kabar terbaiknya, karena kendali penuh ada di tanganmu sendiri.",
        "Ambil apa yang ada di tanganmu hari ini. Mulai dari tempatmu berdiri. Ubah setiap tantangan menjadi ketajaman sikap, terus naikkan standarmu, dan hadir dengan konsisten bahkan saat tidak ada yang melihat. Hargai sejauh mana kamu sudah melangkah, lalu tatap ke depan dan tanya pada diri sendiri: seberapa jauh lagi saya bisa melangkah?",
      ],
    },
    signOff: {
      en: "Because the goal isn't just to achieve more. It's to become more. Now put your potential to work.",
      id: "Karena tujuannya bukan sekadar meraih lebih banyak, melainkan bertumbuh menjadi pribadi yang jauh lebih kuat. Sekarang saatnya bekerja.",
    },
  },
};

export const journeyChapters: JourneyChapter[] = [
  {
    slug: "chapter-01",
    number: "01",
    period: "2021–2026",
    status: "documented",
    title: {
      en: "The Foundation",
      id: "Fondasi",
    },
    subtitle: {
      en: "Starting in 2021, taking full ownership of real engineering work, sharpening capability through challenges, and setting up what comes next.",
      id: "Memulai di 2021, memegang kendali penuh atas proyek nyata, menempa kapasitas lewat tantangan, dan menyiapkan landasan untuk tahap berikutnya.",
    },
    theme: {
      en: "The courage to begin, learning through execution, building independent engineering competence, and forging long-term direction.",
      id: "Keberanian untuk mulai, belajar lewat eksekusi, membangun kompetensi rekayasa mandiri, dan merumuskan arah jangka panjang.",
    },
    summary: {
      en: "In 2021, I started building my career in software engineering. Five years later, I have real experience, projects delivered independently, lessons forged through challenges, and a clear vision of where I am heading next. This is only the beginning.",
      id: "Pada 2021, saya mulai membangun karier software engineering. Lima tahun kemudian, saya memiliki pengalaman lapangan nyata, proyek yang ditangani mandiri, pelajaran dari berbagai tantangan, dan visi yang tajam untuk langkah berikutnya. Ini baru permulaan.",
    },
    author: "Danial Fachrudin (Danny)",
    publishedYear: "2026",
    readingTime: {
      en: "7 min read",
      id: "7 menit baca",
    },
    epigraph: {
      en: "Stop waiting for the perfect moment. Start making the moment count.",
      id: "Berhenti menunggu momen yang sempurna. Mulai jadikan momen hari ini berarti.",
    },
    statusNote: {
      en: "Documented chapter",
      id: "Bab terdokumentasi",
    },
    sections: [
      {
        id: "the-beginning",
        number: "01",
        title: {
          en: "The Beginning",
          id: "Awal Mula",
        },
        subtitle: {
          en: "2021: Choosing action over waiting",
          id: "2021: Memilih bergerak daripada menunggu",
        },
        paragraphs: {
          en: [
            "Stop waiting for the perfect moment. Start making the moment count.",
            "That conviction sums up how my journey in software engineering began in 2021. Starting from a vocational high school foundation in Software Engineering (*Rekayasa Perangkat Lunak*), I didn't sit around waiting for a guaranteed career ladder or a flawless roadmap before taking myself seriously. I decided to learn by building.",
            "You don't need to have everything figured out at the start. You need to be willing to figure things out as you go. Every line of code I wrote, every error I chased down through documentation, and every working feature I shipped early on proved something powerful: curiosity backed by action builds momentum fast.",
          ],
          id: [
            "Berhenti menunggu momen yang sempurna. Mulai jadikan momen hari ini berarti.",
            "Kalimat itu merangkum bagaimana perjalanan saya di software engineering dimulai pada 2021. Berangkat dari dasar SMK jurusan Rekayasa Perangkat Lunak, saya tidak duduk diam menunggu jalur karier yang serba aman atau peta jalan tanpa celah sebelum bergerak serius. Saya memilih belajar langsung dengan membangun.",
            "Kita tidak harus langsung memahami segalanya di awal. Yang kita butuhkan adalah kemauan untuk mencari jawabannya sambil berjalan. Setiap baris kode yang saya tulis, setiap error yang saya lacak di dokumentasi, dan setiap fitur yang berhasil berjalan di masa awal membuktikan satu hal: rasa ingin tahu yang digerakkan oleh aksi selalu menciptakan momentum.",
          ],
        },
      },
      {
        id: "the-challenges",
        number: "02",
        title: {
          en: "The Challenges",
          id: "Tantangan",
        },
        subtitle: {
          en: "Pressure, adaptability, and building real grit",
          id: "Tekanan, adaptasi, dan membentuk ketangguhan nyata",
        },
        paragraphs: {
          en: [
            "Smooth roads never forged anyone's edge. Friction did.",
            "Choosing independent work early meant stepping directly into ownership without a safety net. When an architecture choice hit limits, when a production issue needed fast diagnosis, or when client priorities shifted mid-project, there was nobody else to pass the responsibility to. You step up, investigate the facts, make a clear call, and fix it.",
            "Did every attempt succeed on the first try? Of course not. Mistakes happened, assumptions broke, and hard weeks tested my patience. The difference is how you respond: failure is feedback, not an identity. A setback can sharpen your strategy without touching your drive. That mindset turns pressure into real capability.",
          ],
          id: [
            "Jalan yang mulus tidak pernah menajamkan kemampuan siapa pun. Gesekanlah yang melakukannya.",
            "Memilih jalur independen sejak awal berarti langsung masuk ke zona tanggung jawab penuh tanpa jaring pengaman. Ketika rancangan sistem menemui batasnya, saat masalah produksi butuh diagnosis cepat, atau saat kebutuhan proyek bergeser di tengah jalan, tidak ada pihak lain untuk melempar tanggung jawab. Kita maju, teliti faktanya, ambil keputusan tegas, dan bereskan.",
            "Apakah semua percobaan langsung mulus di usaha pertama? Tentu tidak. Kesalahan terjadi, asumsi diuji, dan hari-hari berat menguji kesabaran. Yang membedakan adalah cara meresponsnya: kegagalan adalah umpan balik, bukan identitas. Hambatan bisa mempertajam strategi tanpa perlu meruntuhkan dorongan untuk maju.",
          ],
        },
      },
      {
        id: "the-experience",
        number: "03",
        title: {
          en: "The Experience",
          id: "Pengalaman",
        },
        subtitle: {
          en: "Competence earned through real delivery and client trust",
          id: "Kompetensi yang ditempa lewat delivery nyata dan kepercayaan klien",
        },
        paragraphs: {
          en: [
            "Your potential means nothing if you never put it to work.",
            "Across five years as an independent software engineer, I moved well beyond writing standalone code. Real delivery taught me to own the entire engineering arc: clarifying what problem actually matters, shaping system architecture, building responsive interfaces with TypeScript, React, and Next.js, engineering backend APIs and databases, handling cloud and DevOps workflows, testing, shipping, and maintaining systems after launch.",
            "Don't just collect skills. Learn how to use them to solve real problems. Working directly with clients makes that clear immediately. People don't remember how impressive your tech stack sounded on paper; they remember whether you communicated straight, respected their time, made smart trade-offs, and delivered software they could depend on.",
            "These projects in my portfolio show that ownership in practice:",
          ],
          id: [
            "Potensi tidak berarti apa-apa jika tidak pernah digerakkan menjadi karya.",
            "Selama lima tahun menjadi software engineer independen, kerja saya berkembang jauh melampaui sekadar menulis potongan kode. Pengalaman nyata melatih saya memegang seluruh siklus rekayasa: menggali masalah inti, menyusun arsitektur sistem, membangun antarmuka dengan TypeScript, React, dan Next.js, merancang backend API serta basis data, menyiapkan alur cloud dan DevOps, menguji, merilis, hingga merawat sistem setelah berjalan.",
            "Jangan hanya mengoleksi daftar teknologi. Pelajari cara memakainya untuk menyelesaikan masalah nyata. Bekerja langsung bersama klien membuat prinsip itu langsung terasa. Orang tidak mengingat seberapa keren istilah teknis yang kamu sebut; mereka mengingat kejujuran komunikasimu, ketepatan keputusanmu, dan keandalan sistem yang kamu serahkan.",
            "Beberapa karya dalam portofolio ini menunjukkan tanggung jawab tersebut dalam praktik nyata:",
          ],
        },
        projectNotes: [
          {
            slug: "astraops",
            title: "AstraOps — PT Trukindo Logistik Prima",
            roleContext: {
              en: "Client project · Delivered & maintained",
              id: "Proyek klien · Diserahterimakan & dirawat",
            },
            description: {
              en: "Built the logistics display and B2B freight workflow platform for PT Trukindo Logistik Prima, handed the system over to the Trukindo team, and stayed accountable through maintenance.",
              id: "Membangun platform tampilan logistik dan alur kargo B2B untuk PT Trukindo Logistik Prima, menyerahkannya ke tim Trukindo, dan terus menjaga keandalannya di tahap pemeliharaan.",
            },
            href: "/case-studies/astraops",
          },
          {
            slug: "lendloop",
            title: "LendLoop",
            roleContext: {
              en: "Job application take-home project",
              id: "Proyek take-home lamaran kerja",
            },
            description: {
              en: "Engineered as a take-home assignment for a job application, applying server-side authorization, transactional outbox delivery, HMAC-signed webhooks, and end-to-end automated testing.",
              id: "Dirancang sebagai proyek take-home lamaran kerja dengan otorisasi server-side ketat, transactional outbox, webhook bertanda tangan HMAC, dan pengujian otomatis end-to-end.",
            },
            href: "/case-studies/lendloop",
          },
          {
            slug: "opspilot",
            title: "OpsPilot & Veloura ERP",
            roleContext: {
              en: "Independent engineering systems",
              id: "Sistem rekayasa independen",
            },
            description: {
              en: "Independent builds pushing deeper into Go APIs on AWS Lambda, hexagonal architecture, PostgreSQL append-only ledgers, and clean modular system design.",
              id: "Sistem independen yang mendalami API Go di AWS Lambda, arsitektur heksagonal, buku besar PostgreSQL append-only, dan desain modular yang bersih.",
            },
            href: "/case-studies/opspilot",
          },
        ],
      },
      {
        id: "the-realization",
        number: "04",
        title: {
          en: "The Realization",
          id: "Kesadaran",
        },
        subtitle: {
          en: "Clarity, leadership, and owning your own timeline",
          id: "Kejernihan arah, kepemimpinan diri, dan memegang kendali waktu sendiri",
        },
        pullQuote: {
          en: "Your life is not defined by where you started. It is shaped by what you choose to do with where you are.",
          id: "Hidup tidak ditentukan oleh di mana kita memulai, melainkan oleh apa yang kita pilih lakukan dari posisi kita sekarang.",
        },
        paragraphs: {
          en: [
            "At a certain point, experience gives you something louder than opinions: clarity.",
            "I realized that success isn't handed out on one universal schedule. Life doesn't force everyone onto the same conventional timeline. My own path included stepping away from university before finishing a degree, and accepting that simply freed me to focus 100% on what moves the needle: building undeniable skill, delivering reliable work, and growing every single year.",
            "Stop letting comparison steal your momentum. Someone else's milestone is never proof that you're behind. What actually separates people over five or ten years isn't a neat starting line. It's ownership, steady execution, character under pressure, and the willingness to stay a student long after others get comfortable.",
          ],
          id: [
            "Pada titik tertentu, pengalaman langsung memberi sesuatu yang jauh lebih kuat daripada sekadar opini: kejernihan cara pandang.",
            "Saya menyadari bahwa keberhasilan tidak dibagi berdasarkan satu jadwal tunggal yang seragam. Hidup tidak memaksa semua orang berjalan di jalur konvensional yang persis sama. Perjalanan saya termasuk tidak menyelesaikan kuliah, dan menerima fakta itu dengan tenang membebaskan fokus saya sepenuhnya untuk hal yang paling berdampak: membangun keahlian nyata, menjaga mutu kerja, dan terus maju setiap tahun.",
            "Jangan biarkan kebiasaan membandingkan diri mencuri momentum hidupmu. Pencapaian orang lain bukan bukti bahwa kamu tertinggal. Yang membedakan seseorang dalam lima atau sepuluh tahun bukanlah garis awal yang seragam, melainkan tanggung jawab atas pilihan sendiri, eksekusi yang konsisten, karakter saat tertekan, dan kerendahan hati untuk terus belajar saat orang lain mulai cepat puas.",
          ],
        },
      },
      {
        id: "the-transformation",
        number: "05",
        title: {
          en: "The Transformation",
          id: "Transformasi",
        },
        subtitle: {
          en: "Stronger judgment, sharper discipline, higher standards",
          id: "Pertimbangan lebih matang, disiplin lebih tajam, standar lebih tinggi",
        },
        paragraphs: {
          en: [
            "True transformation isn't loud. You feel it in your standards.",
            "Between 2021 and 2026, my mindset shifted from figuring out how to get code running to leading software outcomes with purpose and discipline. I learned to trust my ability to tackle unfamiliar problems, hold myself to higher engineering and personal standards, and treat every challenge as fuel for the next level.",
          ],
          id: [
            "Transformasi sejati tidak berisik. Ia terasa langsung dari naiknya standar yang kita pegang.",
            "Antara 2021 dan 2026, pola pikir saya bergeser dari sekadar membuat kode berjalan menjadi memimpin hasil rekayasa secara terarah dan disiplin. Saya belajar percaya pada kemampuan sendiri dalam menghadapi masalah baru, memasang standar profesional dan pribadi yang lebih tinggi, dan menjadikan setiap tantangan sebagai bahan bakar untuk naik tingkat.",
          ],
        },
        transformation: {
          fromHeading: {
            en: "Early Stage",
            id: "Fase Awal",
          },
          towardHeading: {
            en: "Leadership Mindset",
            id: "Pola Pikir Sekarang",
          },
          rows: [
            {
              from: {
                en: "Waiting until things felt clear before stepping up",
                id: "Menunggu semuanya terasa pasti sebelum melangkah",
              },
              toward: {
                en: "Acting decisively and sharpening clarity through execution",
                id: "Mengambil aksi tegas dan memperjelas arah lewat eksekusi",
              },
            },
            {
              from: {
                en: "Focusing on isolated tasks and surface implementation",
                id: "Berfokus pada tugas terpisah dan implementasi permukaan",
              },
              toward: {
                en: "Owning system architecture, reliability, and real client outcomes",
                id: "Memegang penuh arsitektur sistem, keandalan, dan dampak nyata",
              },
            },
            {
              from: {
                en: "Relying on bursts of motivation to keep pushing",
                id: "Mengandalkan ledakan semangat sesaat untuk bergerak",
              },
              toward: {
                en: "Building daily discipline and steady long-term momentum",
                id: "Membangun disiplin harian dan momentum jangka panjang",
              },
            },
            {
              from: {
                en: "Measuring progress mainly by technical tools learned",
                id: "Mengukur kemajuan sebatas dari banyaknya alat yang dipelajari",
              },
              toward: {
                en: "Combining technical depth with trust, leadership, and character",
                id: "Memadukan keahlian teknis dengan kepercayaan, kepemimpinan, dan karakter",
              },
            },
          ],
        },
      },
      {
        id: "the-direction",
        number: "06",
        title: {
          en: "The Direction",
          id: "Arah Selanjutnya",
        },
        subtitle: {
          en: "Five pillars driving the next chapter",
          id: "Lima pilar penggerak bab berikutnya",
        },
        paragraphs: {
          en: [
            "Be proud of how far you've come. Then ask yourself how much further you can go.",
            "Chapter 01 proved what five years of focused effort can build. Moving into 2026–2031 and beyond, I am stepping into the next stage with energy, higher ambition, and five pillars I am committed to building every single day. Not as finished trophies, but as active targets worth giving everything I have.",
          ],
          id: [
            "Banggalah melihat sejauh mana kamu sudah melangkah. Lalu tanya dirimu sendiri: seberapa jauh lagi kamu bisa pergi?",
            "Bab 01 membuktikan apa yang bisa dibangun oleh lima tahun kerja yang terarah. Memasuki 2026–2031 dan seterusnya, saya melangkah ke tahap berikutnya dengan energi baru, ambisi yang lebih tinggi, dan lima pilar komitmen yang ingin saya bangun setiap hari. Bukan sebagai piala yang sudah selesai diraih, melainkan target nyata yang layak diperjuangkan sepenuh hati.",
          ],
        },
        includePillars: true,
        closingReflection: {
          eyebrow: {
            en: "Onward to Chapter 02",
            id: "Menuju Bab 02",
          },
          headline: {
            en: "The foundation is built. The standards are higher. And this is only the start.",
            id: "Fondasinya telah berdiri. Standarnya lebih tinggi. Dan ini baru permulaan.",
          },
          paragraphs: {
            en: [
              "In 2021, I stepped forward and started building. Five years later, I have real capability, firsthand experience, and an unshakable conviction about what disciplined action can create over time.",
              "Chapter 02 isn't about playing small. It's about expanding what is possible.",
            ],
            id: [
              "Di tahun 2021, saya melangkah maju dan mulai membangun. Lima tahun kemudian, saya memegang kemampuan nyata, pengalaman lapangan, dan keyakinan kuat tentang apa yang mampu diciptakan oleh tindakan disiplin jangka panjang.",
              "Bab 02 bukan tentang bermain aman dalam skala kecil. Ini tentang memperluas batas apa yang mungkin diwujudkan.",
            ],
          },
          closingStatement: {
            en: "The past is documented. The present is being built. The future remains unwritten.",
            id: "Masa lalu terdokumentasi. Masa kini sedang dibangun. Masa depan tetap belum tertulis.",
          },
        },
      },
    ],
  },
  {
    slug: "chapter-02",
    number: "02",
    period: "2026–2031",
    status: "future",
    title: {
      en: "The Expansion",
      id: "Perluasan",
    },
    subtitle: {
      en: "Stepping into deeper engineering authority, stronger relationships, financial independence, and bigger opportunities worth chasing.",
      id: "Melangkah menuju otoritas rekayasa yang lebih dalam, relasi yang kuat, kemandirian finansial, dan peluang yang lebih besar.",
    },
    theme: {
      en: "Raising technical mastery, building lasting trust, expanding wealth responsibly, and stepping into larger rooms.",
      id: "Meningkatkan penguasaan teknis, memperluas kepercayaan yang kokoh, membangun kesejahteraan finansial secara bertanggung jawab, dan memasuki ruang kontribusi yang lebih besar.",
    },
    summary: {
      en: "An open frontier ahead: what I am excited to explore, sharpen, and achieve over the next five years.",
      id: "Cakrawala terbuka di depan: segala hal yang ingin saya eksplorasi, pertajam, dan capai dalam lima tahun mendatang.",
    },
    author: "Danial Fachrudin (Danny)",
    statusNote: {
      en: "Future chapter · Not yet written",
      id: "Bab mendatang · Belum ditulis",
    },
  },
  {
    slug: "chapter-03",
    number: "03",
    period: "2031–2036",
    status: "future",
    title: {
      en: "The Contribution",
      id: "Kontribusi",
    },
    subtitle: {
      en: "Turning accumulated skill, wisdom, and resources into lasting impact that lifts other people.",
      id: "Mengubah keahlian, kebijaksanaan, dan sumber daya yang terkumpul menjadi dampak nyata yang mengangkat banyak orang.",
    },
    theme: {
      en: "Sharing hard-earned lessons, mentoring builders, creating durable systems, and leaving things stronger than I found them.",
      id: "Membagikan pelajaran lapangan, membimbing para pembangun baru, menciptakan sistem yang bertahan lama, dan meninggalkan dampak yang melampaui diri sendiri.",
    },
    summary: {
      en: "A future chapter dedicated to giving back: using everything built along the way to create value far beyond personal success.",
      id: "Bab masa depan yang didedikasikan untuk memberi kembali: memakai semua yang telah dibangun untuk menciptakan nilai melampaui pencapaian pribadi.",
    },
    author: "Danial Fachrudin (Danny)",
    statusNote: {
      en: "Future chapter · Not yet written",
      id: "Bab mendatang · Belum ditulis",
    },
  },
];

export const documentedJourneyChapters = journeyChapters.filter(
  (chapter) => chapter.status === "documented",
);

export function getJourneyChapter(slug: string): JourneyChapter | undefined {
  return documentedJourneyChapters.find((chapter) => chapter.slug === slug);
}
