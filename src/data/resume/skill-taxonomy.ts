/**
 * Canonical skill matching taxonomy for deterministic browser-side job description analysis.
 *
 * `profileSkillAliases` maps exact skill names from `masterProfile.skills` to search patterns.
 * `externalSkillTerms` lists common industry terms absent from the verified profile so the
 * analyzer can surface real requirement gaps honestly without inventing skills.
 */

export type SkillPattern = {
  canonical: string;
  /** Plain lowercase substrings matched on token boundaries, or explicit RegExp. */
  patterns: Array<string | RegExp>;
};

export const profileSkillAliases: SkillPattern[] = [
  // Programming Languages
  { canonical: "TypeScript", patterns: ["typescript", "ts"] },
  { canonical: "JavaScript", patterns: ["javascript", "ecmascript", "es6"] },
  {
    canonical: "Go",
    patterns: [
      "golang",
      /\bGo\b(?!\s+(?:to|through|beyond|above|further|live|forward|back|from|into|out|off|on|up|down)\b)/,
      /\bgo(?:\s*1\.\d+|\s+language|\s+programming|\s+backend|\s+services?|\s+api)/i,
      /(?:[,/|]\s*go\b|\bgo\s*[,/|])/i,
    ],
  },
  { canonical: "SQL", patterns: ["sql", "t-sql", "pl/pgsql", "queries", "query optimization"] },
  { canonical: "Python", patterns: ["python", "python3"] },

  // Backend Engineering
  { canonical: "Node.js", patterns: ["node.js", "nodejs", "node js"] },
  {
    canonical: "REST APIs",
    patterns: ["rest", "restful", "rest api", "rest apis", "http api", "http apis"],
  },
  { canonical: "NestJS", patterns: ["nestjs", "nest.js"] },
  { canonical: "Go net/http", patterns: ["net/http"] },
  { canonical: "Gin", patterns: ["gin-gonic", /\bgin\b/i] },
  { canonical: "Convex", patterns: ["convex"] },
  { canonical: "WebSockets", patterns: ["websocket", "websockets", "ws"] },
  { canonical: "Webhooks", patterns: ["webhook", "webhooks"] },
  {
    canonical: "Background Jobs",
    patterns: [
      "background jobs",
      "background workers",
      "async jobs",
      "cron",
      "job queue",
      "worker queue",
    ],
  },
  { canonical: "n8n", patterns: ["n8n"] },
  { canonical: "Zod", patterns: ["zod"] },

  // Frontend Engineering
  { canonical: "Next.js", patterns: ["next.js", "nextjs", "next js", "app router"] },
  { canonical: "React", patterns: ["react", "react.js", "reactjs", "react 19"] },
  { canonical: "Tailwind CSS", patterns: ["tailwind", "tailwindcss", "tailwind css"] },
  { canonical: "TanStack Query", patterns: ["tanstack query", "react query", "react-query"] },
  { canonical: "Accessibility", patterns: ["accessibility", "a11y", "wcag"] },

  // Databases
  { canonical: "PostgreSQL", patterns: ["postgresql", "postgres", "psql", "pg"] },
  { canonical: "MySQL", patterns: ["mysql", "mariadb"] },
  { canonical: "Redis", patterns: ["redis", "caching", "cache"] },
  { canonical: "MongoDB", patterns: ["mongodb", "mongo"] },
  { canonical: "SQLite", patterns: ["sqlite", "sqlite3"] },
  {
    canonical: "Database Migrations",
    patterns: ["database migrations", "schema migrations", "migrations", "sql migrations"],
  },
  {
    canonical: "Data Modeling",
    patterns: [
      "data modeling",
      "schema design",
      "relational database",
      "database design",
      "indexing",
    ],
  },

  // Cloud Infrastructure
  { canonical: "AWS Lambda", patterns: ["aws lambda", "lambda"] },
  { canonical: "API Gateway", patterns: ["api gateway"] },
  { canonical: "AWS SAM", patterns: ["aws sam", "serverless application model"] },
  { canonical: "Serverless", patterns: ["serverless", "faas"] },
  { canonical: "Vercel", patterns: ["vercel"] },
  { canonical: "GitHub Pages", patterns: ["github pages"] },

  // DevOps & CI/CD
  { canonical: "Docker", patterns: ["docker", "containerization", "containers", "containerized"] },
  { canonical: "Docker Compose", patterns: ["docker compose", "docker-compose"] },
  { canonical: "Kubernetes (K3s)", patterns: ["kubernetes", "k8s", "k3s"] },
  { canonical: "GitHub Actions", patterns: ["github actions"] },
  { canonical: "Git", patterns: [/\bgit\b/i] },
  {
    canonical: "CI/CD",
    patterns: [
      "ci/cd",
      "ci cd",
      "continuous integration",
      "continuous delivery",
      "deployment pipeline",
    ],
  },
  {
    canonical: "Structured Logging",
    patterns: ["structured logging", "logging", "observability", "slog"],
  },
  {
    canonical: "Production Debugging",
    patterns: [
      "production debugging",
      "troubleshooting",
      "incident response",
      "debugging",
      "root cause",
    ],
  },

  // Security & Authentication
  { canonical: "JWT", patterns: ["jwt", "json web token", "json web tokens"] },
  {
    canonical: "RBAC",
    patterns: ["rbac", "role-based access", "role based access", "authorization", "access control"],
  },
  { canonical: "OAuth 2.0", patterns: ["oauth", "oauth 2", "oauth 2.0", "oidc", "sso"] },
  { canonical: "Clerk", patterns: ["clerk"] },
  {
    canonical: "HMAC Signing",
    patterns: ["hmac", "signature verification", "cryptographic signing"],
  },
  {
    canonical: "Rate Limiting",
    patterns: ["rate limiting", "rate-limiting", "throttling", "throttle"],
  },
  {
    canonical: "Multi-tenancy",
    patterns: ["multi-tenant", "multi-tenancy", "multitenant", "tenant isolation"],
  },

  // Testing & Quality Engineering
  { canonical: "Playwright", patterns: ["playwright", "e2e testing", "end-to-end testing"] },
  { canonical: "Vitest", patterns: ["vitest"] },
  { canonical: "Go testing", patterns: ["go test", "table-driven tests"] },
  { canonical: "pytest", patterns: ["pytest"] },
  {
    canonical: "Integration Testing",
    patterns: ["integration testing", "integration tests", "unit testing", "automated testing"],
  },

  // System Architecture
  { canonical: "API Design", patterns: ["api design", "api architecture", "api contracts"] },
  { canonical: "OpenAPI", patterns: ["openapi", "swagger"] },
  {
    canonical: "Hexagonal Architecture",
    patterns: ["hexagonal architecture", "ports and adapters"],
  },
  { canonical: "Clean Architecture", patterns: ["clean architecture", "domain-driven", "ddd"] },
  {
    canonical: "Microservices",
    patterns: ["microservices", "microservice", "distributed services"],
  },
  {
    canonical: "Event-Driven Architecture",
    patterns: ["event-driven", "event driven", "domain events", "pub/sub"],
  },
  { canonical: "Transactional Outbox", patterns: ["transactional outbox", "outbox pattern"] },
  { canonical: "Idempotency", patterns: ["idempotency", "idempotent"] },
];

/**
 * Common industry skills that are NOT in the verified master profile.
 * Matched against job descriptions solely to identify honest gaps.
 */
export const externalSkillTerms: SkillPattern[] = [
  { canonical: "GraphQL", patterns: ["graphql"] },
  { canonical: "gRPC", patterns: ["grpc", "protobuf", "protocol buffers"] },
  { canonical: "Kafka", patterns: ["kafka", "apache kafka"] },
  { canonical: "RabbitMQ", patterns: ["rabbitmq"] },
  { canonical: "Terraform", patterns: ["terraform", "opentofu", "infrastructure as code", "iac"] },
  { canonical: "AWS ECS / EKS", patterns: ["aws ecs", "aws eks", /\becs\b/, /\beks\b/] },
  { canonical: "AWS RDS / Aurora", patterns: ["aws rds", "aurora", /\brds\b/] },
  { canonical: "AWS S3", patterns: ["aws s3", "amazon s3", /\bs3\b/] },
  { canonical: "DynamoDB", patterns: ["dynamodb"] },
  { canonical: "Vitess", patterns: ["vitess"] },
  { canonical: "Database Sharding", patterns: ["sharding", "horizontal partitioning"] },
  { canonical: "Prisma", patterns: ["prisma"] },
  { canonical: "Drizzle ORM", patterns: ["drizzle"] },
  { canonical: "Java", patterns: ["java", "spring boot"] },
  { canonical: "C# / .NET", patterns: ["c#", ".net", "dotnet"] },
  { canonical: "Rust", patterns: [/\brust\b/i] },
  { canonical: "Ruby / Rails", patterns: ["ruby on rails", /\bruby\b/i] },
  { canonical: "PHP / Laravel", patterns: ["laravel", /\bphp\b/i] },
  { canonical: "Vue.js", patterns: ["vue", "vue.js", "nuxt"] },
  { canonical: "Angular", patterns: ["angular"] },
  { canonical: "GCP", patterns: ["google cloud", /\bgcp\b/] },
  { canonical: "Azure", patterns: ["azure"] },
  {
    canonical: "Prometheus / Grafana",
    patterns: ["prometheus", "grafana", "datadog", "opentelemetry"],
  },
  {
    canonical: "LLM / RAG / Vector DBs",
    patterns: ["langchain", "vector database", "pgvector", "pinecone", /\brag\b/, /\bllm\b/i],
  },
];
