"use client";
export function PrintButton() { return <button className="button button-primary" onClick={() => window.print()}>Print / Save as PDF <span aria-hidden>↗</span></button>; }
