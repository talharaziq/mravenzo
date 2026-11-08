# mravenzo. — publishing and CMS guide

This project uses Pages CMS as a Git-based editor. The `.pages.yml` file at the repository root defines the publishing form. Pages CMS saves content to GitHub; Cloudflare Pages rebuilds the website after each commit.

## Create an article

1. Open Pages CMS and select the mravenzo. repository.
2. Open **Articles** and create a new entry.
3. Enter a clear title, a lowercase hyphenated slug and a concise excerpt.
4. Set the publication date and author.
5. Upload the featured image and complete its alt text, title and caption.
6. Select every relevant category switch. The switches work independently.
7. Write the article with descriptive headings and useful internal links.
8. Add a focus phrase and unique search/social metadata in the SEO section.
9. Add product or retailer URLs that pay a commission in **Affiliate links**. The site renders these in a disclosed section and marks each link with `rel="sponsored"` automatically.
10. Set **Publish this article** on and **Keep as draft** off when it is ready to appear on the site.

## Year-based article folders and URLs

Pages CMS creates new articles with the filename template `{year}/{primary}.md`. `{year}` is the current calendar year at the time you create the entry. For example, an article created in 2026 is saved as `src/content/articles/2026/small-balcony-decor.md` and its public URL is `/articles/2026/small-balcony-decor/`. When the calendar year changes, new entries automatically use the new year folder, such as `src/content/articles/2027/` and `/articles/2027/` URLs. Pages CMS creates the folder as it saves the first article in that year.

The folder year is based on the calendar year when the CMS entry is created. When you intentionally publish a backdated article, place its Markdown file in the folder matching its publication year so the URL year and publication date agree. The URL is derived from the file's folder and filename; keep both stable after publishing.

The current article collection is empty, so there are no existing article URLs to migrate. The route supports nested year folders automatically.

## Article placement

- Every published, non-draft article appears in `/articles/`, whether or not a category is selected.
- Category switches control the topic archives only. One article can be assigned to several categories.
- **Featured** adds an article to the homepage featured section. **Featured order** sorts the four visible slots; lower numbers appear first.
- The homepage displays the seven newest published articles based on publication date.
- Interior and exterior archive pages group the four categories in each section.
- Article and category archives display 12 entries per page.

## Category switches

| CMS switch | Public category URL |
|---|---|
| Home Decor | `/category/home-decor/` |
| Bedroom Decor | `/category/bedroom-decor/` |
| Kitchen Decor | `/category/kitchen-decor/` |
| Balcony Decor | `/category/balcony-decor/` |
| Garden Decor | `/category/garden-decor/` |
| Patio & Deck Decor | `/category/patio-deck-decor/` |
| Outdoor Lighting | `/category/outdoor-lighting/` |
| Front Yard Decor | `/category/front-yard-decor/` |

## Featured image fields

| Field | Purpose |
|---|---|
| Featured image | Main image used on article cards and the article page. |
| Alt text | A concise description of what the image shows. It is used by assistive technology and helps search engines understand the image. |
| Title attribute | Optional short image title. |
| Caption | Visible caption under the article's main image. Add required image credits here. |
| Media description | Internal note about image context, source or usage permission. |

Use sharp, relevant images. Compress large uploads and prefer WebP or AVIF where practical. Use descriptive filenames and write alt text for people, not as a list of keywords.

## SEO fields

| Field | How to use it |
|---|---|
| SEO title | A unique, accurate title for the page. Google may use other page text when generating a result title. |
| Meta description | A concise, page-specific summary. Google may use page text instead of the meta description in a result. |
| Focus keyword | An editorial planning phrase and an on-site search term. Google does not use the meta keywords tag as a ranking signal. |
| Related keywords | Close variants that the article naturally covers. |
| Canonical URL | Leave blank to use the page's own canonical address. Set an override only when there is a real duplicate or preferred source URL. |
| Allow search indexing | Turn off to emit `noindex` for a page that should not appear in search. |
| Allow search engines to follow links | Controls the page's robots `follow` or `nofollow` directive. |
| Structured data type | Choose the accurate schema type for the article or page. Structured data must match visible page content. |
| Breadcrumb label | Optional short label for breadcrumb display. |
| Open Graph title and description | Optional social sharing overrides. They fall back to SEO title and meta description. |
| Open Graph image and alt text | Image and accessible description used for social sharing. |
| X card type, title, description and image | Optional X/Twitter sharing overrides. |
| Affiliate links | Enter each commission-generating product or retailer URL here. The template adds the `sponsored` relationship attribute and places a disclosure directly above the links. Do not add commission-generating URLs as ordinary body links. |

The site emits page titles, meta descriptions, canonical URLs, robots directives, Open Graph and X metadata, JSON-LD structured data, a sitemap, robots.txt and RSS. The search page is noindex and is excluded from the sitemap. Empty article/category archives are noindex until they contain published content.

## Search and social previews

Open `/admin/seo-preview.html` to test an SEO title, meta description, canonical URL and social image. It is a preview utility; the actual values are saved in Pages CMS.

## Website pages and settings

Use **Website pages** to edit About, Contact, Cookies, Affiliate Disclosure, Editorial Policy, Privacy Policy and Terms of Use. Keep the existing slug when editing a page. Use **Site settings** to update the site title, description, canonical URL, contact email and default social image.

The email address is stored in `src/data/site.json` and is used by the footer and Contact page mail links. It is not printed as plain text on the site.

## Google Search Console

After deployment, verify the preferred domain in Google Search Console and submit `https://mravenzo.com/sitemap-index.xml`. Use URL Inspection to test the homepage, a category page and each new article. Sitemap submission is a discovery hint; it does not guarantee indexing.

## Domain and deployment

The current canonical site URL is `https://mravenzo.com`. If the domain changes, update the `site` value in `astro.config.mjs`, the `url` field in `src/data/site.json` and the sitemap address in `public/robots.txt`. Cloudflare Pages uses `npm run build`, output directory `dist` and Node.js `22.23.4` or later.
