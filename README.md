# mravenzo. — home and garden journal

A static Astro website for home decor, interior styling, garden decor and outdoor living. It uses Pages CMS for Git-based editing and Cloudflare Pages for deployment.

The article collection is intentionally empty. The site contains no copied articles from oopsgene.com and no sample articles.

## Included


- White-first editorial design, red accents, responsive navigation and a familiar moon/sun theme switch.
- Eight decor topics, featured article slots and a recent-articles section.
- Articles archive and category archives, paginated at 12 entries per page.
- Year-based article storage and URLs: `src/content/articles/YYYY/slug.md` becomes `/articles/YYYY/slug/`.
- Pages CMS fields for editorial content, image metadata, SEO/social metadata, categories and affiliate links.
- Affiliate disclosure page and affiliate links rendered with `rel="sponsored"`.
- Canonical URLs, page-specific titles and descriptions, robots directives, Open Graph, X metadata, JSON-LD, sitemap, robots.txt and RSS.
- About, Contact, Cookies, Affiliate Disclosure, Editorial Policy, Privacy Policy and Terms pages.

## Requirements

- Node.js 22.23.4 or newer.
- npm.
- GitHub repository and Cloudflare Pages project.
- Pages CMS account connected to the repository.

## Run locally

```sh
npm install
npm run dev
```

Build and preview:

```sh
npm run build
npm run preview
```

Production output is written to `dist/`.

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | Astro or None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22.23.4` or newer (`NODE_VERSION=22.23.4`) |

## Pages CMS

`.pages.yml` must remain at the repository root. Connect the repository in Pages CMS and use the Articles collection to publish posts. See [CMS-GUIDE.md](./CMS-GUIDE.md) for the full workflow.

### Article year folders

Pages CMS names new article files with `{year}/{primary}.md`. The year token is the current calendar year when the entry is created. In 2026, for example, an article named `small-balcony-decor` is saved in `src/content/articles/2026/` and uses `/articles/2026/small-balcony-decor/`. As the calendar changes, new entries go into the next year folder automatically. The Astro catch-all article route supports these nested paths.

For backdated posts, place the file under the folder matching its publication year. Keep the year folder and slug unchanged after publishing so canonical URLs remain stable.

### Affiliate links

mravenzo. uses affiliate links in selected articles and recommendations. Add commission-generating product or retailer links through the article's **Affiliate links** field. The article page displays them with a clear disclosure and adds `rel="sponsored"` to each link. See `/affiliate-disclosure/` for the public policy.

## Important routes

- `/` — homepage
- `/articles/` — all published articles
- `/articles/YYYY/slug/` — year-based article detail page
- `/interior-decor/` and `/exterior-decor/` — grouped archives
- `/category/{category-slug}/` — topic archive
- `/categories/` — all topics
- `/search/` — client-side search (noindex)
- `/about/`, `/contact/`, `/cookies/`, `/affiliate-disclosure/`, `/editorial-policy/`, `/privacy-policy/`, `/terms/`
- `/rss.xml` — RSS feed

## SEO notes

Article and archive pages are built as static HTML. The site generates a sitemap at `/sitemap-index.xml`, lists it in `robots.txt` and links it from the page head. The search page is excluded from the sitemap. Empty article and topic archives use `noindex,follow` until there is content. The focus keyword field is used for editorial planning and the site's own search; no meta-keywords tag is emitted.

Sitemap submission and Search Console inspection are still required after deployment. Google decides when to crawl, index and display pages; no site configuration can guarantee rankings or indexing.
