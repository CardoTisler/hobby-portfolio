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
