// src/components/HomePageClient.tsx
'use client';

import React, { FC } from 'react';
import type { Post, Expert } from '@/types';

import { HeroSection } from '@/components/HeroSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ProductionEveningSection } from '@/components/ProductionEveningSection';
import { CommunitySection } from '@/components/CommunitySection';
import { AiToolsSection } from '@/components/AiToolsSection';
import { ExpertsSection } from '@/components/ExpertsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';

interface HomePageClientProps {
  posts: Post[];
  experts: Expert[];
}

export const HomePageClient: FC<HomePageClientProps> = ({ posts, experts }) => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection />
      <CommunitySection />
      <AiToolsSection />
      <ExpertsSection experts={experts} />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  );
};