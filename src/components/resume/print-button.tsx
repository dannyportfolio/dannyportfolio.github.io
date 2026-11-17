"use client";

export function PrintButton({
  label = "Print / Save as PDF",
  filenameBase,
}: {
  label?: string;
  filenameBase?: string;
}) {
  function handlePrint() {
    if (filenameBase) {
      document.title = filenameBase;
    }
    window.print();
  }

  return (
    <button type="button" className="button button-primary" onClick={handlePrint}>
      {label}
    </button>
  );
}
