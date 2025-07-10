// src/app/page.tsx

// שינוי 1: נייבא גם את הפונקציה לקבלת מומחים
import { getPosts, getExperts } from '@/lib/sanity';
import { HomePageClient } from '@/components/HomePageClient';
import type { Post, Expert } from '@/types';

export default async function HomePage() {
  // שינוי 2: נטען את כל המידע במקביל באמצעות Promise.all לשיפור ביצועים
  const [posts, experts]: [Post[], Expert[]] = await Promise.all([
    getPosts(),
    getExperts()
  ]);
  
  return (
    // שינוי 3: נעביר את כל המידע שקיבלנו לקומפוננטת הלקוח
    <HomePageClient posts={posts} experts={experts} />
  );
}