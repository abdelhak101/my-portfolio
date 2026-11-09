import { describe, it, expect } from 'vitest';
import {
  DEFAULT_LANG,
  DEFAULT_SITE_URL,
  SUPPORTED_LANGUAGES,
  normalizePath,
  stripLangPrefix,
  localizePath,
  getAlternatePath,
  getCanonicalUrl,
  getHreflangLinks,
} from '../../../src/utils/i18n';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
describe('i18n constants', () => {
  it('DEFAULT_LANG is "en"', () => {
    expect(DEFAULT_LANG).toBe('en');
  });

  it('SUPPORTED_LANGUAGES contains en and ar', () => {
    expect(SUPPORTED_LANGUAGES).toContain('en');
    expect(SUPPORTED_LANGUAGES).toContain('ar');
    expect(SUPPORTED_LANGUAGES).toHaveLength(2);
  });

  it('DEFAULT_SITE_URL is a valid https URL', () => {
    expect(DEFAULT_SITE_URL).toMatch(/^https:\/\//);
  });
});

// ---------------------------------------------------------------------------
// normalizePath
// ---------------------------------------------------------------------------
describe('normalizePath', () => {
  it('returns "/" for empty string', () => {
    expect(normalizePath('')).toBe('/');
  });

  it('returns "/" for whitespace-only string', () => {
    expect(normalizePath('   ')).toBe('/');
  });

  it('returns "/" for "/"', () => {
    expect(normalizePath('/')).toBe('/');
  });

  it('adds a leading slash when missing', () => {
    expect(normalizePath('projects/portfolio')).toBe('/projects/portfolio');
  });

  it('strips a trailing slash from non-root paths', () => {
    expect(normalizePath('/projects/portfolio/')).toBe('/projects/portfolio');
  });

  it('does NOT strip the trailing slash from root "/"', () => {
    expect(normalizePath('/')).toBe('/');
  });

  it('handles "/ar" correctly', () => {
    expect(normalizePath('/ar')).toBe('/ar');
  });

  it('handles "/ar/projects/portfolio/"', () => {
    expect(normalizePath('/ar/projects/portfolio/')).toBe('/ar/projects/portfolio');
  });
});

// ---------------------------------------------------------------------------
// stripLangPrefix
// ---------------------------------------------------------------------------
describe('stripLangPrefix', () => {
  it('strips "/ar" to "/"', () => {
    expect(stripLangPrefix('/ar')).toBe('/');
  });

  it('strips "/ar/" to "/"', () => {
    expect(stripLangPrefix('/ar/')).toBe('/');
  });

  it('strips "/ar/projects/portfolio" to "/projects/portfolio"', () => {
    expect(stripLangPrefix('/ar/projects/portfolio')).toBe('/projects/portfolio');
  });

  it('leaves English paths unchanged', () => {
    expect(stripLangPrefix('/projects/portfolio')).toBe('/projects/portfolio');
  });

  it('leaves root "/" unchanged', () => {
    expect(stripLangPrefix('/')).toBe('/');
  });

  it('leaves "/ar-something" unchanged (not a lang prefix)', () => {
    // "/ar-something" should NOT be stripped — it does not start with "/ar/"
    expect(stripLangPrefix('/ar-something')).toBe('/ar-something');
  });
});

// ---------------------------------------------------------------------------
// localizePath
// ---------------------------------------------------------------------------
describe('localizePath', () => {
  it('("/" , "en") → "/"', () => {
    expect(localizePath('/', 'en')).toBe('/');
  });

  it('("/" , "ar") → "/ar"', () => {
    expect(localizePath('/', 'ar')).toBe('/ar');
  });

  it('("/projects/portfolio", "ar") → "/ar/projects/portfolio"', () => {
    expect(localizePath('/projects/portfolio', 'ar')).toBe('/ar/projects/portfolio');
  });

  it('("/ar/projects/portfolio", "en") → "/projects/portfolio"', () => {
    expect(localizePath('/ar/projects/portfolio', 'en')).toBe('/projects/portfolio');
  });

  it('("/ar/projects/portfolio", "ar") → "/ar/projects/portfolio" (idempotent)', () => {
    expect(localizePath('/ar/projects/portfolio', 'ar')).toBe('/ar/projects/portfolio');
  });

  it('("/projects/portfolio", "en") → "/projects/portfolio" (idempotent)', () => {
    expect(localizePath('/projects/portfolio', 'en')).toBe('/projects/portfolio');
  });

  it('defaults to English when lang omitted', () => {
    expect(localizePath('/ar/projects/portfolio')).toBe('/projects/portfolio');
  });

  it('("/ar", "ar") → "/ar" (idempotent)', () => {
    expect(localizePath('/ar', 'ar')).toBe('/ar');
  });
});

// ---------------------------------------------------------------------------
// getAlternatePath
// ---------------------------------------------------------------------------
describe('getAlternatePath', () => {
  it('converts English root to Arabic root', () => {
    expect(getAlternatePath('/', 'ar')).toBe('/ar');
  });

  it('converts Arabic root to English root', () => {
    expect(getAlternatePath('/ar', 'en')).toBe('/');
  });

  it('converts English project path to Arabic', () => {
    expect(getAlternatePath('/projects/portfolio', 'ar')).toBe('/ar/projects/portfolio');
  });

  it('converts Arabic project path to English', () => {
    expect(getAlternatePath('/ar/projects/portfolio', 'en')).toBe('/projects/portfolio');
  });

  it('is reciprocal: EN→AR→EN round-trips cleanly', () => {
    const original = '/projects/my-project';
    const toAr = getAlternatePath(original, 'ar');
    const backToEn = getAlternatePath(toAr, 'en');
    expect(backToEn).toBe(original);
  });
});

// ---------------------------------------------------------------------------
// getCanonicalUrl
// ---------------------------------------------------------------------------
describe('getCanonicalUrl', () => {
  const site = 'https://example.com';

  it('builds root canonical URL', () => {
    expect(getCanonicalUrl('/', site)).toBe('https://example.com/');
  });

  it('builds canonical URL for a project page', () => {
    expect(getCanonicalUrl('/projects/portfolio', site)).toBe(
      'https://example.com/projects/portfolio'
    );
  });

  it('builds canonical URL for Arabic home', () => {
    expect(getCanonicalUrl('/ar', site)).toBe('https://example.com/ar');
  });

  it('strips trailing slash from site base', () => {
    expect(getCanonicalUrl('/projects/portfolio', 'https://example.com/')).toBe(
      'https://example.com/projects/portfolio'
    );
  });

  it('uses DEFAULT_SITE_URL when siteUrl omitted', () => {
    const result = getCanonicalUrl('/');
    expect(result).toMatch(/^https:\/\//);
    expect(result).toContain('/');
  });

  it('normalizes paths without leading slash', () => {
    expect(getCanonicalUrl('projects/portfolio', site)).toBe(
      'https://example.com/projects/portfolio'
    );
  });
});

// ---------------------------------------------------------------------------
// getHreflangLinks
// ---------------------------------------------------------------------------
describe('getHreflangLinks', () => {
  const site = 'https://example.com';

  it('returns three entries: en, ar, x-default', () => {
    const links = getHreflangLinks('/', site);
    expect(links).toHaveLength(3);
    const langs = links.map((l) => l.lang);
    expect(langs).toContain('en');
    expect(langs).toContain('ar');
    expect(langs).toContain('x-default');
  });

  it('x-default matches the English URL', () => {
    const links = getHreflangLinks('/', site);
    const en = links.find((l) => l.lang === 'en')!;
    const xDefault = links.find((l) => l.lang === 'x-default')!;
    expect(xDefault.url).toBe(en.url);
  });

  it('English and Arabic URLs are distinct', () => {
    const links = getHreflangLinks('/', site);
    const en = links.find((l) => l.lang === 'en')!;
    const ar = links.find((l) => l.lang === 'ar')!;
    expect(en.url).not.toBe(ar.url);
  });

  it('generates correct URLs for root path', () => {
    const links = getHreflangLinks('/', site);
    const en = links.find((l) => l.lang === 'en')!;
    const ar = links.find((l) => l.lang === 'ar')!;
    expect(en.url).toBe('https://example.com/');
    expect(ar.url).toBe('https://example.com/ar');
  });

  it('generates correct URLs for a project page', () => {
    const links = getHreflangLinks('/projects/portfolio', site);
    const en = links.find((l) => l.lang === 'en')!;
    const ar = links.find((l) => l.lang === 'ar')!;
    expect(en.url).toBe('https://example.com/projects/portfolio');
    expect(ar.url).toBe('https://example.com/ar/projects/portfolio');
  });

  it('works correctly when called with an Arabic pathname', () => {
    const links = getHreflangLinks('/ar/projects/portfolio', site);
    const en = links.find((l) => l.lang === 'en')!;
    const ar = links.find((l) => l.lang === 'ar')!;
    expect(en.url).toBe('https://example.com/projects/portfolio');
    expect(ar.url).toBe('https://example.com/ar/projects/portfolio');
  });

  it('uses DEFAULT_SITE_URL when siteUrl omitted', () => {
    const links = getHreflangLinks('/');
    expect(links).toHaveLength(3);
    links.forEach((l) => {
      expect(l.url).toMatch(/^https:\/\//);
    });
  });
});
