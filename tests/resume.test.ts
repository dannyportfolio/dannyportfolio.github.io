import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { masterProfile } from "../src/data/resume/master-profile.ts";
import { roleIds, rolePresets } from "../src/data/resume/role-presets.ts";
import { analyzeJobDescription } from "../src/lib/resume/job-analyzer.ts";
import { buildResume } from "../src/lib/resume/build-resume.ts";
import { resumeBaseFilename } from "../src/lib/resume/filename.ts";
import { buildResumeDocx, extractDocxXmlEntries } from "../src/lib/resume/export-docx.ts";
import { buildResumePlainText } from "../src/lib/resume/export-text.ts";
import {
  decodeJobPayload,
  encodeJobPayload,
  saveResumeVersion,
} from "../src/lib/resume/version-store.ts";

describe("Master Profile Integrity", () => {
  it("separates overall software engineering since 2021 from independent freelance since 2023", () => {
    assert.equal(masterProfile.timeline.engineeringSince, 2021);
    assert.equal(masterProfile.timeline.freelanceSince, 2023);

    const freelance = masterProfile.experience.find((item) => item.id === "freelance");
    const early = masterProfile.experience.find((item) => item.id === "early-career");
    assert.ok(freelance);
    assert.ok(early);
    assert.equal(freelance.title, "Freelance Software Engineer");
    assert.equal(freelance.startYear, 2023);
    assert.equal(early.startYear, 2021);
    assert.equal(early.endYear, 2023);
  });

  it("excludes unverified skill claims (Prisma, Supabase, Railway) and omits unverified education", () => {
    const skillNames = new Set(masterProfile.skills.map((skill) => skill.name));
    assert.equal(skillNames.has("Prisma"), false);
    assert.equal(skillNames.has("Supabase"), false);
    assert.equal(skillNames.has("Railway"), false);
    assert.equal(masterProfile.education.length, 0);
  });

  it("includes verified AWS Academy Cloud Foundations certification", () => {
    assert.equal(masterProfile.certifications.length, 1);
    assert.equal(
      masterProfile.certifications[0].name,
      "AWS Academy Graduate - Cloud Foundations - Training Badge",
    );
    assert.equal(masterProfile.certifications[0].issuer, "AWS Academy");
    assert.equal(masterProfile.certifications[0].year, "2023");
  });
});

describe("Resume Builder & Role Variants", () => {
  it("defaults to a general Software Engineer resume without placeholders or em dashes", () => {
    const model = buildResume(masterProfile);
    assert.equal(model.mode, "general");
    assert.equal(model.role, "software");
    assert.equal(model.filenameBase, "Danial_Fachrudin_Software_Engineer_Resume");
    assert.ok(model.headline.startsWith("Software Engineer"));
    assert.equal(model.education.length, 0);
    assert.deepEqual(
      model.projects.map((p) => p.slug),
      ["opspilot", "lendloop", "veloura"],
    );

    const plain = buildResumePlainText(model);
    assert.equal(plain.includes("—"), false, "Resume text must not contain em dashes");
    assert.equal(plain.includes("src/data/education.ts"), false, "Must not leak placeholder");
    assert.equal(plain.includes("EDUCATION"), false, "Empty education must be omitted");
  });

  it("supports every role preset without altering factual history or inventing skills", () => {
    const allowedSkills = new Set(masterProfile.skills.map((s) => s.name));

    for (const roleId of roleIds) {
      const model = buildResume(masterProfile, { mode: "role", role: roleId });
      assert.equal(model.role, roleId);
      assert.ok(model.headline.includes(rolePresets[roleId].label));
      assert.equal(model.experience.length, 2);

      for (const category of model.skillCategories) {
        for (const skill of category.skills) {
          assert.equal(
            allowedSkills.has(skill),
            true,
            `Role ${roleId} introduced unknown skill ${skill}`,
          );
        }
      }
    }
  });

  it("supports detailed mode with architecture lines and balanced 4-project selection", () => {
    const model = buildResume(masterProfile, { mode: "role", role: "backend", detailed: true });
    assert.equal(model.filenameBase, "Danial_Fachrudin_Backend_Engineer_Resume");
    assert.equal(model.projects.length, 4);
    assert.equal(model.projects[0].slug, "opspilot");
    assert.equal(model.projects[1].slug, "veloura");
    for (const project of model.projects) {
      assert.ok(project.architecture);
    }
  });

  it("applies user-confirmed profile overrides cleanly without mutating masterProfile", () => {
    const model = buildResume(masterProfile, {
      overrides: {
        phone: "+62 812 0000 0000",
        languages: [{ language: "Indonesian", proficiency: "Native" }],
        education: [
          {
            institution: "Sample University",
            credential: "B.Sc. Computer Science",
            period: "2017 - 2021",
            status: "user-provided",
          },
        ],
      },
    });
    assert.equal(
      model.contact.some((c) => c.value === "+62 812 0000 0000"),
      true,
    );
    assert.equal(model.education.length, 1);
    assert.equal(model.languages.length, 1);
    assert.equal(masterProfile.education.length, 0);
  });
});

describe("Job Description Analyzer & Tailoring", () => {
  it("extracts required vs preferred skills, avoids false Go match, and surfaces real gaps", () => {
    const jd = `
      Backend Infrastructure Engineer
      Required Qualifications:
      - Production experience with Go, PostgreSQL, REST APIs, and AWS Lambda.
      - Strong SQL data modeling, database migrations, and Vitess sharding experience.
      - Automated CI/CD pipelines with Docker.
      Preferred Qualifications:
      - Experience with Kubernetes, Terraform, and GraphQL.
    `;

    const analysis = analyzeJobDescription(
      { title: "Senior Staff Backend Infrastructure Engineer", company: "PlanetScale", text: jd },
      masterProfile,
    );

    assert.equal(analysis.suggestedRole, "backend");
    const matchedNames = new Set(analysis.matchedSkills.map((m) => m.skill));
    assert.equal(matchedNames.has("Go"), true);
    assert.equal(matchedNames.has("PostgreSQL"), true);
    assert.equal(matchedNames.has("AWS Lambda"), true);
    assert.equal(matchedNames.has("Database Migrations"), true);
    assert.equal(matchedNames.has("Kubernetes (K3s)"), true);

    const gapTerms = new Set(analysis.gaps.map((g) => g.term));
    assert.equal(gapTerms.has("Vitess"), true);
    assert.equal(gapTerms.has("Terraform"), true);
    assert.equal(gapTerms.has("GraphQL"), true);

    const tailored = buildResume(masterProfile, {
      mode: "job",
      role: analysis.suggestedRole,
      job: {
        title: "Senior Staff Backend Infrastructure Engineer",
        company: "PlanetScale",
        text: jd,
      },
    });

    assert.equal(tailored.filenameBase, "Danial_Fachrudin_PlanetScale_Backend_Engineer_Resume");
    assert.equal(tailored.headline.includes("Senior"), false, "Must not inflate seniority");
    assert.equal(tailored.headline.includes("Staff"), false, "Must not inflate seniority");
    assert.equal(
      tailored.skillCategories.some((c) => c.skills.includes("Vitess")),
      false,
      "Must never inject missing gap skills into resume",
    );
    assert.equal(tailored.projects[0].slug, "opspilot");
  });

  it("does not trigger Go from ordinary English prose", () => {
    const analysis = analyzeJobDescription(
      {
        title: "Frontend Engineer",
        text: "Help users go faster with React, TypeScript, Next.js, and Playwright tests.",
      },
      masterProfile,
    );
    const matched = new Set(analysis.matchedSkills.map((m) => m.skill));
    assert.equal(matched.has("Go"), false);
    assert.equal(matched.has("React"), true);
    assert.equal(matched.has("TypeScript"), true);
    assert.equal(analysis.suggestedRole, "frontend");
  });
});

describe("Filenames, DOCX Export & Hash Serialization", () => {
  it("formats dynamic resume filenames cleanly", () => {
    assert.equal(
      resumeBaseFilename({ candidateName: "Danial Fachrudin", roleLabel: "Software Engineer" }),
      "Danial_Fachrudin_Software_Engineer_Resume",
    );
    assert.equal(
      resumeBaseFilename({
        candidateName: "Danial Fachrudin",
        roleLabel: "Backend Engineer",
        company: "PlanetScale, Inc.",
      }),
      "Danial_Fachrudin_PlanetScale_Inc_Backend_Engineer_Resume",
    );
  });

  it("generates a valid ATS-safe DOCX archive without tables or text boxes", () => {
    const model = buildResume(masterProfile, { mode: "general", role: "software" });
    const bytes = buildResumeDocx(model);

    assert.equal(bytes[0], 0x50);
    assert.equal(bytes[1], 0x4b);
    assert.equal(bytes[2], 0x03);
    assert.equal(bytes[3], 0x04);

    const entries = extractDocxXmlEntries(bytes);
    const docXml = entries["word/document.xml"];
    const relsXml = entries["word/_rels/document.xml.rels"];
    assert.ok(docXml);
    assert.ok(relsXml);
    assert.ok(entries["[Content_Types].xml"]);
    assert.ok(entries["_rels/.rels"]);

    assert.equal(docXml.includes("<w:tbl"), false, "DOCX must not use layout tables");
    assert.equal(docXml.includes("txbxContent"), false, "DOCX must not use text boxes");
    assert.equal(docXml.includes("Danial Fachrudin"), true);
    assert.equal(docXml.includes("OpsPilot"), true);
    assert.equal(docXml.includes("AWS Academy Graduate"), true);
    assert.equal(docXml.includes("w:keepNext"), true);
    assert.equal(relsXml.includes("mailto:danialfacrudin@gmail.com"), true);
  });

  it("round-trips job payload hash encoding safely", () => {
    const payload = {
      title: "Backend Engineer",
      company: "Acme Co",
      text: "Need Go, PostgreSQL & REST APIs — UTF8 safe ✓",
    };
    const encoded = encodeJobPayload(payload);
    const decoded = decodeJobPayload(`#job=${encoded}`);
    assert.deepEqual(decoded, payload);
    assert.equal(decodeJobPayload("#job=not-valid-base64!!!"), null);
  });

  it("reports explicit storage errors rather than silently claiming persistence", () => {
    const result = saveResumeVersion({
      name: "Test Version",
      mode: "general",
      role: "software",
      detailed: false,
    });
    assert.equal(result.versions.length, 1);
    assert.ok(result.error);
  });
});
