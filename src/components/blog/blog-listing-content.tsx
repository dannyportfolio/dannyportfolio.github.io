"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogTopicFilter, type TopicItem } from "@/components/blog/blog-topic-filter";
import { blogPosts } from "@/data/blog";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function BlogListingContent() {
  const { locale } = useLocale();
  const t = translations.blogPage;
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Derive unique topics dynamically from authentic blog posts
  const topics: TopicItem[] = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    for (const post of blogPosts) {
      const canonicalId = post.category.en;
      const localizedLabel = post.category[locale];
      const existing = map.get(canonicalId);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(canonicalId, {
          id: canonicalId,
          label: localizedLabel,
          count: 1,
        });
      }
    }
    return Array.from(map.values());
  }, [locale]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.en === selectedCategory ||
      post.category[locale] === selectedCategory;
    const searchLower = search.toLowerCase().trim();
    const matchesSearch =
      searchLower === "" ||
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
          <div className="blog-filter-bar">
            <BlogTopicFilter
              topics={topics}
              selectedTopicId={selectedCategory}
              onSelectTopic={setSelectedCategory}
              totalPosts={blogPosts.length}
            />

            <div className="blog-search-box">
              <svg
                className="blog-search-box__icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder[locale]}
                aria-label={t.searchPlaceholder[locale]}
                className="blog-search-box__input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="blog-search-box__clear"
                  aria-label={t.clearFilter[locale]}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="projects-grid">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="blog-no-results">
              <p>{t.noArticlesFound[locale]}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
