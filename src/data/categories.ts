export type DecorCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  group: 'interior' | 'exterior';
  flag: string;
};

export const categories: DecorCategory[] = [
  {
    slug: 'home-decor',
    title: 'Home Decor',
    shortTitle: 'Home',
    description: 'Thoughtful styling, colour and details for a home that feels personal.',
    keyword: 'home decor ideas',
    metaTitle: 'Home Decor Ideas & Inspiration | mravenzo.',
    metaDescription: 'Explore home decor ideas, thoughtful styling, colour palettes and finishing touches for rooms that feel personal and welcoming.',
    icon: 'house',
    group: 'interior',
    flag: 'homeDecor',
  },
  {
    slug: 'bedroom-decor',
    title: 'Bedroom Decor',
    shortTitle: 'Bedroom',
    description: 'Restful rooms, considered details and softer ways to unwind.',
    keyword: 'bedroom decor ideas',
    metaTitle: 'Bedroom Decor Ideas & Inspiration | mravenzo.',
    metaDescription: 'Explore bedroom decor ideas, styling tips, colour palettes and thoughtful details for a calm, comfortable space.',
    icon: 'bed',
    group: 'interior',
    flag: 'bedroomDecor',
  },
  {
    slug: 'kitchen-decor',
    title: 'Kitchen Decor',
    shortTitle: 'Kitchen',
    description: 'Useful, beautiful kitchens with room for everyday living.',
    keyword: 'kitchen decor ideas',
    metaTitle: 'Kitchen Decor Ideas & Inspiration | mravenzo.',
    metaDescription: 'Find kitchen decor ideas, smart styling details, storage inspiration and finishes for a welcoming kitchen.',
    icon: 'cooking-pot',
    group: 'interior',
    flag: 'kitchenDecor',
  },
  {
    slug: 'balcony-decor',
    title: 'Balcony Decor',
    shortTitle: 'Balcony',
    description: 'Small outdoor corners made inviting with plants and texture.',
    keyword: 'balcony decor ideas',
    metaTitle: 'Balcony Decor Ideas & Inspiration | mravenzo.',
    metaDescription: 'Make more of a small outdoor space with balcony decor ideas, compact furniture, plants and lighting.',
    icon: 'sun',
    group: 'interior',
    flag: 'balconyDecor',
  },
  {
    slug: 'garden-decor',
    title: 'Garden Decor',
    shortTitle: 'Garden',
    description: 'Planting, garden accents and outdoor spaces with character.',
    keyword: 'garden decor ideas',
    metaTitle: 'Garden Decor Ideas & Inspiration | mravenzo.',
    metaDescription: 'Explore garden decor ideas, planting inspiration, outdoor accents and practical ways to shape your garden.',
    icon: 'flower-2',
    group: 'exterior',
    flag: 'gardenDecor',
  },
  {
    slug: 'patio-deck-decor',
    title: 'Patio & Deck Decor',
    shortTitle: 'Patio & deck',
    description: 'Outdoor seating, dining areas and easy ways to entertain outside.',
    keyword: 'patio and deck decor ideas',
    metaTitle: 'Patio & Deck Decor Ideas | mravenzo.',
    metaDescription: 'Discover patio and deck decor ideas, outdoor furniture layouts, textiles and details for alfresco living.',
    icon: 'armchair',
    group: 'exterior',
    flag: 'patioDeckDecor',
  },
  {
    slug: 'outdoor-lighting',
    title: 'Outdoor Lighting',
    shortTitle: 'Outdoor lighting',
    description: 'Warm light, gentle ambience and safer paths after sunset.',
    keyword: 'outdoor lighting ideas',
    metaTitle: 'Outdoor Lighting Ideas & Inspiration | mravenzo.',
    metaDescription: 'Find outdoor lighting ideas for gardens, patios, pathways and entrances, from soft ambience to practical lighting.',
    icon: 'lamp',
    group: 'exterior',
    flag: 'outdoorLighting',
  },
  {
    slug: 'front-yard-decor',
    title: 'Front Yard Decor',
    shortTitle: 'Front yard',
    description: 'Welcoming entrances, neat planting and thoughtful first impressions.',
    keyword: 'front yard decor ideas',
    metaTitle: 'Front Yard Decor Ideas | mravenzo.',
    metaDescription: 'Explore front yard decor ideas for welcoming entrances, planting, pathways and a more considered curb appeal.',
    icon: 'house',
    group: 'exterior',
    flag: 'frontYardDecor',
  },
];

export const interiorCategories = categories.filter((item) => item.group === 'interior');
export const exteriorCategories = categories.filter((item) => item.group === 'exterior');

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
