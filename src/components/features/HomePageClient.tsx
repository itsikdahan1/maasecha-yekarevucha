'use client';

import React, { FC } from 'react';
import type { Post, Expert, Testimonial, GalleryItem } from '@/types';
import { HeroSection } from '@/components/features/HeroSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';
import { ProductionEveningSection } from '@/components/features/ProductionEveningSection';
import { CommunitySection } from '@/components/features/CommunitySection';
import { ExpertsSection } from '@/components/features/ExpertsSection';
import { TestimonialsPreviewSection } from '@/components/features/TestimonialsPreviewSection';
import { BlogSection } from '@/components/features/BlogSection';
import { ContactSection } from '@/components/features/ContactSection';
import { GallerySection } from '@/components/features/GallerySection'; 

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
      {/* ======================= התיקון כאן ======================= */}
      {/* מחזירים את הסקשן לפעולה. הסרנו את סימני ההערה. */}
      <WhyUsSection />
      {/* ===================== סוף התיקון ======================= */}
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