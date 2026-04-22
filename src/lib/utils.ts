import type { CollectionEntry } from 'astro:content';

/**
 * Sort projects by date in descending order (newest first).
 * Projects without dates are sorted to the end.
 */
export function sortProjectsByDate(
  projects: CollectionEntry<'projects'>[]
): CollectionEntry<'projects'>[] {
  return projects.sort((a, b) => {
    const dateA = a.data.date ?? new Date(0);
    const dateB = b.data.date ?? new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

const ROMAN_TABLE: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n: number): string {
  if (n <= 0) return '';
  let result = '';
  for (const [val, sym] of ROMAN_TABLE) {
    while (n >= val) {
      result += sym;
      n -= val;
    }
  }
  return result;
}
