// FILENAME: src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/sanity';

const BASE_URL = 'https://www.maasecha.com'; // ודא שזו הכתובת הנכונה

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsForSitemap();

  const postRoutes = posts
    .filter(post => post && post.slug && post.slug.current && post._updatedAt)
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt).toISOString(), // עכשיו זה בטוח כי הטיפוס מחייב את השדה
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const staticRoutes = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${BASE_URL}/how-it-works`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/gallery`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/testimonials`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/faq`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/register`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/accessibility`, priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(route => ({
      ...route,
      lastModified: new Date().toISOString(),
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
  ];
}