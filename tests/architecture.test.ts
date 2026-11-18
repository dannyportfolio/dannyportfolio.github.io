import assert from "node:assert/strict";
import test from "node:test";
import { getEngineeringArticle, publishedEngineeringArticles } from "../src/data/engineering.ts";
import { DEFAULT_ROLE, resolveRole } from "../src/data/resume/role-presets.ts";
import { isTheme } from "../src/lib/browser/storage.ts";
import { SITE_URL } from "../src/lib/config/site.ts";
import { serializeJsonLd, stripUrlScheme } from "../src/lib/utils.ts";

test("SITE_URL is a valid normalized origin without a trailing slash", () => {
  const parsed = new URL(SITE_URL);
  assert.ok(parsed.protocol === "https:" || parsed.protocol === "http:");
  assert.equal(SITE_URL.endsWith("/"), false);
});

test("stripUrlScheme normalizes http, https, www, and trailing slashes", () => {
  assert.equal(stripUrlScheme("https://www.example.com/"), "example.com");
  assert.equal(stripUrlScheme("http://github.com/dannyportfolio/"), "github.com/dannyportfolio");
});

test("serializeJsonLd escapes < characters to prevent script tag breakout", () => {
  const output = serializeJsonLd({ title: "</script><script>alert(1)</script>" });
  assert.equal(output.includes("<"), false);
  assert.equal(output.includes("\\u003c/script>"), true);
});

test("resolveRole accepts valid role IDs and falls back to DEFAULT_ROLE", () => {
  assert.equal(resolveRole("backend"), "backend");
  assert.equal(resolveRole("fullstack"), "fullstack");
  assert.equal(resolveRole("unknown-role"), DEFAULT_ROLE);
  assert.equal(resolveRole(null), DEFAULT_ROLE);
});

test("isTheme validates light and dark theme values strictly", () => {
  assert.equal(isTheme("light"), true);
  assert.equal(isTheme("dark"), true);
  assert.equal(isTheme("system"), false);
  assert.equal(isTheme(null), false);
});

test("publishedEngineeringArticles only exposes published articles", () => {
  assert.ok(publishedEngineeringArticles.length > 0);
  for (const article of publishedEngineeringArticles) {
    assert.equal(article.published, true);
    assert.equal(getEngineeringArticle(article.slug)?.slug, article.slug);
  }
});
