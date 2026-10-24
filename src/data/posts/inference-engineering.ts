import type { BlogPost } from "@/data/blog";

export const inferenceEngineeringPost: BlogPost = {
  slug: "inference-engineering-production-ai-systems",
  title: {
    en: "Inference Engineering: Building AI Systems That Actually Work in Production",
    id: "Inference Engineering: Membangun Sistem AI yang Benar-Benar Berfungsi di Produksi",
  },
  summary: {
    en: "A comprehensive, engineering-first guide to serving LLMs and modern AI models in production: continuous batching, PagedAttention, KV cache memory hierarchies, quantization trade-offs, chunked prefill scheduling, benchmarking methodology, and reference architectures.",
    id: "Panduan komprehensif berorientasi rekayasa sistem untuk menyajikan model LLM dan AI di produksi: continuous batching, PagedAttention, hierarki memori KV cache, trade-off kuantisasi, penjadwalan chunked prefill, metodologi benchmark, dan arsitektur referensi.",
  },
  category: {
    en: "AI Infrastructure & Systems",
    id: "Infrastruktur & Sistem AI",
  },
  tags: [
    "Inference Engineering",
    "AI Infrastructure",
    "LLM Serving",
    "Backend Engineering",
    "Performance Optimization",
  ],
  publishedDate: "2026-10-24",
  author: "Danial Fachrudin",
  readingTime: {
    en: "22 min read",
    id: "22 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "Inference Engineering: Building Production AI Systems — Danial Fachrudin",
    id: "Inference Engineering: Membangun Sistem AI Produksi — Danial Fachrudin",
  },
  seoDescription: {
    en: "Understand LLM inference engineering, serving architectures, latency (TTFT/TPOT), KV caching, quantization, continuous batching, benchmarking, and production reliability.",
    id: "Pahami inference engineering LLM, arsitektur penyajian, latensi (TTFT/TPOT), KV caching, kuantisasi, continuous batching, benchmark, dan keandalan sistem produksi.",
  },
  sections: [
    {
      id: "the-model-is-not-the-system",
      title: {
        en: "1. Introduction — The Model Is Not the System",
        id: "1. Pendahuluan — Model Bukanlah Sistem Utuh",
      },
      paragraphs: {
        en: [
          "In modern artificial intelligence engineering, there is a dangerous cognitive trap: conflating a high-performing model checkpoint with a working production system. Offline benchmarks like MMLU, HumanEval, and LMSYS Chatbot Arena evaluate model capabilities in isolation under synthetic, unconstrained conditions — usually single-request, unbatched execution on dedicated high-memory GPUs with zero concurrency.",
          "Production reality represents an entirely different class of engineering problems. When a model is deployed into a real software product, its mathematical capabilities mean nothing if the service exhibits unacceptable **Time to First Token (TTFT)**, sluggish **Time Per Output Token (TPOT)**, catastrophic tail latency under concurrent traffic spikes, GPU Out-Of-Memory (OOM) crashes, or prohibitive cloud infrastructure costs.",
          "Serving a 70-billion-parameter language model across an 8-GPU node costs between $8,000 and $30,000 per month in cloud infrastructure. If your serving architecture wastes 60% of GPU memory on internal fragmentation or leaves tensor cores idle while stalled on high-bandwidth memory (HBM) transfers, that capability transforms into an unsustainable operational liability.",
          "**Inference Engineering** is the technical discipline dedicated to bridging this chasm. It is the practice of designing, optimizing, scheduling, and observing model execution so that capable neural networks deliver measurable, predictable, cost-effective, and reliable utility under real-world multi-tenant workloads.",
        ],
        id: [
          "Dalam rekayasa kecerdasan buatan modern, terdapat jebakan kognitif yang berbahaya: menyamakan checkpoint model berkinerja tinggi dengan sistem produksi yang siap pakai. Tolok ukur offline seperti MMLU, HumanEval, dan LMSYS Chatbot Arena mengevaluasi kapabilitas model secara terisolasi dalam kondisi sintetis tanpa hambatan — umumnya eksekusi satu request tanpa batching pada GPU berkapasitas besar dengan nol konkurensi.",
          "Kenyataan di lingkungan produksi menghadirkan kelas permasalahan rekayasa yang sama sekali berbeda. Ketika suatu model dirilis ke produk perangkat lunak nyata, kapabilitas matematisnya menjadi sia-sia jika layanan mengalami **Time to First Token (TTFT)** yang lambat, **Time Per Output Token (TPOT)** yang tersendat, lonjakan latensi ekor (tail latency) saat lalu lintas padat, crash Out-Of-Memory (OOM) pada GPU, atau biaya cloud yang tidak terkendali.",
          "Menyajikan model bahasa 70 miliar parameter pada node 8-GPU membutuhkan biaya antara $8.000 hingga $30.000 per bulan di infrastruktur cloud. Jika arsitektur serving Anda menyia-nyiakan 60% memori GPU akibat fragmentasi internal atau membiarkan tensor core menganggur karena tertahan transfer memori bandwidth tinggi (HBM), kapabilitas tersebut berubah menjadi beban operasional yang merugikan.",
          "**Inference Engineering** adalah disiplin rekayasa teknis yang didedikasikan untuk menjembatani jurang pemisah ini. Ini adalah praktik merancang, mengoptimalkan, menjadwalkan, dan memantau eksekusi model sehingga jaringan saraf tiruan mampu memberikan kegunaan terukur, dapat diprediksi, hemat biaya, dan andal di bawah beban kerja multi-tenant dunia nyata.",
        ],
      },
      callout: {
        type: "note",
        text: {
          en: "A model checkpoint is static math: a frozen collection of matrix weights. An inference system is dynamic software: an orchestrated pipeline of tokenizers, memory managers, continuous batch schedulers, inter-GPU interconnects, and streaming protocol handlers.",
          id: "Checkpoint model adalah matematika statis: kumpulan bobot matriks yang beku. Sistem inferensi adalah perangkat lunak dinamis: pipeline terorkestrasi yang terdiri dari tokenizer, manajer memori, penjadwal continuous batching, interkoneksi antar-GPU, dan handler protokol streaming.",
        },
      },
    },
    {
      id: "what-is-inference-engineering",
      title: {
        en: "2. What Is Inference Engineering?",
        id: "2. Apa Itu Inference Engineering?",
      },
      paragraphs: {
        en: [
          "To engineer inference systems effectively, software and infrastructure engineers must clearly delineate the stages of the machine learning lifecycle:",
          "• **Model Training:** Compute-bound, distributed batch optimization over weeks or months. Training workloads prioritize aggregate floating-point operations per second (FLOPs/s) and gradient all-reduce throughput across thousands of accelerators, with zero sensitivity to per-request latency.",
          "• **Model Evaluation:** Offline statistical validation on static test sets. Evaluates perplexity, accuracy, and task-specific metrics without user concurrency or streaming constraints.",
          "• **Model Serving:** The packaging and exposing of a model checkpoint via an HTTP/gRPC interface (e.g., standard FastAPI or Flask wrappers). Serving answers *how to reach the model*, but does not optimize *how the model executes*.",
          "• **Inference Optimization:** Low-level computational speedups applied to the neural graph: kernel fusion, operator replacement (e.g., FlashAttention-2/3), post-training quantization, and compiler compilation passes (e.g., TensorRT, torch.compile).",
          "• **The Production Inference System:** The holistic discipline that orchestrates dynamic scheduling, virtual memory management, request queueing, admission control, tensor parallelism, client cancellation handling, streaming delivery, and telemetry.",
          "While this article focuses heavily on autoregressive Large Language Models (LLMs) due to their severe memory bandwidth and context-length constraints, inference engineering encompasses the broader spectrum of production AI: high-throughput embedding models (ColBERT, BGE), computer vision encoders (CLIP, ViT), speech synthesis/transcription (Whisper), and real-time tabular gradient boosted trees (XGBoost). Each workload exhibits distinct compute-to-memory ratios and SLA profiles.",
        ],
        id: [
          "Untuk merekayasa sistem inferensi secara efektif, insinyur perangkat lunak dan infrastruktur harus membedakan tahapan siklus hidup machine learning secara tegas:",
          "• **Model Training (Pelatihan):** Optimasi batch terdistribusi yang terikat komputasi (compute-bound) selama berminggu-minggu atau berbulan-bulan. Beban kerja pelatihan memprioritaskan agregat FLOPs/detik dan throughput gradient all-reduce pada ribuan akselerator, tanpa memedulikan latensi per-permintaan.",
          "• **Model Evaluation (Evaluasi):** Validasi statistik offline pada dataset uji statis. Mengukur perplexity, akurasi, dan metrik tugas tanpa kehadiran pengguna bersamaan atau batasan streaming.",
          "• **Model Serving (Penyajian):** Pengemasan dan pemaparan checkpoint model melalui antarmuka HTTP/gRPC (misal: pembungkus FastAPI atau Flask biasa). Serving menjawab *bagaimana cara menghubungi model*, namun tidak mengoptimalkan *bagaimana model dieksekusi*.",
          "• **Inference Optimization (Optimasi Inferensi):** Percepatan komputasi tingkat rendah yang diterapkan pada grafik neural: fusi kernel, penggantian operator (seperti FlashAttention-2/3), kuantisasi pasca-pelatihan, dan kompilasi graf (TensorRT, torch.compile).",
          "• **The Production Inference System (Sistem Inferensi Produksi):** Disiplin holistik yang mengorkestrasi penjadwalan dinamis, pengelolaan memori virtual, antrean request, kendali admisi, tensor parallelism, penanganan pembatalan klien, pengiriman streaming, dan telemetri sistem.",
          "Meskipun artikel ini banyak berfokus pada Large Language Model (LLM) autoregresif karena batasan memori dan panjang konteks yang ekstrem, inference engineering mencakup spektrum AI produksi yang lebih luas: model embedding throughput tinggi (ColBERT, BGE), encoder visi komputer (CLIP, ViT), sintesis/transkripsi suara (Whisper), serta pohon keputusan tabel real-time (XGBoost). Setiap beban kerja memiliki rasio komputasi-terhadap-memori dan profil SLA yang khas.",
        ],
      },
    },
    {
      id: "anatomy-of-production-pipeline",
      title: {
        en: "3. Anatomy of a Production Inference Pipeline",
        id: "3. Anatomi Pipeline Inferensi Produksi",
      },
      paragraphs: {
        en: [
          "Understanding a production inference service requires tracing the complete lifecycle of a request from client dispatch to token completion. Unlike traditional stateless web APIs where request processing is uniform, an LLM request alternates between two drastically different computational phases: the **Prefill Phase** and the **Decode Phase**.",
          "The lifecycle proceeds through eight distinct architectural boundaries:",
          "1. **Client Request:** An application client or SDK opens an HTTP/2 or HTTP/3 connection, sending prompt text, sampling hyperparameters (temperature, top_p), and requesting a persistent Server-Sent Events (SSE) stream.",
          "2. **API Gateway & Ingress:** The gateway terminates TLS, validates API tokens, applies tenant-level rate limits, and verifies token credit balances before forwarding the payload to the inference cluster.",
          "3. **Tokenization & Input Validation:** The inference frontend converts raw natural-language strings into discrete integer token IDs using Byte-Pair Encoding (BPE) or SentencePiece algorithms, prepends system chat templates, and validates that input length does not exceed maximum context boundaries.",
          "4. **Admission Control & Scheduling:** The request enters a centralized priority queue. The scheduler evaluates active GPU Key-Value (KV) cache memory availability. If sufficient physical memory blocks exist, the request is scheduled for execution; otherwise, it is queued or shed under backpressure.",
          "5. **Prefill Phase (Prompt Processing):** The model processes all input tokens concurrently in a single forward pass. Because the entire prompt sequence is known upfront, this phase executes dense matrix-matrix multiplications (GEMM) that heavily saturate GPU Tensor Cores (compute-bound execution with high arithmetic intensity).",
          "6. **KV Cache Allocation & PagedAttention:** During prefill, the attention Key and Value projection tensors for all prompt tokens are computed and stored in GPU High-Bandwidth Memory (HBM) using non-contiguous virtual memory blocks managed by PagedAttention.",
          "7. **Decode Phase (Autoregressive Token Generation):** The model enters a sequential generation loop. In each iteration, the model takes the single newly generated token, queries the historical KV cache across all prior tokens, and computes the probability distribution for the next token. This executes matrix-vector multiplications (GEMV) that are strictly bound by GPU memory bandwidth (arithmetic intensity < 5 FLOPs/byte).",
          "8. **Detokenization, Streaming & Telemetry:** Output token IDs are mapped back to UTF-8 characters, evaluated against stop sequences, and pushed immediately to the client socket as SSE chunks. Generation metrics (TTFT, inter-token intervals, prompt/decode token counts) are emitted to the observability pipeline.",
        ],
        id: [
          "Memahami layanan inferensi produksi membutuhkan pelacakan siklus hidup lengkap suatu permintaan dari pengiriman klien hingga penyelesaian token. Berbeda dari API web stateless tradisional di mana pemrosesan permintaan berlangsung seragam, permintaan LLM bergantian di antara dua fase komputasi yang sangat berbeda: **Fase Prefill** dan **Fase Decode**.",
          "Siklus hidup ini melintasi delapan batasan arsitektur yang terpisah:",
          "1. **Permintaan Klien (Client Request):** Klien aplikasi atau SDK membuka koneksi HTTP/2 atau HTTP/3, mengirimkan teks prompt, hiperparameter sampling (temperature, top_p), dan meminta aliran Server-Sent Events (SSE) persisten.",
          "2. **API Gateway & Ingress:** Gateway mengakhiri TLS, memvalidasi token API, menerapkan pembatasan laju (rate limiting) per-tenant, dan memverifikasi kuota token sebelum meneruskan muatan ke klaster inferensi.",
          "3. **Tokenisasi & Validasi Input:** Frontend inferensi mengonversi teks bahasa alami menjadi token ID bilangan bulat menggunakan algoritma Byte-Pair Encoding (BPE) atau SentencePiece, menyematkan template chat sistem, dan memvalidasi bahwa panjang input tidak melebihi batas konteks maksimum.",
          "4. **Kendali Admisi & Penjadwalan:** Permintaan masuk ke antrean prioritas terpusat. Penjadwal mengevaluasi ketersediaan memori Key-Value (KV) cache pada GPU. Jika blok memori fisik mencukupi, permintaan dijadwalkan untuk dieksekusi; jika tidak, permintaan ditahan di antrean atau ditolak demi melindungi sistem.",
          "5. **Fase Prefill (Pemrosesan Prompt):** Model memproses seluruh token input secara paralel dalam satu forward pass. Karena seluruh urutan prompt sudah diketahui di awal, fase ini mengeksekusi perkalian matriks-matriks (GEMM) padat yang memanfaatkan Tensor Core GPU secara optimal (komputasi intensif dengan intensitas aritmatika tinggi).",
          "6. **Alokasi KV Cache & PagedAttention:** Selama prefill, tensor proyeksi Key dan Value dari seluruh token prompt dihitung dan disimpan di High-Bandwidth Memory (HBM) GPU menggunakan blok memori virtual non-bersebelahan yang dikelola oleh PagedAttention.",
          "7. **Fase Decode (Generasi Token Autoregresif):** Model memasuki perulangan generasi sekuensial. Pada setiap iterasi, model mengambil satu token baru yang baru saja dibuat, membaca riwayat KV cache dari seluruh token sebelumnya, dan menghitung distribusi probabilitas token berikutnya. Fase ini mengeksekusi perkalian matriks-vektor (GEMV) yang sangat terikat oleh bandwidth memori GPU (intensitas aritmatika rendah < 5 FLOPs/byte).",
          "8. **Detokenisasi, Streaming & Telemetri:** Token ID keluaran dipetakan kembali ke karakter UTF-8, diperiksa terhadap stop sequence, dan langsung dikirim ke socket klien sebagai chunk SSE. Metrik generasi (TTFT, interval antar-token, jumlah token prompt/decode) dicatat ke dalam pipeline observabilitas.",
        ],
      },
      diagram: "inference-pipeline",
    },
    {
      id: "metrics-that-matter",
      title: {
        en: "4. Understanding the Metrics That Matter",
        id: "4. Memahami Metrik Kinerja yang Menentukan",
      },
      paragraphs: {
        en: [
          "Traditional web applications measure performance primarily through request-response latency (e.g., p95 HTTP response duration). In production inference engineering, overall request duration is a coarse and deceptive metric. A 2,000-token generation request naturally takes longer than a 50-token request without indicating system degradation.",
          "Production inference systems must be evaluated across distinct, fine-grained metrics:",
          "• **Time to First Token (TTFT):** The duration from when the client submits the HTTP request to when the first generated token arrives at the client socket ($T_{\\text{first}} - T_{\\text{submit}}$). TTFT is governed by ingress network latency, queue waiting time, prompt tokenization, and the prefill execution phase. For human-facing conversational applications, TTFT directly determines perceived responsiveness.",
          "• **Time Per Output Token (TPOT):** The time required to generate each subsequent token during the autoregressive decode phase ($[T_{\\text{finish}} - T_{\\text{first}}] / [N_{\\text{output\\_tokens}} - 1]$). TPOT is dictated by GPU memory bandwidth and active concurrent batch size. Typical human reading speed corresponds to 15–25 tokens per second (TPOT of 40–65 ms).",
          "• **Inter-Token Latency (ITL) & Jitter:** The time delta between consecutive tokens in a live stream. Even if average TPOT is 30 ms, if a long prefill request suddenly preempts the GPU, the stream can stall for 500 ms before resuming. High ITL jitter produces jarring, stuttering user interfaces.",
          "• **End-to-End (E2E) Latency:** Total request turnaround: $T_{\\text{E2E}} = \\text{TTFT} + (N_{\\text{output}} - 1) \\times \\text{TPOT}$. Useful for offline batch pipelines, but secondary to TTFT/TPOT in interactive products.",
          "• **Throughput (Requests/sec vs. Tokens/sec):** System capacity must be bifurcated into *Input Tokens per Second* (prefill throughput) and *Output Tokens per Second* (generation throughput). High output token throughput maximizes infrastructure return on investment.",
          "• **GPU Saturation vs. Memory Utilization:** A GPU running at '99% Utilization' in `nvidia-smi` often merely indicates that the compute cores are stalled waiting on memory transfers from HBM. Real system health requires monitoring the **KV Cache Allocation Factor** — the fraction of physical VRAM currently holding active KV blocks.",
        ],
        id: [
          "Aplikasi web tradisional umumnya mengukur performa melalui latensi request-response biasa (misalnya durasi HTTP response p95). Dalam inference engineering produksi, total durasi request adalah metrik yang kasar dan sering menipu. Permintaan yang menghasilkan 2.000 token tentu membutuhkan waktu lebih lama dibanding permintaan 50 token tanpa berarti sistem mengalami degradasi.",
          "Sistem inferensi produksi wajib dievaluasi menggunakan metrik terperinci yang berbeda:",
          "• **Time to First Token (TTFT):** Waktu dari saat klien mengirimkan request hingga token pertama tiba di socket klien ($T_{\\text{first}} - T_{\\text{submit}}$). TTFT ditentukan oleh latensi jaringan, waktu tunggu antrean, tokenisasi prompt, dan eksekusi fase prefill. Untuk aplikasi percakapan interaktif, TTFT adalah penentu utama kepuasan pengguna.",
          "• **Time Per Output Token (TPOT):** Waktu yang dibutuhkan untuk menghasilkan setiap token berikutnya selama fase decode autoregresif ($[T_{\\text{finish}} - T_{\\text{first}}] / [N_{\\text{output\\_tokens}} - 1]$). TPOT dibatasi oleh bandwidth memori GPU dan ukuran batch konkurensi aktif. Kecepatan membaca manusia normal berkisar 15–25 token per detik (TPOT 40–65 ms).",
          "• **Inter-Token Latency (ITL) & Jitter:** Selisih waktu antar-token berturut-turut dalam streaming langsung. Meskipun rata-rata TPOT 30 ms, jika request prefill yang panjang tiba-tiba mendominasi GPU, streaming dapat terhenti selama 500 ms sebelum berlanjut kembali. Variansi ITL yang tinggi menghasilkan tampilan teks yang tersendat-sendat.",
          "• **End-to-End (E2E) Latency:** Total waktu penyelesaian permintaan: $T_{\\text{E2E}} = \\text{TTFT} + (N_{\\text{output}} - 1) \\times \\text{TPOT}$. Sangat berguna untuk pipeline batch offline, namun bersifat sekunder dibanding TTFT/TPOT pada produk interaktif.",
          "• **Throughput (Request/detik vs Token/detik):** Kapasitas sistem harus dipisahkan menjadi *Token Input per Detik* (throughput prefill) dan *Token Output per Detik* (throughput generasi). Throughput token output yang tinggi memaksimalkan efisiensi investasi infrastruktur.",
          "• **Saturasi GPU vs Utilisasi Memori:** GPU yang terbaca '99% Utilization' pada `nvidia-smi` sering kali hanya menandakan bahwa inti komputasi sedang menganggur menunggu transfer data dari HBM. Kesehatan sistem yang sesungguhnya diukur melalui **KV Cache Allocation Factor** — persentase VRAM fisik yang sedang menampung blok KV aktif.",
        ],
      },
      table: {
        headers: {
          en: [
            "Metric",
            "Target Profile (Interactive)",
            "Target Profile (Batch/RAG)",
            "Primary Hardware Bottleneck",
            "Key Engineering Levers",
          ],
          id: [
            "Metrik",
            "Profil Target (Interaktif)",
            "Profil Target (Batch/RAG)",
            "Bottleneck Perangkat Keras",
            "Tuas Rekayasa Kunci",
          ],
        },
        rows: {
          en: [
            [
              "Time to First Token (TTFT)",
              "p50 < 350 ms, p99 < 800 ms",
              "p50 < 3.5 s, p99 < 8.0 s",
              "Compute bound (Tensor Cores) & Queue depth",
              "Chunked prefill, Prefix caching, Tensor parallelism",
            ],
            [
              "Time Per Output Token (TPOT)",
              "p50 < 30 ms, p99 < 50 ms (30+ tps)",
              "p50 < 80 ms (throughput focused)",
              "Memory bandwidth bound (HBM transfer)",
              "Continuous batching, FP8 quantization, Speculative decoding",
            ],
            [
              "Inter-Token Latency (ITL)",
              "Standard deviation < 8 ms",
              "Unconstrained",
              "Prefill interference during decode steps",
              "Chunked prefill budget, Iteration-level scheduling",
            ],
            [
              "KV Cache VRAM Headroom",
              "15% - 25% safety buffer",
              "5% - 10% safety buffer",
              "GPU VRAM Capacity (80 GB per SXM GPU)",
              "PagedAttention, Grouped-Query Attention (GQA), CPU offload",
            ],
            [
              "Cost per 1M Output Tokens",
              "Optimized for SLA compliance",
              "Minimized for maximum volume",
              "Total Cost of Ownership (GPU hourly rate)",
              "High continuous batch concurrency, Model distillation",
            ],
          ],
          id: [
            [
              "Time to First Token (TTFT)",
              "p50 < 350 ms, p99 < 800 ms",
              "p50 < 3.5 s, p99 < 8.0 s",
              "Batas komputasi (Tensor Cores) & antrean",
              "Chunked prefill, Prefix caching, Tensor parallelism",
            ],
            [
              "Time Per Output Token (TPOT)",
              "p50 < 30 ms, p99 < 50 ms (30+ tps)",
              "p50 < 80 ms (fokus throughput)",
              "Batas bandwidth memori (transfer HBM)",
              "Continuous batching, kuantisasi FP8, Speculative decoding",
            ],
            [
              "Inter-Token Latency (ITL)",
              "Standar deviasi < 8 ms",
              "Fleksibel / tidak dibatasi",
              "Interferensi prefill saat langkah decode",
              "Batas budget chunked prefill, penjadwalan per iterasi",
            ],
            [
              "KV Cache VRAM Headroom",
              "Buffer aman 15% - 25%",
              "Buffer aman 5% - 10%",
              "Kapasitas VRAM GPU (80 GB per GPU SXM)",
              "PagedAttention, Grouped-Query Attention (GQA), CPU offload",
            ],
            [
              "Biaya per 1 Juta Token Output",
              "Dioptimalkan untuk kepatuhan SLA",
              "Diminimalkan untuk volume maksimal",
              "Total Cost of Ownership (biaya sewa GPU)",
              "Konkurensi batch tinggi, distilasi model",
            ],
          ],
        },
        caption: {
          en: "Table 1: Illustrative comparison of inference performance profiles and hardware constraints across operational workloads.",
          id: "Tabel 1: Perbandingan ilustratif profil performa inferensi dan batasan perangkat keras pada berbagai beban kerja operasional.",
        },
      },
    },
    {
      id: "core-optimization-techniques",
      title: {
        en: "5. The Core Optimization Techniques",
        id: "5. Teknik Optimasi Inti Rekayasa Inferensi",
      },
      paragraphs: {
        en: [
          "Optimizing production inference is fundamentally an exercise in navigating hardware trade-offs between compute capacity, memory capacity, and memory interconnect bandwidth. Over the past three years, several breakthrough techniques have transformed LLM serving from a fragile academic setup into a resilient engineering discipline.",
          "**1. Continuous Batching (Iteration-Level Scheduling):** Traditional deep learning serving engines relied on static batching: grouping $N$ requests together, padding all sequences to the length of the longest request, and executing forward passes until every sequence generated its end-of-sequence (EOS) token. If one request generated 1,000 tokens while others finished at 20 tokens, the short requests were trapped, wasting GPU cycles on empty padding. Systems like [Orca](https://www.usenix.org/conference/osdi22/presentation/yu) (Yu et al., 2022) introduced continuous (iteration-level) batching: the batch is updated after every single decode step. Completed sequences are evicted instantly, and newly arrived requests are dynamically inserted into the batch without waiting for previous jobs to terminate.",
          "**2. KV Caching & Grouped-Query Attention (GQA):** In standard autoregressive self-attention, generating token $t$ requires computing dot products between the current query and the key/value representations of all preceding tokens $1 \\dots t-1$. Recalculating keys and values at every step incurs an intractable $O(N^2)$ computational penalty. A KV Cache retains the computed keys and values in GPU memory, reducing subsequent decode steps to $O(N)$ operations.",
          "However, the KV cache grows linearly with context length and concurrency. The precise memory consumption per active token across a model is governed by:",
          "$$\\text{Memory}_{\\text{KV}} = 2 \\times 2 \\times n_{\\text{layers}} \\times n_{\\text{heads\\_kv}} \\times d_{\\text{head}} \\times \\text{precision bytes}$$",
          "For an FP16 model with 80 layers, 8 KV heads (Grouped-Query Attention), head dimension 128, each token requires $2 \\times 2 \\times 80 \\times 8 \\times 128 \\times 2 = 655,360 \\text{ bytes} \\approx 640 \\text{ KB}$. A concurrency of 64 requests running 4,000 tokens each consumes over **163 GB of pure VRAM** solely for the KV cache — surpassing the entire memory capacity of two 80 GB GPUs!",
          "**3. PagedAttention & Virtual Memory Management:** Prior to the landmark [vLLM paper](https://arxiv.org/abs/2309.06180) (Kwon et al., SOSP 2023), serving systems pre-allocated contiguous VRAM for each request based on its maximum potential context length (e.g., allocating a full 4,096-token buffer even if the request only used 300 tokens). This caused severe internal fragmentation (wasting 60–80% of GPU memory) and external fragmentation. Inspired by operating system virtual memory, PagedAttention divides the KV cache into fixed-size physical memory blocks (typically 16 or 32 tokens). Logical sequence blocks are mapped to non-contiguous physical blocks via a dynamic block table. This eliminates fragmentation, bringing wasted memory under 4% and enabling multi-turn copy-on-write sharing.",
          "**4. Model Quantization:** Floating-point representations dictate weight footprint and memory bus transfer speeds. In decode phases, where throughput is strictly memory-bandwidth bound, reading 140 GB of FP16 weights across HBM limits generation speed. Quantization compresses numerical representations:",
          "• *Weight-Only Quantization (AWQ, GPTQ - INT4/INT8):* Compresses weights while keeping activations in FP16/BF16. Reduces weight size by 50–75%, cutting memory transfer time in half during the decode phase.",
          "• *Weight-and-Activation Quantization (FP8, SmoothQuant INT8):* Quantizes both weights and input activations to 8-bit formats. This unlocks high-throughput FP8 Tensor Core matrix operations, dramatically accelerating the compute-bound prefill phase on modern architectures (NVIDIA Hopper H100/H200, Ada Lovelace).",
          "• *Trade-offs:* Quantization can degrade reasoning capabilities, code syntax generation, and long-context perplexity if outlier channels are not carefully preserved.",
          "**5. Speculative Decoding:** Introduced by [Leviathan et al.](https://arxiv.org/abs/2211.17192) (2023), speculative decoding pairs a small, fast 'draft model' (e.g., a 1B–3B parameter model) with a large 'target model' (e.g., a 70B parameter model). The draft model speculatively generates $K$ candidate tokens quickly. The large target model then evaluates all $K$ candidates simultaneously in a single parallel forward pass using modified rejection sampling. If $m \\le K$ tokens are accepted, the system generates $m+1$ tokens in the time of a single large model step. Speculative decoding provides genuine speedups (1.5x–2.5x) under low concurrency, but its benefits vanish under high concurrent batches where the GPU is already compute-saturated.",
          "**6. Parallelism Strategies (TP vs. PP):** When a model checkpoint exceeds the memory of a single GPU (e.g., a 70B model in 16-bit precision requires ~140 GB, exceeding an 80 GB GPU):",
          "• *Tensor Parallelism (TP):* Shards individual linear weight matrices across GPUs within the same server node. Each attention head or MLP row is computed in parallel, followed by an `All-Reduce` collective communication step across NVLink (900 GB/s on H100). TP introduces microsecond-level synchronization overhead; running TP across PCIe or network switches causes catastrophic latency penalties.",
          "• *Pipeline Parallelism (PP):* Partitions sequential transformer layers across separate nodes or machines. Requests pass sequentially through pipeline stages. While PP requires lower interconnect bandwidth, it suffers from 'pipeline bubble' overhead where GPUs sit idle waiting for preceding stages.",
          "**7. Automatic Prefix Caching (Radix Attention):** Many production applications feature heavily repeated prompts: multi-tenant system instructions, API documentation context in RAG applications, or prior dialogue history in chatbots. Prefix caching indexes KV blocks in a Radix Tree. When a new request arrives with a matching prefix, the engine bypasses the prefill phase entirely, reusing the pre-computed KV states directly from VRAM. This drops TTFT from hundreds of milliseconds to under 15 milliseconds for cached contexts.",
        ],
        id: [
          "Mengoptimalkan inferensi produksi pada dasarnya adalah seni menavigasi trade-off perangkat keras antara kapasitas komputasi, kapasitas memori, dan bandwidth interkoneksi memori. Selama tiga tahun terakhir, beberapa teknik terobosan telah mengubah penyajian LLM dari eksperimen akademik yang rapuh menjadi disiplin rekayasa yang kokoh.",
          "**1. Continuous Batching (Penjadwalan Tingkat Iterasi):** Mesin penyajian deep learning tradisional mengandalkan batching statis: mengelompokkan $N$ permintaan bersamaan, melakukan padding seluruh teks hingga sepanjang permintaan terpanjang, dan menjalankan forward pass hingga seluruh urutan menghasilkan token end-of-sequence (EOS). Jika satu permintaan menghasilkan 1.000 token sementara permintaan lain selesai di token ke-20, permintaan pendek tersebut tertahan sia-sia menunggu komputasi padding kosong. Sistem seperti [Orca](https://www.usenix.org/conference/osdi22/presentation/yu) (Yu et al., 2022) memperkenalkan continuous batching: batch diperbarui setelah setiap langkah decode tunggal. Permintaan yang selesai langsung dikeluarkan, dan permintaan baru yang masuk langsung disisipkan tanpa menunggu proses lain selesai.",
          "**2. KV Caching & Grouped-Query Attention (GQA):** Pada self-attention autoregresif standar, menghasilkan token $t$ membutuhkan komputasi dot product antara query saat ini dengan representasi key dan value dari seluruh token sebelumnya $1 \\dots t-1$. Menghitung ulang key dan value di setiap langkah memicu beban komputasi kuadratik $O(N^2)$ yang tidak masuk akal. KV Cache menyimpan key dan value yang telah dihitung sebelumnya di memori GPU, mereduksi langkah decode berikutnya menjadi operasi linear $O(N)$.",
          "Namun, KV cache membengkak secara linear seiring bertambahnya panjang konteks dan jumlah konkurensi. Konsumsi memori per token aktif dihitung melalui formula:",
          "$$\\text{Memori}_{\\text{KV}} = 2 \\times 2 \\times n_{\\text{layers}} \\times n_{\\text{heads\\_kv}} \\times d_{\\text{head}} \\times \\text{byte presisi}$$",
          "Untuk model FP16 dengan 80 layer, 8 head KV (Grouped-Query Attention), dimensi head 128, setiap token membutuhkan $2 \\times 2 \\times 80 \\times 8 \\times 128 \\times 2 = 655.360 \\text{ byte} \\approx 640 \\text{ KB}$. Konkurensi 64 permintaan aktif dengan panjang 4.000 token mengonsumsi lebih dari **163 GB VRAM murni** hanya untuk KV cache — melebihi seluruh kapasitas memori dua GPU 80 GB!",
          "**3. PagedAttention & Manajemen Memori Virtual:** Sebelum publikasi riset seminal [vLLM](https://arxiv.org/abs/2309.06180) (Kwon et al., SOSP 2023), sistem serving mengalokasikan VRAM bersebelahan secara statis berdasarkan batas konteks maksimum (misal: mengalokasikan buffer penuh 4.096 token meski pengguna hanya memakai 300 token). Hal ini memicu fragmentasi internal parah (menyia-nyiakan 60–80% memori GPU) dan fragmentasi eksternal. Terinspirasi oleh konsep virtual memory pada sistem operasi, PagedAttention membagi KV cache menjadi blok-blok memori fisik berukuran tetap (biasanya 16 atau 32 token). Blok sekuens logis dipetakan ke blok fisik non-bersebelahan melalui tabel blok dinamis. Pendekatan ini memangkas pemborosan memori hingga di bawah 4% dan memungkinkan sharing konteks berbasis copy-on-write.",
          "**4. Kuantisasi Model:** Representasi floating-point menentukan ukuran bobot dan kecepatan transfer pada bus memori. Pada fase decode di mana throughput terikat oleh bandwidth memori, membaca bobot FP16 sebesar 140 GB melintasi HBM sangat membatasi kecepatan generasi. Kuantisasi mengompresi representasi numerik:",
          "• *Kuantisasi Weight-Only (AWQ, GPTQ - INT4/INT8):* Mengompresi bobot model namun mempertahankan aktivasi pada format FP16/BF16. Mengurangi ukuran bobot hingga 50–75%, memotong waktu transfer memori hingga setengahnya saat fase decode.",
          "• *Kuantisasi Weight-and-Activation (FP8, SmoothQuant INT8):* Menguantisasi bobot sekaligus aktivasi input ke format 8-bit. Ini membuka kapabilitas perkalian matriks Tensor Core FP8 throughput tinggi, yang secara dramatis mempercepat fase prefill komputasi-intensif pada arsitektur modern (NVIDIA Hopper H100/H200, Ada Lovelace).",
          "• *Trade-off:* Kuantisasi dapat menurunkan daya penalaran logis, ketepatan sintaks kode, dan akurasi konteks panjang jika saluran outlier numerik tidak dipertahankan dengan cermat.",
          "**5. Speculative Decoding:** Diperkenalkan oleh [Leviathan et al.](https://arxiv.org/abs/2211.17192) (2023), speculative decoding memasangkan model draf kecil dan cepat (misal: model 1B–3B parameter) dengan model target utama berukuran besar (misal: model 70B parameter). Model draf menghasilkan $K$ token kandidat secara cepat. Model target kemudian mengevaluasi seluruh $K$ kandidat sekaligus dalam satu forward pass paralel menggunakan rejection sampling termodifikasi. Jika $m \\le K$ token diterima, sistem menghasilkan $m+1$ token dalam waktu yang setara dengan satu langkah model besar. Speculative decoding memberikan akselerasi nyata (1.5x–2.5x) pada konkurensi rendah, namun keuntungannya hilang pada konkurensi tinggi saat GPU sudah tersaturasi komputasi penuh.",
          "**6. Strategi Paralelisme (TP vs PP):** Ketika checkpoint model melampaui kapasitas memori satu GPU (contoh: model 70B pada presisi 16-bit membutuhkan ~140 GB, melebihi kapasitas GPU 80 GB):",
          "• *Tensor Parallelism (TP):* Membagi matriks bobot linear di antara beberapa GPU di dalam satu server node yang sama. Setiap attention head atau baris MLP dihitung bersamaan, diikuti langkah komunikasi kolektif `All-Reduce` melalui NVLink (900 GB/s pada H100). TP memperkenalkan latensi sinkronisasi tingkat mikrodetik; menjalankan TP melintasi PCIe atau switch jaringan akan melumpuhkan performa latensi.",
          "• *Pipeline Parallelism (PP):* Membagi layer transformer berurutan melintasi node atau mesin yang terpisah. Permintaan melintas secara sekuensial dari satu tahap ke tahap berikutnya. Meskipun PP membutuhkan bandwidth interkoneksi yang lebih rendah, pendekatan ini mengalami hambatan 'pipeline bubble' di mana GPU terpaksa menganggur menunggu hasil tahap sebelumnya.",
          "**7. Automatic Prefix Caching (Radix Attention):** Banyak aplikasi produksi memiliki prompt berulang: instruksi sistem multi-tenant, konteks dokumentasi API pada aplikasi RAG, atau riwayat percakapan sebelumnya pada chatbot. Prefix caching mengindeks blok KV ke dalam struktur data Radix Tree. Ketika ada permintaan baru dengan prefix yang cocok, engine melewati fase prefill sepenuhnya dan langsung menggunakan kembali KV cache yang sudah tersimpan di VRAM. Hal ini memangkas TTFT dari ratusan milidetik menjadi di bawah 15 milidetik untuk konteks yang tersimpan di cache.",
        ],
      },
      code: {
        language: "bash",
        snippet: `# Launching production-grade vLLM server with advanced optimizations:
# - Chunked prefill to eliminate ITL jitter
# - Automatic prefix caching for multi-turn conversations
# - Tensor parallelism across 4x NVLink-connected GPUs
# - FP8 KV caching for memory footprint reduction

python3 -m vllm.entrypoints.openai.api_server \\
  --model meta-llama/Llama-3.1-70B-Instruct \\
  --tensor-parallel-size 4 \\
  --max-model-len 8192 \\
  --gpu-memory-utilization 0.92 \\
  --enable-chunked-prefill \\
  --max-num-batched-tokens 2048 \\
  --enable-prefix-caching \\
  --kv-cache-dtype fp8 \\
  --host 0.0.0.0 \\
  --port 8000`,
        caption: {
          en: "Production vLLM engine configuration demonstrating memory allocation, chunked prefill, and prefix caching parameters",
          id: "Konfigurasi engine vLLM produksi yang menerapkan alokasi memori, chunked prefill, dan parameter prefix caching",
        },
      },
    },
    {
      id: "scheduling-queueing-admission",
      title: {
        en: "6. Scheduling, Queueing, and Admission Control",
        id: "6. Penjadwalan, Antrean, dan Kendali Admisi (Admission Control)",
      },
      paragraphs: {
        en: [
          "A common architectural misconception is assuming that inference latency is purely determined by the raw arithmetic speed of GPU hardware. In production, serving performance is dominated by **scheduling policies and queue dynamics**.",
          "The core difficulty arises from extreme prompt and output variance. Unlike standard database transactions that exhibit predictable execution envelopes, LLM requests are bimodal: one user submits a 50-token query expecting a 500-token answer, while another submits a 15,000-token PDF prompt expecting a concise 50-token summary.",
          "In a naive continuous batching engine, inserting a 15,000-token prompt into the active batch monopolizes the GPU Tensor Cores for several consecutive iterations. Active conversational decode requests are starved, causing their Inter-Token Latency to spike from 25 ms to 800 ms — a phenomenon known as *Decode Starvation*.",
          "Modern serving runtimes mitigate this through **Chunked Prefill** (e.g., [Sarathi-Serve](https://www.usenix.org/conference/osdi24/presentation/agrawal), Agrawal et al., OSDI 2024). Instead of processing a massive prompt in one giant step, the prefill is split into bounded chunks (e.g., 512 tokens) and scheduled alongside decode tokens within each forward pass. This flattens latency variance and preserves tight ITL guarantees.",
          "Beyond iteration scheduling, a robust inference service requires rigorous **Admission Control** at the application boundary:",
          "• *Bounded Queuing & Load Shedding:* Never allow an unbounded in-memory request queue. When queue wait times exceed defined user SLA deadlines (e.g., TTFT budget of 2 seconds), immediately return HTTP 429 (Too Many Requests) or route overflow to a secondary serverless fallback provider.",
          "• *Client Cancellation Propagation:* If a user closes their browser window or navigates away while a generation is in progress, the edge server must detect the socket disconnect and signal cancellation downstream to the inference scheduler. Without cancellation propagation, the GPU worker will blindly continue computing tokens until reaching maximum length, burning valuable VRAM and compute cycles on discarded output.",
          "• *Prioritization & Fairness:* Production platforms must separate interactive conversational traffic from background asynchronous batch tasks. Batch indexing jobs should be assigned lower queue priority and prefill budgets to ensure interactive user TTFT is never compromised.",
        ],
        id: [
          "Kesalahpahaman arsitektur yang sering terjadi adalah berasumsi bahwa latensi inferensi murni ditentukan oleh kecepatan aritmatika perangkat keras GPU semata. Di lingkungan produksi nyata, performa penyajian justru didominasi oleh **kebijakan penjadwalan dan dinamika antrean**.",
          "Kesulitan mendasar berakar dari variansi ekstrem antara prompt dan output. Tidak seperti transaksi basis data biasa yang memiliki durasi relatif seragam, permintaan LLM bersifat bimodal: seorang pengguna mengirimkan pertanyaan 50 token dan mengharapkan jawaban 500 token, sementara pengguna lain mengunggah dokumen PDF 15.000 token untuk diringkas menjadi 50 token.",
          "Pada engine continuous batching sederhana, menyisipkan prompt 15.000 token ke dalam batch yang sedang berjalan akan memonopoli Tensor Core GPU selama beberapa iterasi penuh. Akibatnya, permintaan percakapan lain yang sedang berada di fase decode mengalami kelaparan komputasi (*Decode Starvation*), menyebabkan Inter-Token Latency melonjak dari 25 ms menjadi 800 ms.",
          "Runtime modern mengatasi masalah ini menggunakan **Chunked Prefill** (seperti [Sarathi-Serve](https://www.usenix.org/conference/osdi24/presentation/agrawal), Agrawal et al., OSDI 2024). Alih-alih memproses prompt raksasa dalam satu forward pass besar, prompt dipecah menjadi potongan-potongan terukur (misal: 512 token) dan dijadwalkan bersamaan dengan token decode pada setiap forward pass. Pendekatan ini meratakan variansi latensi dan menjaga garansi ITL tetap stabil.",
          "Di luar penjadwalan per iterasi, layanan inferensi yang tangguh membutuhkan **Kendali Admisi (Admission Control)** yang ketat pada perimeter aplikasi:",
          "• *Batas Antrean & Load Shedding:* Jangan pernah membiarkan antrean memori tanpa batas. Ketika waktu tunggu antrean melebihi ambang batas SLA pengguna (misal: budget TTFT 2 detik), sistem harus segera mengembalikan HTTP 429 (Too Many Requests) atau mengalihkan lalu lintas ke penyedia fallback serverless sekunder.",
          "• *Propagasi Pembatalan Klien:* Jika pengguna menutup tab browser atau berpindah halaman saat teks sedang digenerasi, server gateway harus mendeteksi terputusnya koneksi socket dan meneruskan sinyal pembatalan ke penjadwal inferensi. Tanpa propagasi ini, worker GPU akan terus menghasilkan token hingga batas maksimum, membakar VRAM dan siklus komputasi berharga untuk data yang akhirnya dibuang.",
          "• *Prioritas & Keadilan (Fairness):* Platform produksi harus memisahkan lalu lintas chat interaktif dari pekerjaan batch asinkron di latar belakang. Tugas pengindeksan dokumen harus diberi prioritas antrean lebih rendah agar TTFT pengguna interaktif tidak pernah terganggu.",
        ],
      },
      code: {
        language: "python",
        snippet: `import asyncio
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse

app = FastAPI()

@app.post("/v1/chat/completions")
async def chat_stream(request: Request):
    # 1. Admission Control: Check system saturation before accepting
    if global_scheduler.is_saturated():
        return {"error": "Server overloaded. Please retry with backoff."}, 429

    payload = await request.json()
    request_id = payload.get("id", str(uuid.uuid4()))

    async def token_generator():
        try:
            # Enqueue request to vLLM engine
            stream = await engine.generate(payload["prompt"], request_id=request_id)
            async for token in stream:
                # 2. Cancellation Check: Abort GPU computation if client disconnected
                if await request.is_disconnected():
                    await engine.abort(request_id)
                    break
                yield f"data: {json.dumps({'text': token})}\\n\\n"
        except asyncio.CancelledError:
            # Handle task cancellation
            await engine.abort(request_id)
            raise

    return StreamingResponse(token_generator(), media_type="text/event-stream")`,
        caption: {
          en: "FastAPI streaming endpoint implementing admission control and immediate client disconnect propagation to abort GPU execution",
          id: "Endpoint streaming FastAPI yang menerapkan kendali admisi dan deteksi koneksi putus klien untuk membatalkan eksekusi GPU",
        },
      },
    },
    {
      id: "choosing-serving-stack",
      title: {
        en: "7. Choosing an Inference Serving Stack",
        id: "7. Memilih Tumpukan Teknologi Penyajian Inferensi",
      },
      paragraphs: {
        en: [
          "Selecting an inference serving stack requires matching application latency requirements, traffic scale, internal engineering bandwidth, and hardware infrastructure. There is no universally superior engine; each stack occupies a distinct Pareto point regarding throughput, flexibility, and operational complexity.",
          "• **vLLM:** The de-facto open-source standard for flexible LLM serving. Implemented in Python with performance-critical CUDA/C++ kernels. Excellent community momentum, native support for PagedAttention, chunked prefill, speculative decoding, and automatic prefix caching. Ideal for teams requiring broad open-weights architecture support and fast iteration cycles.",
          "• **NVIDIA TensorRT-LLM:** NVIDIA's enterprise-grade serving compiler and runtime. Deeply fused CUDA kernels, heavily optimized in-flight batching, and custom GEMM algorithms engineered specifically for NVIDIA Tensor Core architectures. Delivers the absolute highest raw tokens-per-second throughput on pure NVIDIA hardware, but demands higher operational complexity, specialized build containers, and slower model weight reloading times.",
          "• **Hugging Face Text Generation Inference (TGI):** A battle-tested production solution combining a high-performance Rust web frontend with a PyTorch/FlashAttention backend. Excellent enterprise integration with Hugging Face Hub, built-in OpenTelemetry tracing, and clean Docker deployment targets.",
          "• **Native Framework Serving (PyTorch / torch.compile):** Useful for academic prototyping, model architecture development, and custom research. Lacks native multi-request continuous batching and virtualized KV memory management, making it unsuitable for high-concurrency production deployments.",
          "• **Managed Cloud APIs (AWS Bedrock, Azure AI, Groq, Together, Fireworks):** Fully managed serverless or provisioned throughput endpoints. Eliminates cluster provisioning, cold-start management, and GPU hardware contracts. Ideal for fast time-to-market and low-to-medium variable workloads, but presents data governance constraints, strict provider rate limits, and higher long-term operational costs at sustained enterprise scale.",
        ],
        id: [
          "Memilih tumpukan teknologi (serving stack) membutuhkan penyesuaian cermat antara target latensi aplikasi, skala lalu lintas, keahlian tim rekayasa, dan ketersediaan infrastruktur perangkat keras. Tidak ada satu engine yang secara mutlak unggul dalam segala skenario; masing-masing menempati posisi berbeda pada kurva trade-off antara throughput, fleksibilitas, dan kompleksitas operasional.",
          "• **vLLM:** Standar open-source paling populer untuk penyajian LLM fleksibel. Diimplementasikan menggunakan Python dengan kernel CUDA/C++ pada jalur komputasi kritis. Didukung komunitas yang sangat aktif, dukungan bawaan untuk PagedAttention, chunked prefill, speculative decoding, dan automatic prefix caching. Sangat ideal untuk tim yang membutuhkan dukungan arsitektur model luas dan siklus iterasi yang cepat.",
          "• **NVIDIA TensorRT-LLM:** Compiler dan runtime penyajian kelas enterprise dari NVIDIA. Dilengkapi fusi kernel CUDA mendalam, in-flight batching yang sangat optimal, dan kernel GEMM yang dirancang khusus untuk arsitektur Tensor Core NVIDIA. Memberikan throughput token-per-detik mentah tertinggi pada perangkat keras NVIDIA murni, namun menuntut keahlian operasional lebih tinggi, container build khusus, dan waktu reload bobot yang lebih lambat.",
          "• **Hugging Face Text Generation Inference (TGI):** Solusi produksi teruji yang menggabungkan web frontend berkinerja tinggi berbasis Rust dengan backend PyTorch/FlashAttention. Menawarkan integrasi mulus dengan ekosistem Hugging Face Hub, observabilitas OpenTelemetry bawaan, dan kemudahan deployment kontainer.",
          "• **Native Framework Serving (PyTorch / torch.compile):** Cocok untuk eksperimen akademik, penelitian arsitektur model baru, dan pembuatan prototipe internal. Tidak memiliki fitur continuous batching multi-permintaan dan manajemen memori KV virtual bawaan, sehingga tidak layak untuk beban kerja produksi berkonkurensi tinggi.",
          "• **Managed Cloud APIs (AWS Bedrock, Azure AI, Groq, Together, Fireworks):** Endpoint serverless terkelola penuh atau throughput teralokasi. Menghilangkan kerumitan penyediaan klaster, cold start, dan kontrak server GPU fisik. Sangat tepat untuk peluncuran produk cepat dan beban kerja bervolume menengah, namun memiliki batasan tata kelola data, rate limit penyedia, serta biaya kumulatif yang lebih tinggi pada skala enterprise berkelanjutan.",
        ],
      },
      table: {
        headers: {
          en: [
            "Serving Stack",
            "Primary Use Case",
            "Hardware & Deployment",
            "Operational Complexity",
            "Flexibility",
            "Key Trade-offs",
          ],
          id: [
            "Serving Stack",
            "Kasus Penggunaan Utama",
            "Perangkat Keras & Deployment",
            "Kompleksitas Operasional",
            "Fleksibilitas",
            "Trade-off Kunci",
          ],
        },
        rows: {
          en: [
            [
              "vLLM",
              "Production LLM serving, fast multi-model deployment, research-to-prod transition",
              "NVIDIA (A100, H100, L40S, RTX), AMD ROCm, AWS Neuron; standard Docker / K8s",
              "Moderate (Clean Python/C++ codebase, OpenAI-compatible REST server)",
              "Very High (Rapid support for newly released architectures and custom samplers)",
              "Slightly lower raw hardware saturation than TRT-LLM; higher memory management agility",
            ],
            [
              "TensorRT-LLM",
              "Ultra-high-throughput enterprise serving on dedicated NVIDIA clusters",
              "Strictly NVIDIA GPUs with high Tensor Core capability (Hopper, Ada, Ampere)",
              "High (Requires engine compilation, specialized C++ runtime, Triton backend)",
              "Moderate (Model architectures must be supported by NVIDIA TensorRT converters)",
              "Maximum tokens/sec and lowest TPOT; rigid deployment and slower iteration cycles",
            ],
            [
              "Hugging Face TGI",
              "Enterprise deployments integrated with Hugging Face model registry and security tools",
              "NVIDIA GPUs, Intel Gaudi, AWS Inferentia; official OCI container images",
              "Low to Moderate (Single binary Rust orchestrator, clean CLI flags)",
              "High (Standard transformer support, built-in watermark and guardrail hooks)",
              "Strong token streaming performance; slightly less bleeding-edge research features than vLLM",
            ],
            [
              "Native PyTorch",
              "Local debugging, proof-of-concept features, custom architectural research",
              "Any hardware supporting PyTorch (Metal, CPU, CUDA, ROCm)",
              "Very Low (Standard Python imports, native debugging tools)",
              "Unrestricted (Can execute arbitrary custom PyTorch tensors and hooks)",
              "Severe lack of continuous batching, memory fragmentation, unusable under concurrency",
            ],
            [
              "Managed Cloud APIs",
              "Rapid prototyping, zero-ops infrastructure, variable or spiky demand",
              "Serverless multi-tenant cloud hardware managed by vendor",
              "Minimal (REST API integration, zero cluster management)",
              "Low (Constrained to vendor-hosted models and proprietary parameters)",
              "Instant time to market; higher unit cost at scale, external data privacy boundaries",
            ],
          ],
          id: [
            [
              "vLLM",
              "Serving LLM produksi, deployment multi-model cepat, transisi riset-ke-produksi",
              "NVIDIA (A100, H100, L40S, RTX), AMD ROCm, AWS Neuron; Docker / K8s standar",
              "Menengah (Kode Python/C++ bersih, server REST kompatibel OpenAI)",
              "Sangat Tinggi (Dukungan sangat cepat untuk model baru dan custom sampler)",
              "Saturasi perangkat keras mentah sedikit di bawah TRT-LLM; agilitas memori luar biasa",
            ],
            [
              "TensorRT-LLM",
              "Serving enterprise throughput ultra-tinggi pada klaster GPU NVIDIA terdedikasi",
              "Khusus GPU NVIDIA dengan Tensor Core mumpuni (Hopper, Ada, Ampere)",
              "Tinggi (Membutuhkan kompilasi engine, runtime C++, backend Triton)",
              "Menengah (Arsitektur model harus didukung converter TensorRT NVIDIA)",
              "Tokens/detik maksimal dan TPOT terendah; deployment kaku dan iterasi lebih lambat",
            ],
            [
              "Hugging Face TGI",
              "Deployment enterprise yang terintegrasi dengan ekosistem model Hugging Face",
              "NVIDIA GPUs, Intel Gaudi, AWS Inferentia; image kontainer resmi OCI",
              "Rendah hingga Menengah (Orkestrator binary Rust tunggal, konfigurasi rapi)",
              "Tinggi (Mendukung transformer standar, fitur watermark dan guardrail bawaan)",
              "Performa streaming token sangat baik; fitur riset teranyar sedikit di bawah vLLM",
            ],
            [
              "Native PyTorch",
              "Debugging lokal, validasi konsep dasar, riset arsitektur model baru",
              "Semua perangkat keras yang mendukung PyTorch (Metal, CPU, CUDA, ROCm)",
              "Sangat Rendah (Import library Python standar, perkakas debug bawaan)",
              "Tanpa Batas (Bisa menjalankan tensor dan hook khusus sesuka hati)",
              "Ketiadaan continuous batching, fragmentasi memori, tidak layak untuk konkurensi",
            ],
            [
              "Managed Cloud APIs",
              "Prototyping cepat, zero-ops infrastruktur, beban lalu lintas musiman/fluktuatif",
              "Perangkat keras cloud multi-tenant yang dikelola penuh oleh penyedia",
              "Minimal (Integrasi REST API sederhana, tanpa pengelolaan klaster)",
              "Rendah (Terbatas pada model yang disediakan vendor dan parameter standar)",
              "Time to market instan; biaya per unit lebih mahal pada skala besar, isu privasi data",
            ],
          ],
        },
        caption: {
          en: "Table 2: Technical evaluation matrix of leading LLM serving engines and operational deployment models.",
          id: "Tabel 2: Matriks evaluasi teknis engine penyajian LLM terkemuka dan model deployment operasional.",
        },
      },
    },
    {
      id: "benchmarking-methodology",
      title: {
        en: "8. Benchmarking Inference Systems Correctly",
        id: "8. Metodologi Benchmark Sistem Inferensi yang Tepat",
      },
      paragraphs: {
        en: [
          "Inference benchmarking in the AI community is notoriously plagued by 'benchmark theater': marketing claims quoting astronomical tokens-per-second numbers achieved under unrealistic conditions (e.g., batch sizes of 512, synthetic prompt lengths of 8 tokens, zero streaming, and ignoring tail latency entirely).",
          "A reproducible, engineering-grade benchmark must simulate realistic production constraints:",
          "1. **Open-Loop vs. Closed-Loop Traffic:** A closed-loop test maintains a fixed number of concurrent virtual clients: client $i$ issues a request, waits for the complete response, and immediately fires another. This artificially masks queue buildup. Real-world traffic is **open-loop**: requests arrive according to a stochastic Poisson process independent of when the server completes previous requests. Benchmarking under open-loop arrival rates exposes true system saturation and queue collapse points.",
          "2. **Bimodal Prompt Distributions:** Testing solely with uniform 512-in / 128-out requests produces deceptively smooth latency graphs. Real benchmarks must sample from realistic distributions: short conversational queries (100-in / 300-out) mixed with long document summarization (4,000-in / 200-out).",
          "3. **Rigorous Warm-Up Periods:** GPU kernels require compilation, CUDA contexts must initialize, and memory page tables must allocate memory pools during initial forward passes. Discard all measurements from the first 2–5 minutes of load testing to measure steady-state performance.",
          "4. **Percentile Distributions (p50, p95, p99):** Never report mean latency alone. A system with a mean TTFT of 200 ms but a p99 TTFT of 3,500 ms will severely degrade user retention during traffic peaks.",
        ],
        id: [
          "Praktik benchmarking inferensi di komunitas AI kerap terjerumus dalam 'benchmark theater': klaim pemasaran yang membanggakan angka token-per-detik fantastis namun diperoleh pada kondisi tidak realistis (misal: ukuran batch 512, panjang prompt sintetis hanya 8 token, tanpa streaming, dan mengabaikan tail latency sepenuhnya).",
          "Benchmark kelas rekayasa yang dapat direproduksi wajib menyimulasikan batasan dunia nyata secara akurat:",
          "1. **Beban Open-Loop vs Closed-Loop:** Pengujian closed-loop mempertahankan jumlah virtual client konkruen yang tetap: klien $i$ mengirimkan request, menunggu respons selesai sepenuhnya, lalu segera mengirimkan request berikutnya. Pola ini secara artifisial menyembunyikan penumpukan antrean. Lalu lintas dunia nyata bersifat **open-loop**: permintaan datang mengikuti proses stokastik Poisson secara acak tanpa bergantung pada kapan server menyelesaikan permintaan sebelumnya. Menguji sistem dengan model kedatangan open-loop akan membuka titik saturasi sejati dan batas keruntuhan antrean.",
          "2. **Distribusi Prompt Bimodal:** Menguji sistem hanya dengan ukuran seragam 512-input / 128-output akan menghasilkan grafik latensi yang menipu. Pengujian nyata wajib mencampurkan distribusi realistis: pertanyaan percakapan pendek (100-in / 300-out) yang dipadukan dengan ringkasan dokumen panjang (4.000-in / 200-out).",
          "3. **Periode Warm-Up yang Terukur:** Kernel GPU membutuhkan kompilasi awal, CUDA context harus diinisialisasi, dan tabel memori perlu mengalokasikan pool VRAM pada forward pass pertama. Selalu buang data pengukuran dari 2–5 menit pertama pengujian beban agar metrik yang dicatat adalah kondisi stabil (steady-state).",
          "4. **Distribusi Persentil (p50, p95, p99):** Jangan pernah hanya melaporkan nilai rata-rata (mean). Sistem dengan rata-rata TTFT 200 ms namun memiliki p99 TTFT sebesar 3.500 ms akan merusak pengalaman pengguna secara fatal saat terjadi lonjakan trafik.",
        ],
      },
      table: {
        headers: {
          en: [
            "Test Scenario",
            "Workload Profile",
            "Target Concurrency / Rate",
            "Key Metrics to Capture",
            "Failure Condition to Monitor",
          ],
          id: [
            "Skenario Uji",
            "Profil Beban Kerja",
            "Target Konkurensi / Laju",
            "Metrik Kunci yang Dicatat",
            "Kondisi Kegagalan yang Dipantau",
          ],
        },
        rows: {
          en: [
            [
              "Interactive Chat Peak",
              "Short prompt (150 tokens), Medium output (350 tokens)",
              "Poisson arrival: 10 to 80 req/sec",
              "TTFT (p50/p95/p99), TPOT, ITL jitter",
              "TTFT exceeding 800 ms SLA, Queue depth buildup",
            ],
            [
              "RAG Document Ingestion",
              "Long prompt (4,000 - 8,000 tokens), Short output (150 tokens)",
              "Batch concurrency: 16 to 48 concurrent workers",
              "Prefill token throughput (tok/sec), VRAM allocation",
              "GPU Out-Of-Memory (OOM) crash, Decode starvation",
            ],
            [
              "Mixed Production Realism",
              "Bimodal mix: 70% Short Chat, 30% Long RAG",
              "Poisson arrival: 25 req/sec with random burst spikes",
              "p99 TTFT, p99 TPOT, Error rate (HTTP 429/500)",
              "Memory page allocation failure, Thread starvation",
            ],
          ],
          id: [
            [
              "Puncak Chat Interaktif",
              "Prompt pendek (150 token), Output sedang (350 token)",
              "Kedatangan Poisson: 10 hingga 80 req/detik",
              "TTFT (p50/p95/p99), TPOT, variansi ITL",
              "TTFT melebihi batas SLA 800 ms, penumpukan antrean",
            ],
            [
              "Ingesti Dokumen RAG",
              "Prompt panjang (4.000 - 8.000 token), Output pendek (150 token)",
              "Konkurensi batch: 16 hingga 48 worker bersamaan",
              "Throughput token prefill (tok/detik), alokasi VRAM",
              "Crash Out-Of-Memory (OOM) GPU, kelaparan decode",
            ],
            [
              "Realisme Produksi Campuran",
              "Campuran bimodal: 70% Chat Pendek, 30% RAG Panjang",
              "Kedatangan Poisson: 25 req/detik dengan lonjakan mendadak",
              "p99 TTFT, p99 TPOT, Rasio error (HTTP 429/500)",
              "Kegagalan alokasi memori halaman, starvation thread",
            ],
          ],
        },
        caption: {
          en: "Table 3: Recommended experimental matrix for reproducible inference system load testing.",
          id: "Tabel 3: Matriks eksperimen yang direkomendasikan untuk pengujian beban sistem inferensi yang dapat direproduksi.",
        },
      },
      code: {
        language: "bash",
        snippet: `# Reproducible open-loop benchmark using vLLM's official benchmark client
# Simulates a Poisson arrival process with realistic ShareGPT prompt distributions

python3 -m vllm.benchmarks.benchmark_serving \\
  --backend vllm \\
  --host localhost \\
  --port 8000 \\
  --dataset-name sharegpt \\
  --dataset-path ./ShareGPT_V3_unfiltered_cleaned_split.json \\
  --request-rate 25.0 \\
  --num-prompts 1000 \\
  --max-concurrency 64 \\
  --metric-percentiles 50,90,95,99 \\
  --save-result \\
  --result-dir ./benchmark_results/`,
        caption: {
          en: "Executing an open-loop Poisson arrival benchmark with realistic multi-turn prompt distributions",
          id: "Mengeksekusi benchmark kedatangan Poisson open-loop menggunakan dataset prompt percakapan realistis",
        },
      },
    },
    {
      id: "production-reliability-observability",
      title: {
        en: "9. Production Reliability and Observability",
        id: "9. Keandalan Operasional dan Observabilitas Produksi",
      },
      paragraphs: {
        en: [
          "Operating an inference cluster in production requires elevating reliability and observability to the level of standard Tier-1 infrastructure. When serving large language models, failures manifest differently than in traditional microservices.",
          "**The Four Golden Signals of Production Inference:**",
          "• *Latency Distributions:* Separate instrumentation for TTFT, TPOT, and overall E2E duration. Monitor p99 latency regressions continuously.",
          "• *Traffic & Token Velocity:* Total requests per second, active concurrent sequences, prompt tokens/sec, and generated tokens/sec.",
          "• *Error Signatures:* GPU Out-Of-Memory (OOM) events, HTTP 429 rate limit triggers, client disconnect terminations, and CUDA driver kernel panics.",
          "• *Saturation Metrics:* KV Cache Allocation Factor (percentage of VRAM holding active KV blocks), number of requests waiting in the scheduler queue, and host-to-device memory bus utilization.",
          "**Managing GPU Out-Of-Memory (OOM) Events:** Unlike CPU processes that can swap seamlessly to disk, an unexpected GPU memory allocation fault triggers an unrecoverable CUDA kernel panic, crashing the entire model worker process and abruptly dropping all concurrent in-flight streams. Production engines prevent this by reserving a fixed VRAM allocation budget upfront (e.g., `--gpu-memory-utilization 0.90`) and enforcing strict admission controls that refuse new sequences when physical KV block pools are exhausted.",
          "**Liveness vs. Readiness Probes:** A model container that has booted its HTTP server is **not ready** to serve traffic. Initializing CUDA contexts, loading 140 GB of model weights from NVMe storage into VRAM, and executing warm-up compilation passes takes between 45 seconds and 4 minutes. A readiness probe must verify that model weights are pinned in VRAM and that a dummy inference pass completes successfully before the load balancer routes production user traffic to that replica.",
          "**Autoscaling Constraints (Cold Starts):** Standard Kubernetes Horizontal Pod Autoscalers (HPA) assume containers scale out in seconds. For LLMs, scaling out an 8xH100 node involves provisioning a high-end cloud VM, downloading 140 GB of safetensors checkpoints across the network, and initializing tensor parallel communicators — a cold start taking 3 to 8 minutes. Production autoscaling architectures must maintain warm standby capacity, utilize localized high-speed NVMe weight caches, and scale proactively based on queue depth metrics rather than reactive CPU/GPU utilization.",
        ],
        id: [
          "Mengoperasikan klaster inferensi di lingkungan produksi menuntut standar keandalan dan observabilitas yang setara dengan infrastruktur Tier-1 perbankan atau cloud. Saat menyajikan model bahasa besar, pola kegagalan yang muncul sangat berbeda dari arsitektur microservices biasa.",
          "**Empat Sinyal Emas (Four Golden Signals) Inferensi Produksi:**",
          "• *Distribusi Latensi:* Instrumentasi terpisah untuk TTFT, TPOT, dan total durasi E2E. Pantau regresi latensi persentil p99 secara berkala.",
          "• *Kecepatan Trafik & Token:* Total request per detik, jumlah urutan konkuren aktif, token prompt per detik, dan token generasi per detik.",
          "• *Pola Kesalahan (Error Signatures):* Peristiwa Out-Of-Memory (OOM) GPU, pemicu rate limit HTTP 429, pemutusan koneksi klien, serta kepanikan kernel driver CUDA.",
          "• *Metrik Saturasi:* KV Cache Allocation Factor (persentase VRAM yang menampung blok KV aktif), jumlah permintaan yang tertahan di antrean penjadwal, dan utilisasi bus memori host-ke-device.",
          "**Mengelola Risiko GPU Out-Of-Memory (OOM):** Berbeda dengan proses CPU yang dapat melakukan swap data ke disk secara transparan, kesalahan alokasi memori pada GPU memicu kepanikan kernel CUDA yang tidak dapat dipulihkan (unrecoverable panic), merusak proses worker model secara instan dan memutuskan seluruh aliran teks aktif dari ratusan pengguna bersamaan. Engine produksi mencegah ini dengan memesan batas VRAM tetap di awal (misal: `--gpu-memory-utilization 0.90`) dan menerapkan kendali admisi ketat yang menahan permintaan baru saat pool blok KV fisik mendekati batas kritis.",
          "**Perbedaan Liveness vs Readiness Probes:** Kontainer model yang baru saja menyalakan server HTTP **belum siap** menerima trafik. Menginisialisasi CUDA context, menyalin 140 GB bobot model dari penyimpanan NVMe ke VRAM, dan menjalankan warm-up pass forward membutuhkan waktu antara 45 detik hingga 4 menit. Readiness probe wajib memastikan seluruh bobot model telah terkunci sempurna di VRAM dan uji coba inferensi dummy berhasil dieksekusi sebelum load balancer mengarahkan trafik pengguna ke replika tersebut.",
          "**Hambatan Autoscaling (Cold Starts):** Kubernetes Horizontal Pod Autoscaler (HPA) konvensional berasumsi kontainer dapat melakukan scale-out dalam hitungan detik. Pada LLM, menambah node 8xH100 membutuhkan penyediaan VM cloud kelas tinggi, pengunduhan berkas checkpoint safetensors 140 GB melintasi jaringan, serta inisialisasi komunikasi tensor parallel — sebuah proses cold start yang memakan waktu 3 hingga 8 menit. Arsitektur produksi wajib mempertahankan kapasitas warm standby, memanfaatkan cache bobot lokal pada NVMe berkecepatan tinggi, dan melakukan autoscaling proaktif berdasarkan kedalaman antrean alih-alih utilisasi CPU/GPU reaktif.",
        ],
      },
      code: {
        language: "yaml",
        snippet: `# Prometheus Alerting Rules for Production vLLM Cluster
groups:
  - name: inference_sla_alerts
    rules:
      # Alert when KV Cache memory pool is nearing exhaustion (> 90%)
      - alert: HighKVCacheMemorySaturation
        expr: vllm:gpu_cache_usage_factor > 0.90
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "GPU KV Cache VRAM saturated on {{ $labels.instance }}"
          description: "KV Cache utilization is {{ $value | humanizePercentage }}. Risk of request queueing or drop."

      # Alert when requests are stuck waiting in queue (> 5 requests for over 30s)
      - alert: InferenceQueueBacklogSpike
        expr: vllm:num_requests_waiting > 5
        for: 30s
        labels:
          severity: warning
        annotations:
          summary: "Inference queue buildup on {{ $labels.instance }}"
          description: "Queue depth is {{ $value }} waiting requests. Autoscaling trigger recommended."

      # Alert when p95 TTFT breaches user SLA budget (> 1000ms)
      - alert: HighTimeToFirstTokenP95
        expr: histogram_quantile(0.95, sum(rate(vllm:time_to_first_token_seconds_bucket[5m])) by (le)) > 1.0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "p95 TTFT SLA breached (> 1.0s)"
          description: "Users are experiencing sluggish initial responsiveness."`,
        caption: {
          en: "Production Prometheus alerting rules monitoring KV cache saturation, request queue depth, and TTFT SLA breaches",
          id: "Aturan alert Prometheus produksi yang memantau saturasi KV cache, antrean request, dan pelanggaran batas SLA TTFT",
        },
      },
    },
    {
      id: "end-to-end-workflow",
      title: {
        en: "10. An End-to-End Engineering Workflow",
        id: "10. Alur Kerja Rekayasa Sistem Ujung-ke-Ujung",
      },
      paragraphs: {
        en: [
          "Engineering an inference system requires a disciplined, measurement-driven methodology. Blindly applying speculative decoding, FP8 quantization, and large batch sizes without profiling baseline constraints inevitably results in wasted engineering cycles and degraded user experiences.",
          "Production engineering teams should follow this 10-step systematic workflow:",
          "1. **Define Latency Budgets & Target SLAs:** Establish rigid user-facing constraints upfront (e.g., TTFT < 400 ms at p95; TPOT < 35 ms at p95; maximum tolerable error rate < 0.05%).",
          "2. **Characterize the Workload:** Analyze expected input-to-output token ratios, peak vs. average request rates, prompt reuse potential (RAG templates vs. ad-hoc inputs), and streaming vs. batch delivery requirements.",
          "3. **Establish an Unoptimized Baseline:** Deploy the model checkpoint using standard 16-bit precision on a baseline GPU topology without advanced caching. Measure baseline TTFT, TPOT, and throughput under low concurrency.",
          "4. **Select Runtime & Hardware Topology:** Determine the optimal accelerator configuration (e.g., single L40S for 8B models, 4x A100 for 70B models with Tensor Parallelism) and select the serving engine (vLLM vs. TensorRT-LLM).",
          "5. **Identify the Dominant Bottleneck:** Profile whether the workload is bottlenecked by compute (high prefill token volume), memory bandwidth (long decode sequences), or queue contention (unbalanced burst arrivals).",
          "6. **Apply Optimizations Incrementally:** Introduce one optimization at a time: first Continuous Batching, then PagedAttention, followed by Chunked Prefill, Automatic Prefix Caching, and finally Model Quantization.",
          "7. **Run Controlled Open-Loop Load Tests:** Benchmark the system using realistic Poisson arrival distributions to verify that throughput gains do not compromise tail TTFT/TPOT latency.",
          "8. **Validate Numerical Accuracy & Perplexity:** Run evaluation test suites (e.g., LM-Evaluation-Harness, MMLU, GSM8K) on quantized checkpoints to verify that precision reductions did not degrade reasoning capabilities.",
          "9. **Execute Chaos & Fault-Tolerance Tests:** Simulate client disconnects during generation, kill individual GPU worker processes, and trigger sudden 5x traffic surges to verify that admission control and load shedding behave gracefully.",
          "10. **Deploy Canary & Monitor Golden Signals:** Roll out the optimized inference service behind a canary load balancer, monitoring real-time Prometheus histograms, GPU memory headroom, and user satisfaction metrics before full traffic migration.",
        ],
        id: [
          "Merekayasa sistem inferensi membutuhkan metodologi terstruktur yang berlandaskan pengukuran empiris. Menerapkan speculative decoding, kuantisasi FP8, dan ukuran batch besar secara membabi buta tanpa menganalisis batasan dasar terlebih dahulu hanya akan membuang waktu dan berisiko merusak kualitas sistem.",
          "Tim rekayasa produksi disarankan mengikuti alur kerja sistematis 10 langkah berikut:",
          "1. **Tentukan Budget Latensi & Target SLA:** Tetapkan batasan performa pengguna secara eksplisit sejak awal (misal: TTFT p95 < 400 ms; TPOT p95 < 35 ms; tingkat kesalahan maksimal < 0.05%).",
          "2. **Karakterisasi Beban Kerja:** Analisis rasio panjang token input terhadap output, pola lalu lintas puncak versus rata-rata, potensi pemanfaatan kembali prompt (template RAG vs input dinamis), serta kebutuhan streaming vs batch.",
          "3. **Bangun Baseline Tanpa Optimasi:** Rilis checkpoint model menggunakan presisi standar 16-bit pada topologi GPU dasar tanpa caching tingkat lanjut. Catat angka awal TTFT, TPOT, dan throughput pada konkurensi rendah sebagai acuan perbandingan.",
          "4. **Pilih Runtime & Topologi Perangkat Keras:** Tentukan konfigurasi akselerator yang optimal (misal: GPU L40S tunggal untuk model 8B, 4x A100 untuk model 70B dengan Tensor Parallelism) dan pilih engine penyajian (vLLM vs TensorRT-LLM).",
          "5. **Identifikasi Bottleneck Utama:** Lakukan profiling untuk menentukan apakah sistem terhambat oleh komputasi (volume token prefill besar), bandwidth memori (generasi decode panjang), atau antrean (lonjakan trafik acak).",
          "6. **Terapkan Optimasi Secara Bertahap:** Terapkan satu optimasi dalam satu waktu: mulai dari Continuous Batching, PagedAttention, Chunked Prefill, Automatic Prefix Caching, hingga Kuantisasi Model.",
          "7. **Jalankan Uji Beban Open-Loop Terkontrol:** Uji sistem menggunakan kedatangan stokastik Poisson untuk membuktikan bahwa kenaikan throughput tidak mengorbankan latensi ekor TTFT/TPOT.",
          "8. **Validasi Akurasi Numerik & Perplexity:** Jalankan test suite evaluasi standar (seperti LM-Evaluation-Harness, MMLU, GSM8K) pada model terkuantisasi untuk memastikan penurunan presisi tidak merusak daya penalaran model.",
          "9. **Uji Ketahanan & Simulasi Kegagalan (Chaos Testing):** Simulasikan pemutusan koneksi klien saat generasi berlangsung, matikan paksa proses worker GPU, dan injeksikan lonjakan trafik 5x lipat untuk memastikan kendali admisi dan load shedding bekerja sempurna.",
          "10. **Rilis Canary & Pantau Sinyal Emas:** Luncurkan sistem inferensi melalui mekanisme canary deployment, pantau metrik Prometheus real-time, sisa memori GPU, serta metrik kepuasan pengguna sebelum mengalihkan seluruh trafik produksi.",
        ],
      },
      checklist: {
        en: [
          "SLA Definition: Rigid TTFT and TPOT latency targets defined at p50, p95, and p99.",
          "Admission Control: Bounded in-memory queue depth with automatic HTTP 429 backpressure handling.",
          "Cancellation Plumbing: Client socket disconnects cleanly propagate to abort GPU generation iterations.",
          "Memory Safety: GPU memory utilization factor set with at least 10% VRAM buffer to prevent CUDA OOM panics.",
          "Chunked Prefill: Enabled to prevent decode starvation and suppress inter-token latency jitter.",
          "Readiness Verification: Health probes validate that model weights are fully pinned in VRAM before routing traffic.",
          "Observability Instrumentation: Prometheus exporters scraping TTFT, TPOT, and KV cache allocation factors.",
          "Zero-Downtime Rollout: Rolling blue-green update strategy ensuring active streams drain gracefully before container termination.",
        ],
        id: [
          "Definisi SLA: Target batas latensi TTFT dan TPOT ditetapkan secara ketat pada p50, p95, dan p99.",
          "Kendali Admisi: Kedalaman antrean memori dibatasi dengan penolakan otomatis HTTP 429 saat server penuh.",
          "Propagasi Pembatalan: Pemutusan koneksi klien langsung membatalkan iterasi komputasi di worker GPU.",
          "Keamanan Memori: Faktor utilisasi VRAM dibatasi dengan cadangan minimal 10% guna mencegah crash CUDA OOM.",
          "Chunked Prefill: Diaktifkan untuk mencegah kelaparan proses decode dan meratakan variansi latensi antar-token.",
          "Verifikasi Kesiapan: Health check memastikan seluruh bobot model terkunci di VRAM sebelum menerima trafik publik.",
          "Instrumentasi Observabilitas: Exporter Prometheus mencatat metrik TTFT, TPOT, dan faktor saturasi KV cache.",
          "Pembaruan Tanpa Gangguan: Strategi blue-green rolling update memastikan aliran teks aktif selesai tuntas sebelum kontainer dimatikan.",
        ],
      },
    },
    {
      id: "practical-reference-architecture",
      title: {
        en: "11. A Practical Reference Architecture",
        id: "11. Arsitektur Referensi Praktis Sistem Inferensi",
      },
      paragraphs: {
        en: [
          "To operationalize these principles, we present a resilient, modular reference architecture for a high-throughput, low-latency LLM inference service. This architecture decouples stateful client connection management from distributed GPU worker execution.",
          "The architecture is organized across four distinct functional tiers:",
          "• **Tier 1 — Ingress & Edge Gateway:** Powered by Envoy, Nginx, or an API gateway. Handles TLS termination, API key authentication, rate limiting, and request quota tracking. It exposes clean REST/gRPC interfaces and shields upstream workers from direct internet exposure.",
          "• **Tier 2 — Application Orchestration & Routing:** A lightweight service (typically written in Go, Rust, or asynchronous Python/FastAPI). It performs BPE tokenization, validates context lengths, manages conversational session histories, and routes requests intelligently based on prompt prefixes. Critically, it manages persistent Server-Sent Events (SSE) connections to clients and monitors socket disconnects to trigger immediate downstream cancellation.",
          "• **Tier 3 — Inference Serving Runtime:** The GPU cluster running an optimized engine (vLLM or TensorRT-LLM). Houses the iteration-level continuous batching scheduler, the PagedAttention virtual block memory manager, and model worker processes. Communicates across local GPUs via high-bandwidth NVLink interconnects using Tensor Parallelism (TP=4 or TP=8).",
          "• **Tier 4 — Weights, Storage & Telemetry:** Backed by high-speed local NVMe storage arrays containing pre-converted safetensors weight files for rapid cold-start initialization, backed by an object storage model registry (S3, GCS, or OCI registry). Telemetry collectors scrape Prometheus metrics and trace token lifecycles via OpenTelemetry collectors.",
          "**Scaling Dynamics:** For small deployments (e.g., internal tools or prototypes), Tiers 2 and 3 can be co-located within a single Docker container on a single GPU instance. For high-throughput enterprise platforms serving millions of tokens daily, Tiers 1 and 2 scale horizontally on elastic CPU nodes, while Tier 3 scales independently across dedicated multi-GPU accelerator clusters behind an intelligent load-balancing proxy.",
        ],
        id: [
          "Untuk menerapkan seluruh prinsip ini ke dalam sistem nyata, kami menyajikan arsitektur referensi modular yang tangguh untuk layanan inferensi LLM berkinerja tinggi dan latensi rendah. Arsitektur ini memisahkan manajemen koneksi klien yang bersifat stateful dari eksekusi worker GPU terdistribusi.",
          "Arsitektur ini disusun melintasi empat tier fungsional yang saling terisolasi:",
          "• **Tier 1 — Ingress & Edge Gateway:** Ditenagai oleh Envoy, Nginx, atau API gateway modern. Bertanggung jawab atas terminasi TLS, autentikasi API key, pembatasan laju (rate limiting), dan kuota request. Lapisan ini memaparkan antarmuka REST/gRPC yang bersih dan melindungi worker internal dari paparan internet langsung.",
          "• **Tier 2 — Orkestrasi Aplikasi & Routing:** Layanan ringan (umumnya ditulis dalam Go, Rust, atau Python/FastAPI asinkron). Bertugas melakukan tokenisasi BPE, validasi batas panjang konteks, manajemen riwayat sesi percakapan, dan routing cerdas berdasarkan prefix prompt. Yang paling krusial, tier ini mengelola koneksi Server-Sent Events (SSE) persisten ke klien dan memantau koneksi putus untuk memicu pembatalan instan di backend.",
          "• **Tier 3 — Runtime Penyajian Inferensi:** Klaster GPU yang menjalankan engine teroptimasi (vLLM atau TensorRT-LLM). Menampung penjadwal continuous batching per iterasi, manajer memori blok virtual PagedAttention, dan proses worker model. Berkomunikasi melintasi GPU lokal melalui interkoneksi NVLink bandwidth tinggi menggunakan Tensor Parallelism (TP=4 atau TP=8).",
          "• **Tier 4 — Bobot Model, Penyimpanan & Telemetri:** Didukung oleh penyimpanan lokal NVMe berkecepatan tinggi yang menyimpan berkas bobot safetensors untuk inisialisasi cold start yang cepat, terhubung ke model registry penyimpanan objek (S3, GCS, atau OCI). Kolektor telemetri mengambil metrik Prometheus dan mencatat siklus hidup token melalui OpenTelemetry.",
          "**Dinamika Penskalaan:** Untuk deployment skala kecil (seperti perkakas internal atau prototipe), Tier 2 dan Tier 3 dapat digabungkan dalam satu kontainer Docker pada satu instans GPU. Untuk platform enterprise throughput tinggi yang melayani jutaan token per hari, Tier 1 dan Tier 2 diskalakan secara horizontal pada node CPU elastis, sementara Tier 3 diskalakan secara mandiri pada klaster multi-GPU terdedikasi di balik proxy load balancing yang cerdas.",
        ],
      },
      diagram: "inference-architecture",
    },
    {
      id: "conclusion-optimize-the-system",
      title: {
        en: "12. Conclusion — Optimize the System, Not Just the Model",
        id: "12. Kesimpulan — Optimalkan Sistem, Bukan Hanya Modelnya",
      },
      paragraphs: {
        en: [
          "Building effective AI products in production requires a profound mindset shift: the model provides the raw latent capability, but the inference system delivers the actual product experience.",
          "A model with world-class reasoning capabilities delivers zero business value if high TTFT frustrates end users, if memory fragmentation crashes workers during traffic spikes, or if the serving architecture burns cloud capital faster than the business generates revenue. Excellence in production AI requires balancing the complete engineering equation: **latency, throughput, memory, numerical quality, cost, reliability, and operational complexity**.",
          "Inference engineering is not a collection of isolated optimization tricks; it is the rigorous, systems-level practice of harmonizing hardware mechanics, virtual memory virtualization, continuous scheduling, and distributed networking. As models grow increasingly capable and context windows expand toward infinity, the competitive advantage in software will belong not to those who merely download the latest checkpoint, but to the engineers who master the systems that serve them.",
        ],
        id: [
          "Membangun produk AI yang efektif di lingkungan produksi membutuhkan pergeseran paradigma yang mendasar: model menyediakan kapabilitas laten mentah, namun sistem inferensilah yang menghantarkan pengalaman produk yang sesungguhnya.",
          "Model dengan daya nalar terbaik di dunia tidak akan menghasilkan nilai bisnis apa pun jika TTFT yang lambat membuat pengguna frustrasi, jika fragmentasi memori menumbangkan server saat trafik melonjak, atau jika arsitektur serving membakar modal cloud lebih cepat daripada pendapatan yang diperoleh. Keunggulan dalam AI produksi menuntut keseimbangan persamaan rekayasa yang utuh: **latensi, throughput, memori, kualitas numerik, biaya, keandalan, dan kompleksitas operasional**.",
          "Inference engineering bukanlah kumpulan trik optimasi yang terpisah-pisah; ini adalah praktik rekayasa tingkat sistem yang cermat dalam menyelaraskan mekanika perangkat keras, virtualisasi memori, penjadwalan dinamis, dan jaringan terdistribusi. Seiring bertambah pintarnya model dan meluasnya batas konteks menuju tak terhingga, keunggulan kompetitif dalam rekayasa perangkat lunak bukan milik mereka yang sekadar mengunduh checkpoint model terbaru, melainkan milik para insinyur yang menguasai sistem yang menyajikannya.",
        ],
      },
    },
    {
      id: "authoritative-references",
      title: {
        en: "13. Authoritative References & Further Reading",
        id: "13. Referensi Otoritatif & Bacaan Lanjutan",
      },
      paragraphs: {
        en: [
          "For engineers seeking to deepen their understanding of production inference systems, the following papers, technical specifications, and official documentation represent the foundational literature:",
          "• **PagedAttention & vLLM:** Woosuk Kwon, Zhuohan Li, Siyuan Shen, et al. *Efficient Memory Management for Large Language Model Serving with PagedAttention.* Proceedings of the 29th ACM Symposium on Operating Systems Principles (SOSP 2023). [Paper link](https://arxiv.org/abs/2309.06180) · [vLLM Documentation](https://docs.vllm.ai)",
          "• **Continuous Batching & Orca:** Gyeong-In Yu, Joo Seong Jeong, Geon-Woo Kim, et al. *Orca: A Distributed Serving System for Transformer-Based Generative Models.* 16th USENIX Symposium on Operating Systems Design and Implementation (OSDI 2022). [Paper link](https://www.usenix.org/conference/osdi22/presentation/yu)",
          "• **Chunked Prefill & Sarathi-Serve:** Amey Agrawal, Nitin Kedia, Ashish Panwar, et al. *Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve.* 18th USENIX Symposium on Operating Systems Design and Implementation (OSDI 2024). [Paper link](https://www.usenix.org/conference/osdi24/presentation/agrawal)",
          "• **NVIDIA TensorRT-LLM:** NVIDIA Developer Architecture Guide, Kernel Fusion, and In-Flight Batching Documentation. [TensorRT-LLM GitHub](https://github.com/NVIDIA/TensorRT-LLM) · [Official Documentation](https://nvidia.github.io/TensorRT-LLM/)",
          "• **Speculative Decoding:** Yaniv Leviathan, Matan Kalman, Yossi Matias. *Fast Inference from Transformers via Speculative Decoding.* International Conference on Machine Learning (ICML 2023). [Paper link](https://arxiv.org/abs/2211.17192)",
          "• **Activation-Aware Weight Quantization (AWQ):** Ji Lin, Jiaming Tang, Haotian Tang, et al. *AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration.* MLSys 2024. [Paper link](https://arxiv.org/abs/2306.00978)",
          "• **FlashAttention-2:** Tri Dao. *FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning.* International Conference on Learning Representations (ICLR 2024). [Paper link](https://arxiv.org/abs/2307.08691)",
          "• **Hugging Face Text Generation Inference (TGI):** Hugging Face Production Inference Toolkit and Architecture Specification. [TGI Documentation](https://huggingface.co/docs/text-generation-inference/)",
        ],
        id: [
          "Bagi para insinyur yang ingin memperdalam pemahaman mengenai sistem inferensi produksi, publikasi riset, spesifikasi teknis, dan dokumentasi resmi berikut merupakan literatur fondasional rujukan:",
          "• **PagedAttention & vLLM:** Woosuk Kwon, Zhuohan Li, Siyuan Shen, et al. *Efficient Memory Management for Large Language Model Serving with PagedAttention.* Proceedings of the 29th ACM Symposium on Operating Systems Principles (SOSP 2023). [Tautan Paper](https://arxiv.org/abs/2309.06180) · [Dokumentasi vLLM](https://docs.vllm.ai)",
          "• **Continuous Batching & Orca:** Gyeong-In Yu, Joo Seong Jeong, Geon-Woo Kim, et al. *Orca: A Distributed Serving System for Transformer-Based Generative Models.* 16th USENIX Symposium on Operating Systems Design and Implementation (OSDI 2022). [Tautan Paper](https://www.usenix.org/conference/osdi22/presentation/yu)",
          "• **Chunked Prefill & Sarathi-Serve:** Amey Agrawal, Nitin Kedia, Ashish Panwar, et al. *Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve.* 18th USENIX Symposium on Operating Systems Design and Implementation (OSDI 2024). [Tautan Paper](https://www.usenix.org/conference/osdi24/presentation/agrawal)",
          "• **NVIDIA TensorRT-LLM:** Panduan Arsitektur Developer NVIDIA, Kernel Fusion, dan Dokumentasi In-Flight Batching. [Repositori GitHub TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) · [Dokumentasi Resmi](https://nvidia.github.io/TensorRT-LLM/)",
          "• **Speculative Decoding:** Yaniv Leviathan, Matan Kalman, Yossi Matias. *Fast Inference from Transformers via Speculative Decoding.* International Conference on Machine Learning (ICML 2023). [Tautan Paper](https://arxiv.org/abs/2211.17192)",
          "• **Activation-Aware Weight Quantization (AWQ):** Ji Lin, Jiaming Tang, Haotian Tang, et al. *AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration.* MLSys 2024. [Tautan Paper](https://arxiv.org/abs/2306.00978)",
          "• **FlashAttention-2:** Tri Dao. *FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning.* International Conference on Learning Representations (ICLR 2024). [Tautan Paper](https://arxiv.org/abs/2307.08691)",
          "• **Hugging Face Text Generation Inference (TGI):** Toolkit Inferensi Produksi Hugging Face dan Spesifikasi Arsitektur. [Dokumentasi TGI](https://huggingface.co/docs/text-generation-inference/)",
        ],
      },
    },
  ],
};
