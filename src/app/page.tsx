// src/app/page.tsx
// עדכון: הוספת getGalleryItems לייבוא מ-sanity
import { getPosts, getExperts, getTestimonials, getGalleryItems } from '@/lib/sanity'; 
import { HomePageClient } from '@/components/features/HomePageClient'; 
// עדכון: הוספת GalleryItem לטיפוסים המיובאים
import type { Post, Expert, Testimonial, GalleryItem } from '@/types'; 

export default async function HomePage() {

  // עדכון: הוספת galleryItems למערך ה-Promise.all
  const [posts, experts, testimonials, galleryItems]: [Post[], Expert[], Testimonial[], GalleryItem[]] = await Promise.all([
    getPosts(),
    getExperts(),
    getTestimonials(),
    getGalleryItems() // קריאה לפונקציה החדשה
  ]);
  
  return (
    // עדכון: העברת galleryItems כ-prop חדש ל-HomePageClient
    <HomePageClient posts={posts} experts={experts} testimonials={testimonials} galleryItems={galleryItems} /> 
  );
}