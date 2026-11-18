const STATIC_ASSET_PATTERN = /\.(pdf|png|jpe?g|webp|avif|svg|ico|xml|txt)$/i;

export function normalizeRoutePath(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function shouldInterceptNavigation({
  href,
  currentHref,
  targetAttr,
  hasDownload,
  relAttr,
}: {
  href: string;
  currentHref: string;
  targetAttr: string | null;
  hasDownload: boolean;
  relAttr: string | null;
}): { intercept: boolean; destination?: string } {
  if (!href || hasDownload) return { intercept: false };
  if (targetAttr && targetAttr !== "_self") return { intercept: false };
  if (relAttr && relAttr.split(/\s+/).includes("external")) return { intercept: false };

  let targetUrl: URL;
  let currentUrl: URL;
  try {
    currentUrl = new URL(currentHref);
    targetUrl = new URL(href, currentUrl);
  } catch {
    return { intercept: false };
  }

  if (targetUrl.origin !== currentUrl.origin) return { intercept: false };
  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    return { intercept: false };
  }
  if (STATIC_ASSET_PATTERN.test(targetUrl.pathname)) return { intercept: false };

  const normalizedTarget = normalizeRoutePath(targetUrl.pathname);
  const normalizedCurrent = normalizeRoutePath(currentUrl.pathname);

  if (normalizedTarget.startsWith("/resume/print")) return { intercept: false };
  if (normalizedTarget === normalizedCurrent && targetUrl.search === currentUrl.search) {
    return { intercept: false };
  }

  const destination = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
  return { intercept: true, destination };
}
