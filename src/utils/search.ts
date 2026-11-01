/**
 * Normalizes text for bilingual English and Arabic search matching.
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';

  return (
    text
      .toLowerCase()
      .trim()
      // Strip combining diacritical marks (accents)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Strip Arabic Tashkeel (harakat: fathah, dammah, kasrah, sukun, shaddah, tanween)
      .replace(/[\u064B-\u065F\u0670]/g, '')
      // Strip Tatweel
      .replace(/\u0640/g, '')
      // Normalize Alef variations (أ, إ, آ, ٱ) -> ا
      .replace(/[أإآٱ]/g, 'ا')
      // Normalize Taa Marbuta (ة) -> ه
      .replace(/ة/g, 'ه')
      // Normalize Alef Maksura (ى) -> ي
      .replace(/ى/g, 'ي')
      // Replace multi-whitespace with single space
      .replace(/\s+/g, ' ')
  );
}

/**
 * Splits query string into normalized search tokens.
 */
export function tokenizeQuery(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}

/**
 * Checks if all query tokens are found within the searchable text.
 */
export function matchesProject(query: string, searchableText: string): boolean {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return true;

  const normalizedTarget = normalizeSearchText(searchableText);
  return tokens.every((token) => normalizedTarget.includes(token));
}
