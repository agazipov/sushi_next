import { MetadataRoute } from 'next';
import { getAllCategories } from '../services/menu';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const categories = await getAllCategories();
    const productUrls: MetadataRoute.Sitemap = categories.map((categorie) => ({
      url: `https://fish-rice.ru/${categorie.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    return [
      {
        url: 'https://fish-rice.ru/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: 'https://fish-rice.ru/order',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://fish-rice.ru/order/success',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      ...productUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}