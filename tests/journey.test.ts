import assert from "node:assert/strict";
import test from "node:test";
import {
  documentedJourneyChapters,
  getJourneyChapter,
  journeyArchive,
  journeyChapters,
  journeyPillars,
} from "../src/data/journey.ts";

test("journeyChapters follows the fixed five-year chapter cadence", () => {
  assert.equal(journeyChapters.length, 3);
  assert.deepEqual(
    journeyChapters.map((c) => ({
      slug: c.slug,
      number: c.number,
      period: c.period,
      status: c.status,
    })),
    [
      { slug: "chapter-01", number: "01", period: "2021–2026", status: "documented" },
      { slug: "chapter-02", number: "02", period: "2026–2031", status: "future" },
      { slug: "chapter-03", number: "03", period: "2031–2036", status: "future" },
    ],
  );
});

test("only documented chapters expose reading routes and full sections", () => {
  assert.deepEqual(
    documentedJourneyChapters.map((c) => c.slug),
    ["chapter-01"],
  );
  assert.ok(getJourneyChapter("chapter-01"));
  assert.equal(getJourneyChapter("chapter-02"), undefined);
  assert.equal(getJourneyChapter("chapter-03"), undefined);

  for (const chapter of journeyChapters.filter((c) => c.status === "future")) {
    assert.equal(chapter.sections, undefined, `${chapter.slug} must remain unwritten`);
  }
});

test("Chapter 01 follows the exact six-section editorial progression", () => {
  const chapterOne = getJourneyChapter("chapter-01");
  assert.ok(chapterOne?.sections);
  assert.deepEqual(
    chapterOne.sections.map((s) => s.id),
    [
      "the-beginning",
      "the-challenges",
      "the-experience",
      "the-realization",
      "the-transformation",
      "the-direction",
    ],
  );

  const realization = chapterOne.sections.find((s) => s.id === "the-realization");
  assert.ok(realization?.pullQuote?.en.includes("Your life is not defined by where you started."));
});

test("journeyPillars defines the five foundational commitments with complete localization", () => {
  assert.deepEqual(
    journeyPillars.map((p) => p.id),
    ["experience", "trust-reputation", "wealth", "intellectual-growth", "personal-character"],
  );

  for (const pillar of journeyPillars) {
    assert.ok(pillar.title.en.length > 0 && pillar.title.id.length > 0);
    assert.ok(pillar.summary.en.length > 0 && pillar.summary.id.length > 0);
    assert.ok(pillar.commitment.en.length > 0 && pillar.commitment.id.length > 0);
  }

  assert.equal(journeyArchive.guidingPrinciples.length, 7);
});

test("Chapter 01 preserves factual guardrails and avoids fabricated claims", () => {
  const chapterOne = getJourneyChapter("chapter-01");
  assert.ok(chapterOne);
  const serialized = JSON.stringify(chapterOne);

  assert.ok(!/Senior\s+(Software\s+)?Engineer/i.test(serialized));
  assert.ok(!/college is useless/i.test(serialized));
  assert.ok(serialized.includes("Rekayasa Perangkat Lunak"));
  assert.ok(serialized.includes("PT Trukindo Logistik Prima"));
  assert.ok(serialized.includes("take-home"));

  for (const section of chapterOne.sections ?? []) {
    for (const para of [...section.paragraphs.en, ...section.paragraphs.id]) {
      assert.equal(para.includes("—"), false, `Prose paragraph in ${section.id} contains em dash`);
    }
  }
});
