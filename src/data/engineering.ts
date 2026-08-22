export type EngineeringArticle = { slug: string; title: string; excerpt: string; topics: string[] };
export const engineeringArticles: EngineeringArticle[] = [
  {
    slug: "production-ready-apis",
    title: "Designing Production-Ready APIs",
    excerpt:
      "A concise, editable outline for API contracts, failure modes, versioning, and operation.",
    topics: ["API design", "Reliability"],
  },
  {
    slug: "avoiding-n-plus-one",
    title: "Avoiding N+1 Database Queries",
    excerpt: "A starting point for documenting query shape, batching, joins, and measurement.",
    topics: ["Database", "Performance"],
  },
  {
    slug: "response-projection",
    title: "API Response Projection & Data Security",
    excerpt: "A placeholder guide for deliberate response contracts and limiting exposed data.",
    topics: ["Security", "API design"],
  },
  {
    slug: "redis-caching",
    title: "Caching Strategies with Redis",
    excerpt: "An editable outline for cache boundaries, invalidation, and observability.",
    topics: ["Caching", "Redis"],
  },
  {
    slug: "background-jobs",
    title: "Background Jobs & Queue Architecture",
    excerpt: "A placeholder for delivery guarantees, retries, idempotency, and queues.",
    topics: ["Queues", "Reliability"],
  },
  {
    slug: "database-indexing",
    title: "Database Indexing",
    excerpt: "An outline for documenting access patterns, indexing decisions, and validation.",
    topics: ["PostgreSQL", "Performance"],
  },
  {
    slug: "production-observability",
    title: "Production Logging & Observability",
    excerpt: "A starting point for structured events, traces, alerts, and debugging practices.",
    topics: ["Observability", "Operations"],
  },
];
