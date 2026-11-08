import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const categoryFlags = z.object({
  homeDecor: z.boolean().default(false),
  bedroomDecor: z.boolean().default(false),
  kitchenDecor: z.boolean().default(false),
  balconyDecor: z.boolean().default(false),
  gardenDecor: z.boolean().default(false),
  patioDeckDecor: z.boolean().default(false),
  outdoorLighting: z.boolean().default(false),
  frontYardDecor: z.boolean().default(false),
}).default({});

const seoFields = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  focusKeyword: z.string().optional(),
  secondaryKeywords: z.array(z.string()).optional(),
  canonicalUrl: z.string().optional(),
  index: z.boolean().default(true),
  follow: z.boolean().default(true),
  schemaType: z.string().optional(),
  breadcrumbTitle: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogImageAlt: z.string().optional(),
  twitterCard: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
}).optional();

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string().default(''),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('mravenzo. editorial team'),
    published: z.boolean().default(false),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    featuredOrder: z.number().default(99),
    readingTime: z.number().optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    featuredImageTitle: z.string().optional(),
    featuredImageCaption: z.string().optional(),
    featuredImageDescription: z.string().optional(),
    categories: categoryFlags,
    tags: z.array(z.string()).default([]),
    seo: seoFields,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().default(''),
    published: z.boolean().default(true),
    seo: seoFields,
  }),
});

export const collections = { articles, pages };
