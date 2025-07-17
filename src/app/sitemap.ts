// FILENAME: src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/sanity';
import type { Post } from '@/types'; // מייבאים את הטיפוס הנכון

const BASE_URL = 'https://www.yourdomain.com'; // שנה לכתובת האתר שלך

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsForSitemap();

  const postRoutes = posts
    // סינון הגנתי: ודא שכל הנתונים הנדרשים קיימים
    .filter((post): post is Pick<Post, 'slug' | '_updatedAt'> & { _updatedAt: string } => 
        Boolean(post && post.slug && post._updatedAt)
    )
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug.current}`,
      // עכשיו זה בטוח, כי הטיפוס והסינון נכונים
      lastModified: new Date(post._updatedAt).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...postRoutes,
  ];
}