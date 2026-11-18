import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("E2E Built Site Verification (SSG output)", () => {
  const OUT_DIR = path.resolve(process.cwd(), "out");
  const REMOVED_NAMES = ["Arvispro", "Lelungo", "Gegarap", "Reklame Gegarap"];
  const REMOVED_DOMAINS = ["arvispro.id", "lelungo.com", "gegarap.id", "reklame.gegarap.id"];
  const REMOVED_SLUGS = ["arvispro", "lelungo", "gegarap", "reklame-gegarap"];

  const EXPECTED_SLUGS = [
    "lendloop",
    "opspilot",
    "idx-trading-assistant",
    "veloura",
    "astraops",
    "griya-properti",
    "tragapos",
  ];

  it("out directory should exist and have generated static files", () => {
    assert.equal(fs.existsSync(OUT_DIR), true, "out directory must exist");
    assert.equal(fs.existsSync(path.join(OUT_DIR, "index.html")), true);
    assert.equal(fs.existsSync(path.join(OUT_DIR, "projects", "index.html")), true);
    assert.equal(fs.existsSync(path.join(OUT_DIR, "sitemap.xml")), true);
  });

  it("out/index.html should not contain any deleted projects and should contain all 7 active projects", () => {
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
    assert.equal(html.includes("07"), true, "Homepage should display 07 selected projects");
  });

  it("out/projects/index.html should list only the 7 active projects", () => {
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
    assert.equal(sitemap.includes("/resume/"), true, "Sitemap must contain /resume/");
    assert.equal(sitemap.includes("/journey/"), true, "Sitemap must contain /journey/");
    assert.equal(
      sitemap.includes("/journey/chapter-01/"),
      true,
      "Sitemap must contain /journey/chapter-01/",
    );
  });

  it("out/journey and out/journey/chapter-01 should be exported with chapter structure", () => {
    const journeyIndex = path.join(OUT_DIR, "journey", "index.html");
    const chapterOneIndex = path.join(OUT_DIR, "journey", "chapter-01", "index.html");
    assert.equal(fs.existsSync(journeyIndex), true, "out/journey/index.html must exist");
    assert.equal(
      fs.existsSync(chapterOneIndex),
      true,
      "out/journey/chapter-01/index.html must exist",
    );

    const journeyHtml = fs.readFileSync(journeyIndex, "utf-8");
    const chapterHtml = fs.readFileSync(chapterOneIndex, "utf-8");
    assert.equal(journeyHtml.includes("The Foundation"), true);
    assert.equal(journeyHtml.includes("The Expansion"), true);
    assert.equal(journeyHtml.includes("The Contribution"), true);
    assert.equal(chapterHtml.includes("The Beginning"), true);
    assert.equal(chapterHtml.includes("The Direction"), true);
  });

  it("out/resume and out/resume/print should be exported without placeholder leaks", () => {
    const resumeHtml = fs.readFileSync(path.join(OUT_DIR, "resume", "index.html"), "utf-8");
    const printHtml = fs.readFileSync(path.join(OUT_DIR, "resume", "print", "index.html"), "utf-8");

    assert.equal(resumeHtml.includes("src/data/education.ts"), false);
    assert.equal(printHtml.includes("src/data/education.ts"), false);
    assert.equal(resumeHtml.includes("Software Engineer"), true);
    assert.equal(resumeHtml.includes("Danial Fachrudin"), true);
  });
});
