import assert from "node:assert/strict";
import test from "node:test";
import { getEngineeringYears, masterProfile } from "../src/data/resume/master-profile.ts";
import { roleIds, rolePresets } from "../src/data/resume/role-presets.ts";
import { education } from "../src/data/education.ts";
import { buildResume } from "../src/lib/resume/build-resume.ts";
import { resumeBaseFilename } from "../src/lib/resume/filename.ts";

test("masterProfile preserves accurate career timeline and verified gaps", () => {
  assert.equal(masterProfile.experience.length, 3);
  const periods = masterProfile.experience.map(
    (item) => item.periodLabel ?? `${item.startYear} - ${item.endYear}`,
  );
  assert.deepEqual(periods, ["April 2026 - November 2026", "2023 - Present", "2021 - 2023"]);
  assert.equal(masterProfile.education.length, 0);
  assert.equal(education.length, 0);
  assert.ok(masterProfile.informationGaps.length > 0);
  assert.ok(masterProfile.certifications.some((cert) => cert.status === "verified"));
});

test("getEngineeringYears increments automatically every January from 2021", () => {
  assert.equal(getEngineeringYears(2021, new Date(2026, 10, 22)), 5);
  assert.equal(getEngineeringYears(2021, new Date(2026, 11, 31, 23, 59, 59)), 5);
  assert.equal(getEngineeringYears(2021, new Date(2027, 0, 1, 0, 0, 0)), 6);
  assert.equal(getEngineeringYears(2021, new Date(2028, 0, 1, 0, 0, 0)), 7);

  const resume2026 = buildResume(masterProfile, {
    referenceDate: new Date(2026, 10, 22),
  });
  assert.equal(resume2026.experienceYears, 5);
  assert.ok(resume2026.summary.includes("5+ years"));

  const resume2027 = buildResume(masterProfile, {
    referenceDate: new Date(2027, 0, 1),
  });
  assert.equal(resume2027.experienceYears, 6);
  assert.ok(resume2027.summary.includes("6+ years"));
});

test("rolePresets supports the 4 engineering roles", () => {
  assert.deepEqual(roleIds, ["software", "backend", "fullstack", "systems"]);
  assert.equal(rolePresets.software.label, "Software Engineer");
  assert.equal(rolePresets.backend.label, "Backend Engineer");
  assert.equal(rolePresets.fullstack.label, "Full Stack Engineer");
  assert.equal(rolePresets.systems.label, "Systems & Cloud Engineer");
});

test("buildResume defaults to Software Engineer standard mode with no unverified claims or em dashes", () => {
  const resume = buildResume(masterProfile, {});
  assert.equal(resume.role, "software");
  assert.equal(resume.detailed, false);
  assert.equal(resume.filenameBase, "Danial_Fachrudin_Software_Engineer_Resume");
  assert.equal(resume.projects.length, 3);
  assert.equal(resume.education.length, 0);

  const serialized = JSON.stringify(resume);
  assert.ok(!serialized.includes("—"), "Resume output should not contain em dashes");
  assert.ok(!serialized.includes("Prisma"));
  assert.ok(!serialized.includes("Supabase"));
  assert.ok(!serialized.includes("Railway"));
});

test("buildResume prioritizes role-specific skills and projects and supports detailed mode", () => {
  const backendStandard = buildResume(masterProfile, { role: "backend", detailed: false });
  assert.equal(backendStandard.role, "backend");
  assert.equal(backendStandard.filenameBase, "Danial_Fachrudin_Backend_Engineer_Resume");
  assert.deepEqual(
    backendStandard.skillCategories.slice(0, 3).map((category) => category.id),
    ["languages", "backend", "databases"],
  );
  assert.equal(backendStandard.projects[1]?.slug, "veloura");
  assert.equal(backendStandard.projects.length, 3);
  assert.equal(backendStandard.projects[0]?.architecture, undefined);

  const fullstackDetailed = buildResume(masterProfile, { role: "fullstack", detailed: true });
  assert.equal(fullstackDetailed.role, "fullstack");
  assert.equal(fullstackDetailed.detailed, true);
  assert.equal(fullstackDetailed.filenameBase, "Danial_Fachrudin_Full_Stack_Engineer_Resume");
  assert.equal(fullstackDetailed.projects.length, 4);
  assert.ok(fullstackDetailed.projects.some((project) => Boolean(project.architecture)));
  assert.ok(fullstackDetailed.summary.length > backendStandard.summary.length);
  assert.ok(
    backendStandard.skillCategories.every((category) => category.skills.length <= 4),
    "Standard mode should cap skills per category to keep the resume concise",
  );
  assert.ok(
    fullstackDetailed.skillCategories.some((category) => category.skills.length > 4),
    "Detailed mode should include the full verified skill matrix",
  );
  assert.ok(
    backendStandard.certifications.length < fullstackDetailed.certifications.length,
    "Standard mode should curate certifications to English-language credentials",
  );
  assert.ok(
    backendStandard.certifications.every((cert) => !/\bpemula\b|\buntuk\b/i.test(cert.name)),
  );
});

test("resumeBaseFilename formats ATS-safe filenames", () => {
  assert.equal(
    resumeBaseFilename({
      candidateName: "Danial Fachrudin",
      roleLabel: "Software Engineer",
    }),
    "Danial_Fachrudin_Software_Engineer_Resume",
  );
  assert.equal(
    resumeBaseFilename({
      candidateName: "Danial Fachrudin",
      roleLabel: "Backend Engineer",
    }),
    "Danial_Fachrudin_Backend_Engineer_Resume",
  );
});
