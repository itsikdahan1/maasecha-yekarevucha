'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { WhyUsSection } from '../components/WhyUsSection';
import { ProductionEveningSection } from '../components/ProductionEveningSection';
import { CommunitySection } from '../components/CommunitySection';
import { AiToolsSection } from '../components/AiToolsSection';

// --- MOCK API & DATA (Placeholder) ---
const getPosts = async () => { return []; };
const getPost = async (slug) => { return null; };
const experts = [];

// --- TEMPORARY PLACEHOLDER COMPONENTS ---
const Footer = () => <footer className="h-40 bg-brand-dark text-white flex items-center justify-center"><p className="font-bold">Footer Placeholder</p></footer>;
const ExpertsSection = ({ experts }) => <section className="h-96 bg-brand-cream flex items-center justify-center"><p className="font-bold">Experts Section Placeholder</p></section>;
const BlogSection = ({ posts, onNavigate }) => <section className="h-96 bg-white flex items-center justify-center"><p className="font-bold">Blog Section Placeholder</p></section>;
const BlogPostPage = ({ slug, onNavigate }) => <div className="h-screen bg-white flex items-center justify-center"><p className="font-bold">Blog Post Page Placeholder for: {slug}</p></div>;
const FloatingButtons = () => <div className="fixed bottom-5 right-5 z-50 p-3 bg-cyan-200 rounded-full shadow-lg"><p className="text-xs">Floating Buttons</p></div>;
// --- END OF PLACEHOLDERS ---

const HomePageContent = ({ onNavigate }) => {
  const [blogPosts, setBlogPosts] = useState([]);
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

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSlug, setCurrentSlug] = useState(null);
  
  const handleNavigate = (page, slug = null) => {
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