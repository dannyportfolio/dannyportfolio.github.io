"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/data/translations";

type LocaleContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      // Check URL query param first (?lang=id or ?lang=en)
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get("lang");
      if (queryLang === "id" || queryLang === "en") {
        setLocaleState(queryLang);
        document.documentElement.lang = queryLang;
        try {
          localStorage.setItem("portfolio_lang", queryLang);
        } catch {}
        return;
      }

      // Check localStorage
      try {
        const stored = localStorage.getItem("portfolio_lang");
        if (stored === "id" || stored === "en") {
          setLocaleState(stored);
          document.documentElement.lang = stored;
          return;
        }
      } catch {}

      // Default to 'en'
      document.documentElement.lang = "en";
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem("portfolio_lang", next);
    } catch {}
  };

  const toggleLocale = () => {
    const next = locale === "en" ? "id" : "en";
    setLocale(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
