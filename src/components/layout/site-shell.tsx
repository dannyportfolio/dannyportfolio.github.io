"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useNavigationTransition } from "@/components/motion/page-transition";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isExiting } = useNavigationTransition();

  return (
    <main key={pathname} className={`page-transition-stage ${isExiting ? "is-exiting" : ""}`}>
      {children}
    </main>
  );
}
