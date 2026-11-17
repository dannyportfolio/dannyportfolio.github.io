import assert from "node:assert/strict";
import test from "node:test";
import { masterProfile } from "../src/data/resume/master-profile.ts";
import { roleIds, rolePresets } from "../src/data/resume/role-presets.ts";
import { education } from "../src/data/education.ts";
import { buildResume } from "../src/lib/resume/build-resume.ts";
import { resumeBaseFilename } from "../src/lib/resume/filename.ts";

test("masterProfile preserves accurate career timeline and verified gaps", () => {
  assert.equal(masterProfile.experience.length, 2);
  const periods = masterProfile.experience.map((item) => `${item.startYear} - ${item.endYear}`);
  assert.deepEqual(periods, ["2023 - Present", "2021 - 2023"]);
  assert.equal(masterProfile.education.length, 0);
  assert.equal(education.length, 0);
  assert.ok(masterProfile.informationGaps.length > 0);
  assert.ok(masterProfile.certifications.some((cert) => cert.status === "verified"));
});

test("rolePresets supports only the 3 core minimalist roles", () => {
  assert.deepEqual(roleIds, ["software", "backend", "fullstack"]);
  assert.equal(rolePresets.software.label, "Software Engineer");
  assert.equal(rolePresets.backend.label, "Backend Engineer");
  assert.equal(rolePresets.fullstack.label, "Full Stack Engineer");
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
