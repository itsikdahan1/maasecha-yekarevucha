// src/app/gallery/page.tsx
import { getGalleryItems } from "@/lib/sanity";
import { GallerySection } from "@/components/features/GallerySection"; // יש לוודא שקומפוננטה זו קיימת בנתיב זה
import type { GalleryItem } from "@/types";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'רגעים מההפקות שלנו | מעשיך יקרבוך',
  description: 'הצצה לאווירה, לאנשים, ולחוויה שהופכת את ההיכרויות דרכנו למשהו מיוחד במינו. תמונות וסרטונים מהפקות קודמות.',
};

export default async function GalleryPage() {
    const items: GalleryItem[] = await getGalleryItems();

    return <GallerySection items={items} />;
}