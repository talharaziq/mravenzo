# mravenzo. — home & garden journal

A responsive, static Astro website for home decor, interior styling, garden decor and outdoor living. It is set up for GitHub content editing with Pages CMS and static publishing on Cloudflare Pages.

The article collection is intentionally empty. No articles have been copied from oopsgene.com or added as sample content.

## Included

- A white-first, red-accented editorial design with a dark-mode switch.
- Responsive navigation with hover dropdowns for Interior Decor and Exterior Decor, search, and a right-aligned `mravenzo.` wordmark.
- Eight topic cards, four featured-story positions and seven recent-story positions on the homepage.
- An all-articles archive and eight category archives, each paginated at 12 articles per page.
- Individual article pages, related-story links, breadcrumbs, and a client-side search page.
- Pages CMS configuration in `.pages.yml` for articles, website pages, site settings and image uploads.
- Rank Math-style SEO fields, Open Graph and X/Twitter fields, featured-image metadata, JSON-LD, canonical URLs, sitemap, robots.txt and RSS.
- An SEO/social preview utility at `/admin/seo-preview.html`.
- About, Contact, Cookies, Editorial Policy, Privacy Policy and Terms of Use starter pages.

## Requirements

- Node.js 22.23.4 or newer.
- npm.
- A GitHub repository.
- A Cloudflare account with Pages enabled.
- A Pages CMS account connected to the GitHub repository.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Astro. To build and preview the production version:

```sh
npm run build
npm run preview
```

The static production files are generated in `dist/`.

## Before launch

1. Set the real production domain in `astro.config.mjs` (`site`), `src/data/site.json` (`url`) and `public/robots.txt` (sitemap URL). The sample domain is `https://mravenzo.com`.
2. Review the public contact email in `src/data/site.json` or Pages CMS Site settings.
3. Replace or review the Privacy Policy and Terms of Use. They are starter templates, not final legal documents.
4. Review the Editorial Policy and update it to describe your actual editorial, image, affiliate and sponsorship practices.
5. Add your first original article through Pages CMS and check the article, image and social previews before publishing.
6. Add your domain to Cloudflare Pages and configure DNS after the first successful deployment.

## Deploy to Cloudflare Pages

Use the Git integration in Cloudflare Pages and select the GitHub repository containing this project.

| Setting | Value |
|---|---|
| Framework preset | Astro (or None if the preset is not offered) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22.23.4` or newer (`NODE_VERSION=22.23.4` build environment variable) |

No server-side runtime is required for this static site. Every CMS change is committed to GitHub; Cloudflare Pages then builds and deploys the updated site from that commit. Cloudflare's current Astro Pages guide is available at [Astro on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

## Pages CMS setup

1. Upload the project files to a new GitHub repository. Do not upload the outer ZIP folder as a nested subfolder; the `.pages.yml` file must sit at the repository root.
2. Open [Pages CMS](https://app.pagescms.org/) and sign in with the GitHub account that can access the repository.
3. Install/authorize the Pages CMS GitHub App for that repository.
4. Open the repository in Pages CMS. The `.pages.yml` file defines the content collections and fields.
5. Open Site settings and update the canonical website URL, contact email, and default social image.
6. Create articles in the Articles collection. The article file is saved under `src/content/articles/` as a Markdown file named from its URL slug.

The Pages CMS editor is hosted by Pages CMS itself. `/admin/` is a shortcut and setup guide; it is not a custom login system and does not store GitHub credentials.

## Content model

See [CMS-GUIDE.md](./CMS-GUIDE.md) for the publishing workflow and every editorial/SEO field. In brief:

- `published` must be on for an article to appear publicly.
- `draft` must be off for an article to appear publicly.
- All published, non-draft articles appear in `/articles/` whether or not any category switch is selected.
- Each of the eight category switches is independent. Turning one on adds the article to that category archive. More than one category can be selected.
- `featured` adds the article to the homepage feature selection. The first four by `featuredOrder` appear.
- The homepage displays the seven most recently dated published articles.

## Routes

- `/` — homepage
- `/articles/` — all published articles
- `/articles/{slug}/` — article detail page
- `/interior-decor/` and `/exterior-decor/` — grouped archives
- `/category/{category-slug}/` — one of the eight category archives
- `/categories/` — all eight topics
- `/search/` — client-side search of published article titles, excerpts, selected categories and focus keywords
- `/about/`, `/contact/`, `/cookies/`, `/editorial-policy/`, `/privacy-policy/`, `/terms/`
- `/rss.xml` — RSS feed

Archive pages show 12 articles per page. Pagination pages are generated automatically at build time when there are more than 12 matching articles.

## Notes

- Pages CMS provides the editing form and writes content to GitHub. The SEO preview tool is a separate convenience page: paste the SEO/social values into it to preview a Google-style snippet and social card. It does not write values back to Pages CMS.
- Search engines choose their own title and snippet display. SEO lengths in the CMS are guidelines, not guarantees.
- This project includes the technical SEO foundations, but no implementation can guarantee indexing, rankings or traffic.
- The included home illustration and social share graphic are original SVG assets created for this project. Upload only images you own or have permission to use.
