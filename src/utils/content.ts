import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type DecorCategory } from '@/data/categories';

export type ArticleEntry = CollectionEntry<'articles'>;

export async function getPublishedArticles() {
  const entries = await getCollection('articles', ({ data }) => data.published && !data.draft);
  return entries.sort((a, b) => {
    const aDate = a.data.publishDate ? new Date(a.data.publishDate).getTime() : 0;
    const bDate = b.data.publishDate ? new Date(b.data.publishDate).getTime() : 0;
    return bDate - aDate;
  });
}

export function articleUrl(article: { id: string }) {
  return `/articles/${article.id}/`;
}

export function getArticleCategories(article: ArticleEntry): DecorCategory[] {
  const flags = article.data.categories;
  return categories.filter((category) => Boolean(flags?.[category.flag as keyof typeof flags]));
}

export function belongsToGroup(article: ArticleEntry, group: 'interior' | 'exterior') {
  return getArticleCategories(article).some((category) => category.group === group);
}

export function belongsToCategory(article: ArticleEntry, category: DecorCategory) {
  return Boolean(article.data.categories?.[category.flag as keyof typeof article.data.categories]);
}

export function getReadingTime(article: ArticleEntry) {
  if (article.data.readingTime && article.data.readingTime > 0) return article.data.readingTime;
  const words = (article.body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(value?: Date) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(value);
}

export async function getPublishedPages() {
  return getCollection('pages', ({ data }) => data.published);
}
