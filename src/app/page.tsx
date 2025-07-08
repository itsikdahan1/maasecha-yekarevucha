'use client';

import React, { useState, useEffect, FC } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ProductionEveningSection } from '@/components/ProductionEveningSection';
import { CommunitySection } from '@/components/CommunitySection';
import { AiToolsSection } from '@/components/AiToolsSection';

// --- הגדרות טיפוסים ---
type Post = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  author: string;
};

type Expert = {
  name: string;
  role: string;
  imageUrl: string;
};

type NavigateFunction = (page: 'home' | 'blogPost', slug?: string | null) => void;

// --- הגדרות נתונים וקומפוננטות זמניות ---

const getPosts = async (): Promise<Post[]> => {
  return []; 
};

const experts: Expert[] = [];

// קומפוננטות זמניות עם הגדרות טיפוסים
const Footer: FC = () => <footer className="h-40 bg-gray-800 text-white flex items-center justify-center"><p>Footer Placeholder</p></footer>;
const ExpertsSection: FC<{ experts: Expert[] }> = ({ experts }) => <section className="p-8 bg-gray-100"><h2 className="text-2xl font-bold text-center">Experts Section</h2></section>;
const BlogSection: FC<{ posts: Post[], onNavigate: NavigateFunction }> = ({ posts, onNavigate }) => <section className="p-8"><h2 className="text-2xl font-bold text-center">Blog Section</h2></section>;
const BlogPostPage: FC<{ slug: string | null, onNavigate: NavigateFunction }> = ({ slug, onNavigate }) => <div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">Blog Post: {slug}</h1></div>;
const FloatingButtons: FC = () => <div className="fixed bottom-5 right-5 z-50 p-3 bg-cyan-200 rounded-full shadow-lg"><p className="text-xs">Buttons</p></div>;

// --- סוף החלק הזמני ---

const HomePageContent: FC<{ onNavigate: NavigateFunction }> = ({ onNavigate }) => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    getPosts().then(setBlogPosts);
  }, []);

  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection />
      <CommunitySection />
      <AiToolsSection />
      <ExpertsSection experts={experts} />
      <BlogSection posts={blogPosts} onNavigate={onNavigate} />
    </>
  );
};

const Page: FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'blogPost'>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  
  const handleNavigate: NavigateFunction = (page, slug = null) => {
      setCurrentPage(page);
      setCurrentSlug(slug);
      window.scrollTo(0, 0);
  };

  const renderPage = () => {
      switch (currentPage) {
          case 'blogPost':
              return <BlogPostPage slug={currentSlug} onNavigate={handleNavigate} />;
          case 'home':
          default:
              return <HomePageContent onNavigate={handleNavigate} />;
      }
  };

  return (
    <div>
      <Header onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default Page;