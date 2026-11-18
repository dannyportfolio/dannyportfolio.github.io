"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/data/translations";
import { LOCALE_STORAGE_KEY, readStorageItem, writeStorageItem } from "@/lib/browser/storage";

type LocaleContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

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
        writeStorageItem(LOCALE_STORAGE_KEY, queryLang);
        return;
      }

      // Check persisted browser locale
      const stored = readStorageItem(LOCALE_STORAGE_KEY);
      if (stored === "id" || stored === "en") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
        return;
      }

      // Default to 'en'
      document.documentElement.lang = "en";
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    writeStorageItem(LOCALE_STORAGE_KEY, next);
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

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
