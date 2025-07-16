// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/sanity';

const BASE_URL = 'https://www.yourdomain.com'; // שנה לכתובת האתר שלך

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPostsForSitemap();

    const postRoutes = posts.map(post => ({
        url: `${BASE_URL}/blog/${post.slug.current}`,
        lastModified: new Date(post._updatedAt as string).toISOString(), // הוספת as string ל- _updatedAt
        changeFrequency: 'weekly' as 'weekly', // וודא שזה literal type
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