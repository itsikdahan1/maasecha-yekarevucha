// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/sanity'; // נייבא את הפונקציה החדשה

// הגדרת כתובת הבסיס של האתר
const BASE_URL = 'https://www.maasecha.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. הוספת העמודים הסטטיים
  const staticRoutes = [
    '/',
    '/how-it-works',
    '/faq',
    '/contact',
    '/register',
    '/blog',
    '/testimonials',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // 2. הוספת העמודים הדינמיים מהבלוג
  const posts = await getAllPostsForSitemap();
  const dynamicRoutes = posts.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: 'weekly' as 'weekly', // מאמרים עשויים להתעדכן לעיתים קרובות יותר
    priority: 0.7,
  }));

  // 3. איחוד כל הכתובות
  return [...staticRoutes, ...dynamicRoutes];
}