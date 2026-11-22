"use client";

import { useMemo, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns a Date anchored to the visitor's current calendar year on the client
 * while returning undefined during SSR/SSG to avoid hydration mismatches on static exports.
 */
export function useClientReferenceDate(): Date | undefined {
  const clientYear = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => undefined,
  );

  return useMemo(
    () => (clientYear === undefined ? undefined : new Date(clientYear, 0, 1)),
    [clientYear],
  );
}
