import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projects, getProject } from "../src/data/projects.ts";

describe("Projects Dataset Verification", () => {
  const REMOVED_SLUGS = ["arvispro", "lelungo", "gegarap", "reklame-gegarap"];
  const EXPECTED_SLUGS = ["lendloop", "opspilot", "idx-trading-assistant", "veloura", "astraops"];

  it("should contain exactly 5 verified projects", () => {
    assert.equal(projects.length, 5);
  });

  it("should match the expected active project slugs in order", () => {
    const currentSlugs = projects.map((p) => p.slug);
    assert.deepEqual(currentSlugs, EXPECTED_SLUGS);
  });

  it("should not contain any of the removed project slugs", () => {
    for (const slug of REMOVED_SLUGS) {
      const existsInList = projects.some((p) => p.slug === slug);
      assert.equal(existsInList, false, `Project ${slug} should not exist in projects list`);

      const found = getProject(slug);
      assert.equal(found, undefined, `getProject("${slug}") should return undefined`);
    }
  });

  it("should have all required fields and bilingual translations for all active projects", () => {
    for (const project of projects) {
      assert.ok(project.slug, `Project must have a slug`);
      assert.ok(project.name, `Project ${project.slug} must have a name`);
      assert.ok(project.domain, `Project ${project.slug} must have a domain`);
      assert.ok(project.url, `Project ${project.slug} must have a url`);

      // Summary
      assert.ok(project.summary.en, `Project ${project.slug} must have English summary`);
      assert.ok(project.summary.id, `Project ${project.slug} must have Indonesian summary`);

      // Category
      assert.ok(project.category.en, `Project ${project.slug} must have English category`);
      assert.ok(project.category.id, `Project ${project.slug} must have Indonesian category`);

      // Highlights
      assert.ok(Array.isArray(project.highlights.en) && project.highlights.en.length > 0);
      assert.ok(Array.isArray(project.highlights.id) && project.highlights.id.length > 0);

      // Technologies
      assert.ok(Array.isArray(project.technologies) && project.technologies.length > 0);

      // System narrative fields
      assert.ok(project.problem.en && project.problem.id);
      assert.ok(project.challenge.en && project.challenge.id);
      assert.ok(project.architecture.en && project.architecture.id);
      assert.ok(project.contributions.en.length > 0 && project.contributions.id.length > 0);
      assert.ok(project.reliability.en && project.reliability.id);
      assert.ok(project.implementation.en.length > 0 && project.implementation.id.length > 0);

      // Architecture steps
      assert.equal(project.caseStudy, true);
      assert.ok(Array.isArray(project.architectureSteps) && project.architectureSteps.length > 0);
      for (const step of project.architectureSteps) {
        assert.ok(step.id);
        assert.ok(step.label.en && step.label.id);
        assert.ok(step.description.en && step.description.id);
      }
    }
  });

  it("should find every active project by slug via getProject", () => {
    for (const slug of EXPECTED_SLUGS) {
      const p = getProject(slug);
      assert.ok(p, `Project ${slug} must be retrievable via getProject`);
      assert.equal(p.slug, slug);
    }
  });
});
