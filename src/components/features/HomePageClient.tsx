'use client';
import React, { FC } from 'react';
import type { Post, Expert, Testimonial } from '@/types';
import { HeroSection } from '@/components/features/HeroSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';
import { ProductionEveningSection } from '@/components/features/ProductionEveningSection';
import { CommunitySection } from '@/components/features/CommunitySection';
import { AiToolsSection } from '@/components/features/AiToolsSection';
import { ExpertsSection } from '@/components/features/ExpertsSection';
import { TestimonialsPreviewSection } from '@/components/features/TestimonialsPreviewSection';
import { BlogSection } from '@/components/features/BlogSection';
import { ContactSection } from '@/components/features/ContactSection';

interface HomePageClientProps {
  posts: Post[];
  experts: Expert[];
  testimonials: Testimonial[];
}

export const HomePageClient: FC<HomePageClientProps> = ({ posts, experts, testimonials }) => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection />
      <TestimonialsPreviewSection testimonials={testimonials} />
      <AiToolsSection />
      <ExpertsSection experts={experts} />
      <CommunitySection />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  );
};