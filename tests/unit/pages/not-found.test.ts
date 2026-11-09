import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Not-Found (404) Behavior & Recovery Architecture (PB-017)', () => {
  const enPagePath = resolve(process.cwd(), 'src/pages/404.astro');
  const arPagePath = resolve(process.cwd(), 'src/pages/ar/404.astro');
  const viewPath = resolve(process.cwd(), 'src/components/common/NotFoundView.astro');

  const enContent = readFileSync(enPagePath, 'utf-8');
  const arContent = readFileSync(arPagePath, 'utf-8');
  const viewContent = readFileSync(viewPath, 'utf-8');

  it('provides dedicated 404 pages for both English and Arabic', () => {
    expect(existsSync(enPagePath)).toBe(true);
    expect(existsSync(arPagePath)).toBe(true);
  });

  it('configures proper BaseLayout metadata and directionality for 404 pages', () => {
    expect(enContent).toContain('lang="en"');
    expect(enContent).toContain('dir="ltr"');
    expect(enContent).toContain('Page Not Found | Portfolio');

    expect(arContent).toContain('lang="ar"');
    expect(arContent).toContain('dir="rtl"');
    expect(arContent).toContain('الصفحة غير موجودة | ملف أعمالي');
  });

  it('configures reciprocal language switcher linking between /404 and /ar/404', () => {
    expect(enContent).toContain("switchTarget = '/ar/404'");
    expect(enContent).toContain('switchTarget={switchTarget}');

    expect(arContent).toContain("switchTarget = '/404'");
    expect(arContent).toContain('switchTarget={switchTarget}');
  });

  it('NotFoundView renders 404 status badge, clear headings, and recovery CTAs', () => {
    expect(viewContent).toContain('t.statusBadge');
    expect(viewContent).toContain('t.heading');
    expect(viewContent).toContain('t.description');

    // Primary recovery to portfolio home
    expect(viewContent).toContain('href={t.homeHref}');
    expect(viewContent).toContain("homeHref: '/'");
    expect(viewContent).toContain("homeHref: '/ar'");

    // Secondary recovery to project catalog
    expect(viewContent).toContain('href={t.catalogHref}');
    expect(viewContent).toContain("catalogHref: '/#projects'");
    expect(viewContent).toContain("catalogHref: '/ar#projects'");
  });

  it('NotFoundView supports localized copy in Arabic', () => {
    expect(viewContent).toContain('خطأ 404');
    expect(viewContent).toContain('الصفحة غير موجودة');
    expect(viewContent).toContain('العودة إلى الصفحة الرئيسية');
    expect(viewContent).toContain('تصفح دليل المشاريع');
  });
});
