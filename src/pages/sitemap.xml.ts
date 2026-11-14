import type { APIRoute } from 'astro';
import { categories } from '@/data/categories';
import { articleUrl, getPublishedArticles, getPublishedPages } from '@/utils/content';
import { site } from '@/data/site';

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const [articles, pages] = await Promise.all([
    getPublishedArticles(),
    getPublishedPages(),
  ]);

  // A map prevents duplicate canonical URLs from appearing in the sitemap.
  const urls = new Map<string, string>();
  const siteOrigin = new URL(site.url).origin;
  const addUrl = (pathOrUrl: string, lastModified?: Date) => {
    const parsedUrl = new URL(pathOrUrl, site.url);
    // A sitemap must contain URLs from this site only.
    if (parsedUrl.origin !== siteOrigin) return;
    parsedUrl.hash = '';
    const location = parsedUrl.toString();
    const lastmod = lastModified?.toISOString();
    const existing = urls.get(location);
    if (!existing || (lastmod && lastmod > existing)) {
      urls.set(location, lastmod || existing || '');
    }
  };

  // Main, indexable collection and topic routes.
  [
    '/',
    '/articles/',
    '/categories/',
    '/interior-decor/',
    '/exterior-decor/',
  ].forEach((path) => addUrl(path));

  for (const category of categories) {
    addUrl(`/category/${category.slug}/`);
  }

  // Include published CMS pages, respecting each page's noindex setting.
  for (const page of pages) {
    if (page.data.seo?.index === false) continue;
    addUrl(page.data.seo?.canonicalUrl || `/${page.id}/`);
  }

  // Include published articles only; drafts and noindex articles stay out.
  for (const article of articles) {
    if (article.data.seo?.index === false) continue;
    addUrl(
      article.data.seo?.canonicalUrl || articleUrl(article),
      article.data.updatedDate || article.data.publishDate,
    );
  }

  const entries = [...urls.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([location, lastmod]) => {
      const modified = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
      return `<url><loc>${escapeXml(location)}</loc>${modified}</url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
