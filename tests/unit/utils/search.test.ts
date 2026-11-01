import { describe, expect, it } from 'vitest';
import {
  normalizeSearchText,
  tokenizeQuery,
  matchesProject,
} from '../../../src/utils/search';

describe('Bilingual Search Utilities (PB-013)', () => {
  describe('normalizeSearchText - English', () => {
    it('lowercases and trims text', () => {
      expect(normalizeSearchText('  TypeScript Architecture  ')).toBe(
        'typescript architecture'
      );
    });

    it('strips accents and combining diacritics', () => {
      expect(normalizeSearchText('Café résumé naïve')).toBe('cafe resume naive');
    });

    it('collapses multiple spaces', () => {
      expect(normalizeSearchText('React   and    Astro')).toBe('react and astro');
    });
  });

  describe('normalizeSearchText - Arabic', () => {
    it('normalizes Alef variations (أ, إ, آ, ٱ -> ا)', () => {
      expect(normalizeSearchText('أداة إلكترونية آمنة')).toBe(
        'اداه الكترونيه امنه'
      );
    });

    it('normalizes Taa Marbuta (ة -> ه)', () => {
      expect(normalizeSearchText('تقنية هندسة')).toBe('تقنيه هندسه');
    });

    it('normalizes Alef Maksura (ى -> ي)', () => {
      expect(normalizeSearchText('محتوى أقصى')).toBe('محتوي اقصي');
    });

    it('strips Tashkeel harakat and Tatweel', () => {
      expect(normalizeSearchText('مَشْرُوعٌ مُتَـكَامِل')).toBe('مشروع متكامل');
    });
  });

  describe('tokenizeQuery', () => {
    it('breaks multi-word queries into individual normalized tokens', () => {
      expect(tokenizeQuery('AI Summarizer')).toEqual(['ai', 'summarizer']);
    });

    it('handles Arabic multi-word queries with varied alefs', () => {
      expect(tokenizeQuery('أداة  الذكاء')).toEqual(['اداه', 'الذكاء']);
    });

    it('returns empty array for whitespace-only query', () => {
      expect(tokenizeQuery('   ')).toEqual([]);
    });
  });

  describe('matchesProject', () => {
    const searchableEn = 'AI Technical Summarizer CLI tool TypeScript LLM APIs Software AI';
    const searchableAr = 'ملخص المستندات التقنية بالذكاء الاصطناعي أداة سطر أوامر برمجيات ذكاء اصطناعي';

    it('matches single English token', () => {
      expect(matchesProject('typescript', searchableEn)).toBe(true);
      expect(matchesProject('TYPESCRIPT', searchableEn)).toBe(true);
    });

    it('matches multi-token query (AND condition across tokens)', () => {
      expect(matchesProject('ai cli', searchableEn)).toBe(true);
      expect(matchesProject('ai rust', searchableEn)).toBe(false);
    });

    it('matches Arabic query regardless of alef/taa-marbuta typing variations', () => {
      expect(matchesProject('اداة', searchableAr)).toBe(true);
      expect(matchesProject('أداة', searchableAr)).toBe(true);
      expect(matchesProject('التقنيه', searchableAr)).toBe(true);
      expect(matchesProject('التقنية', searchableAr)).toBe(true);
      expect(matchesProject('ذكاء اوامر', searchableAr)).toBe(true);
    });

    it('returns true for empty query', () => {
      expect(matchesProject('', searchableEn)).toBe(true);
      expect(matchesProject('   ', searchableAr)).toBe(true);
    });
  });
});
