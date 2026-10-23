export type ArticleSection = {
  heading: { en: string; id: string };
  paragraphs: { en: string[]; id: string[] };
  code?: {
    language: string;
    snippet: string;
    caption?: { en: string; id: string };
  };
};

export type EngineeringArticle = {
  slug: string;
  title: { en: string; id: string };
  excerpt: { en: string; id: string };
  topics: string[];
  readingTime: { en: string; id: string };
  publishedDate: string;
  published: boolean;
  sections: ArticleSection[];
};

export const engineeringArticles: EngineeringArticle[] = [
  {
    slug: "production-ready-apis",
    title: {
      en: "Designing Production-Ready APIs",
      id: "Merancang API Siap Produksi",
    },
    excerpt: {
      en: "A comprehensive guide to designing resilient REST APIs: deterministic contracts, idempotency keys, RFC 7807 problem details, and defense-in-depth rate limiting.",
      id: "Panduan komprehensif merancang REST API yang tangguh: kontrak deterministik, kunci idempotensi, detail kesalahan RFC 7807, dan pembatasan laju berlapis.",
    },
    topics: ["API Design", "Reliability", "Security"],
    readingTime: { en: "6 min read", id: "6 menit baca" },
    publishedDate: "2026-09-15",
    published: true,
    sections: [
      {
        heading: {
          en: "Contract Determinism & Schema Boundaries",
          id: "Determinisme Kontrak & Batasan Skema",
        },
        paragraphs: {
          en: [
            "An API in production is a legally binding contract between distributed systems. The most common failure in evolving APIs is unintentional contract drift — where internal database mutations subtly alter the output shape.",
            "Enforce strict boundary validation at runtime using libraries like Zod or typebox. Request bodies must be sanitized before touching domain handlers, and responses must be explicitly projected through output transfer schemas to avoid leaking sensitive internal fields.",
          ],
          id: [
            "API di lingkungan produksi adalah kontrak yang mengikat antar sistem terdistribusi. Kesalahan paling umum saat API berkembang adalah pergeseran kontrak tak disengaja — di mana mutasi basis data internal diam-diam mengubah bentuk output.",
            "Terapkan validasi runtime yang ketat pada gerbang masuk menggunakan library seperti Zod. Request body wajib disanitasi sebelum menyentuh domain handler, dan response wajib diproyeksikan secara eksplisit untuk mencegah kebocoran data sensitif.",
          ],
        },
        code: {
          language: "typescript",
          snippet: `// Strict input schema validation with Zod
export const CreateOrderSchema = z.object({
  idempotencyKey: z.string().uuid(),
  warehouseId: z.string().min(1),
  items: z.array(z.object({
    sku: z.string(),
    quantity: z.positive().int(),
  })).min(1),
});`,
        },
      },
      {
        heading: {
          en: "Idempotency for Mutating Operations",
          id: "Idempotensi untuk Operasi Mutasi",
        },
        paragraphs: {
          en: [
            "Network timeouts are inherently ambiguous: did the server fail before processing the request, or did the response get lost on the return path? Without idempotency, clients retrying a failed HTTP POST risk creating duplicate orders or double payments.",
            "Implement an idempotency layer using an atomic distributed lock (such as Redis SETNX or a PostgreSQL unique constraint on an idempotency key). If an identical key arrives while the operation is in flight, return HTTP 409 Conflict. If it arrives after completion, return the cached result payload.",
          ],
          id: [
            "Network timeout memiliki sifat ambigu: apakah server gagal sebelum memproses request, atau response hilang di tengah perjalanan pulang? Tanpa idempotensi, retry HTTP POST berisiko menduplikasi pesanan atau pembayaran ganda.",
            "Terapkan lapisan idempotensi menggunakan kunci terdistribusi atomik (seperti Redis SETNX atau unique constraint PostgreSQL). Jika key yang sama masuk saat transaksi berlangsung, kembalikan HTTP 409 Conflict. Jika sudah selesai, kembalikan hasil yang tersimpan di cache.",
          ],
        },
      },
      {
        heading: {
          en: "Structured Error Responses (RFC 7807)",
          id: "Standar Kesalahan Terstruktur (RFC 7807)",
        },
        paragraphs: {
          en: [
            "Never return raw stack traces or plain text strings when an API call fails. Standardize on RFC 7807 (Problem Details for HTTP APIs), providing consistent machine-readable fields such as type, title, status, detail, and instance.",
            "This empowers consumer applications to programmatically distinguish validation errors from transient infrastructure faults and display meaningful feedback to end users.",
          ],
          id: [
            "Jangan pernah mengembalikan stack trace mentah atau teks polos saat pemanggilan API gagal. Standarkan format pada RFC 7807 (Problem Details for HTTP APIs) yang menyediakan kolom konsisten seperti type, title, status, detail, dan instance.",
            "Hal ini memungkinkan aplikasi pemanggil membedakan error validasi dari gangguan infrastruktur sementara secara terprogram.",
          ],
        },
      },
    ],
  },
  {
    slug: "avoiding-n-plus-one",
    title: {
      en: "Avoiding N+1 Database Queries",
      id: "Mencegah Kueri Database N+1",
    },
    excerpt: {
      en: "Techniques for eliminating silent database query amplification in ORMs through query planning, batching, and join projection.",
      id: "Teknik mengeliminasi amplifikasi kueri basis data pada ORM melalui perencanaan query, batching, dan proyeksi join.",
    },
    topics: ["Database", "Performance", "PostgreSQL"],
    readingTime: { en: "5 min read", id: "5 menit baca" },
    publishedDate: "2026-09-22",
    published: true,
    sections: [
      {
        heading: {
          en: "The Hidden Cost of Lazy Loading",
          id: "Biaya Tersembunyi dari Lazy Loading",
        },
        paragraphs: {
          en: [
            "The N+1 query problem occurs when an application executes 1 initial query to fetch N parent records, and then issues N subsequent queries to fetch relational children one by one in a loop.",
            "While convenient in local development with 10 records, in production with 500 records this translates to 501 network round-trips to the database, exhausting connection pools and causing massive latency spikes.",
          ],
          id: [
            "Masalah kueri N+1 terjadi saat aplikasi mengeksekusi 1 kueri awal untuk mengambil N data induk, lalu mengeksekusi N kueri berikutnya di dalam loop untuk mengambil data relasi satu per satu.",
            "Meskipun tampak cepat di tahap pengembangan dengan 10 data, di lingkungan produksi dengan 500 data ini berarti 501 kali round-trip jaringan ke database, menguras connection pool dan melonjakkan latensi.",
          ],
        },
      },
      {
        heading: {
          en: "Batch Loading & Explicit JOIN Strategies",
          id: "Strategi Batch Loading & JOIN Eksplisit",
        },
        paragraphs: {
          en: [
            "To solve this reliably, use either eager relational loading with explicit JOINs or the DataLoader batching pattern. Instead of querying per row, gather all target IDs and execute a single WHERE id IN (...) query, coalescing results into a memory map.",
            "In PostgreSQL, you can also leverage JSON aggregation (json_agg / jsonb_build_object) to aggregate related children into structured objects directly inside the database engine, returning everything in one atomic scan.",
          ],
          id: [
            "Untuk mengatasinya, gunakan eager loading dengan JOIN eksplisit atau pola batching DataLoader. Kumpulkan seluruh ID yang diperlukan dan jalankan satu kueri WHERE id IN (...), lalu susun hasilnya ke dalam map di memori.",
            "Di PostgreSQL, Anda juga dapat memanfaatkan agregasi JSON (json_agg / jsonb_build_object) untuk menggabungkan data relasi langsung di database engine dalam satu scan.",
          ],
        },
        code: {
          language: "sql",
          snippet: `-- Fetch orders with items in a single query avoiding N+1
SELECT 
  o.id, 
  o.total_amount, 
  o.status,
  COALESCE(json_agg(json_build_object(
    'sku', i.sku, 
    'quantity', i.quantity
  )) FILTER (WHERE i.id IS NOT NULL), '[]') AS items
FROM orders o
LEFT JOIN order_items i ON i.order_id = o.id
WHERE o.created_at >= NOW() - INTERVAL '7 days'
GROUP BY o.id;`,
        },
      },
    ],
  },
  {
    slug: "response-projection",
    title: {
      en: "API Response Projection & Data Security",
      id: "Proyeksi Response API & Keamanan Data",
    },
    excerpt: {
      en: "Preventing inadvertent data leaks by establishing intentional serialization boundaries between database entities and public API responses.",
      id: "Mencegah kebocoran data dengan membangun batasan serialisasi terencana antara entitas basis data dan respons publik API.",
    },
    topics: ["Security", "API Design", "Architecture"],
    readingTime: { en: "5 min read", id: "5 menit baca" },
    publishedDate: "2026-09-28",
    published: true,
    sections: [
      {
        heading: {
          en: "The Danger of Direct Entity Serialization",
          id: "Bahaya Serialisasi Entitas Langsung",
        },
        paragraphs: {
          en: [
            "One of the most dangerous anti-patterns in backend web frameworks is directly passing an ORM model instance into JSON.stringify or the HTTP response handler.",
            "When a migration adds a column such as password_hash, reset_token, internal_notes, or tax_id, that property is automatically broadcast to external clients unless someone explicitly remembers to add a blacklist ignore.",
          ],
          id: [
            "Salah satu anti-pattern paling berbahaya pada framework backend adalah langsung meneruskan instance model ORM ke dalam JSON.stringify atau response handler HTTP.",
            "Ketika migrasi database menambahkan kolom seperti password_hash, reset_token, atau internal_notes, properti tersebut otomatis terkirim ke klien publik kecuali jika secara manual dikecualikan.",
          ],
        },
      },
      {
        heading: {
          en: "Whitelist Projection Over Blacklist Omission",
          id: "Proyeksi Whitelist Alih-Alih Blacklist",
        },
        paragraphs: {
          en: [
            "Always adopt an explicit whitelist projection strategy. Define dedicated Data Transfer Objects (DTOs) or view schemas. If a field is not explicitly declared in the output schema, it cannot be rendered in the HTTP body.",
            "This principle of least privilege ensures your security perimeter remains intact even as the underlying database schema evolves rapidly.",
          ],
          id: [
            "Selalu terapkan strategi proyeksi whitelist eksplisit. Definisikan Data Transfer Object (DTO) atau skema view khusus. Jika suatu properti tidak dicantumkan di skema output, properti itu tidak akan pernah bisa keluar ke respons HTTP.",
            "Prinsip hak akses minimal ini memastikan batasan keamanan tetap terlindungi meskipun skema basis data di belakangnya terus berubah.",
          ],
        },
      },
    ],
  },
  {
    slug: "redis-caching",
    title: {
      en: "Caching Strategies with Redis",
      id: "Strategi Caching Menggunakan Redis",
    },
    excerpt: {
      en: "Architecture patterns for cache boundaries, stampede mitigation, TTL jitter, and deterministic invalidation.",
      id: "Pola arsitektur batasan cache, mitigasi stampede, jitter TTL, dan invalidasi deterministik.",
    },
    topics: ["Caching", "Redis", "Performance"],
    readingTime: { en: "6 min read", id: "6 menit baca" },
    publishedDate: "2026-10-04",
    published: true,
    sections: [
      {
        heading: {
          en: "Cache-Aside vs. Write-Through",
          id: "Cache-Aside vs. Write-Through",
        },
        paragraphs: {
          en: [
            "Caching is not a substitute for proper database indexing. A high-performance caching layer complements a well-structured database by absorbing repeated reads on stable datasets.",
            "In the Cache-Aside pattern, the application checks Redis first. On a cache hit, the result is returned immediately. On a cache miss, the application queries PostgreSQL, writes the result to Redis with an explicit TTL, and returns the response.",
          ],
          id: [
            "Caching bukanlah pengganti indexing basis data yang baik. Lapisan cache berkinerja tinggi melengkapi arsitektur data dengan menyerap pembacaan berulang pada dataset yang relatif stabil.",
            "Dalam pola Cache-Aside, aplikasi memeriksa Redis terlebih dahulu. Jika ditemukan, data langsung dikembalikan. Jika cache miss, aplikasi mengambil dari PostgreSQL, menyimpannya ke Redis dengan TTL, lalu mengembalikan data.",
          ],
        },
      },
      {
        heading: {
          en: "Mitigating Cache Stampedes & Hotkey Expiration",
          id: "Mitigasi Cache Stampede & Kedaluwarsa Hotkey",
        },
        paragraphs: {
          en: [
            "When a heavily requested cached key expires, thousands of concurrent requests can simultaneously miss the cache and hit the database at once, causing a cache stampede or thundering herd event.",
            "Mitigate this by adding jitter (random variation) to TTL values to avoid synchronized expiration, and use distributed locks or probabilistic early expiration (XFetch algorithm) to recompute hot keys in the background before they expire.",
          ],
          id: [
            "Ketika cache key yang sangat sering diakses kedaluwarsa, ribuan request bersamaan dapat mengalami cache miss dan langsung membebani database secara serentak (cache stampede).",
            "Cegah kondisi ini dengan menambahkan jitter (variasi acak) pada nilai TTL untuk menghindari kedaluwarsa serentak, serta gunakan kunci terdistribusi untuk memperbarui key secara asinkron sebelum kedaluwarsa.",
          ],
        },
      },
    ],
  },
  {
    slug: "background-jobs",
    title: {
      en: "Background Jobs & Queue Architecture",
      id: "Arsitektur Background Jobs & Antrean",
    },
    excerpt: {
      en: "Designing decoupled asynchronous pipelines: at-least-once delivery, exponential backoff retries, and dead-letter queues.",
      id: "Merancang pipeline asinkron terpisah: jaminan at-least-once delivery, retry exponential backoff, dan dead-letter queue.",
    },
    topics: ["Queues", "Reliability", "Architecture"],
    readingTime: { en: "6 min read", id: "6 menit baca" },
    publishedDate: "2026-10-10",
    published: true,
    sections: [
      {
        heading: {
          en: "Decoupling Synchronous Requests from Slow Side Effects",
          id: "Memisahkan Request Sinkron dari Efek Samping yang Lambat",
        },
        paragraphs: {
          en: [
            "Web servers should never make users wait for third-party HTTP webhooks, PDF generation, or email delivery during an active request lifecycle. Doing so ties up web server worker threads and makes your application vulnerable to external downtime.",
            "Offload asynchronous workloads to persistent task queues (such as BullMQ, RabbitMQ, or SQS). The HTTP handler saves the intent, enqueues a job payload, and responds to the user with HTTP 202 Accepted.",
          ],
          id: [
            "Web server tidak boleh membiarkan pengguna menunggu panggilan webhook pihak ketiga, pembuatan dokumen PDF, atau pengiriman email saat request berlangsung. Hal tersebut menahan thread server dan membuat aplikasi rentan terhadap gangguan eksternal.",
            "Alihkan tugas asinkron ke antrean pekerjaan persisten (seperti BullMQ, RabbitMQ, atau SQS). Handler HTTP menyimpan data awal, memasukkan payload pekerjaan ke antrean, dan segera merespons klien dengan HTTP 202 Accepted.",
          ],
        },
      },
      {
        heading: {
          en: "At-Least-Once Delivery & Dead-Letter Queues (DLQ)",
          id: "At-Least-Once Delivery & Dead-Letter Queue (DLQ)",
        },
        paragraphs: {
          en: [
            "Distributed queues generally offer at-least-once delivery, meaning a worker might occasionally process the same message more than once if an acknowledgment fails. Therefore, every worker task must be strictly idempotent.",
            "Configure exponential backoff retries with randomized jitter. If a task fails repeatedly after the maximum retry threshold, route it to a Dead-Letter Queue (DLQ) for engineering inspection rather than letting it crash the worker loop.",
          ],
          id: [
            "Antrean terdistribusi umumnya menerapkan garansi at-least-once delivery, artinya worker dapat memproses pesan yang sama lebih dari sekali jika konfirmasi ACK terganggu. Oleh karena itu, setiap tugas wajib bersifat idempoten.",
            "Konfigurasikan retry dengan exponential backoff dan jitter. Jika suatu pekerjaan gagal berulang kali hingga batas maksimal, arahkan ke Dead-Letter Queue (DLQ) untuk audit rekayasa alih-alih merusak perulangan worker.",
          ],
        },
      },
    ],
  },
  {
    slug: "database-indexing",
    title: {
      en: "Database Indexing for Query Performance",
      id: "Indexing Basis Data untuk Performa Kueri",
    },
    excerpt: {
      en: "A practical guide to access patterns, B-Tree index selectivity, composite index column ordering, and EXPLAIN ANALYZE validation.",
      id: "Panduan praktis pola akses data, selektivitas B-Tree index, urutan kolom composite index, dan validasi EXPLAIN ANALYZE.",
    },
    topics: ["PostgreSQL", "Performance", "Database"],
    readingTime: { en: "7 min read", id: "7 menit baca" },
    publishedDate: "2026-10-14",
    published: true,
    sections: [
      {
        heading: {
          en: "Understanding Index Selectivity & Left-to-Right Ordering",
          id: "Memahami Selektivitas Index & Urutan Kolom",
        },
        paragraphs: {
          en: [
            "An index is only effective if it drastically narrows down the number of disk pages the database engine must inspect. High-selectivity columns (like UUIDs or emails) benefit greatly from B-Tree indexes, whereas low-selectivity columns (like boolean flags) often trigger full table sequential scans.",
            "For composite multi-column indexes (colA, colB), column ordering is critical: PostgreSQL can only use the index for queries filtering on colB if colA is also present in the WHERE clause, following the left-prefix rule.",
          ],
          id: [
            "Index hanya akan efektif jika dapat secara drastis mengurangi jumlah page disk yang perlu dibaca engine database. Kolom berselektivitas tinggi (seperti UUID atau email) sangat terbantu oleh B-Tree index, sedangkan kolom berselektivitas rendah (seperti boolean) sering kali tetap memicu sequential scan.",
            "Pada composite index (kolomA, kolomB), urutan kolom sangat menentukan: PostgreSQL hanya dapat memanfaatkan index untuk filter kolomB jika kolomA juga disertakan dalam klausul WHERE, mengikuti aturan left-prefix.",
          ],
        },
      },
      {
        heading: {
          en: "Verifying Execution Plans with EXPLAIN ANALYZE",
          id: "Memverifikasi Rencana Eksekusi dengan EXPLAIN ANALYZE",
        },
        paragraphs: {
          en: [
            "Never assume an index is being used without running EXPLAIN (ANALYZE, BUFFERS). Compare the estimated planning cost with actual execution time and shared hit buffers.",
            "Watch out for implicit type coercion (such as comparing a VARCHAR column against an INTEGER literal) which forces PostgreSQL to bypass indexes and scan the entire table.",
          ],
          id: [
            "Jangan pernah berasumsi bahwa suatu index digunakan tanpa menguji kueri dengan EXPLAIN (ANALYZE, BUFFERS). Bandingkan estimasi cost dengan waktu eksekusi riil dan shared buffer hit.",
            "Waspadai konversi tipe data implisit (seperti membandingkan kolom VARCHAR dengan angka numerik) yang memaksa database mengabaikan index dan melakukan scan penuh.",
          ],
        },
      },
    ],
  },
  {
    slug: "production-observability",
    title: {
      en: "Production Logging & Observability",
      id: "Logging & Observabilitas di Lingkungan Produksi",
    },
    excerpt: {
      en: "Establishing correlation IDs, structured JSON telemetry, health probes, and meaningful alerting thresholds for high-availability systems.",
      id: "Membangun correlation ID, telemetri JSON terstruktur, health probes, dan ambang batas alert untuk sistem berkeandalan tinggi.",
    },
    topics: ["Observability", "Operations", "Reliability"],
    readingTime: { en: "6 min read", id: "6 menit baca" },
    publishedDate: "2026-10-18",
    published: true,
    sections: [
      {
        heading: {
          en: "Correlation IDs Across Request Boundaries",
          id: "Correlation ID Melintasi Batasan Layanan",
        },
        paragraphs: {
          en: [
            "When debugging a production incident across microservices or asynchronous queues, individual log lines are useless without context. Attach a unique x-request-id or correlation ID at the edge gateway and propagate it across all downstream database calls, message queues, and external requests.",
            "Format all production logs as structured JSON containing timestamp, correlationId, level, event, and relevant domain identifiers (tenantId, userId), enabling fast grep, aggregation, and filtering in centralized log aggregators.",
          ],
          id: [
            "Saat menginvestigasi insiden produksi di berbagai layanan atau antrean asinkron, baris log individual tidak berguna tanpa konteks. Sematkan x-request-id atau correlation ID unik di gateway utama dan teruskan ke seluruh panggilan basis data dan antrean.",
            "Format semua log produksi dalam bentuk JSON terstruktur yang memuat timestamp, correlationId, level, event, dan identifier domain (tenantId, userId), sehingga mudah difilter pada log aggregator terpusat.",
          ],
        },
      },
      {
        heading: {
          en: "Liveness vs. Readiness Probes",
          id: "Perbedaan Liveness dan Readiness Probes",
        },
        paragraphs: {
          en: [
            "Distinguish between liveness checks (is the Node.js process alive and event loop unblocked?) and readiness checks (can the service successfully communicate with PostgreSQL and Redis?).",
            "Failing a readiness probe removes the instance from the load balancer routing pool to protect users, while failing a liveness probe triggers an automated container restart.",
          ],
          id: [
            "Bedakan secara tegas antara liveness check (apakah proses Node.js masih berjalan dan event loop tidak macet?) dan readiness check (apakah layanan dapat tersambung ke PostgreSQL dan Redis?).",
            "Kegagalan readiness probe melepaskan instance dari pool load balancer untuk melindungi pengguna, sementara kegagalan liveness probe memicu restart kontainer otomatis.",
          ],
        },
      },
    ],
  },
];

export function getEngineeringArticle(slug: string) {
  return engineeringArticles.find((article) => article.slug === slug && article.published);
}
