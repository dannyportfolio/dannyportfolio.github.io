import assert from "node:assert/strict";
import test from "node:test";
import { buildAccessibleText, indexWordSegments, tokenizeWords } from "../src/lib/motion/text.ts";
import { normalizeRoutePath, shouldInterceptNavigation } from "../src/lib/motion/navigation.ts";

test("tokenizeWords preserves exact word order and punctuation without empty tokens", () => {
  assert.deepEqual(tokenizeWords("Building Systems That Perform."), [
    "Building",
    "Systems",
    "That",
    "Perform.",
  ]);
  assert.deepEqual(tokenizeWords("  OpsPilot — Go, AWS & PostgreSQL.  "), [
    "OpsPilot",
    "—",
    "Go,",
    "AWS",
    "&",
    "PostgreSQL.",
  ]);
  assert.deepEqual(tokenizeWords("   "), []);
});

test("buildAccessibleText and indexWordSegments preserve continuous indices across segments", () => {
  const segments = [
    { text: "My Journey" },
    { text: "Built by Action.", accent: true, breakBefore: true },
  ];
  assert.equal(buildAccessibleText(segments), "My Journey Built by Action.");

  const indexed = indexWordSegments(segments);
  assert.equal(indexed.totalWords, 5);
  assert.deepEqual(
    indexed.segments.flatMap((s) => s.words.map((w) => w.globalIndex)),
    [0, 1, 2, 3, 4],
  );
});

test("normalizeRoutePath handles trailing slashes consistently", () => {
  assert.equal(normalizeRoutePath("/"), "/");
  assert.equal(normalizeRoutePath("/journey/"), "/journey");
  assert.equal(normalizeRoutePath("/journey/chapter-01/"), "/journey/chapter-01");
});

test("shouldInterceptNavigation filters external, hash, download, same-page, and print links", () => {
  const base = {
    currentHref: "https://dannyportfolio.github.io/journey/",
    targetAttr: null,
    hasDownload: false,
    relAttr: null,
  };

  assert.deepEqual(shouldInterceptNavigation({ ...base, href: "/projects" }), {
    intercept: true,
    destination: "/projects",
  });

  assert.deepEqual(
    shouldInterceptNavigation({ ...base, href: "/journey/chapter-01#the-experience" }),
    {
      intercept: true,
      destination: "/journey/chapter-01#the-experience",
    },
  );

  assert.equal(shouldInterceptNavigation({ ...base, href: "/journey" }).intercept, false);
  assert.equal(shouldInterceptNavigation({ ...base, href: "#timeline" }).intercept, false);
  assert.equal(
    shouldInterceptNavigation({ ...base, href: "https://github.com/dannyportfolio" }).intercept,
    false,
  );
  assert.equal(
    shouldInterceptNavigation({ ...base, href: "/projects", targetAttr: "_blank" }).intercept,
    false,
  );
  assert.equal(
    shouldInterceptNavigation({ ...base, href: "/projects", hasDownload: true }).intercept,
    false,
  );
  assert.equal(
    shouldInterceptNavigation({ ...base, href: "/certificates/aws.pdf" }).intercept,
    false,
  );
  assert.equal(
    shouldInterceptNavigation({ ...base, href: "/resume/print/?role=software" }).intercept,
    false,
  );
});
