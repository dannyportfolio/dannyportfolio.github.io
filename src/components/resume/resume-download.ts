import type { ResumeModel } from "@/lib/resume/build-resume";
import { buildResumeDocx } from "@/lib/resume/export-docx";

export function triggerDocxDownload(model: ResumeModel) {
  const bytes = buildResumeDocx(model);
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy.buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${model.filenameBase}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
