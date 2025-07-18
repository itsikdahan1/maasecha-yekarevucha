// FILENAME: src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/sanity'; // שיניתי לפונקציה שכבר קיימת ומחזירה את כל הפוסטים
import type { Post } from '@/types';

// ======================= עדכון קריטי =======================
// !!! שנה את הכתובת הזו לכתובת האמיתית של האתר שלך לפני העלאה לפרודקשן !!!
const BASE_URL = 'https://www.maasecha.com'; // לדוגמה, או כל דומיין אחר
// ==========================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. קבלת כל המאמרים מהבלוג
  const posts = await getPosts();

  const postRoutes = posts
    .filter((post): post is Pick<Post, 'slug' | '_updatedAt'> & { _updatedAt: string } => 
        Boolean(post && post.slug && post.slug.current && post._updatedAt)
    )
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt).toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  // 2. הגדרת כל העמודים הסטטיים באתר
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

  // 3. איחוד כל הנתיבים
  return [
    ...staticRoutes,
    ...postRoutes,
  ];
}