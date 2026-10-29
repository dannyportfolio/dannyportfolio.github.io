import type { BlogPost } from "@/data/blog";

export const serverlessArchitecturePost: BlogPost = {
  slug: "serverless-architecture-cara-kerja-implementasi",
  title: {
    en: "Serverless Architecture: How It Works, Implementation Guide, and When to Use It",
    id: "Serverless Architecture: Cara Kerja, Contoh Implementasi, dan Kapan Harus Menggunakannya",
  },
  summary: {
    en: "An engineering-first guide to serverless architecture: FaaS and BaaS mechanics, cold starts, cost trade-offs, security best practices, and a production-ready Node.js TypeScript API on AWS Lambda.",
    id: "Panduan rekayasa sistem seputar arsitektur serverless: mekanika FaaS dan BaaS, mitigasi cold start, analisis trade-off biaya, praktik keamanan IAM, dan implementasi REST API Node.js TypeScript di AWS Lambda.",
  },
  category: {
    en: "Cloud Architecture & Backend",
    id: "Arsitektur Cloud & Backend",
  },
  tags: [
    "Cloud Computing",
    "Serverless",
    "AWS Lambda",
    "Node.js",
    "TypeScript",
    "Backend Architecture",
    "System Design",
  ],
  publishedDate: "2026-10-29",
  author: "Danial Fachrudin",
  readingTime: {
    en: "16 min read",
    id: "16 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "Serverless Architecture Guide: Mechanics, Implementation & Trade-offs — Danial Fachrudin",
    id: "Panduan Serverless Architecture: Cara Kerja, Implementasi, dan Kapan Digunakan — Danial Fachrudin",
  },
  seoDescription: {
    en: "Master serverless architecture from event-driven mechanics to production TypeScript implementation on AWS Lambda. Comprehensive guide on FaaS, BaaS, cold starts, and cost optimization.",
    id: "Pelajari arsitektur serverless secara mendalam: konsep FaaS/BaaS, perbandingan dengan container, implementasi API Node.js TypeScript di AWS Lambda, hingga analisis trade-off biaya dan cold start.",
  },
  sections: [
    {
      id: "the-backend-maintenance-tax",
      title: {
        en: "1. The Backend Maintenance Tax: Why Infrastructure Management Stifles Velocity",
        id: "1. Beban Pemeliharaan Backend: Tantangan Nyata Pengelolaan Infrastruktur",
      },
      paragraphs: {
        en: [
          "In modern software engineering, writing clean business logic is often the easiest part of delivering a production service. The real operational friction begins the moment that code must run reliably on the internet. Engineers find themselves wrestling with server provisioning, operating system security patches, capacity headroom planning, and unpredictable infrastructure costs.",
          "Consider the traditional deployment lifecycle: you provision a cluster of virtual machines (VMs) or a container fleet sized for estimated peak traffic. During quiet hours, those instances sit virtually idle, consuming company budget at 100% capacity while utilizing barely 5% of their compute headroom. Conversely, during sudden traffic spikes, auto-scaling groups often require several minutes to boot new instances, pull container images, and register with load balancers — by which time end users have already experienced connection timeouts.",
          "Serverless architecture emerged to dismantle this operational overhead. It introduces an execution paradigm where developers focus exclusively on discrete functions and business outcomes, shifting the entire burden of infrastructure provisioning, dynamic scaling, high availability, and operating system maintenance directly to hyperscale cloud providers.",
        ],
        id: [
          "Bagi sebagian besar software engineer, menulis logika bisnis yang bersih sering kali merupakan bagian paling mudah dalam membangun layanan web. Beban operasional sesungguhnya justru muncul ketika kode tersebut harus berjalan andal di internet: tim engineer dihadapkan pada provisioning server, instalasi patch keamanan sistem operasi, perencanaan kapasitas redundan, dan ketidakpastian biaya infrastruktur.",
          "Perhatikan siklus deployment konvensional: Anda menyewa cluster Virtual Machine (VM) atau armada kontainer yang kapasitasnya disesuaikan untuk mengantisipasi estimasi trafik puncak (*peak traffic*). Di luar jam sibuk, server-server tersebut menganggur dengan beban kerja hanya 5%, namun tagihan komputasi tetap berjalan penuh 100%. Sebaliknya, ketika terjadi lonjakan pengunjung mendadak, mekanisme auto-scaling membutuhkan waktu beberapa menit untuk menyalakan instans baru, mengunduh container image, dan mendaftar ke load balancer — durasi yang cukup lama hingga pengguna mengalami connection timeout.",
          "Serverless architecture hadir untuk memutus beban pemeliharaan infrastruktur ini. Arsitektur ini memperkenalkan paradigma komputasi di mana developer cukup berfokus pada fungsi mandiri dan logika bisnis aplikasi, sementara seluruh tanggung jawab pengelolaan server, scaling dinamis, toleransi kegagalan, dan patching OS dialihkan secara otonom ke penyedia layanan cloud.",
        ],
      },
      callout: {
        type: "note",
        text: {
          en: "Serverless does not mean servers do not exist. Physical and virtual servers are still running inside hyperscale data centers, but their lifecycle, auto-scaling, and health management are entirely abstracted away from the developer.",
          id: "Serverless bukan berarti aplikasi berjalan tanpa server fisik. Server tetap beroperasi di pusat data cloud, namun seluruh siklus hidup, penskalaan otomatis, alokasi memori, dan pemeliharaannya diabstraksikan sepenuhnya dari developer.",
        },
      },
    },
    {
      id: "what-is-serverless",
      title: {
        en: "2. What Is Serverless Architecture? Foundations & Mental Models",
        id: "2. Apa Itu Serverless Architecture? Fondasi Konseptual & Analogi",
      },
      paragraphs: {
        en: [
          "At its core, **Serverless Architecture** is a cloud execution model where application code executes inside stateless, short-lived compute environments (*microVMs*) triggered strictly by incoming events. Resources are provisioned dynamically on millisecond timescales and decommissioned immediately when execution completes. You are billed exclusively for the exact memory-duration consumed during execution, scaling smoothly down to zero when no requests are being processed.",
          "To visualize this paradigm shift, consider the **electrical utility grid analogy**. In the early industrial era, factories had to build, fuel, and repair their own on-premise coal dynamos just to power their machinery — equivalent to owning bare-metal servers. The modern electrical grid transformed power into a metered utility: you plug a device into a wall outlet, draw electricity on demand, and pay strictly for kilowatt-hours consumed. Serverless brings this same utility model to backend compute, storage, and event routing.",
          "Another intuitive comparison is **ride-hailing versus owning a vehicle**. Maintaining a dedicated server or container cluster is like owning a car: you pay monthly loan installments, insurance, and routine maintenance whether the car sits parked in the garage or drives on the highway. Serverless functions are like booking a ride: a vehicle arrives when an event is triggered, transports your payload to its destination, and departs without any ongoing idle cost.",
        ],
        id: [
          "Secara fundamental, **Serverless Architecture** adalah model eksekusi cloud di mana kode aplikasi berjalan di dalam lingkungan komputasi terisolasi dan berumur pendek (*stateless microVMs*) yang dipicu secara spesifik oleh peristiwa tertentu (*event-driven*). Sumber daya dialokasikan secara dinamis dalam hitungan milidetik dan langsung dihancurkan ketika eksekusi kode selesai. Anda hanya membayar durasi komputasi dan memori yang benar-benar terpakai, dengan kemampuan penskalaan hingga nol mutlak (*scale-to-zero*) saat sistem menganggur.",
          "Untuk memahaminya secara intuitif, perhatikan **analogi jaringan listrik PLN**. Pada awal revolusi industri, pabrik harus membangun, mengisi bahan bakar, dan merawat generator uap sendiri hanya demi menyuplai listrik mesin produksi — setara dengan mengelola server fisik sendiri. Kehadiran jaringan listrik modern mengubah energi menjadi utilitas terukur: Anda cukup mencolokkan kabel ke stopkontak, menyerap daya seperlunya, dan membayar kWh yang tercatat pada meteran. Serverless menerapkan prinsip utilitas serupa untuk daya komputasi dan pemrosesan data backend.",
          "Analogi lainnya adalah **layanan transportasi online dibanding memiliki mobil pribadi**. Mengoperasikan server VPS atau cluster kontainer mandiri mirip seperti memiliki mobil pribadi: Anda wajib membayar cicilan, asuransi, dan perawatan rutin terlepas dari apakah mobil tersebut terparkir di garasi atau digunakan di jalan raya. Sebaliknya, fungsi serverless mirip seperti memesan taksi online: armada datang saat dipanggil (*event trigger*), mengantarkan penumpang sampai tujuan, lalu pergi tanpa membebani biaya parkir saat tidak digunakan.",
        ],
      },
      callout: {
        type: "tip",
        text: {
          en: "The defining signature of a true serverless system is 'Scale-to-Zero': if your application receives zero traffic overnight, your compute billing drops to exactly $0.00.",
          id: "Karakteristik utama arsitektur serverless sejati adalah kemampuan 'Scale-to-Zero': jika aplikasi Anda tidak menerima traffic sama sekali di malam hari, biaya komputasi yang ditagihkan bernilai tepat Rp 0.",
        },
      },
    },
    {
      id: "core-components",
      title: {
        en: "3. Core Components of the Serverless Ecosystem",
        id: "3. Komponen Utama dalam Ekosistem Serverless Modern",
      },
      paragraphs: {
        en: [
          "A production-grade serverless application is rarely composed of compute functions in isolation. Instead, it operates as an orchestra of specialized managed services that seamlessly interact through event triggers:",
          "1. **Function as a Service (FaaS)**: The compute engine (e.g., AWS Lambda, Google Cloud Functions, Azure Functions). Executes arbitrary application code inside short-lived, containerized sandboxes with automated high availability across multiple availability zones.",
          "2. **Backend as a Service (BaaS)**: Turnkey, fully managed third-party or hyperscaler services handling generic backend requirements without writing custom server code. Prominent examples include managed authentication (AWS Cognito, Clerk, Firebase Auth) and serverless databases.",
          "3. **API Gateway**: The reverse proxy and HTTP ingress layer (e.g., Amazon API Gateway, Cloudflare Workers Route). Handles TLS termination, routing paths to specific FaaS handlers, token-based authorization (JWT), rate limiting, and request schema validation.",
          "4. **Event Brokers & Queues**: The asynchronous messaging backbone (AWS EventBridge, SQS, SNS). Enables decoupled microservices to publish and subscribe to domain events without blocking user-facing HTTP request cycles.",
          "5. **Serverless Storage & Databases**: Storage engines engineered to handle the connection volatility of ephemeral compute. Examples include object stores (Amazon S3) and serverless NoSQL/relational databases (DynamoDB, Aurora Serverless v2, Supabase) that communicate over HTTP APIs or managed connection pools.",
          "6. **Distributed Observability**: Centralized telemetry pipelines (AWS CloudWatch Logs, AWS X-Ray, Datadog) that collect structured JSON logs, trace cross-service latency, and monitor error rates without requiring persistent host logging agents.",
        ],
        id: [
          "Aplikasi serverless tingkat produksi bukanlah sekumpulan fungsi komputasi yang terisolasi, melainkan ekosistem terpadu dari berbagai layanan terkelola (*managed services*) yang berinteraksi melalui pemicu peristiwa (*event triggers*):",
          "1. **Function as a Service (FaaS)**: Komponen komputasi utama (misalnya AWS Lambda, Google Cloud Functions, Azure Functions). Bertugas mengeksekusi kode aplikasi di dalam sandbox kontainer berumur pendek dengan jaminan ketersediaan tinggi lintas Availability Zone secara otomatis.",
          "2. **Backend as a Service (BaaS)**: Layanan terkelola siap pakai untuk kebutuhan backend generik tanpa perlu menulis kode server manual. Contoh populernya meliputi sistem autentikasi (AWS Cognito, Clerk, Firebase Auth) dan database terkelola.",
          "3. **API Gateway**: Lapisan pintu gerbang HTTP dan reverse proxy (misalnya Amazon API Gateway, Cloudflare Workers Route). Bertanggung jawab atas terminasi TLS, pemetaan rute URL ke handler fungsi, validasi token otorisasi (JWT), pembatasan laju (*rate limiting*), dan validasi format payload.",
          "4. **Event Brokers & Message Queues**: Tulang punggung komunikasi asinkron (seperti AWS EventBridge, SQS, SNS). Memungkinkan komponen backend saling berkirim notifikasi status tanpa membebani waktu tunggu respon pengguna.",
          "5. **Serverless Databases & Storage**: Media penyimpanan yang dirancang khusus untuk menangani karakteristik koneksi FaaS yang dinamis. Meliputi object storage (Amazon S3) serta database seperti DynamoDB dan Aurora Serverless v2 yang mendukung koneksi berbasis HTTP API atau connection pool otomatis.",
          "6. **Distributed Observability**: Sistem telemetri terpusat (AWS CloudWatch Logs, AWS X-Ray, Datadog) untuk mengumpulkan log JSON terstruktur, menelusuri jejak latensi antar-layanan (*distributed tracing*), dan memantau anomali error tanpa perlu agen daemon di server fisik.",
        ],
      },
      code: {
        language: "mermaid",
        snippet: `graph TD
    Client["Web / Mobile Client"] -->|"HTTPS Request"| APIGW["API Gateway (Routing & Auth)"]
    APIGW -->|"Synchronous Event"| LambdaAPI["Lambda Function (API Handler)"]
    
    LambdaAPI -->|"HTTP PutItem"| DynamoDB[("Amazon DynamoDB (NoSQL)")]
    LambdaAPI -->|"Enqueue Message"| SQS["Amazon SQS (Async Buffer)"]
    
    SQS -->|"Batch Event Trigger"| WorkerLambda["Worker Lambda (Background Process)"]
    WorkerLambda -->|"Upload Report"| S3[("Amazon S3 (Object Storage)")]
    WorkerLambda -->|"Publish Notification"| SNS["Amazon SNS / Email Alert"]
    
    LambdaAPI -.->|"Telemetry Logs & Traces"| CloudWatch["CloudWatch & AWS X-Ray"]
    WorkerLambda -.->|"Telemetry Logs & Traces"| CloudWatch`,
        caption: {
          en: "Architecture diagram: Synchronous API ingress combined with asynchronous background processing in a serverless topology.",
          id: "Diagram arsitektur: Alur sinkronus API Gateway dipadukan dengan pemrosesan asinkronus berbasis antrean pada topologi serverless.",
        },
      },
    },
    {
      id: "how-serverless-works",
      title: {
        en: "4. How Serverless Works: The End-to-End Lifecycle of an HTTP Request",
        id: "4. Cara Kerja Serverless: Anatomi Alur Request Formulir Web",
      },
      paragraphs: {
        en: [
          "To grasp the runtime dynamics of serverless, let us trace what happens when an end-user submits a registration or feedback form on a web application.",
          "1. **Ingress & Perimeter Inspection**: The user's browser sends an HTTPS POST request with a JSON payload to `https://api.example.com/v1/feedback`. AWS WAF inspects the request at the cloud edge to block malicious payloads, bot scrapers, or DDoS attacks before reaching the application layer.",
          "2. **API Gateway Translation**: Amazon API Gateway receives the validated HTTP request, verifies the bearer JWT token, and transforms the raw HTTP stream into a structured JSON event object containing headers, query params, client IP, and payload body.",
          "3. **Compute Allocation & Invocation**: API Gateway invokes the designated AWS Lambda function. If an idle microVM is already warm, execution begins within 5 milliseconds. If no warm instance exists, AWS Lambda provisions a microVM via Firecracker, initializes the Node.js runtime, downloads the packaged code bundle, and invokes the exported `handler()` method (**Cold Start**).",
          "4. **Payload Validation & Persistence**: The function parses the JSON body, verifies schema integrity using a runtime validator (e.g., Zod), executes business validation, and writes the structured record to Amazon DynamoDB via a secure IAM-authorized AWS SDK call.",
          "5. **Asynchronous Hand-off**: Rather than forcing the client to wait for downstream operations (such as sending a welcome email or updating an analytics warehouse), the function publishes an event message to an Amazon SQS queue in under 15ms.",
          "6. **Response & Teardown**: The function constructs a standard HTTP response (e.g., 201 Created) and returns it to the API Gateway, which sends the final JSON response to the user's browser. Immediately afterward, the microVM CPU is frozen. If no subsequent requests arrive within 5–15 minutes, the microVM environment is cleanly terminated.",
        ],
        id: [
          "Untuk memahami dinamika runtime serverless secara nyata, mari kita bedah apa yang terjadi saat pengguna mengirimkan formulir registrasi atau feedback pada aplikasi web.",
          "1. **Ingress & Inspeksi Perimeter**: Browser pengguna mengirimkan HTTP POST request dengan payload JSON ke `https://api.example.com/v1/feedback`. AWS WAF di lapisan edge menyaring paket data untuk memblokir serangan DDoS, injection, atau bot scanner sebelum menyentuh lapisan aplikasi.",
          "2. **Translasi oleh API Gateway**: Amazon API Gateway menerima request HTTP, memverifikasi keabsahan token otorisasi JWT, dan mentransformasikan request HTTP mentah menjadi objek event JSON terstruktur yang memuat headers, query parameters, alamat IP, dan request body.",
          "3. **Alokasi Komputasi & Invocation**: API Gateway memicu fungsi AWS Lambda yang relevan. Jika microVM sudah dalam keadaan aktif (*warm*), eksekusi kode langsung berjalan dalam waktu di bawah 5 milidetik. Jika belum ada instans aktif, platform menyiapkan microVM baru melalui hypervisor Firecracker, menginisialisasi runtime Node.js, mengunduh bundle kode, dan memanggil fungsi `handler()` (**Cold Start**).",
          "4. **Validasi & Persistensi Data**: Fungsi mem-parsing body JSON, memvalidasi integritas tipe data saat runtime menggunakan library Zod, menjalankan logika bisnis, lalu menyimpan data ke Amazon DynamoDB melalui AWS SDK berotentikasi IAM.",
          "5. **Pendelegasian Tugas Asinkron**: Alih-alih membuat pengguna menunggu pengiriman email konfirmasi atau rekap analitik, fungsi menerbitkan pesan ke antrean Amazon SQS dalam durasi kurang dari 15 milidetik.",
          "6. **Penyusunan Respon & Pembekuan**: Fungsi menyusun objek respon HTTP (misal: 201 Created) dan mengembalikannya ke API Gateway untuk diteruskan ke browser pengguna. Segera setelah respon dikirim, memori dan CPU fungsi dibekukan (*frozen*). Jika tidak ada request baru dalam waktu 5 hingga 15 menit, lingkungan microVM tersebut akan dimatikan secara bersih.",
        ],
      },
      code: {
        language: "mermaid",
        snippet: `sequenceDiagram
    autonumber
    actor Client as User Web Browser
    participant WAF as AWS WAF & CDN
    participant APIGW as Amazon API Gateway
    participant Lambda as Feedback Function (FaaS)
    participant Dynamo as DynamoDB Table
    participant SQS as Background Queue (SQS)

    Client->>WAF: POST /v1/feedback (JSON)
    WAF->>APIGW: Sanitized Request Passed
    APIGW->>APIGW: Validate JWT & Schema Headers
    APIGW->>Lambda: Invoke Event (Cold or Warm Start)
    Note over Lambda: Runtime: Parse Payload & Validate with Zod
    Lambda->>Dynamo: PutItem (Save Record)
    Dynamo-->>Lambda: 200 OK (Item Saved)
    Lambda->>SQS: SendMessage (FeedbackCreated Event)
    SQS-->>Lambda: 200 OK (Message Queued)
    Lambda-->>APIGW: HTTP 201 Created { id, status }
    APIGW-->>Client: JSON Response Delivered (~45-90ms)
    Note over Lambda: MicroVM CPU Frozen / Scaled to Zero`,
        caption: {
          en: "Sequence diagram tracing a synchronous web form submission through API Gateway, Lambda, DynamoDB, and asynchronous queue handoff.",
          id: "Diagram sekuensial yang menggambarkan siklus hidup pengiriman formulir web dari API Gateway, Lambda, DynamoDB, hingga antrean pesan asinkron.",
        },
      },
    },
    {
      id: "practical-implementation",
      title: {
        en: "5. Practical Implementation: Building a Production REST API with Node.js, TypeScript & AWS Lambda",
        id: "5. Implementasi Praktis: Membangun REST API dengan Node.js, TypeScript, dan AWS Lambda",
      },
      paragraphs: {
        en: [
          "To demonstrate serverless engineering in action, we will build a production-grade feedback registration endpoint using **Node.js 20 LTS**, **TypeScript**, and **AWS Serverless Application Model (AWS SAM)**.",
          "Our architecture follows industry standards: runtime payload schema validation via Zod, persistent TCP socket reuse for the DynamoDB client across warm starts, structured error responses, and Infrastructure as Code (IaC) with least-privilege IAM permissions.",
          "Below is the complete, self-contained implementation of the Lambda handler, featuring defensive error handling and environment variable verification:",
        ],
        id: [
          "Untuk melihat bagaimana arsitektur serverless diimplementasikan dalam kode produksi, kita akan membangun endpoint REST API feedback menggunakan **Node.js 20 LTS**, **TypeScript**, dan **AWS Serverless Application Model (AWS SAM)**.",
          "Arsitektur kode ini mengikuti standar industri: validasi runtime menggunakan Zod, penggunaan kembali koneksi TCP client DynamoDB antar-pemanggilan fungsi (*warm start optimization*), format respon error terstruktur, serta Infrastructure as Code (IaC) dengan hak akses IAM least-privilege.",
          "Berikut adalah implementasi handler Lambda yang lengkap, aman, dan siap digunakan di lingkungan produksi:",
        ],
      },
      code: {
        language: "typescript",
        snippet: `import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";
import { z } from "zod";

// 1. Inisialisasi AWS SDK Client di luar handler untuk memanfaatkan TCP socket reuse pada warm starts
const baseClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(baseClient, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE_NAME = process.env.TABLE_NAME;

// 2. Skema validasi runtime menggunakan Zod
const FeedbackSchema = z.object({
  fullName: z.string().min(2, "Nama minimal 2 karakter.").max(100),
  email: z.string().email("Format email tidak valid."),
  message: z.string().min(10, "Pesan minimal 10 karakter.").max(1000),
  rating: z.number().int().min(1).max(5),
});

// 3. Helper respons HTTP terstandarisasi dengan header CORS
function jsonResponse(statusCode: number, payload: unknown): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
    },
    body: JSON.stringify(payload),
  };
}

// 4. Entrypoint utama Lambda Handler
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const correlationId = event.requestContext?.requestId || randomUUID();
  console.log(JSON.stringify({ level: "INFO", message: "Processing request", correlationId }));

  if (!event.body) {
    return jsonResponse(400, {
      success: false,
      error: "Bad Request",
      message: "Request body tidak boleh kosong.",
    });
  }

  try {
    const rawBody = JSON.parse(event.body);
    const validationResult = FeedbackSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return jsonResponse(422, {
        success: false,
        error: "Unprocessable Entity",
        details: validationResult.error.flatten().fieldErrors,
      });
    }

    if (!TABLE_NAME) {
      console.error(JSON.stringify({ level: "ERROR", message: "TABLE_NAME env variable is missing" }));
      return jsonResponse(500, {
        success: false,
        error: "Internal Server Error",
        message: "Konfigurasi server belum lengkap.",
      });
    }

    const feedbackItem = {
      id: randomUUID(),
      ...validationResult.data,
      createdAt: new Date().toISOString(),
      requestId: correlationId,
    };

    // Simpan data ke DynamoDB
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: feedbackItem,
      })
    );

    console.log(JSON.stringify({ level: "INFO", message: "Feedback saved", id: feedbackItem.id }));

    return jsonResponse(201, {
      success: true,
      message: "Feedback berhasil disimpan.",
      data: {
        id: feedbackItem.id,
        createdAt: feedbackItem.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error(JSON.stringify({ level: "ERROR", message: "Unhandled exception", error }));

    if (error instanceof SyntaxError) {
      return jsonResponse(400, {
        success: false,
        error: "Bad Request",
        message: "Format JSON pada request body rusak.",
      });
    }

    return jsonResponse(500, {
      success: false,
      error: "Internal Server Error",
      message: "Terjadi gangguan teknis pada server kami.",
    });
  }
}`,
        caption: {
          en: "TypeScript AWS Lambda handler with Zod runtime validation, connection reuse, and structured JSON responses.",
          id: "Handler AWS Lambda berbasis TypeScript dengan validasi runtime Zod, optimasi koneksi DynamoDB, dan respon JSON terstruktur.",
        },
      },
    },
    {
      id: "advantages-and-tradeoffs",
      title: {
        en: "6. Engineering Trade-offs: Advantages vs. Architectural Constraints",
        id: "6. Analisis Trade-off: Keunggulan Kompetitif vs. Keterbatasan Arsitektural",
      },
      paragraphs: {
        en: [
          "Senior cloud engineers evaluate architectural paradigms based on trade-offs rather than marketing hype. Serverless offers extraordinary developer leverage, but it introduces distinct operational constraints that must be understood upfront.",
          "**Key Advantages**:",
          "1. **Operational Headroom**: Zero time spent patching Linux kernels, configuring reverse proxies, or updating hypervisors.",
          "2. **Dynamic Elasticity**: Autonomous scaling from zero to thousands of concurrent executions in seconds without manual auto-scaling threshold tuning.",
          "3. **True Pay-per-Value**: Eliminates idle infrastructure expenses. If a feature receives no traffic for weeks, it incurs no compute cost.",
          "**Critical Constraints & Trade-offs**:",
          "1. **Cold Start Latency**: The initialization penalty when spinning up a new microVM. While Node.js cold starts typically run between 100ms and 300ms, heavily layered runtimes (e.g., Java or .NET with VPC networking) can introduce latency spikes of 1 to 3 seconds on cold invocations.",
          "2. **Execution Limits**: FaaS platforms enforce strict hard timeouts (e.g., 15 minutes max per Lambda execution). Workloads requiring long-running batch processing or perpetual state must use container fleets instead.",
          "3. **Sustained High-Throughput Cost Curve**: At sustained, predictable high volume (e.g., 20,000 requests per second around the clock), paying per execution can become significantly more expensive than running dedicated EC2 Reserved Instances or optimized Kubernetes pods.",
          "4. **Distributed Debugging Complexity**: Reproducing multi-service event orchestration bugs locally is difficult. Effective debugging requires robust distributed tracing (OpenTelemetry/AWS X-Ray) and ephemeral staging environments.",
        ],
        id: [
          "Seorang senior cloud engineer mengevaluasi paradigma arsitektur berdasarkan trade-off teknis, bukan sekadar janji promosi penyedia cloud. Arsitektur serverless menawarkan efisiensi pengembangan yang luar biasa, namun juga membawa batasan arsitektural yang wajib diantisipasi sejak awal.",
          "**Keunggulan Utama**:",
          "1. **Bebas Pemeliharaan Server Fisik**: Tidak ada waktu yang terbuang untuk memperbarui OS kernel Linux, menyetel parameter Nginx, atau mengelola certificate authority.",
          "2. **Elastisitas Otomatis Tanpa Ambang Batas**: Sistem mampu melayani dari 0 hingga ribuan eksekusi konkuren dalam hitungan detik tanpa perlu kalibrasi ambang batas CPU auto-scaling.",
          "3. **Efisiensi Biaya Berbasis Utilisasi Nyata**: Menghilangkan biaya komputasi saat menganggur. Fitur yang jarang diakses tidak akan membebani anggaran infrastruktur bulanan.",
          "**Batasan Kritis & Tantangan Arsitektural**:",
          "1. **Latensi Cold Start**: Penalti inisialisasi ketika platform cloud menyiapkan microVM baru. Meskipun runtime Node.js memiliki cold start relatif cepat (100–300ms), runtime yang lebih berat (seperti Java atau framework dengan VPC peering) dapat mengalami jeda 1 hingga 3 detik pada pemanggilan perdana.",
          "2. **Batas Durasi Eksekusi**: Platform FaaS menerapkan batas waktu eksekusi mutlak (maksimum 15 menit di AWS Lambda). Beban kerja yang membutuhkan proses berjalan terus-menerus (*long-running background jobs*) tidak cocok menggunakan FaaS murni.",
          "3. **Titik Balik Biaya pada Trafik Konstan Masif**: Pada beban kerja dengan volume sangat tinggi dan stabil sepanjang waktu (misalnya 20.000 request per detik nonstop 24/7), akumulasi biaya per pemanggilan FaaS dan API Gateway bisa jauh lebih mahal dibandingkan menyewa kluster Kubernetes atau VM Reserved Instance berkapasitas tetap.",
          "4. **Kompleksitas Debugging Sistem Terdistribusi**: Mereplikasi interaksi antar-layanan cloud di komputer lokal membutuhkan konfigurasi rumit. Pelacakan bug menuntut adopsi distributed tracing dan structured logging yang disiplin.",
        ],
      },
      checklist: {
        en: [
          "Verify that your endpoint latency SLA tolerates occasional 150-300ms cold starts.",
          "Confirm that all synchronous request logic finishes well within the 29-second API Gateway timeout limit.",
          "Ensure database connections use HTTP APIs (DynamoDB) or connection pools (RDS Proxy) to prevent socket exhaustion.",
          "Model total monthly costs under projected sustained traffic to ensure FaaS remains cost-competitive versus container clusters.",
        ],
        id: [
          "Pastikan SLA latensi sistem Anda dapat mentoleransi jeda cold start sesekali sebesar 150-300ms.",
          "Pastikan seluruh logika request sinkronus selesai jauh di bawah batas timeout API Gateway (maksimum 29 detik).",
          "Gunakan database dengan protokol HTTP (DynamoDB) atau pasang connection pool (RDS Proxy) agar fungsi tidak menghabiskan koneksi database.",
          "Simulasikan proyeksi biaya komputasi bulanan pada trafik puncak konstan untuk memastikan serverless tetap efisien dibanding kontainer.",
        ],
      },
    },
    {
      id: "security-best-practices",
      title: {
        en: "7. Serverless Security: IAM Least-Privilege, Secrets & Boundary Defense",
        id: "7. Praktik Keamanan Serverless: IAM Least-Privilege, Secrets, dan Boundary Defense",
      },
      paragraphs: {
        en: [
          "In serverless environments, traditional network perimeters are replaced by identity boundaries. Because functions connect directly to cloud services via API calls, security governance shifts heavily to **Identity and Access Management (IAM)** and application-layer defenses.",
          "Key security imperatives include:",
          "1. **Per-Function Least-Privilege IAM**: Never assign a shared wildcard execution role to multiple functions. If a function only writes feedback records, its IAM policy must grant `dynamodb:PutItem` restricted strictly to that specific table ARN.",
          "2. **Zero-Secret Codebases**: Never commit API keys or database credentials into source control or `.env` files bundled into deployment ZIPs. Retrieve sensitive secrets at runtime from AWS Secrets Manager or SSM Parameter Store with KMS encryption.",
          "3. **API Perimeter Hardening**: Protect API Gateway endpoints with AWS WAF rules, rate limiting (e.g., 100 requests per minute per IP), and schema request validation to reject malformed requests before Lambda invocation occurs.",
          "Below is an example AWS SAM template illustrating how least-privilege IAM policies and environment variables are declaratively defined in code:",
        ],
        id: [
          "Dalam arsitektur serverless, batas perimeter jaringan tradisional digantikan oleh batas identitas (*identity perimeter*). Karena fungsi berinteraksi langsung dengan layanan cloud melalui API call, tata kelola keamanan bertumpu pada **Identity and Access Management (IAM)** dan perlindungan lapisan aplikasi.",
          "Prinsip keamanan esensial meliputi:",
          "1. **IAM Role Khusus Berprinsip Least-Privilege**: Jangan pernah menggunakan satu IAM role universal untuk seluruh fungsi Lambda. Jika suatu fungsi hanya bertugas mencatat feedback, batasi izinnya hanya pada tindakan `dynamodb:PutItem` spesifik pada ARN tabel tujuan.",
          "2. **Zero-Secret Deployment**: Jangan pernah menyimpan API key pihak ketiga atau kredensial database di dalam repositori git maupun file `.env` lokal. Ambil rahasia secara aman saat runtime melalui AWS Secrets Manager atau SSM Parameter Store dengan enkripsi KMS.",
          "3. **Proteksi Perimeter API**: Pasang AWS WAF di depan API Gateway untuk memfilter lalu lintas berbahaya, terapkan pembatasan kuota (*rate limiting*), dan aktifkan validasi skema awal agar request yang rusak langsung ditolak sebelum sempat memicu fungsi Lambda.",
          "Berikut adalah contoh template deklaratif AWS SAM yang menerapkan prinsip hak akses minimum secara ketat:",
        ],
      },
      code: {
        language: "yaml",
        snippet: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Production Feedback API with Least-Privilege IAM

Resources:
  FeedbackTable:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: id
        Type: String
      SSESpecification:
        SSEEnabled: true # Enkripsi data saat istirahat (Encryption at Rest)

  CreateFeedbackFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./
      Handler: dist/handlers/create-feedback.handler
      Runtime: nodejs20.x
      Architectures:
        - arm64 # AWS Graviton2: efisiensi biaya ~20% lebih baik
      MemorySize: 256
      Timeout: 10
      Environment:
        Variables:
          TABLE_NAME: !Ref FeedbackTable
      Policies:
        # Prinsip Least-Privilege: Hanya berikan izin tulis pada tabel spesifik ini
        - Statement:
            - Effect: Allow
              Action:
                - dynamodb:PutItem
              Resource: !GetAtt FeedbackTable.Arn
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /v1/feedback
            Method: post`,
        caption: {
          en: "AWS SAM Template demonstrating Infrastructure as Code with strict IAM least-privilege scoping.",
          id: "Template AWS SAM yang mendefinisikan infrastruktur sebagai kode dengan pembatasan hak akses IAM secara presisi.",
        },
      },
    },
    {
      id: "serverless-vs-containers-vs-traditional",
      title: {
        en: "8. Comparative Evaluation: Serverless vs. Containers vs. Traditional Hosting",
        id: "8. Evaluasi Komparatif: Serverless vs. Kontainer vs. Traditional Hosting",
      },
      paragraphs: {
        en: [
          "Selecting the right architectural foundation requires aligning your workload's predictability, team operational capacity, and latency requirements. The table below provides an objective engineering comparison across the three dominant hosting paradigms:",
        ],
        id: [
          "Menentukan fondasi arsitektur yang tepat menuntut keselarasan antara karakteristik beban kerja, kesiapan tim operasional, dan toleransi latensi aplikasi Anda. Tabel di bawah ini menyajikan perbandingan rekayasa yang objektif antara ketiga paradigma hosting utama:",
        ],
      },
      table: {
        headers: {
          en: [
            "Architectural Dimension",
            "Traditional VPS / Bare-Metal",
            "Containers (Docker & Kubernetes)",
            "Serverless (FaaS & BaaS)",
          ],
          id: [
            "Dimensi Arsitektur",
            "Traditional VPS / VM",
            "Kontainer (Docker & Kubernetes)",
            "Serverless (FaaS & BaaS)",
          ],
        },
        rows: {
          en: [
            [
              "Infrastructure Management",
              "High: Manual OS patching, firewall, disk management",
              "Moderate-High: Node pool management, ingress, K8s updates",
              "Zero: Fully managed, patched, and secured by cloud provider",
            ],
            [
              "Scaling Velocity",
              "Slow (Minutes to hours for new VM boot)",
              "Fast (Seconds to minutes via Pod Horizontal Autoscaler)",
              "Instantaneous (Milliseconds, autonomous scale from 0 to 10k)",
            ],
            [
              "Runtime & OS Control",
              "Full root access, custom kernel modules, background daemons",
              "Full container filesystem control, custom binary packages",
              "Constrained to supported runtimes and sandbox execution limits",
            ],
            [
              "Cost Structure",
              "Fixed monthly lease (pay 100% regardless of idle time)",
              "Cluster capacity provisioning (fixed baseline + scaling headroom)",
              "Strict pay-per-millisecond execution; true zero idle cost",
            ],
            [
              "Operational Overhead",
              "Dedicated SysAdmin / DevOps for server maintenance",
              "Specialized Kubernetes Platform Engineers required",
              "Shifted to Cloud Architecture & IAM policy management",
            ],
            [
              "Ideal Workloads",
              "Legacy monolithic apps, predictable continuous databases",
              "Complex microservice meshes, sustained high-throughput systems",
              "Event-driven hooks, sporadic traffic APIs, media processing pipelines",
            ],
          ],
          id: [
            [
              "Pengelolaan Infrastruktur",
              "Tinggi: Patching OS, firewall jaringan, kapasitas disk manual",
              "Menengah-Tinggi: Kelola node pool, ingress, update cluster K8s",
              "Nol: Seluruh infrastruktur dikelola dan dipelihara penyedia cloud",
            ],
            [
              "Kecepatan Penskalaan",
              "Lambat (Hitungan menit hingga jam untuk booting VM baru)",
              "Cepat (Hitungan detik hingga menit melalui Horizontal Pod Autoscaler)",
              "Instan (Hitungan milidetik, penskalaan otonom dari 0 hingga ribuan)",
            ],
            [
              "Kontrol Runtime & OS",
              "Akses root penuh, modul kernel kustom, background daemons",
              "Kontrol penuh atas image kontainer dan dependensi biner",
              "Terbatas pada runtime resmi dan batasan sandbox platform",
            ],
            [
              "Model Biaya",
              "Biaya sewa tetap bulanan (bayar 100% meski server menganggur)",
              "Kapasitas terpasang cluster (biaya dasar tetap + penyangga scaling)",
              "Hanya membayar durasi milidetik aktif; biaya Rp 0 saat menganggur",
            ],
            [
              "Kompleksitas Operasional",
              "Memerlukan SysAdmin khusus untuk merawat sistem operasi",
              "Memerlukan engineer berpengalaman dalam orkestrasi Kubernetes",
              "Bergeser ke tata kelola arsitektur cloud dan konfigurasi IAM",
            ],
            [
              "Kecocokan Beban Kerja",
              "Aplikasi monolitik warisan, database relasional konstan",
              "Ekosistem microservices kompleks, sistem dengan trafik masif 24/7",
              "Pemrosesan event, API dengan trafik dinamis, pipeline media otomatis",
            ],
          ],
        },
        caption: {
          en: "Comparative analysis across infrastructure control, scalability speed, cost model, and operational ownership.",
          id: "Tabel evaluasi komparatif antara kontrol infrastruktur, kecepatan skalabilitas, model pembiayaan, dan beban operasional.",
        },
      },
    },
    {
      id: "real-world-use-cases",
      title: {
        en: "9. Production Use Cases: Where Serverless Excels and Where It Struggles",
        id: "9. Studi Kasus Nyata: Skenario Penerapan Serverless Terbaik di Industri",
      },
      paragraphs: {
        en: [
          "Understanding where serverless thrives prevents costly architectural missteps. Below are four battle-tested production scenarios with high engineering return on investment:",
          "1. **Webhook Processing & Third-Party Integrations**: Payment gateways (Stripe, Xendit) and GitHub webhooks deliver bursty, sporadic HTTP notifications. A serverless API gateway with a Lambda handler handles sudden webhook floods effortlessly without requiring a dedicated cluster listening 24/7.",
          "2. **Automated Media Processing Pipelines**: When users upload high-resolution images or videos to an S3 bucket, an `ObjectCreated` event automatically invokes a Lambda function to compress assets, generate WebP variants, and notify client applications via WebSockets.",
          "3. **Scheduled Maintenance & Cron Automation**: Running periodic database cleanups, generating daily financial summaries, or pulling external exchange rates via AWS EventBridge cron schedules avoids the need to maintain an entire VM purely for scheduled cron execution.",
          "4. **Event-Driven IoT Data Ingestion**: Billions of telemetry sensor payloads streamed through AWS IoT Core or Kinesis can trigger batch Lambda workers that cleanse, normalize, and load metrics into analytical data lakes with minimal latency.",
        ],
        id: [
          "Memahami ranah penggunaan serverless yang tepat akan menghindarkan tim engineering dari kesalahan arsitektural bernilai tinggi. Berikut adalah empat skenario produksi teruji dengan efisiensi rekayasa tertinggi:",
          "1. **Pemrosesan Webhook & Integrasi Pihak Ketiga**: Layanan payment gateway (seperti Stripe, Xendit, Midtrans) atau webhook GitHub mengirimkan notifikasi HTTP secara sporadis dan tak terduga. Endpoint serverless mampu menampung lonjakan webhook secara instan tanpa perlu menyalakan server standby 24 jam.",
          "2. **Pipeline Pemrosesan Media Otomatis**: Saat pengguna mengunggah gambar resolusi tinggi ke Amazon S3, event `ObjectCreated` langsung memicu fungsi Lambda untuk mengompresi gambar, menghasilkan varian WebP, dan memperbarui database secara asinkron tanpa membebani server utama.",
          "3. **Otomasi Pemeliharaan & Jadwal Cron**: Menjalankan pembersihan database rutin, mengirimkan rekap analitik harian, atau menyinkronkan kurs mata uang menggunakan jadwal cron AWS EventBridge jauh lebih hemat dibanding menyewa VPS yang terus menyala sepanjang bulan.",
          "4. **Ingestion Data IoT & Telemetri**: Aliran jutaan paket data sensor perangkat IoT yang dikirim melalui AWS IoT Core atau Kinesis dapat diproses oleh worker Lambda secara batch untuk membersihkan, memformat, dan menyimpan metrik ke Data Lake secara real-time.",
        ],
      },
    },
    {
      id: "conclusion-and-roadmap",
      title: {
        en: "10. Conclusion & Strategic Learning Roadmap for Modern Engineers",
        id: "10. Kesimpulan & Panduan Langkah Belajar Selanjutnya",
      },
      paragraphs: {
        en: [
          "Serverless architecture represents a fundamental evolution in software delivery: shifting developer focus from underlying server mechanics to business logic and user value. While it is not a silver bullet for every computing challenge, it provides unmatched speed to market, operational resilience, and cost efficiency for event-driven workloads.",
          "As you progress in your serverless engineering journey, focus on these four foundational milestones:",
          "1. **Embrace Infrastructure as Code (IaC)**: Never configure serverless resources by clicking through cloud web consoles. Master tools like AWS SAM, AWS CDK (TypeScript-based cloud infrastructure), or Terraform to ensure reproducible deployments.",
          "2. **Master Asynchronous Design Patterns**: Shift your architectural mindset from synchronous REST polling to event-driven architectures utilizing queues (SQS), pub/sub topics (SNS), and event buses (EventBridge).",
          "3. **Implement Distributed Observability Early**: Adopt structured JSON logging and distributed tracing (AWS X-Ray, OpenTelemetry) from day one to maintain end-to-end visibility across distributed microVM executions.",
          "4. **Experiment with Modern Tooling**: Explore frameworks like SST (Serverless Stack) or Cloudflare Workers that offer near-instant local feedback loops, bridging the developer experience gap between local development and cloud production.",
        ],
        id: [
          "Serverless architecture menandai evolusi mendasar dalam rekayasa perangkat lunak: menggeser fokus developer dari pemeliharaan mekanika server menuju logika bisnis dan nilai produk nyata. Meski bukan solusi instan untuk seluruh tantangan komputasi, arsitektur ini memberikan kecepatan rilis (*time-to-market*), ketahanan operasional, dan efisiensi biaya tak tertandingi untuk beban kerja berbasis peristiwa (*event-driven*).",
          "Untuk memperdalam keahlian arsitektur serverless Anda, ikuti empat tahapan pembelajaran terarah berikut:",
          "1. **Kuasai Infrastructure as Code (IaC)**: Hindari membuat fungsi atau database serverless melalui klik antarmuka web console. Kuasai perkakas deklaratif seperti AWS SAM, AWS CDK (membangun infrastruktur cloud dengan TypeScript), atau Terraform agar deployment dapat direproduksi secara konsisten.",
          "2. **Pahami Pola Desain Asinkron**: Alihkan pola pikir dari request-response sinkronus menuju arsitektur *event-driven* yang memanfaatkan antrean (SQS), pub/sub (SNS), dan event bus terpusat (EventBridge).",
          "3. **Terapkan Observabilitas Terdistribusi Sejak Awal**: Gunakan logging JSON terstruktur dan distributed tracing (AWS X-Ray, OpenTelemetry) sejak hari pertama untuk memastikan visibilitas sistem yang menyeluruh saat terjadi kendala.",
          "4. **Eksplorasi Ekosistem Modern**: Uji coba framework modern seperti SST (Serverless Stack) atau Cloudflare Workers yang menawarkan kecepatan iterasi lokal sangat cepat, menjembatani kemudahan development lokal dengan kekuatan cloud.",
        ],
      },
    },
    {
      id: "frequently-asked-questions",
      title: {
        en: "11. Frequently Asked Questions (FAQ)",
        id: "11. Pertanyaan yang Sering Diajukan (FAQ)",
      },
      paragraphs: {
        en: [
          "**Q1: Does serverless truly mean there are no servers?**  \nNo. Physical servers still run in hyperscaler data centers. The term 'serverless' means developers do not manage, provision, patch, or maintain those servers directly.",
          "**Q2: Is serverless suitable for all application workloads?**  \nNo. Workloads with long-running compute jobs exceeding 15 minutes, persistent TCP/WebSocket connections, or continuous ultra-high throughput are better suited for container orchestration (Kubernetes) or dedicated virtual machines.",
          "**Q3: What is the fundamental difference between FaaS and BaaS?**  \nFaaS (Function as a Service) is compute where you deploy your own custom code handlers (e.g., AWS Lambda). BaaS (Backend as a Service) provides ready-to-use managed backend services where third parties manage the logic and infrastructure (e.g., Firebase Auth, Supabase, Clerk).",
          "**Q4: Is serverless always more cost-effective than dedicated hosting?**  \nNot always. Serverless is exceptionally cost-effective for variable, sporadic, or early-stage traffic due to scale-to-zero. However, under constant 24/7 high-volume load, per-execution fees can exceed the cost of dedicated Reserved Instances.",
          "**Q5: What is the best way for a beginner to start learning serverless?**  \nStart by writing an isolated TypeScript or JavaScript function on AWS Lambda or Cloudflare Workers. Connect it to an HTTP endpoint using API Gateway, test it with curl or Postman, and inspect the resulting execution logs in CloudWatch.",
        ],
        id: [
          "**Q1: Apakah serverless benar-benar berjalan tanpa server?**  \nTidak. Server fisik tetap beroperasi di pusat data penyedia cloud. Istilah 'serverless' bermakna bahwa developer tidak perlu mengelola, menyewa, memperbarui, atau memelihara server tersebut secara langsung.",
          "**Q2: Apakah serverless cocok untuk semua jenis aplikasi?**  \nTidak. Aplikasi dengan proses komputasi yang berjalan lebih dari 15 menit, koneksi WebSocket stateful persisten berkapasitas besar, atau beban kerja konstan yang sangat masif lebih efisien dijalankan di atas kluster kontainer (Kubernetes) atau VM terdedikasi.",
          "**Q3: Apa perbedaan mendasar antara FaaS dan BaaS?**  \nFaaS (Function as a Service) adalah layer komputasi tempat Anda menjalankan kode logika bisnis buatan sendiri (misalnya AWS Lambda). BaaS (Backend as a Service) adalah layanan backend siap pakai yang dikelola penuh oleh penyedia cloud tanpa Anda perlu menulis kode servernya (misalnya Firebase Auth, Supabase, Clerk).",
          "**Q4: Apakah serverless selalu lebih murah dibanding server biasa?**  \nTidak selalu. Serverless sangat hemat untuk aplikasi dengan trafik berfluktuasi atau skala awal berkat fitur scale-to-zero. Namun, jika sistem Anda menerima jutaan request konstan tanpa henti setiap detik, biaya sewa VM atau kluster Kubernetes berkapasitas tetap dapat menjadi lebih ekonomis.",
          "**Q5: Bagaimana langkah awal terbaik untuk mulai belajar serverless?**  \nMulailah dengan menulis satu fungsi mandiri menggunakan Node.js atau TypeScript di AWS Lambda atau Cloudflare Workers. Hubungkan ke endpoint HTTP via API Gateway, uji menggunakan Postman atau curl, lalu pelajari cara membaca log error di CloudWatch.",
        ],
      },
      callout: {
        type: "tip",
        text: {
          en: "Official References: AWS Lambda Developer Guide (docs.aws.amazon.com/lambda), CNCF Serverless Working Group (cncf.io), and Martin Fowler's Serverless Architectures Guide (martinfowler.com/articles/serverless.html).",
          id: "Referensi Resmi: Panduan Developer AWS Lambda (docs.aws.amazon.com/lambda), CNCF Serverless Working Group (cncf.io), dan Panduan Arsitektur Serverless Martin Fowler (martinfowler.com/articles/serverless.html).",
        },
      },
    },
  ],
};
