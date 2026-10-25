import { getCollection, type CollectionEntry } from 'astro:content';
import { langs, type Lang } from '@/i18n/ui';
import { sortProjectsByDate } from './utils';

type ProjectData = CollectionEntry<'projects'>['data'];

interface LocalizedProject {
  id: string;
  data: ProjectData;
  /** Entry whose Markdown body should be rendered as the intro text. */
  contentEntry: CollectionEntry<'projects'> | CollectionEntry<'translations'>;
}

/** Overlay a translation's text onto the English entry; anything missing stays English. */
function localize(
  project: CollectionEntry<'projects'>,
  translation: CollectionEntry<'translations'> | undefined
): LocalizedProject {
  if (!translation) {
    return { id: project.id, data: project.data, contentEntry: project };
  }

  const base = project.data;
  const tr = translation.data;

  return {
    id: project.id,
    data: {
      ...base,
      title: tr.title || base.title,
      material: tr.material || base.material,
      dimensions: tr.dimensions || base.dimensions,
      finish: tr.finish || base.finish,
      costs: base.costs?.map((cost, i) => ({
        ...cost,
        item: tr.costs?.[i]?.item || cost.item,
      })),
      progress: base.progress?.map((step, i) => ({
        ...step,
        leftTitle: tr.progress?.[i]?.leftTitle || step.leftTitle,
        rightTitle: tr.progress?.[i]?.rightTitle || step.rightTitle,
        description: tr.progress?.[i]?.description || step.description,
      })),
    },
    contentEntry: translation.body?.trim() ? translation : project,
  };
}

export interface BilingualProject {
  id: string;
  /** English data: the source for images, dates, prices and category. */
  data: ProjectData;
  /** Text fields per language (falling back to English). */
  text: Record<Lang, ProjectData>;
  /** Entry whose Markdown body is the intro text, per language. */
  content: Record<Lang, LocalizedProject['contentEntry']>;
}

/** All projects with every language's text, newest first. */
export async function getProjects(
  filter: (data: ProjectData) => boolean = () => true
): Promise<BilingualProject[]> {
  const projects = await getCollection('projects', ({ data }) => filter(data));
  const translations = await getCollection('translations');
  const translationFor = (lang: Lang, id: string) =>
    translations.find((t) => t.id === `${lang}/${id}`);

  return sortProjectsByDate(
    projects.map((project) => {
      const perLang = langs.map((lang) => [lang, localize(project, translationFor(lang, project.id))] as const);
      return {
        id: project.id,
        data: project.data,
        text: Object.fromEntries(perLang.map(([lang, l]) => [lang, l.data])) as BilingualProject['text'],
        content: Object.fromEntries(perLang.map(([lang, l]) => [lang, l.contentEntry])) as BilingualProject['content'],
      };
    })
  );
}
