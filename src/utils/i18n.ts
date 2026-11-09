/**
 * Pure i18n routing and canonical URL utilities.
 * Zero external dependencies — safe to use in Vitest and Astro components.
 */

export const DEFAULT_LANG = 'en' as const;
export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_SITE_URL = 'https://portfolio.dev';

/**
 * Normalizes an arbitrary path by ensuring a leading slash and removing trailing slashes (except root '/').
 */
export function normalizePath(path: string): string {
  if (!path || path.trim() === '') return '/';
  let clean = path.trim();
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean;
}

/**
 * Strips language prefixes (e.g. '/ar') to return the canonical base path.
 */
export function stripLangPrefix(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === '/ar' || normalized === '/ar/') return '/';
  if (normalized.startsWith('/ar/')) {
    return normalized.slice(3);
  }
  return normalized;
}

/**
 * Localizes an internal path for the target language.
 * English routes are prefix-less; Arabic routes are prefixed with '/ar'.
 *
 * @param path - Internal route path (e.g., '/', '/projects/portfolio', or '/ar/projects/portfolio')
 * @param lang - Target language ('en' | 'ar')
 */
export function localizePath(path: string, lang: SupportedLang = DEFAULT_LANG): string {
  const basePath = stripLangPrefix(path);

  if (lang === 'ar') {
    return basePath === '/' ? '/ar' : `/ar${basePath}`;
  }

  return basePath;
}

/**
 * Converts a current path to its exact reciprocal path in the opposite target language.
 */
export function getAlternatePath(currentPath: string, targetLang: SupportedLang): string {
  return localizePath(currentPath, targetLang);
}

/**
 * Builds an absolute canonical URL from a pathname.
 */
export function getCanonicalUrl(pathname: string, siteUrl: string = DEFAULT_SITE_URL): string {
  const base = siteUrl.replace(/\/+$/, '');
  const cleanPath = normalizePath(pathname);
  return `${base}${cleanPath === '/' ? '/' : cleanPath}`;
}

/**
 * Generates reciprocal hreflang links (en, ar, and x-default) for SEO.
 */
export function getHreflangLinks(
  pathname: string,
  siteUrl: string = DEFAULT_SITE_URL
): Array<{ lang: string; url: string }> {
  const base = siteUrl.replace(/\/+$/, '');
  const enPath = localizePath(pathname, 'en');
  const arPath = localizePath(pathname, 'ar');

  const enUrl = `${base}${enPath === '/' ? '/' : enPath}`;
  const arUrl = `${base}${arPath}`;

  return [
    { lang: 'en', url: enUrl },
    { lang: 'ar', url: arUrl },
    { lang: 'x-default', url: enUrl },
  ];
}
