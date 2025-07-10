// src/components/HomePageClient.tsx
'use client';

import React, { FC } from 'react';
import type { Post, Expert } from '@/types'; // החזרנו את הייבוא של Expert

import { HeroSection } from '@/components/HeroSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ProductionEveningSection } from '@/components/ProductionEveningSection';
import { CommunitySection } from '@/components/CommunitySection';
import { AiToolsSection } from '@/components/AiToolsSection';
import { ExpertsSection } from '@/components/ExpertsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';

// הוספנו את experts ל-props
interface HomePageClientProps {
  posts: Post[];
  experts: Expert[];
}

// הוספנו את experts לפרמטרים והעברנו אותו הלאה
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