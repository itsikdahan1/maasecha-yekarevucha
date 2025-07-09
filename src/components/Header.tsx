// src/components/Header.tsx
'use client';

import React, { useState, FC } from 'react';
import { Icon } from './Icon';
import Link from 'next/link';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // הוספנו את "שאלות ותשובות" לרשימה
  const navLinks = [
    { name: "החוויה", href: "/#the-experience" },
    { name: "קהילה", href: "/#community" },
    { name: "כלי עזר", href: "/#ai-tools" },
    { name: "מומחים", href: "/#experts" },
    { name: "בלוג", href: "/#blog" },
    { name: "שאלות ותשובות", href: "/faq" }, // <-- הקישור החדש
  ];

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-3" aria-label="חזרה לדף הבית">
            <img 
              src="/images/LOGO.svg" 
              alt="לוגו מעשיך יקרבוך" 
              className="h-14 w-auto"
            />
            <span className="text-3xl font-bold text-brand-dark">
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-x-10">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-brand-dark/80 hover:text-brand-cyan text-lg font-semibold transition-colors duration-300">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a href="/#the-experience" className="group relative inline-flex items-center justify-center px-7 py-3.5 text-lg font-semibold text-white bg-brand-dark rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-800 transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/20">
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-brand-cyan rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <span className="relative">הצטרפות למחזור</span>
            </a>
          </div>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="p-2 inline-flex items-center justify-center text-brand-dark/70 hover:text-brand-cyan rounded-lg" aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}>
              {isMenuOpen ? <Icon name="x" className="w-8 h-8"/> : <Icon name="menu" className="w-8 h-8"/>}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-brand-dark/80 hover:bg-cyan-50 hover:text-brand-cyan block px-3 py-3 rounded-md text-base font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            <a href="/#the-experience" onClick={() => setIsMenuOpen(false)} className="bg-brand-dark text-white block text-center mt-4 mx-2 px-4 py-3 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors">
              הצטרפות למחזור
            </a>
          </div>
        </div>
      )}
    </header>
  );
};