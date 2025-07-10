// src/app/page.tsx

// שינוי 1: הסרנו את הייבוא של 'experts' כי אין בו יותר צורך כאן
import { getPosts } from '@/lib/sanity';
import { HomePageClient } from '@/components/HomePageClient';
import type { Post } from '@/types';

export default async function HomePage() {
  const posts: Post[] = await getPosts();
  
  return (
    // שינוי 2: הסרנו את ה-prop של experts מהקריאה לקומפוננטה
    <HomePageClient posts={posts} />
  );
}