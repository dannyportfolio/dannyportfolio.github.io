import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("E2E Built Site Verification (SSG output)", () => {
  const OUT_DIR = path.resolve(process.cwd(), "out");
  const REMOVED_NAMES = ["Arvispro", "Lelungo", "Gegarap", "Reklame Gegarap"];
  const REMOVED_DOMAINS = ["arvispro.id", "lelungo.com", "gegarap.id", "reklame.gegarap.id"];
  const REMOVED_SLUGS = ["arvispro", "lelungo", "gegarap", "reklame-gegarap"];

  const EXPECTED_SLUGS = ["lendloop", "opspilot", "idx-trading-assistant", "veloura", "astraops"];

  it("out directory should exist and have generated static files", () => {
    assert.equal(fs.existsSync(OUT_DIR), true, "out directory must exist");
    assert.equal(fs.existsSync(path.join(OUT_DIR, "index.html")), true);
    assert.equal(fs.existsSync(path.join(OUT_DIR, "projects", "index.html")), true);
    assert.equal(fs.existsSync(path.join(OUT_DIR, "sitemap.xml")), true);
  });

  it("out/index.html should not contain any deleted projects and should contain all 5 active projects", () => {
    const html = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf-8");

    // Check removed names, slugs, and domains are NOT present
    for (const name of REMOVED_NAMES) {
      assert.equal(html.includes(name), false, `Homepage should not contain project name: ${name}`);
    }
    for (const domain of REMOVED_DOMAINS) {
      assert.equal(
        html.includes(domain),
        false,
        `Homepage should not contain project domain: ${domain}`,
      );
    }
    for (const slug of REMOVED_SLUGS) {
      assert.equal(
        html.includes(`/case-studies/${slug}/`),
        false,
        `Homepage should not link to case study: ${slug}`,
      );
    }

    // Check expected active projects are present
    for (const slug of EXPECTED_SLUGS) {
      assert.equal(
        html.includes(`/case-studies/${slug}/`),
        true,
        `Homepage must link to active case study: ${slug}`,
      );
    }

    // Check project count indicator
    assert.equal(html.includes("05"), true, "Homepage should display 05 selected projects");
  });

  it("out/projects/index.html should list only the 5 active projects", () => {
    const html = fs.readFileSync(path.join(OUT_DIR, "projects", "index.html"), "utf-8");

    for (const name of REMOVED_NAMES) {
      assert.equal(
        html.includes(name),
        false,
        `Projects catalog should not contain project name: ${name}`,
      );
    }
    for (const domain of REMOVED_DOMAINS) {
      assert.equal(
        html.includes(domain),
        false,
        `Projects catalog should not contain project domain: ${domain}`,
      );
    }
    for (const slug of REMOVED_SLUGS) {
      assert.equal(
        html.includes(`/case-studies/${slug}/`),
        false,
        `Projects catalog should not link to: ${slug}`,
      );
    }
    for (const slug of EXPECTED_SLUGS) {
      assert.equal(
        html.includes(`/case-studies/${slug}/`),
        true,
        `Projects catalog must link to: ${slug}`,
      );
    }
  });

  it("out/case-studies should contain directories only for active projects", () => {
    const caseStudiesDir = path.join(OUT_DIR, "case-studies");
    assert.equal(fs.existsSync(caseStudiesDir), true);

    const entries = fs.readdirSync(caseStudiesDir);

    for (const slug of REMOVED_SLUGS) {
      assert.equal(
        entries.includes(slug),
        false,
        `Case study directory for ${slug} must not exist in out/case-studies/`,
      );
    }

    for (const slug of EXPECTED_SLUGS) {
      assert.equal(
        entries.includes(slug),
        true,
        `Case study directory for ${slug} must exist in out/case-studies/`,
      );
      assert.equal(
        fs.existsSync(path.join(caseStudiesDir, slug, "index.html")),
        true,
        `index.html must exist in /case-studies/${slug}/`,
      );
    }
  });

  it("out/sitemap.xml should only contain URLs for active projects", () => {
    const sitemap = fs.readFileSync(path.join(OUT_DIR, "sitemap.xml"), "utf-8");

    for (const slug of REMOVED_SLUGS) {
      assert.equal(
        sitemap.includes(`/case-studies/${slug}/`),
        false,
        `Sitemap must not contain URL for ${slug}`,
      );
    }

    for (const slug of EXPECTED_SLUGS) {
      assert.equal(
        sitemap.includes(`/case-studies/${slug}/`),
        true,
        `Sitemap must contain URL for ${slug}`,
      );
    }
  });
});
