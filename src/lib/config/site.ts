const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dannyportfolio.github.io";

function normalizeSiteUrl(rawUrl: string): string {
  const parsed = new URL(rawUrl);
  return parsed.toString().replace(/\/$/, "");
}

export const SITE_URL = normalizeSiteUrl(RAW_SITE_URL);
export const SITE_NAME = "Danial Fachrudin Portfolio";
export const AUTHOR_NAME = "Danial Fachrudin";
