'use client';
import React, { FC } from 'react';
import type { Post, Expert, Testimonial } from '@/types'; // הוספנו Testimonial
import { HeroSection } from '@/components/HeroSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ProductionEveningSection } from '@/components/ProductionEveningSection';
import { CommunitySection } from '@/components/CommunitySection';
// import { AiToolsSection } from '@/components/AiToolsSection'; // הסרנו את זה
import { ExpertsSection } from '@/components/ExpertsSection';
import { TestimonialsPreviewSection } from '@/components/TestimonialsPreviewSection'; // הוספנו את זה
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';

interface HomePageClientProps {
  posts: Post[];
  experts: Expert[];
  testimonials: Testimonial[]; // הוספנו את זה
}

export const HomePageClient: FC<HomePageClientProps> = ({ posts, experts, testimonials }) => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection />
      {/* הסרנו את כלי ה-AI מכאן */}
      {/* <AiToolsSection /> */}
      <TestimonialsPreviewSection testimonials={testimonials} /> {/* הוספנו את ההמלצות כאן */}
      <ExpertsSection experts={experts} />
      <CommunitySection />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  );
};