'use client';

import React, { useState, useEffect } from 'react';

// ייבוא עתידי של כל רכיבי העמוד
// כרגע הם מוגדרים כפלייסהולדרים למטה כדי למנוע שגיאות
// import { Header } from './Header';
// import { HeroSection } from './HeroSection';
// ... etc.

// --- הגדרות זמניות (Placeholders) ---
// נחליף כל אחד מאלה בקומפוננטה אמיתית בשלבים הבאים
const Header = () => <header className="h-24 bg-slate-200 flex items-center justify-center font-bold">Header</header>;
const HeroSection = () => <section className="h-96 bg-slate-100 flex items-center justify-center font-bold">Hero Section</section>;
const WhyUsSection = () => <section className="h-96 bg-white flex items-center justify-center font-bold">Why Us Section</section>;
const ProductionEveningSection = () => <section className="h-96 bg-slate-100 flex items-center justify-center font-bold">Production Evening Section</section>;
const CommunitySection = () => <section className="h-96 bg-slate-800 text-white flex items-center justify-center font-bold">Community Section</section>;
const AiToolsSection = () => <section className="h-96 bg-white flex items-center justify-center font-bold">AI Tools Section</section>;
const ExpertsSection = ({ experts }) => <section className="h-96 bg-slate-100 flex items-center justify-center font-bold">Experts Section</section>;
const BlogSection = ({ posts, onNavigate }) => <section className="h-96 bg-white flex items-center justify-center font-bold">Blog Section</section>;
const Footer = () => <footer className="h-40 bg-slate-800 text-white flex items-center justify-center font-bold">Footer</footer >;
const FloatingButtons = () => null; // נבנה אותו בסוף
const BlogPostPage = ({ slug, onNavigate }) => <div className="h-screen bg-white flex items-center justify-center font-bold">Blog Post Page for: {slug}</div>;
// --- סוף הגדרות זמניות ---


const HomePageLayout = ({ posts, experts, productionEvening, onNavigate }) => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductionEveningSection info={productionEvening} />
      <CommunitySection />
      <AiToolsSection />
      <ExpertsSection experts={experts} />
      <BlogSection posts={posts} onNavigate={onNavigate} />
    </>
  );
};

export default function HomePageClient({ posts, productionEvening, experts }) {
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
              return (
                <HomePageLayout 
                  posts={posts}
                  experts={experts}
                  productionEvening={productionEvening}
                  onNavigate={handleNavigate}
                />
              );
      }
  };

  return (
    <div className="bg-brand-cream">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}