import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { certificates } from "../src/data/certifications.ts";
import { masterProfile } from "../src/data/resume/master-profile.ts";

test("certificates dataset includes all 6 verified credentials with unique IDs and no em dashes", () => {
  assert.equal(certificates.length, 6);

  const ids = new Set(certificates.map((cert) => cert.id));
  assert.equal(ids.size, certificates.length, "Certificate IDs must be unique");

  const expectedIds = [
    "aws-academy-cloud-foundations",
    "udemy-data-science-bootcamp-2024",
    "udemy-project-management-profesional",
    "udemy-docker-pemula-sampai-mahir",
    "hackerrank-problem-solving-basic",
    "udemy-pemrograman-java-pemula-sampai-mahir",
  ];
  for (const id of expectedIds) {
    assert.ok(ids.has(id), `Expected certificate ID ${id} to be present`);
  }

  const serialized = JSON.stringify(certificates);
  assert.ok(!serialized.includes("—"), "Certificates data must not contain em dashes");
});

test("certificates only reference existing local public files and valid verification URLs", () => {
  for (const cert of certificates) {
    assert.ok(cert.title.length > 0);
    assert.ok(cert.issuer.length > 0);
    assert.ok(cert.issueDate && cert.issueDate.length > 0);
    assert.ok(cert.issuedIso && /^\d{4}-\d{2}-\d{2}$/.test(cert.issuedIso));

    if (cert.filePath) {
      const localPath = path.join(process.cwd(), "public", cert.filePath.replace(/^\//, ""));
      assert.equal(fs.existsSync(localPath), true, `Missing certificate asset: ${cert.filePath}`);
    }

    if (cert.thumbnailUrl) {
      const thumbPath = path.join(process.cwd(), "public", cert.thumbnailUrl.replace(/^\//, ""));
      assert.equal(fs.existsSync(thumbPath), true, `Missing thumbnail asset: ${cert.thumbnailUrl}`);
    }

    if (cert.verificationUrl) {
      assert.ok(cert.verificationUrl.startsWith("https://"));
    }
  }
});

test("masterProfile.certifications stays synchronized with verified certificates", () => {
  assert.equal(masterProfile.certifications.length, certificates.length);
  for (const cert of certificates) {
    const match = masterProfile.certifications.find((item) => item.name === cert.title);
    assert.ok(match, `masterProfile.certifications missing ${cert.title}`);
    assert.equal(match.issuer, cert.issuer);
    assert.equal(match.status, "verified");
    assert.equal(match.url, cert.verificationUrl);
  }
});
