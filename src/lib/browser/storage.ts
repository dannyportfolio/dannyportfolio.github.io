export const THEME_STORAGE_KEY = "theme";
export const LOCALE_STORAGE_KEY = "portfolio_lang";

export type Theme = "light" | "dark";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function reportStorageWarning(operation: "read" | "write", key: string, error: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`Browser localStorage ${operation} failed for key "${key}":`, error);
  }
}

export function readStorageItem(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch (error: unknown) {
    // Storage access can throw SecurityError in restricted iframes or strict privacy modes.
    reportStorageWarning("read", key, error);
    return null;
  }
}

export function writeStorageItem(key: string, value: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error: unknown) {
    // Storage writes can throw QuotaExceededError or SecurityError in restricted environments.
    reportStorageWarning("write", key, error);
    return false;
  }
}
