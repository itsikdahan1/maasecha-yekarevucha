// src/app/page.tsx
import { getPosts, getExperts, getTestimonials } from '@/lib/sanity';
import { HomePageClient } from '@/components/features/HomePageClient'; // תיקון
import type { Post, Expert, Testimonial } from '@/types';

export default async function HomePage() {

  const [posts, experts, testimonials]: [Post[], Expert[], Testimonial[]] = await Promise.all([
    getPosts(),
    getExperts(),
    getTestimonials()
  ]);
  
  return (
    <HomePageClient posts={posts} experts={experts} testimonials={testimonials} />
  );
}