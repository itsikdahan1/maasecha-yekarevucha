'use client';
import React, { FC } from 'react';
import type { Post, Expert, Testimonial, GalleryItem } from '@/types';
import dynamic from 'next/dynamic'; // <-- 1. מייבאים את dynamic

import { HeroSection } from '@/components/features/HeroSection';
// import { WhyUsSection } from '@/components/features/WhyUsSection'; // <-- 2. מסירים את הייבוא הרגיל
import { ProductionEveningSection } from '@/components/features/ProductionEveningSection';
import { CommunitySection } from '@/components/features/CommunitySection';
import { ExpertsSection } from '@/components/features/ExpertsSection';
import { TestimonialsPreviewSection } from '@/components/features/TestimonialsPreviewSection';
import { BlogSection } from '@/components/features/BlogSection';
import { ContactSection } from '@/components/features/ContactSection';
import { GallerySection } from '@/components/features/GallerySection'; 

// ======================= התיקון הסופי כאן =======================
// 3. מייבאים את הרכיב באופן דינמי, וקובעים שהוא ירונדר רק בצד הלקוח (ssr: false)
const WhyUsSection = dynamic(() => import('@/components/features/WhyUsSection').then(mod => mod.WhyUsSection), {
  ssr: false,
});
// ===============================================================

interface HomePageClientProps {
  posts: Post[];
  experts: Expert[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
}

export const HomePageClient: FC<HomePageClientProps> = ({ posts, experts, testimonials, galleryItems }) => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection />
      <ExpertsSection experts={experts} />
      <GallerySection items={galleryItems} />
      <TestimonialsPreviewSection testimonials={testimonials} />
      <CommunitySection />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  );
};