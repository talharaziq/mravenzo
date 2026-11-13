# PawpawDecors

PawpawDecors is a responsive, static Astro website for home decor, gardening, outdoor living and plant-care articles. It uses Pages CMS for Git-based content editing and is configured for the custom domain `https://pawpawdecors.com`.

## Run locally

- Node.js 22.23.4 or newer
- npm

```sh
npm install
npm run dev
```

Build and preview the static site:

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Publishing

The `.pages.yml` file defines the Pages CMS collections for articles, website pages and site settings. Pages CMS commits edits to the connected GitHub repository. The hosting workflow can then rebuild the static site.

For Cloudflare Pages, use:

| Setting | Value |
|---|---|
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22.23.4` or newer |

## Articles and homepage features

- An article appears publicly when `published` is on and `draft` is off.
- Category switches determine which topic archives include the article.
- The homepage carousel shows up to four published articles with `featured` enabled.
- Featured articles are ordered by publish date, newest first. When a newer article is featured, the older fourth item moves out automatically.
- The Recently Published and archive listings use compact thumbnail rows.
- Talha Raziq is the default and sole author. New articles do not need author details entered in Pages CMS.
- Turn on `affiliateLinks` for an article when it contains affiliate links so the disclosure appears above the article body.

## Main routes

- `/` — homepage
- `/articles/` — all published articles
- `/articles/{slug}/` — article pages
- `/interior-decor/` and `/exterior-decor/` — topic groups
- `/category/{category-slug}/` — category archives
- `/categories/` — all topics
- `/search/` — search published articles
- `/about/`, `/author/`, `/contact/`, `/guest-posting/`
- `/cookies/`, `/editorial-policy/`, `/privacy-policy/`, `/terms/`
- `/rss.xml` — RSS feed

## SEO and editorial standards

The site outputs page titles, meta descriptions, canonical URLs, robots directives, Open Graph and X card metadata, JSON-LD, a sitemap and an RSS feed. Article pages include Article structured data, breadcrumbs, publication dates and a link to the author's profile.

Use a unique title and description for every article. Write for the reader, use descriptive image alt text, link to relevant pages and cite reliable sources for factual claims. The CMS focus-keyword field is an editorial reminder, not a ranking control.

Affiliate links must be disclosed clearly and should use `rel="sponsored"` where they are added to article content. The privacy, cookie, terms and editorial pages explain the site's current features and intended advertising and affiliate practices.

Google AdSense code is not included because it requires the publisher's own account details. Advertising approval and search rankings depend on Google's review and systems; this project cannot guarantee either result.
