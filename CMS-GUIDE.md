# PawpawDecors — publishing guide

PawpawDecors uses [Pages CMS](https://app.pagescms.org/) as a Git-based content editor. The `.pages.yml` file defines the editing forms. Pages CMS saves articles and page changes in the repository; your hosting workflow rebuilds the static site after a commit.

## Create and publish an article

1. Open Pages CMS and select the PawpawDecors repository.
2. Open **Articles** and create an entry.
3. Add a clear title, a short URL slug and a useful excerpt.
4. Set the publish date.
5. Upload the featured image and describe it in the alt-text field.
6. Select every category that genuinely fits the article.
7. Write the article in the content editor and check headings, links and factual claims.
8. Add a unique SEO title and meta description. Set the focus keyword and related terms only when they match the article.
9. Turn on **Keep as draft** while the article is being prepared. When it is ready, turn draft off and **Publish this article** on.

Talha Raziq is the default author. Author details are supplied by the site and do not need to be entered for each article.

## Homepage featured carousel

Turn on **Add to homepage featured articles** for a published story to include it in the carousel. The carousel selects the four newest published articles with this setting enabled and orders them by publish date. You do not need to set a manual order. When another featured article is published, it takes the newest position and the fourth-oldest featured article drops out of the homepage selection.

## Recently published and article cards

The homepage and article archives use compact horizontal article rows. Each row shows the featured image on the left, one line for the title and up to two lines for the excerpt. Longer text is clipped to keep the rows aligned.

## Affiliate links

When an article contains affiliate links, turn on **This article contains affiliate links**. A disclosure appears above the article content. Add a clear disclosure close to any commercial recommendation and mark affiliate links with `rel="sponsored"` where the editor supports link attributes. Do not present paid placements as independent recommendations.

## Search metadata

Use a distinct, accurate SEO title for each article and page. A title around 50–60 characters and a meta description around 140–160 characters are useful editorial guides, not strict ranking limits. Include the topic naturally in the title, introduction and relevant headings. Avoid repeating keywords unnaturally.

Use the featured image alt field to describe the actual image for readers using assistive technology. Do not use it as a list of search terms. Use descriptive file names and upload only images you own or have permission to publish.

## Categories

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

The Interior Decor and Garden & Outdoor navigation pages group their respective topics. Category archives paginate after 12 stories.

## Website pages and advertising

The Pages collection includes About, Author, Contact, Guest Posting, Cookie Policy, Editorial Policy, Privacy Policy and Terms of Use. Keep the existing slug when editing a page so its URL does not change.

Google AdSense code is not part of the repository because it needs the publisher's own account details. Before enabling advertising, ensure the site has substantial original content, clear navigation, working legal pages and any consent tools required for the locations where ads are served. No search or advertising service can promise approval or rankings.
