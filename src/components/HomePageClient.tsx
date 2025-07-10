// src/components/HomePageClient.tsx
'use client';

import React, { FC } from 'react';
// שינוי 1: הסרנו את הייבוא של Expert כי הוא לא בשימוש יותר בקומפוננטה הזו
import type { Post } from '@/types';

import { HeroSection } from '@/components/HeroSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ProductionEveningSection } from '@/components/ProductionEveningSection';
import { CommunitySection } from '@/components/CommunitySection';
import { AiToolsSection } from '@/components/AiToolsSection';
import { ExpertsSection } from '@/components/ExpertsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';

// שינוי 2: הסרנו את experts מה-props
interface HomePageClientProps {
  posts: Post[];
}

// שינוי 3: הסרנו את experts מהפרמטרים של הפונקציה
export const HomePageClient: FC<HomePageClientProps> = ({ posts }) => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection />
      <CommunitySection />
      <AiToolsSection />
      {/* שינוי 4 (התיקון המרכזי): הסרנו את ה-prop מהקריאה לקומפוננטה */}
      <ExpertsSection />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  );
};