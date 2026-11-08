# mravenzo. — publishing & CMS guide

This project uses [Pages CMS](https://app.pagescms.org/) as a Git-based editor. The `.pages.yml` file at the repository root defines the content form. Pages CMS writes Markdown and JSON files into the repository; a connected Cloudflare Pages project rebuilds the site after each Git commit.

## Create and publish an article

1. Open Pages CMS and select the repository.
2. Open **Articles** and create a new entry.
3. Enter a title and a lowercase URL slug. Use hyphens between words, for example `small-balcony-decor`.
4. Add a short excerpt. This is used on cards and as the fallback meta description.
5. Set the publish date and author.
6. Add the featured image and complete its image fields.
7. Turn on each matching category switch. The switches are independent; one article can be in several categories.
8. Write the article in the Article content editor.
9. Complete the SEO and social fields.
10. Keep **Keep as draft** on while preparing the story. When ready, switch **Keep as draft** off and **Publish this article** on, then save/commit.

An article appears in the main **Articles** archive whenever `Publish this article` is on and `Keep as draft` is off. Category switches do not control whether it appears in the all-articles archive; they only control which topic archives include it. If all category switches are off, the article still appears in `/articles/`.

## Homepage placement

- **Featured**: turn on **Add to homepage featured articles** to include the story in the feature selection.
- **Featured order**: use `1` through `4` to choose the display order. The homepage displays the first four published stories that have Featured enabled.
- **Recently published**: the homepage automatically shows the seven newest published articles, based on Publish date.
- If there are no featured or recent articles yet, the homepage displays an editorial empty state instead of fabricated content.

## Category switches

| CMS switch | Category page |
|---|---|
| Home Decor | `/category/home-decor/` |
| Bedroom Decor | `/category/bedroom-decor/` |
| Kitchen Decor | `/category/kitchen-decor/` |
| Balcony Decor | `/category/balcony-decor/` |
| Garden Decor | `/category/garden-decor/` |
| Patio & Deck Decor | `/category/patio-deck-decor/` |
| Outdoor Lighting | `/category/outdoor-lighting/` |
| Front Yard Decor | `/category/front-yard-decor/` |

The Interior Decor and Exterior Decor navigation pages group the four interior and four exterior topics. Each category archive paginates after 12 matching stories.

## Featured image fields

| Field | Purpose |
|---|---|
| Featured image | Main image used on article cards and the article page. |
| Alt text | A concise description for screen readers and image accessibility. Describe the image, not a string of keywords. |
| Title attribute | Optional short title associated with the image. |
| Caption | Visible text shown below the main article image. Add an image credit here when required. |
| Media description | Internal note about the image, context, rights or source. It is editorial metadata and is not shown as article copy. |

Use descriptive filenames, compress images before upload and prefer WebP/AVIF where supported. Keep text out of the image itself where possible. Upload only original, licensed or permission-cleared images.

## SEO settings — Rank Math-style fields

These fields are available for every article and CMS page.

| Field | What it does / how to use it |
|---|---|
| SEO title | Page title used in the HTML title and search metadata. Write a distinct, accurate title; roughly 50–60 characters is a useful editorial target. |
| Meta description | Search description. Summarise the page in natural language; roughly 140–160 characters is a useful target. Article excerpt is the fallback when this is blank. |
| Focus keyword | One main query/topic the article is meant to answer. It is included in the keyword metadata and on-site search index. It is not a ranking switch. |
| Related keywords | Add close variants and supporting phrases that the article genuinely covers. |
| Canonical URL override | Leave blank for the article's own canonical URL. Use only when this page intentionally duplicates content available at a preferred URL. |
| Allow search indexing | On = `index`; off = `noindex`. Turn off for pages that should not appear in search. |
| Allow search engines to follow links | On = `follow`; off = `nofollow`. Use deliberately. |
| Structured data type | Choose Article, BlogPosting or NewsArticle for articles; choose the closest page type for website pages. Only select NewsArticle for actual news-style reporting. |
| Breadcrumb label override | Reserved editorial field for a shorter breadcrumb label. The visible breadcrumb currently uses the article title. |
| Open Graph title | Title used when sharing to Facebook, LinkedIn and compatible social platforms. Falls back to SEO title. |
| Open Graph description | Social sharing description. Falls back to the meta description. |
| Open Graph image | Image used for social previews. Falls back to the featured image and then the site default. |
| Open Graph image alt text | Accessible description for the social image. |
| X / Twitter card type | Choose a large image card or summary card. |
| X / Twitter title | Optional title override for X/Twitter cards. |
| X / Twitter description | Optional description override for X/Twitter cards. |
| X / Twitter image | Optional image override for X/Twitter cards. |

The site outputs title and description tags, canonical links, robots directives, Open Graph and X/Twitter metadata, JSON-LD structured data, a sitemap and an RSS feed. The shared layout emits WebSite data; article pages also emit Article/BlogPosting/NewsArticle data and breadcrumbs; content pages emit WebPage-style data.

## Preview the Google/social snippet

Open `/admin/seo-preview.html` on the deployed website, or open the file locally. Copy the relevant SEO title, description, canonical URL and social image path from Pages CMS into the preview fields. The tool shows a Google-style search snippet and a social-card mock-up. This is a visual helper only; it does not save back to CMS and does not reproduce the exact layout chosen by Google or each social network.

## Website pages and site settings

- **Website pages**: edit About, Contact, Editorial Policy, Privacy Policy and Terms of Use. Keep the existing URL slug when editing an existing page.
- **Site settings**: change website title/description, canonical website URL, public contact email, default social image, locale and author name.
- Page structured-data choices are available in each page's SEO panel; article structured-data choices are available in each article's SEO panel. Leave the field unchanged to use the site's Article or WebPage default.
- Before using a custom domain, update the `site` value in `astro.config.mjs` and the sitemap URL in `public/robots.txt`. In Cloudflare Pages, set `NODE_VERSION` to `22.23.4` (or a newer supported Node 22 release).

The Privacy Policy and Terms of Use in this starter are prompts for review, not final legal advice. Replace them to match your actual business, analytics, advertising, affiliate and privacy practices before launch.
