import type { ResumeModel } from "./build-resume.ts";
import { createStoreZip, readStoreZipTextEntries } from "./zip.ts";

/**
 * Generates an ATS-safe A4 OOXML (.docx) document using pure paragraphs (no tables, no text boxes,
 * no headers/footers) and Arial typography.
 */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isSafeLinkHref(href: string | undefined): href is string {
  if (!href) return false;
  return /^(https?:\/\/|mailto:)/i.test(href);
}

type RunSpec = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  sizePt?: number;
  color?: string;
  href?: string;
};

type RelRegistry = {
  register: (href: string) => string;
  toXml: () => string;
};

function createRelRegistry(): RelRegistry {
  const map = new Map<string, string>();
  let nextId = 1;

  return {
    register(href: string) {
      const existing = map.get(href);
      if (existing) return existing;
      const id = `rId${nextId++}`;
      map.set(href, id);
      return id;
    },
    toXml() {
      const items = [...map.entries()]
        .map(
          ([target, id]) =>
            `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${escapeXml(target)}" TargetMode="External"/>`,
        )
        .join("");
      return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/relationships/2006/relationships">${items}</Relationships>`;
    },
  };
}

function renderRun(spec: RunSpec, rels: RelRegistry): string {
  const halfPoints = Math.round((spec.sizePt ?? 10) * 2);
  const color = spec.color ?? (spec.href ? "1D4ED8" : "18181B");
  const rPrParts = [
    `<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>`,
    spec.bold ? `<w:b/>` : "",
    spec.italic ? `<w:i/>` : "",
    spec.href ? `<w:u w:val="single"/>` : "",
    `<w:color w:val="${color}"/>`,
    `<w:sz w:val="${halfPoints}"/><w:szCs w:val="${halfPoints}"/>`,
  ].join("");

  const runXml = `<w:r><w:rPr>${rPrParts}</w:rPr><w:t xml:space="preserve">${escapeXml(spec.text)}</w:t></w:r>`;
  if (isSafeLinkHref(spec.href)) {
    const rId = rels.register(spec.href);
    return `<w:hyperlink r:id="${rId}">${runXml}</w:hyperlink>`;
  }
  return runXml;
}

function paragraph(
  runs: RunSpec[],
  rels: RelRegistry,
  opts: {
    spaceBeforePt?: number;
    spaceAfterPt?: number;
    lineMult?: number;
    keepNext?: boolean;
    bottomBorder?: boolean;
    indentLeftPt?: number;
    hangingPt?: number;
  } = {},
): string {
  const before = Math.round((opts.spaceBeforePt ?? 0) * 20);
  const after = Math.round((opts.spaceAfterPt ?? 3) * 20);
  const line = Math.round((opts.lineMult ?? 1.2) * 240);

  const pPr = [
    opts.keepNext ? `<w:keepNext/>` : "",
    `<w:keepLines/>`,
    opts.bottomBorder
      ? `<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="3" w:color="9CA3AF"/></w:pBdr>`
      : "",
    `<w:spacing w:before="${before}" w:after="${after}" w:line="${line}" w:lineRule="auto"/>`,
    opts.indentLeftPt !== undefined || opts.hangingPt !== undefined
      ? `<w:ind w:left="${Math.round((opts.indentLeftPt ?? 0) * 20)}" w:hanging="${Math.round((opts.hangingPt ?? 0) * 20)}"/>`
      : "",
  ].join("");

  return `<w:p><w:pPr>${pPr}</w:pPr>${runs.map((r) => renderRun(r, rels)).join("")}</w:p>`;
}

function sectionHeading(title: string, rels: RelRegistry): string {
  return paragraph([{ text: title.toUpperCase(), bold: true, sizePt: 11, color: "111827" }], rels, {
    spaceBeforePt: 9,
    spaceAfterPt: 4,
    keepNext: true,
    bottomBorder: true,
  });
}

function bulletParagraph(text: string, rels: RelRegistry): string {
  return paragraph([{ text: `•  ${text}`, sizePt: 9.75, color: "1F2937" }], rels, {
    spaceBeforePt: 0,
    spaceAfterPt: 2.5,
    indentLeftPt: 14,
    hangingPt: 10,
  });
}

export function buildResumeDocx(model: ResumeModel): Uint8Array {
  const rels = createRelRegistry();
  const blocks: string[] = [];

  blocks.push(
    paragraph([{ text: model.name, bold: true, sizePt: 22, color: "111827" }], rels, {
      spaceBeforePt: 0,
      spaceAfterPt: 2,
      keepNext: true,
    }),
  );
  blocks.push(
    paragraph([{ text: model.headline, bold: true, sizePt: 11, color: "374151" }], rels, {
      spaceBeforePt: 0,
      spaceAfterPt: 4,
      keepNext: true,
    }),
  );

  const contactRuns: RunSpec[] = [];
  model.contact.forEach((item, index) => {
    if (index > 0) {
      contactRuns.push({ text: "  |  ", sizePt: 9.5, color: "6B7280" });
    }
    contactRuns.push({
      text: item.value,
      sizePt: 9.5,
      color: item.href ? "1D4ED8" : "374151",
      href: item.href,
    });
  });
  blocks.push(paragraph(contactRuns, rels, { spaceBeforePt: 0, spaceAfterPt: 6 }));

  blocks.push(sectionHeading("Professional Summary", rels));
  blocks.push(
    paragraph([{ text: model.summary, sizePt: 9.75, color: "1F2937" }], rels, {
      spaceBeforePt: 0,
      spaceAfterPt: 4,
    }),
  );

  blocks.push(sectionHeading("Technical Skills", rels));
  for (const category of model.skillCategories) {
    blocks.push(
      paragraph(
        [
          { text: `${category.label}: `, bold: true, sizePt: 9.75, color: "111827" },
          { text: category.skills.join(", "), sizePt: 9.75, color: "1F2937" },
        ],
        rels,
        { spaceBeforePt: 0, spaceAfterPt: 2.5 },
      ),
    );
  }

  blocks.push(sectionHeading("Professional Experience", rels));
  for (const exp of model.experience) {
    blocks.push(
      paragraph(
        [
          { text: exp.title, bold: true, sizePt: 10, color: "111827" },
          { text: `  |  ${exp.organization} (${exp.location})`, sizePt: 9.75, color: "374151" },
          { text: `  |  ${exp.period}`, bold: true, sizePt: 9.5, color: "374151" },
        ],
        rels,
        { spaceBeforePt: 4, spaceAfterPt: 2, keepNext: true },
      ),
    );
    for (const bullet of exp.bullets) {
      blocks.push(bulletParagraph(bullet, rels));
    }
  }

  blocks.push(sectionHeading("Selected Projects", rels));
  for (const project of model.projects) {
    const headerRuns: RunSpec[] = [
      { text: project.title, bold: true, sizePt: 10, color: "111827" },
      { text: ` - ${project.subtitle}`, sizePt: 9.75, color: "374151" },
    ];
    if (project.link) {
      headerRuns.push({ text: "  |  ", sizePt: 9.5, color: "6B7280" });
      headerRuns.push({
        text: project.link.label,
        sizePt: 9.25,
        color: "1D4ED8",
        href: project.link.href,
      });
    }
    blocks.push(
      paragraph(headerRuns, rels, { spaceBeforePt: 4, spaceAfterPt: 1.5, keepNext: true }),
    );
    blocks.push(
      paragraph(
        [
          { text: "Stack: ", bold: true, sizePt: 9.25, color: "374151" },
          { text: project.stack.join(", "), sizePt: 9.25, color: "4B5563" },
        ],
        rels,
        { spaceBeforePt: 0, spaceAfterPt: 2, keepNext: true },
      ),
    );
    for (const bullet of project.bullets) {
      blocks.push(bulletParagraph(bullet, rels));
    }
    if (project.architecture) {
      blocks.push(
        paragraph(
          [
            { text: "Architecture: ", bold: true, sizePt: 9.25, color: "374151" },
            { text: project.architecture, sizePt: 9.25, color: "374151" },
          ],
          rels,
          { spaceBeforePt: 0, spaceAfterPt: 2.5, indentLeftPt: 14 },
        ),
      );
    }
  }

  if (model.education.length > 0) {
    blocks.push(sectionHeading("Education", rels));
    for (const edu of model.education) {
      blocks.push(
        paragraph(
          [
            { text: edu.credential, bold: true, sizePt: 10, color: "111827" },
            { text: `  |  ${edu.institution}  |  ${edu.period}`, sizePt: 9.5, color: "374151" },
          ],
          rels,
          { spaceBeforePt: 2, spaceAfterPt: 2 },
        ),
      );
    }
  }

  if (model.certifications.length > 0) {
    blocks.push(sectionHeading("Certifications", rels));
    for (const cert of model.certifications) {
      const runs: RunSpec[] = [
        { text: cert.name, bold: true, sizePt: 9.75, color: "111827" },
        {
          text: `  |  ${cert.issuer}${cert.year ? ` (${cert.year})` : ""}`,
          sizePt: 9.5,
          color: "374151",
        },
      ];
      if (cert.url) {
        runs.push({ text: "  |  ", sizePt: 9.25, color: "6B7280" });
        runs.push({ text: cert.url.replace(/^https?:\/\//, ""), sizePt: 9.25, href: cert.url });
      }
      blocks.push(paragraph(runs, rels, { spaceBeforePt: 2, spaceAfterPt: 2.5 }));
    }
  }

  if (model.additional.length > 0) {
    blocks.push(sectionHeading("Additional Information", rels));
    for (const item of model.additional) {
      blocks.push(
        paragraph(
          [
            { text: `${item.label}: `, bold: true, sizePt: 9.5, color: "111827" },
            { text: item.value, sizePt: 9.5, color: "1F2937" },
          ],
          rels,
          { spaceBeforePt: 0, spaceAfterPt: 2 },
        ),
      );
    }
  }

  // A4: 210mm x 297mm = 11906 x 16838 twips. Margins: ~12.7mm (720 twips = 0.5in).
  const documentXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
    `<w:body>${blocks.join("")}` +
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="680" w:right="720" w:bottom="680" w:left="720" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>` +
    `</w:body></w:document>`;

  const contentTypesXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
    `</Types>`;

  const rootRelsXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>` +
    `</Relationships>`;

  return createStoreZip([
    { name: "[Content_Types].xml", content: contentTypesXml },
    { name: "_rels/.rels", content: rootRelsXml },
    { name: "word/document.xml", content: documentXml },
    { name: "word/_rels/document.xml.rels", content: rels.toXml() },
  ]);
}

export function extractDocxXmlEntries(bytes: Uint8Array): Record<string, string> {
  return readStoreZipTextEntries(bytes);
}
