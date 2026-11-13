import type { APIRoute } from 'astro';
import { getPublishedArticles, articleUrl } from '@/utils/content';
import { site } from '@/data/site';

export const prerender = true;

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();
  const items = articles.map((article) => {
    const url = new URL(articleUrl(article), site.url).toString();
    return `<item><title>${escapeXml(article.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(article.data.excerpt || '')}</description>${article.data.publishDate ? `<pubDate>${article.data.publishDate.toUTCString()}</pubDate>` : ''}</item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(site.name)} — Home &amp; Garden</title><link>${site.url}</link><description>${escapeXml(site.description)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
