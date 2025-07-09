// src/app/page.tsx
import { getPosts } from '@/lib/sanity';
import { experts } from '@/lib/data';
import { HomePageClient } from '@/components/HomePageClient';
import type { Post } from '@/types';

export default async function HomePage() {
  const posts: Post[] = await getPosts();
  
  return (
    <HomePageClient posts={posts} experts={experts} />
  );
}