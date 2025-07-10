import { getPosts, getExperts } from '@/lib/sanity';
import { HomePageClient } from '@/components/HomePageClient';
import type { Post, Expert } from '@/types';

export default async function HomePage() {
  const [posts, experts]: [Post[], Expert[]] = await Promise.all([
    getPosts(),
    getExperts()
  ]);
  
  return (
    <HomePageClient posts={posts} experts={experts} />
  );
}