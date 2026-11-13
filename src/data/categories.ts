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
    description: 'Comfortable rooms, thoughtful details and simple styling ideas.',
    keyword: 'home decor ideas',
    metaTitle: 'Home Decor Ideas & Inspiration | PawpawDecors',
    metaDescription: 'Explore practical home decor ideas, room styling tips, colour combinations and finishing touches for a home that feels warm and personal.',
    icon: 'house',
    group: 'interior',
    flag: 'homeDecor',
  },
  {
    slug: 'bedroom-decor',
    title: 'Bedroom Decor',
    shortTitle: 'Bedroom',
    description: 'Calm colours, cosy textures and small bedroom updates.',
    keyword: 'bedroom decor ideas',
    metaTitle: 'Bedroom Decor Ideas for a Cosy Room | PawpawDecors',
    metaDescription: 'Find bedroom decor ideas for calm, comfortable spaces, including colour palettes, bedding, lighting, storage and simple styling details.',
    icon: 'bed',
    group: 'interior',
    flag: 'bedroomDecor',
  },
  {
    slug: 'kitchen-decor',
    title: 'Kitchen Decor',
    shortTitle: 'Kitchen',
    description: 'Useful kitchen details that make everyday routines feel lovely.',
    keyword: 'kitchen decor ideas',
    metaTitle: 'Kitchen Decor Ideas & Styling Tips | PawpawDecors',
    metaDescription: 'Browse kitchen decor ideas, practical storage, worktop styling, colour inspiration and small updates for a welcoming kitchen.',
    icon: 'cooking-pot',
    group: 'interior',
    flag: 'kitchenDecor',
  },
  {
    slug: 'balcony-decor',
    title: 'Balcony Decor',
    shortTitle: 'Balcony',
    description: 'Make a small outdoor corner feel like your own little retreat.',
    keyword: 'balcony decor ideas',
    metaTitle: 'Small Balcony Decor Ideas | PawpawDecors',
    metaDescription: 'Make the most of a small balcony with space-saving furniture, container plants, privacy ideas, soft lighting and practical decor.',
    icon: 'sun',
    group: 'interior',
    flag: 'balconyDecor',
  },
  {
    slug: 'garden-decor',
    title: 'Garden Decor',
    shortTitle: 'Garden',
    description: 'Planting ideas, garden accents and greener outdoor corners.',
    keyword: 'garden decor ideas',
    metaTitle: 'Garden Decor & Gardening Ideas | PawpawDecors',
    metaDescription: 'Explore garden decor ideas, plant care, container gardening and outdoor details that help make gardens more welcoming and easier to enjoy.',
    icon: 'flower-2',
    group: 'exterior',
    flag: 'gardenDecor',
  },
  {
    slug: 'patio-deck-decor',
    title: 'Patio & Deck Decor',
    shortTitle: 'Patio & deck',
    description: 'Easy ideas for outdoor seating, dining and relaxed gatherings.',
    keyword: 'patio and deck decor ideas',
    metaTitle: 'Patio & Deck Decor Ideas | PawpawDecors',
    metaDescription: 'Find patio and deck decor ideas for outdoor seating, dining layouts, weather-friendly textiles, plants and comfortable gatherings.',
    icon: 'armchair',
    group: 'exterior',
    flag: 'patioDeckDecor',
  },
  {
    slug: 'outdoor-lighting',
    title: 'Outdoor Lighting',
    shortTitle: 'Outdoor lighting',
    description: 'Gentle light for garden paths, patios and evenings outside.',
    keyword: 'outdoor lighting ideas',
    metaTitle: 'Outdoor Lighting Ideas for Gardens & Patios | PawpawDecors',
    metaDescription: 'Compare outdoor lighting ideas for gardens, patios, paths and entrances, from soft ambient light to useful task lighting.',
    icon: 'lamp',
    group: 'exterior',
    flag: 'outdoorLighting',
  },
  {
    slug: 'front-yard-decor',
    title: 'Front Yard Decor',
    shortTitle: 'Front yard',
    description: 'Welcoming entrances, tidy planting and thoughtful first impressions.',
    keyword: 'front yard decor ideas',
    metaTitle: 'Front Yard Decor & Curb Appeal Ideas | PawpawDecors',
    metaDescription: 'Discover front yard decor ideas for planting, paths, entryways and simple improvements that make a home feel welcoming from the street.',
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
