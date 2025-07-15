// src/components/HeroSection.tsx
import React, { FC } from 'react';
import Link from 'next/link';

export const HeroSection: FC = () => {
  return (
    <section className="bg-brand-cream" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8 py-28 sm:py-40 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight">
          הגיע הזמן למצוא שידוך!
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-xl text-brand-dark/80 leading-relaxed">
          <strong>מעשיך יקרבוך</strong> היא לא עוד אפליקציה. זו קהילה ופלטפורמה חכמה שמחזירה את הכבוד, העומק והדיוק לתהליך ההיכרות - עבורך ועבור האנשים היקרים לך.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a 
            href="/#the-experience" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-semibold text-white bg-brand-dark rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-800 transform hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/30"
          >
             <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-brand-cyan rounded-full group-hover:w-40 group-hover:h-40 opacity-10"></span>
             <span className="relative">גלו את החוויה שלנו</span>
          </a>
          <Link href="/testimonials" className="text-brand-dark/70 font-semibold text-lg hover:text-brand-cyan transition-colors duration-300">
            סיפורי הצלחה
          </Link>
        </div>
      </div>
    </section>
  );
};