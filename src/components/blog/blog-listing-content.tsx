"use client";

import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function BlogListingContent() {
  const { locale } = useLocale();
  const t = translations.blogPage;
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(blogPosts.map((p) => p.category[locale])))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category[locale] === selectedCategory;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      post.title[locale].toLowerCase().includes(searchLower) ||
      post.summary[locale].toLowerCase().includes(searchLower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.eyebrow[locale]}</p>
          <h1>
            {t.titlePrefix[locale]}
            <br />
            <em>{t.titleEm[locale]}</em>
          </h1>
          <p>{t.description[locale]}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "36px",
            }}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`button button-small ${selectedCategory === cat ? "button-primary" : "button-secondary"}`}
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.8rem",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  {cat === "all" ? t.allCategories[locale] : cat}
                </button>
              ))}
            </div>

            <div style={{ minWidth: "260px" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder[locale]}
                aria-label={t.searchPlaceholder[locale]}
                style={{
                  width: "100%",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  color: "var(--text)",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="projects-grid">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ color: "var(--muted)" }}>{t.noArticlesFound[locale]}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
