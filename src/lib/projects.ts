import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';

export type Project = CollectionEntry<'projects'>;

export const projectSlug = (p: Project): string => p.id.split('/')[1] ?? p.id;

export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = await getCollection(
    'projects',
    // Rascunhos aparecem só em dev, para não publicar placeholders.
    (p) => p.id.startsWith(`${lang}/`) && (import.meta.env.DEV || !p.data.draft),
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}
