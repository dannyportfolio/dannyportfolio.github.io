"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { shouldInterceptNavigation } from "@/lib/motion/navigation";

const EXIT_DURATION_MS = 105;
const SAFETY_RESET_MS = 650;

type NavigationTransitionContextValue = {
  isExiting: boolean;
};

const NavigationTransitionContext = createContext<NavigationTransitionContextValue>({
  isExiting: false,
});

export function NavigationTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const [exitingFromPath, setExitingFromPath] = useState<string | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const isExiting = exitingFromPath !== null && exitingFromPath === pathname;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setExitingFromPath(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
      if (safetyTimerRef.current !== null) window.clearTimeout(safetyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const clearTimers = () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      if (safetyTimerRef.current !== null) {
        window.clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const decision = shouldInterceptNavigation({
        href: anchor.getAttribute("href") ?? "",
        currentHref: window.location.href,
        targetAttr: anchor.getAttribute("target"),
        hasDownload: anchor.hasAttribute("download"),
        relAttr: anchor.getAttribute("rel"),
      });

      if (!decision.intercept || !decision.destination) return;

      event.preventDefault();
      clearTimers();

      const destination = decision.destination;
      router.prefetch(destination);
      setExitingFromPath(pathname);

      exitTimerRef.current = window.setTimeout(() => {
        exitTimerRef.current = null;
        router.push(destination);
      }, EXIT_DURATION_MS);

      safetyTimerRef.current = window.setTimeout(() => {
        safetyTimerRef.current = null;
        setExitingFromPath(null);
      }, SAFETY_RESET_MS);
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      clearTimers();
    };
  }, [pathname, reducedMotion, router]);

  return (
    <NavigationTransitionContext.Provider value={{ isExiting }}>
      {isExiting && <div className="route-transition-bar" aria-hidden="true" />}
      {children}
    </NavigationTransitionContext.Provider>
  );
}

export function useNavigationTransition() {
  return useContext(NavigationTransitionContext);
}
